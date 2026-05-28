import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "East Coast Utility, LLC | Horizontal Directional Drilling (HDD)",
    description:
        "East Coast Utility, LLC — NJ-based horizontal directional drilling and utility construction. Founded 2008 by Tom Colleran. Serving NY, NJ, PA, DE, and MD.",
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
                <div className="flex-1">{children}</div>
                <footer className="border-t border-border py-6 px-6 text-center text-sm text-foreground/70">
                    <p>
                        &epsilon;&gamma;&upsilon; East Coast Utility, Inc &copy;{" "}
                        {new Date().getFullYear()}{" "}Based out of Fair Haven, NJ 07724{" "}
                        &epsilon;&gamma;&upsilon;{" "}
                        <a
                            href="mailto:tom@eastcoastutility.com"
                            className="text-accent hover:underline"
                        >
                            tom@eastcoastutility.com
                        </a>{" "}
                        &epsilon;&gamma;&upsilon;{" "}
                        <a href="tel:+19089026728" className="text-accent hover:underline">
                            +1 908-902-6728
                        </a>
                    </p>
                </footer>
            </body>
        </html>
    );
}
