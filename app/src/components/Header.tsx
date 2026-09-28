"use client";

import Image from "next/image";

type Props = { onContactClick: () => void };

export default function Header({ onContactClick }: Props) {
    return (
        <header className="border-b border-border">
            <div className="mx-auto max-w-6xl px-4 py-4">
                <Image
                    src="/images/eastcoastutility-250-1-hero.png"
                    alt="East Coast Utility, LLC Logo"
                    width={1536}
                    height={1024}
                    priority
                    // Rendered at most 900px wide. Without this hint the
                    // browser sizes the download to the viewport and fetches
                    // the 1920px version on desktop.
                    sizes="(max-width: 932px) 100vw, 900px"
                    className="mx-auto h-auto w-full max-w-[900px]"
                />
                <nav className="mt-4 flex items-center justify-end gap-6 text-sm font-medium uppercase tracking-wider">
                    <a href="#top" className="hover:text-accent">
                        Home
                    </a>
                    <a href="#about" className="hover:text-accent">
                        About
                    </a>
                    <button
                        type="button"
                        onClick={onContactClick}
                        className="rounded bg-accent px-4 py-2 text-white hover:bg-accent-dark"
                    >
                        Contact
                    </button>
                </nav>
            </div>
        </header>
    );
}
