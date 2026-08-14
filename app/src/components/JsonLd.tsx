/**
 * Rendered once, site-wide, from app/layout.tsx.
 *
 * This is the single highest-value Phase 0 item. eastcoastutility.com
 * previously published ZERO structured data, which meant every AI assistant and
 * search engine was inferring what this company is from 614 words of prose.
 *
 * The @graph form below is deliberate. Rather than emitting three disconnected
 * objects, it declares one organisation entity with a stable @id that the
 * website, the founder, and every service reference back to. That is how a
 * machine resolves "East Coast Utility" into a single thing with a service
 * area, a founding date and an owner — which is precisely the resolution step
 * that has to succeed before an assistant will recommend a contractor by name.
 *
 * Every name/phone/location value comes from @/lib/business so this file cannot
 * drift out of sync with the footer. Change facts there, not here.
 *
 * NO STREET ADDRESS is published, by decision. `PostalAddress` is valid with
 * locality and region alone, and `areaServed` carries the geography. Do not
 * fill in an approximate street — a wrong address is worse than none, because
 * inconsistency across sources is what breaks entity resolution.
 *
 * SAME_AS is empty by design; it gets filled as directory, association and
 * Google Business Profile listings are claimed. Each one is a corroborating
 * signal that this is a real company.
 */
import { BUSINESS } from '@/lib/business'

const SITE = BUSINESS.site
const ORG_ID = `${SITE}/#organization`

/** TODO: add as listings are claimed — GBP, LinkedIn, The Blue Book, associations. */
const SAME_AS: string[] = [
    // 'https://www.linkedin.com/company/...',
    // 'https://www.thebluebook.com/...',
]

const SERVICES = [
    {
        name: 'Horizontal Directional Drilling',
        description:
            'Trenchless installation of utility conduit and pipe using horizontal directional drilling, including pilot hole drilling, reaming, and pullback.',
    },
    {
        name: 'Trenchless Utility Installation',
        description:
            'Underground installation of water, gas, sewer, electric, and telecommunications lines without open excavation.',
    },
    {
        name: 'Road and Highway Crossings',
        description:
            'Utility crossings beneath state and municipal roadways, including permit coordination with NJDOT, PennDOT, and state transportation authorities.',
    },
    {
        name: 'Fiber Optic and Telecommunications Conduit',
        description:
            'Directional boring for fiber optic conduit, including campus, municipal, and federal installations.',
    },
    {
        name: 'Water and Sewer Main Installation',
        description:
            'Trenchless installation and replacement of water mains, sewer lines, and service laterals.',
    },
]

const areaServed = BUSINESS.areasServed.map((name) => ({
    '@type': 'State',
    name,
}))

export default function JsonLd() {
    const graph: Record<string, unknown>[] = [
        {
            '@type': 'GeneralContractor',
            '@id': ORG_ID,
            name: BUSINESS.legalName,
            legalName: BUSINESS.legalName,
            alternateName: BUSINESS.shortName,
            url: SITE,
            description:
                'New Jersey-based horizontal directional drilling and underground utility construction contractor serving New Jersey, New York, Pennsylvania, Delaware, and Maryland. Founded 2008.',
            foundingDate: BUSINESS.foundingYear,
            email: BUSINESS.email,
            telephone: BUSINESS.phoneDisplay,
            image: `${SITE}/images/east-coast-utility-logo.png`,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE}/images/east-coast-utility-logo.png`,
            },
            founder: { '@id': `${SITE}/#tom-colleran` },
            // City and state only — no street address is published. See note above.
            address: {
                '@type': 'PostalAddress',
                addressLocality: BUSINESS.locality,
                addressRegion: BUSINESS.region,
                postalCode: BUSINESS.postalCode,
                addressCountry: BUSINESS.country,
            },
            areaServed,
            knowsAbout: [
                'Horizontal directional drilling',
                'Trenchless technology',
                'Underground utility construction',
                'Pilot hole drilling and reaming',
                'Gas main installation',
                'Water main installation',
                'Fiber optic conduit installation',
                'NJDOT road opening permits',
                'Railroad utility crossings',
            ],
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Horizontal Directional Drilling Services',
                itemListElement: SERVICES.map((s) => ({
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: s.name,
                        description: s.description,
                        provider: { '@id': ORG_ID },
                        areaServed,
                    },
                })),
            },
            ...(SAME_AS.length > 0 && { sameAs: SAME_AS }),
        },
        {
            '@type': 'Person',
            '@id': `${SITE}/#tom-colleran`,
            name: BUSINESS.founder,
            alternateName: BUSINESS.founderShortName,
            jobTitle: 'Owner',
            worksFor: { '@id': ORG_ID },
        },
        {
            '@type': 'WebSite',
            '@id': `${SITE}/#website`,
            url: SITE,
            name: BUSINESS.legalName,
            publisher: { '@id': ORG_ID },
            inLanguage: 'en-US',
        },
    ]

    return (
        <script
            type="application/ld+json"
            // Content is a compile-time constant, not user input.
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@graph': graph,
                }),
            }}
        />
    )
}
