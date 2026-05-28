/**
 * Mailtrap Send API wrapper. Mirrors the transport pattern from
 * /Users/saxon/trading-signals/worker/notify.py (the Saxon Trading Signals worker).
 *
 * Env vars (set in .env at the repo root, loaded by docker-compose):
 *   MAILTRAP_API_TOKEN   Bearer token for https://send.api.mailtrap.io
 *   CONTACT_FROM_EMAIL   "From" address (must be on a verified Mailtrap domain)
 *   CONTACT_TO_EMAIL     Inbox that receives contact-form submissions
 */

type SendArgs = {
    to: string;
    subject: string;
    text: string;
    html?: string;
    fromName?: string;
};

export async function sendEmail({
    to,
    subject,
    text,
    html,
    fromName = "East Coast Utility",
}: SendArgs): Promise<void> {
    const token = process.env.MAILTRAP_API_TOKEN;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!token) throw new Error("MAILTRAP_API_TOKEN is not set");
    if (!from) throw new Error("CONTACT_FROM_EMAIL is not set");

    const res = await fetch("https://send.api.mailtrap.io/api/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            from: { email: from, name: fromName },
            to: [{ email: to }],
            subject,
            text,
            html: html ?? text,
        }),
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Mailtrap send failed (${res.status}): ${body}`);
    }
}
