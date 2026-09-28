import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import { BUSINESS } from "@/lib/business";
import {
    SHOW_DRAFTS,
    findPage,
    visiblePages,
    type Block,
    type ResourcePage,
} from "@/lib/resources";

// Only pages known at build time exist. In production that is the published
// set, so a draft slug is a plain 404 rather than an on-demand render.
export const dynamicParams = false;

export function generateStaticParams() {
    return visiblePages().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const page = findPage((await params).slug);
    if (!page) return {};
    return {
        title: `${page.question} | ${BUSINESS.legalName}`,
        description: page.description,
        alternates: { canonical: `/resources/${page.slug}` },
        robots: page.status === "draft" ? { index: false, follow: false } : undefined,
        openGraph: {
            type: "article",
            url: `${BUSINESS.site}/resources/${page.slug}`,
            title: page.question,
            description: page.description,
        },
    };
}

export default async function ResourceArticle({ params }: Props) {
    const page = findPage((await params).slug);
    if (!page) notFound();

    return (
        <main>
            <SiteNav />
            <ArticleJsonLd page={page} />
            <article className="mx-auto max-w-3xl px-4 py-10">
                {SHOW_DRAFTS && page.status === "draft" && <DraftBanner page={page} />}

                <p className="text-sm text-foreground/60">
                    <Link href="/resources" className="hover:text-accent hover:underline">
                        Resources
                    </Link>{" "}
                    / {page.group}
                </p>
                <h1 className="mt-2 text-3xl font-bold md:text-4xl">{page.question}</h1>
                <p className="mt-3 text-sm text-foreground/70">
                    By {BUSINESS.founder}, Owner, {BUSINESS.legalName}
                    {page.dateModified && (
                        <>
                            {" "}· Updated{" "}
                            <time dateTime={page.dateModified}>
                                {formatDate(page.dateModified)}
                            </time>
                        </>
                    )}
                </p>

                {/* The direct answer. Kept first and unadorned: this is the part an assistant quotes. */}
                <div className="mt-6 space-y-4 text-lg">
                    {page.answer.map((text, i) => (
                        <p key={i}>{text}</p>
                    ))}
                </div>

                {page.sections.map((section) => (
                    <section key={section.heading} className="mt-10">
                        <h2 className="text-2xl font-bold text-accent">{section.heading}</h2>
                        <div className="mt-4 space-y-4 text-foreground/90">
                            {section.blocks.map((block, i) => (
                                <BlockView key={i} block={block} />
                            ))}
                        </div>
                    </section>
                ))}

                <aside className="mt-12 rounded-xl bg-muted p-6 ring-1 ring-border/60">
                    <h2 className="text-xl font-bold">Planning a crossing in {BUSINESS.region}?</h2>
                    <p className="mt-2 text-foreground/80">
                        {BUSINESS.legalName} has handled directional drilling and the
                        permitting around it since {BUSINESS.foundingYear} for utilities,
                        engineering firms and general contractors across NJ, NY, PA, DE
                        and MD. Call{" "}
                        <a href={`tel:${BUSINESS.phone}`} className="text-accent hover:underline">
                            {BUSINESS.phoneDisplay}
                        </a>{" "}
                        or email{" "}
                        <a href={`mailto:${BUSINESS.email}`} className="text-accent hover:underline">
                            {BUSINESS.email}
                        </a>
                        .
                    </p>
                </aside>

                {page.sources.length > 0 && (
                    <section className="mt-10 text-sm">
                        <h2 className="font-bold">Sources</h2>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground/70">
                            {page.sources.map((s) => (
                                <li key={s.url}>
                                    <a href={s.url} className="hover:text-accent hover:underline" rel="noopener">
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </article>
        </main>
    );
}

function BlockView({ block }: { block: Block }) {
    switch (block.type) {
        case "p":
            return <p>{block.text}</p>;
        case "ul":
            return (
                <ul className="ml-5 list-disc space-y-2">
                    {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            );
        case "ol":
            return (
                <ol className="ml-5 list-decimal space-y-2">
                    {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ol>
            );
        case "table":
            return (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead>
                            <tr>
                                {block.head.map((h) => (
                                    <th key={h} className="border-b-2 border-border px-3 py-2 font-semibold">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, i) => (
                                <tr key={i}>
                                    {row.map((cell, j) => (
                                        <td key={j} className="border-b border-border px-3 py-2 align-top">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        case "tom":
            // Interview placeholders never render outside dev.
            if (!SHOW_DRAFTS) return null;
            return (
                <p className="rounded border-l-4 border-yellow-500 bg-yellow-50 px-4 py-3 text-sm text-yellow-900">
                    <strong>From Tom:</strong> {block.prompt}
                </p>
            );
    }
}

function DraftBanner({ page }: { page: ResourcePage }) {
    return (
        <div className="mb-8 rounded border border-yellow-400 bg-yellow-50 p-4 text-sm text-yellow-900">
            <p className="font-bold">
                Draft. Not published. Returns 404 in production until the items
                below come from Tom.
            </p>
            <ul className="mt-2 list-disc pl-5">
                {page.needsFromTom.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

/**
 * Article schema whose author and publisher are the same @id nodes declared in
 * the site-wide graph (components/JsonLd.tsx), so every page accrues to one
 * resolved person and company rather than floating free.
 */
function ArticleJsonLd({ page }: { page: ResourcePage }) {
    const url = `${BUSINESS.site}/resources/${page.slug}`;
    const data = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}#article`,
        headline: page.question,
        description: page.description,
        url,
        mainEntityOfPage: url,
        inLanguage: "en-US",
        author: { "@id": `${BUSINESS.site}/#tom-colleran` },
        publisher: { "@id": `${BUSINESS.site}/#organization` },
        isPartOf: { "@id": `${BUSINESS.site}/#website` },
        ...(page.datePublished && { datePublished: page.datePublished }),
        ...(page.dateModified && { dateModified: page.dateModified }),
        ...(page.sources.length > 0 && { citation: page.sources.map((s) => s.url) }),
    };
    return (
        <script
            type="application/ld+json"
            // Content is a compile-time constant, not user input.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

function formatDate(iso: string): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });
}
