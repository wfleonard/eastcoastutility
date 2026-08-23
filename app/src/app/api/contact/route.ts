import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";

/**
 * POST /api/contact
 *
 * Body (JSON):
 *   { fname, lname, company, cell, email, comment,
 *     _hp?, _elapsedMs? }   // spam-defense fields from the client
 *
 * Validates + spam-filters, then forwards as email to CONTACT_TO_EMAIL
 * via Mailtrap. Replaces the old PHP path:
 *   db/insertCustomer.php + db/sendCustomerEmail.php
 */

type Payload = {
    fname?: string;
    lname?: string;
    company?: string;
    cell?: string;
    email?: string;
    comment?: string;
    _hp?: string;             // honeypot — must be empty
    _elapsedMs?: number;       // time between form open and submit
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;
const URL_RE = /\bhttps?:\/\/|\bwww\./gi;
const LATIN_RE = /[A-Za-zÀ-ÿ]/;

const MAX = {
    fname: 50,
    lname: 50,
    company: 100,
    cell: 20,
    email: 254,
    comment: 2000,
} as const;

const MIN_FORM_FILL_MS = 3000;     // humans need > 3s to fill 5 fields
const MAX_URLS_IN_COMMENT = 2;     // 3+ URLs is almost always SEO spam
const RATE_LIMIT_MAX = 5;          // per IP per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;  // 1 hour

// In-memory rate limiter. Fine for a single container; would need Redis
// only if we ever scale horizontally.
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function rateLimit(ip: string): { ok: boolean; retryAfterSec?: number } {
    const now = Date.now();
    const b = buckets.get(ip);
    if (!b || b.resetAt < now) {
        buckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return { ok: true };
    }
    if (b.count >= RATE_LIMIT_MAX) {
        return { ok: false, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
    }
    b.count += 1;
    return { ok: true };
}

function clientIp(req: NextRequest): string {
    const xff = req.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();
    return req.headers.get("x-real-ip") || "unknown";
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function countUrls(s: string): number {
    return (s.match(URL_RE) || []).length;
}

function hasLatinChar(s: string): boolean {
    return LATIN_RE.test(s);
}

export async function POST(req: NextRequest) {
    // ── Origin check (only enforced in production) ───────────
    if (process.env.NODE_ENV === "production") {
        const allowed = process.env.ALLOWED_ORIGIN;
        const origin = req.headers.get("origin");
        if (allowed && origin && origin !== allowed) {
            return NextResponse.json(
                { error: "Forbidden origin" },
                { status: 403 }
            );
        }
    }

    // ── Rate limit per client IP ─────────────────────────────
    const ip = clientIp(req);
    const rl = rateLimit(ip);
    if (!rl.ok) {
        return NextResponse.json(
            { error: "Too many submissions. Please try again later." },
            { status: 429, headers: { "Retry-After": String(rl.retryAfterSec ?? 3600) } }
        );
    }

    // ── Parse body ───────────────────────────────────────────
    let body: Payload;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // ── Honeypot: if filled, silently succeed (bot never learns) ─
    if (body._hp && body._hp.trim().length > 0) {
        console.warn(`[contact] honeypot triggered from ${ip}`);
        return NextResponse.json({ ok: true });
    }

    // ── Timing: humans take > 3s to fill 5 fields ────────────
    if (typeof body._elapsedMs === "number" && body._elapsedMs < MIN_FORM_FILL_MS) {
        console.warn(`[contact] too-fast submission from ${ip}: ${body._elapsedMs}ms`);
        return NextResponse.json({ ok: true });  // silent to bot
    }

    // ── Field extraction + length caps ───────────────────────
    const fname = (body.fname || "").trim().slice(0, MAX.fname);
    const lname = (body.lname || "").trim().slice(0, MAX.lname);
    const company = (body.company || "").trim().slice(0, MAX.company);
    const cell = (body.cell || "").trim().slice(0, MAX.cell);
    const email = (body.email || "").trim().slice(0, MAX.email);
    const comment = (body.comment || "").trim().slice(0, MAX.comment);

    // ── Basic required-field + format validation ─────────────
    if (!fname || !lname || !company || !cell || !email) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }
    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!PHONE_RE.test(cell.replace(/\D/g, ""))) {
        return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
    }

    // ── URL-count spam heuristic on comment ──────────────────
    if (countUrls(comment) > MAX_URLS_IN_COMMENT) {
        console.warn(`[contact] URL-spam blocked from ${ip}`);
        return NextResponse.json({ ok: true });  // silent to bot
    }

    // ── Non-Latin script heuristic on name/company fields ────
    // ECU serves the US mid-Atlantic; a name/company with zero Latin
    // characters is almost always foreign-market spam.
    if (!hasLatinChar(fname) || !hasLatinChar(lname) || !hasLatinChar(company)) {
        console.warn(`[contact] non-Latin fields blocked from ${ip}`);
        return NextResponse.json({ ok: true });  // silent to bot
    }

    // ── Send email ───────────────────────────────────────────
    const to = process.env.CONTACT_TO_EMAIL || "tom@eastcoastutility.com";
    const subject = `New ECU contact request from ${fname} ${lname} (${company})`;

    const text = [
        "New Customer Inquiry",
        "",
        `Name:    ${fname} ${lname}`,
        `Company: ${company}`,
        `Phone:   ${cell}`,
        `Email:   ${email}`,
        "",
        "Services needed:",
        comment || "(none provided)",
    ].join("\n");

    const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;color:#1a1a1a;">
<h2 style="color:#c8102e;margin:0 0 12px;">New Customer Inquiry</h2>
<table style="border-collapse:collapse;width:100%;">
  <tr><td style="padding:4px 8px;font-weight:bold;">Name:</td><td style="padding:4px 8px;">${escapeHtml(fname)} ${escapeHtml(lname)}</td></tr>
  <tr><td style="padding:4px 8px;font-weight:bold;">Company:</td><td style="padding:4px 8px;">${escapeHtml(company)}</td></tr>
  <tr><td style="padding:4px 8px;font-weight:bold;">Phone:</td><td style="padding:4px 8px;">${escapeHtml(cell)}</td></tr>
  <tr><td style="padding:4px 8px;font-weight:bold;">Email:</td><td style="padding:4px 8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
</table>
<h3 style="margin:16px 0 4px;color:#1a1a1a;">Services needed</h3>
<p style="white-space:pre-wrap;">${escapeHtml(comment || "(none provided)")}</p>
</div>`;

    try {
        await sendEmail({ to, subject, text, html });
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact form email failed:", err);
        return NextResponse.json(
            { error: "Email delivery failed. Please try again or call us directly." },
            { status: 502 }
        );
    }
}
