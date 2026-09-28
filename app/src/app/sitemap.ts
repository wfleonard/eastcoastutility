/**
 * Next.js App Router generates /sitemap.xml from this file.
 * Before this existed, eastcoastutility.com/sitemap.xml returned a 404 page,
 * which meant search engines discovered pages only by crawling links — and the
 * site has zero internal links, so there was nothing to follow.
 *
 * Resource Hub pages come from lib/resources.ts. Only published pages are
 * listed; drafts 404 in production and must not be advertised here.
 */
import type { MetadataRoute } from 'next'
import { BUSINESS } from '@/lib/business'
import { publishedPages } from '@/lib/resources'

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()
    const pages = publishedPages()

    return [
        {
            url: BUSINESS.site,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 1,
        },
        ...(pages.length > 0
            ? [
                  {
                      url: `${BUSINESS.site}/resources`,
                      lastModified: now,
                      changeFrequency: 'weekly' as const,
                      priority: 0.7,
                  },
              ]
            : []),
        ...pages.map((p) => ({
            url: `${BUSINESS.site}/resources/${p.slug}`,
            lastModified: p.dateModified ? new Date(p.dateModified) : now,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
    ]
}
