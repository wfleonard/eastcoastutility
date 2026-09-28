import { createHmac } from "node:crypto";

/**
 * Sends a lead or order notice to the Saxon Admin dashboard (saxonwebdev.com).
 * Signed with SAXON_ADMIN_SECRET; the dashboard holds the same value as
 * EVENT_SECRET_<SITE>. Never throws and gives up after 5 seconds, so the
 * dashboard being down can't break this site. Skipped if not configured.
 *
 * Env: SAXON_ADMIN_URL (https://saxonwebdev.com), SAXON_ADMIN_SITE (slug in
 * the dashboard's sites.json), SAXON_ADMIN_SECRET.
 */
export type SaxonAdminEvent = {
  id: string;
  type: "lead" | "order";
  occurredAt?: string;
  title?: string;
  amountCents?: number;
  name?: string;
  email?: string;
  company?: string;
};

export async function notifySaxonAdmin(event: SaxonAdminEvent): Promise<void> {
  const url = process.env.SAXON_ADMIN_URL;
  const site = process.env.SAXON_ADMIN_SITE;
  const secret = process.env.SAXON_ADMIN_SECRET;
  if (!url || !site || !secret) return;

  const body = JSON.stringify({ occurredAt: new Date().toISOString(), ...event });
  const ts = Math.floor(Date.now() / 1000).toString();
  const signature = createHmac("sha256", secret).update(`${ts}.${body}`).digest("hex");

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/api/events`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-saxon-site": site,
        "x-saxon-timestamp": ts,
        "x-saxon-signature": signature,
      },
      body,
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.warn(`[saxon-admin] notice rejected: HTTP ${res.status}`);
  } catch (err) {
    console.warn("[saxon-admin] notice not sent:", err instanceof Error ? err.message : err);
  }
}
