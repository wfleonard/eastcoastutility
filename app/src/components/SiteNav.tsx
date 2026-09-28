import Image from "next/image";
import Link from "next/link";

/**
 * Header for interior pages. The home page keeps its own client-side Header
 * because its Contact button opens the modal; interior pages link back to the
 * home page's contact section instead, so they can stay server components.
 */
export default function SiteNav() {
    return (
        <header className="border-b border-border">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
                <Link href="/" aria-label="East Coast Utility home">
                    <Image
                        src="/images/east-coast-utility-logo.png"
                        alt="East Coast Utility, LLC logo"
                        width={240}
                        height={240}
                        className="h-14 w-auto"
                    />
                </Link>
                <nav className="flex items-center gap-6 text-sm font-medium uppercase tracking-wider">
                    <Link href="/" className="hover:text-accent">
                        Home
                    </Link>
                    <Link href="/resources" className="hover:text-accent">
                        Resources
                    </Link>
                    <Link
                        href="/#about"
                        className="rounded bg-accent px-4 py-2 text-white hover:bg-accent-dark"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}
