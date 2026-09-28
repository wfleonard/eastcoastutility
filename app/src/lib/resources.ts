/**
 * Resource Hub content — one entry per question page under /resources/.
 *
 * The page shape is fixed on purpose (see SaxonAEO first-eight-pages.md):
 *   - `question` is the H1, close to verbatim what a buyer asks an assistant.
 *   - `slug` is that question in kebab-case.
 *   - `answer` is the first two or three sentences, and it answers directly.
 *     That paragraph is the block an assistant lifts, so no preamble.
 *   - Every page needs at least one thing only ECU can say. Those come from
 *     Tom's interview and are tracked in `needsFromTom`.
 *
 * DRAFTS DO NOT SHIP. A page with status 'draft' returns 404 in production and
 * is left out of the sitemap and the hub index. It renders only under
 * `next dev`, with the open interview items shown in a banner. Generic HDD
 * content with no ECU experience in it puts the site in a fight with national
 * content farms that it has no reason to win, so a page is published only
 * once `needsFromTom` is empty (enforced by assertPublishable below).
 */
import { PAGES } from './resources-content'

export type Block =
    | { type: 'p'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'ol'; items: string[] }
    | { type: 'table'; head: string[]; rows: string[][] }
    /** Placeholder for interview material. Rendered only in dev. */
    | { type: 'tom'; prompt: string }

export type Section = { heading: string; blocks: Block[] }

export type Source = { label: string; url: string }

export type ResourcePage = {
    slug: string
    question: string
    /** Meta description — one sentence, the answer in brief. */
    description: string
    status: 'draft' | 'published'
    /** ISO dates. Set datePublished when status flips to 'published'. */
    datePublished?: string
    dateModified?: string
    /** Lead paragraph(s): the direct answer. */
    answer: string[]
    sections: Section[]
    /** Open interview items. Must be empty before publishing. */
    needsFromTom: string[]
    /** Official sources for the public facts on the page. */
    sources: Source[]
    /** Topic group, for the hub index. */
    group: 'Permits' | 'Cost'
}


function assertPublishable(page: ResourcePage): void {
    if (page.status !== 'published') return
    const tomBlocks = page.sections.flatMap((s) =>
        s.blocks.filter((b) => b.type === 'tom'),
    )
    if (page.needsFromTom.length > 0 || tomBlocks.length > 0) {
        throw new Error(
            `Resource page "${page.slug}" is marked published but still has open interview items.`,
        )
    }
    if (!page.datePublished) {
        throw new Error(`Resource page "${page.slug}" is published without a datePublished.`)
    }
}

PAGES.forEach(assertPublishable)

/** Drafts are visible only under `next dev`. */
export const SHOW_DRAFTS = process.env.NODE_ENV === 'development'

export function visiblePages(): ResourcePage[] {
    return PAGES.filter((p) => p.status === 'published' || SHOW_DRAFTS)
}

export function publishedPages(): ResourcePage[] {
    return PAGES.filter((p) => p.status === 'published')
}

export function findPage(slug: string): ResourcePage | undefined {
    return visiblePages().find((p) => p.slug === slug)
}

export const ALL_PAGES = PAGES
