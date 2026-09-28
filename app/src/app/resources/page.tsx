import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import { BUSINESS } from "@/lib/business";
import { SHOW_DRAFTS, visiblePages, type ResourcePage } from "@/lib/resources";

export const metadata: Metadata = {
    title: `HDD Permits, Costs and Planning | Resources | ${BUSINESS.legalName}`,
    description:
        "Answers to the questions engineers, general contractors and utilities ask before a directional drilling job in New Jersey: permits, timelines, and cost.",
    alternates: { canonical: "/resources" },
};

const GROUPS: ResourcePage["group"][] = ["Permits", "Cost"];

export default function ResourcesIndex() {
    const pages = visiblePages();
    // Until the first page is published there is nothing to index. A 404 keeps
    // an empty hub out of search results.
    if (pages.length === 0) notFound();

    return (
        <main>
            <SiteNav />
            <div className="mx-auto max-w-3xl px-4 py-10">
                <h1 className="text-3xl font-bold md:text-4xl">
                    Directional Drilling Resources
                </h1>
                <p className="mt-4 text-foreground/80">
                    Plain answers to the questions that come up before a horizontal
                    directional drilling job in New Jersey, written by{" "}
                    {BUSINESS.founderShortName} of {BUSINESS.legalName} from{" "}
                    {new Date().getFullYear() - Number(BUSINESS.foundingYear)} years
                    of permitting and drilling across NJ, NY, PA, DE and MD.
                </p>

                {GROUPS.map((group) => {
                    const inGroup = pages.filter((p) => p.group === group);
                    if (inGroup.length === 0) return null;
                    return (
                        <section key={group} className="mt-10">
                            <h2 className="text-2xl font-bold text-accent">{group}</h2>
                            <ul className="mt-4 space-y-4">
                                {inGroup.map((p) => (
                                    <li key={p.slug}>
                                        <Link
                                            href={`/resources/${p.slug}`}
                                            className="font-semibold hover:text-accent hover:underline"
                                        >
                                            {p.question}
                                        </Link>
                                        {SHOW_DRAFTS && p.status === "draft" && (
                                            <span className="ml-2 rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-900">
                                                draft · {p.needsFromTom.length} open
                                            </span>
                                        )}
                                        <p className="text-sm text-foreground/70">
                                            {p.description}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    );
                })}
            </div>
        </main>
    );
}
