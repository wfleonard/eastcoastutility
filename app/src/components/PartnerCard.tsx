"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import type { Partner } from "@/lib/partners";

type Props = { partner: Partner };

export default function PartnerCard({ partner }: Props) {
    const [open, setOpen] = useState(false);
    const clickable = Boolean(partner.blurb);

    return (
        <>
            <div
                role={clickable ? "button" : undefined}
                tabIndex={clickable ? 0 : undefined}
                onClick={() => clickable && setOpen(true)}
                onKeyDown={(e) => {
                    if (clickable && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        setOpen(true);
                    }
                }}
                className={`flex aspect-square items-center justify-center bg-white p-4 ${
                    clickable
                        ? "cursor-pointer transition-transform hover:scale-105"
                        : ""
                }`}
            >
                <Image
                    src={`/images/${partner.logo}`}
                    alt={partner.alt}
                    width={200}
                    height={200}
                    className="max-h-full max-w-full object-contain"
                />
            </div>
            {clickable && (
                <Modal open={open} onClose={() => setOpen(false)} title={partner.name}>
                    <p className="text-foreground/90 leading-relaxed">{partner.blurb}</p>
                </Modal>
            )}
        </>
    );
}
