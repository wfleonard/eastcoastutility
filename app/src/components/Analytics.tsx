"use client";

import { useEffect } from "react";

/**
 * Lead and AI-referral events for Google Analytics.
 *
 * Leads: a tap on any tel: or mailto: link anywhere on the site. Contact-form
 * submissions are reported from ContactModal via trackLead(). Mark
 * `generate_lead` as a key event in GA (Admin → Events) so it counts as a
 * conversion.
 *
 * AI referrals: GA already records `utm_source=openai` (ChatGPT tags its cited
 * links) as the session source. Other assistants send only a Referer header,
 * which GA lumps in with ordinary referral traffic. `ai_referral` names the
 * assistant explicitly so the monthly report can count visits from each one.
 */

/**
 * Queues the event on dataLayer rather than calling window.gtag, which may not
 * exist yet: the gtag scripts load afterInteractive, and the referral check
 * runs on first mount. gtag.js reads queued entries when it loads. The entry
 * must be an `arguments` object — gtag.js ignores plain arrays — hence the
 * function expression.
 */
// Parameters are read through `arguments`, so none are declared.
const gtag = function () {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
} as (command: "event", name: string, params: Record<string, string>) => void;

function track(name: string, params: Record<string, string>) {
    gtag("event", name, params);
}

export function trackLead(method: "phone" | "email" | "contact_form") {
    track("generate_lead", { method });
}

/** Hostname suffix → assistant name. */
const AI_REFERRERS: Array<[string, string]> = [
    ["chatgpt.com", "chatgpt"],
    ["chat.openai.com", "chatgpt"],
    ["perplexity.ai", "perplexity"],
    ["claude.ai", "claude"],
    ["gemini.google.com", "gemini"],
    ["copilot.microsoft.com", "copilot"],
];

function aiSource(): string | null {
    const utm = new URLSearchParams(window.location.search).get("utm_source");
    if (utm === "openai" || utm === "chatgpt.com") return "chatgpt";
    if (!document.referrer) return null;
    let host: string;
    try {
        host = new URL(document.referrer).hostname;
    } catch {
        return null;
    }
    const match = AI_REFERRERS.find(
        ([suffix]) => host === suffix || host.endsWith(`.${suffix}`),
    );
    return match ? match[1] : null;
}

export default function Analytics() {
    useEffect(() => {
        const source = aiSource();
        if (source) {
            track("ai_referral", {
                ai_source: source,
                landing_page: window.location.pathname,
            });
        }

        const onClick = (e: MouseEvent) => {
            const link = (e.target as Element | null)?.closest?.("a[href]");
            const href = link?.getAttribute("href") ?? "";
            if (href.startsWith("tel:")) trackLead("phone");
            else if (href.startsWith("mailto:")) trackLead("email");
        };
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    return null;
}
