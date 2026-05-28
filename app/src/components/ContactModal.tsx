"use client";

import { FormEvent, useState } from "react";
import Modal from "./Modal";

type Props = { open: boolean; onClose: () => void };

type Status = "idle" | "sending" | "success" | "error";

const PHONE_RE = /^\d{10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactModal({ open, onClose }: Props) {
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const form = e.currentTarget;
        const fd = new FormData(form);
        const payload = {
            fname: String(fd.get("fname") || "").trim(),
            lname: String(fd.get("lname") || "").trim(),
            company: String(fd.get("company") || "").trim(),
            cell: String(fd.get("cell") || "").trim(),
            email: String(fd.get("email") || "").trim(),
            comment: String(fd.get("comment") || "").trim(),
        };

        if (!payload.fname || !payload.lname || !payload.company || !payload.cell || !payload.email) {
            setError("Please fill out all required fields.");
            return;
        }
        if (!EMAIL_RE.test(payload.email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!PHONE_RE.test(payload.cell.replace(/\D/g, ""))) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }

        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Submission failed");
            setStatus("success");
            form.reset();
        } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Submission failed");
        }
    };

    return (
        <Modal open={open} onClose={onClose} title="Contact Us">
            {status === "success" ? (
                <div className="py-4">
                    <p className="text-green-700">
                        Thanks — your message has been sent. Tom will be in touch shortly.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setStatus("idle");
                            onClose();
                        }}
                        className="mt-4 rounded bg-accent px-4 py-2 text-white hover:bg-accent-dark"
                    >
                        Close
                    </button>
                </div>
            ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-3">
                    <Field label="First Name" name="fname" type="text" required />
                    <Field label="Last Name" name="lname" type="text" required />
                    <Field label="Company" name="company" type="text" required />
                    <Field label="Cell Phone" name="cell" type="tel" required />
                    <Field label="Email" name="email" type="email" required />
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">
                            What services do you need from ECU?
                        </span>
                        <textarea
                            name="comment"
                            rows={4}
                            className="rounded border border-border bg-white p-2 text-foreground"
                        />
                    </label>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="mt-2 rounded bg-accent px-4 py-2 font-semibold text-white hover:bg-accent-dark disabled:opacity-50"
                    >
                        {status === "sending" ? "Sending..." : "Submit"}
                    </button>
                </form>
            )}
        </Modal>
    );
}

function Field({
    label,
    name,
    type,
    required,
}: {
    label: string;
    name: string;
    type: string;
    required?: boolean;
}) {
    return (
        <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">
                {label}
                {required && <span className="text-accent"> *</span>}
            </span>
            <input
                type={type}
                name={name}
                required={required}
                className="rounded border border-border bg-white p-2 text-foreground"
            />
        </label>
    );
}
