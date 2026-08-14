import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, LOCATION_LINE } from "@/lib/business";
import "./globals.css";

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
                <JsonLd />
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
