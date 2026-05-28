"use client";

import Image from "next/image";

type Props = { onContactClick: () => void };

export default function Header({ onContactClick }: Props) {
    return (
        <header className="border-b border-border">
            <div className="mx-auto max-w-6xl px-4 py-4">
                <Image
                    src="/images/ECUNJHDDHorizontalDirectionalDrillingHero.png"
                    alt="East Coast Utility, LLC Logo"
                    width={1200}
                    height={240}
                    priority
                    className="h-auto w-full"
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
