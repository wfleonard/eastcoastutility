"use client";

import { ReactNode, useEffect } from "react";

/**
 * Generic accessible modal — handles overlay click + Esc-to-close.
 */
type Props = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

export default function Modal({ open, onClose, title, children }: Props) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-3 top-3 text-2xl leading-none text-foreground/60 hover:text-foreground"
                >
                    &times;
                </button>
                {title && (
                    <h3 className="mb-3 pr-8 text-xl font-bold text-accent">{title}</h3>
                )}
                <div className="text-foreground/90">{children}</div>
            </div>
        </div>
    );
}
