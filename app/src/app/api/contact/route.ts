import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";

/**
 * POST /api/contact
 *
 * Body (JSON):
 *   { fname, lname, company, cell, email, comment }
 *
 * Validates server-side, then forwards as plain-text email to CONTACT_TO_EMAIL
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
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
    let body: Payload;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const fname = (body.fname || "").trim();
    const lname = (body.lname || "").trim();
    const company = (body.company || "").trim();
    const cell = (body.cell || "").trim();
    const email = (body.email || "").trim();
    const comment = (body.comment || "").trim();

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
