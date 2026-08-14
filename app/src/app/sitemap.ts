/**
 * Next.js App Router generates /sitemap.xml from this file.
 * Before this existed, eastcoastutility.com/sitemap.xml returned a 404 page,
 * which meant search engines discovered pages only by crawling links — and the
 * site has zero internal links, so there was nothing to follow.
 *
 * Written to scale: as Resource Hub pages land in Phase 2, add them to
 * RESOURCE_PAGES (or generate the list from the content source) and the
 * sitemap keeps itself current.
 */
import type { MetadataRoute } from 'next'
import { BUSINESS } from '@/lib/business'

/**
 * Phase 2 pages get appended here. Keeping it an explicit list for now — once
 * the Resource Hub has a content source, replace this with a directory read or
 * CMS query so nobody has to remember to update it.
 */
const RESOURCE_PAGES: Array<{ path: string; priority: number }> = [
    // { path: '/resources/njdot-road-opening-permit', priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    return [
        {
            url: BUSINESS.site,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 1,
        },
        ...RESOURCE_PAGES.map(({ path, priority }) => ({
            url: `${BUSINESS.site}${path}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority,
        })),
    ]
}
