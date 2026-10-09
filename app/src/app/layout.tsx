import type { Metadata } from "next";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import { BUSINESS, LOCATION_LINE } from "@/lib/business";
import "./globals.css";

const GA_ID = "G-2SK3NM1WEQ";

export const metadata: Metadata = {
    metadataBase: new URL(BUSINESS.site),
    title: `${BUSINESS.legalName} | Horizontal Directional Drilling (HDD)`,
    description:
        `${BUSINESS.legalName} — NJ-based horizontal directional drilling and utility construction. Founded ${BUSINESS.foundingYear} by ${BUSINESS.founderShortName}. Serving NY, NJ, PA, DE, and MD.`,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        url: BUSINESS.site,
        siteName: BUSINESS.legalName,
        title: `${BUSINESS.legalName} | Horizontal Directional Drilling (HDD)`,
        description:
            `NJ-based horizontal directional drilling and underground utility construction. Founded ${BUSINESS.foundingYear} by ${BUSINESS.founderShortName}. Serving NY, NJ, PA, DE, and MD.`,
        locale: "en_US",
        images: [
            {
                url: "/images/east-coast-utility-logo.png",
                alt: `${BUSINESS.legalName} logo`,
            },
        ],
    },
    icons: {
        icon: "/images/ECUNJFavIcon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="h-full antialiased">
            <body className="min-h-full flex flex-col bg-background text-foreground">
                {/* Google Analytics (gtag.js) — loaded once at the root so every page reports pageviews. */}
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                    strategy="afterInteractive"
                />
                {/*
                  beforeInteractive so the js/config commands are queued before
                  any component effect pushes an event (components/Analytics.tsx).
                  Events queued ahead of config have no destination and are lost.
                */}
                <Script id="gtag-init" strategy="beforeInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_ID}');
                    `}
                </Script>
                <JsonLd />
                <Analytics />
                <div className="flex-1">{children}</div>
                <footer className="border-t border-border py-6 px-6 text-center text-sm text-foreground/70">
                    {/*
                      Laid out with flex + gap rather than JSX text nodes. The
                      previous version separated fields with literal strings and
                      lost its spacing in the build; gap-x makes that class of
                      bug impossible.
                    */}
                    <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                        <span>
                            &copy; {new Date().getFullYear()} {BUSINESS.legalName}
                        </span>
                        <Separator />
                        <span>Based out of {LOCATION_LINE}</span>
                        <Separator />
                        <a
                            href={`mailto:${BUSINESS.email}`}
                            className="text-accent hover:underline"
                        >
                            {BUSINESS.email}
                        </a>
                        <Separator />
                        <a
                            href={`tel:${BUSINESS.phone}`}
                            className="text-accent hover:underline"
                        >
                            {BUSINESS.phoneDisplay}
                        </a>
                    </p>
                    <p className="saxon-credit" style={{ margin: '12px 0 0', fontSize: '0.85em', opacity: 0.85 }}>
                        <a
                            href="https://saxonenterprises.net/"
                            title="Website design and development by Saxon Enterprises, Tinton Falls, NJ"
                            style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M11 2 4 17h7z" /><path d="M13 5v12h7z" /><path d="M3 19h18l-2 3H5z" /></svg>
                            <span>Charted and crewed by <span style={{ textDecoration: 'underline' }}>Saxon Enterprises</span></span>
                        </a>
                    </p>
                </footer>
            </body>
        </html>
    );
}

/** Decorative field separator — hidden from assistive tech and from crawlers' text extraction. */
function Separator() {
    return (
        <span aria-hidden="true" className="text-foreground/40">
            &middot;
        </span>
    );
}
