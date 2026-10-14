/**
 * Next.js App Router generates /sitemap.xml from this file.
 * Before this existed, eastcoastutility.com/sitemap.xml returned a 404 page,
 * which meant search engines discovered pages only by crawling links — and the
 * site has zero internal links, so there was nothing to follow.
 *
 * Resource Hub pages come from lib/resources.ts. Only published pages are
 * listed; drafts 404 in production and must not be advertised here.
 *
 * lastModified must be a real content date, never the request time. IndexNow
 * resubmits any URL whose <lastmod> changes, so a `new Date()` here made every
 * daily run resubmit the homepage. Bump HOME_UPDATED when the homepage changes.
 */
import type { MetadataRoute } from 'next'
import { BUSINESS } from '@/lib/business'
import { publishedPages } from '@/lib/resources'

const HOME_UPDATED = '2026-09-28'

export default function sitemap(): MetadataRoute.Sitemap {
    const pages = publishedPages()
    const pageDate = (p: (typeof pages)[number]) => p.dateModified ?? p.datePublished!
    const resourcesUpdated = pages.map(pageDate).sort().at(-1)

    return [
        {
            url: BUSINESS.site,
            lastModified: new Date(HOME_UPDATED),
            changeFrequency: 'monthly',
            priority: 1,
        },
        ...(pages.length > 0
            ? [
                  {
                      url: `${BUSINESS.site}/resources`,
                      lastModified: new Date(resourcesUpdated!),
                      changeFrequency: 'weekly' as const,
                      priority: 0.7,
                  },
              ]
            : []),
        ...pages.map((p) => ({
            url: `${BUSINESS.site}/resources/${p.slug}`,
            lastModified: new Date(pageDate(p)),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
    ]
}
