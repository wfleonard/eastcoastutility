/**
 * Canonical business facts — the single source of truth for name, address and
 * phone (NAP). The footer, the JSON-LD graph and the page copy all read from
 * here so they cannot drift apart again.
 *
 * Inconsistency across sources is the most common thing that breaks entity
 * resolution: an assistant that sees "East Coast Utility, LLC" in the title and
 * "East Coast Utility, Inc" in the footer has to guess whether those are one
 * company or two, and that guess has to succeed before it will recommend a
 * contractor by name.
 *
 * Whatever is in `legalName` below must also match, character for character,
 * the Google Business Profile, Bing Places, The Blue Book, and every directory
 * or association listing.
 *
 * NOTE ON THE POSTAL CODE: the site previously published "Fair Haven, NJ 07724".
 * 07724 is Eatontown; Fair Haven is 07704. Corrected to 07704 and confirmed
 * with the owner on 2026-08-14. Do not "restore" the old value.
 *
 * NO STREET ADDRESS is published, by decision. `PostalAddress` is valid without
 * one. Do not fill in an approximate street — a wrong address is worse than no
 * address, for the same entity-resolution reason as the name.
 */

export const BUSINESS = {
    legalName: 'East Coast Utility, LLC',
    shortName: 'ECU',
    founder: 'Thomas Colleran',
    founderShortName: 'Tom Colleran',
    foundingYear: '2008',
    email: 'tom@eastcoastutility.com',
    /** E.164, for tel: links and schema. */
    phone: '+19089026728',
    /** Human-readable, for display. */
    phoneDisplay: '+1 908-902-6728',
    locality: 'Fair Haven',
    region: 'NJ',
    postalCode: '07704',
    country: 'US',
    site: 'https://eastcoastutility.com',
    /** Full state names — schema.org `State` entries and page copy. */
    areasServed: [
        'New Jersey',
        'New York',
        'Pennsylvania',
        'Delaware',
        'Maryland',
    ],
} as const

/** "Fair Haven, NJ 07704" — used in the footer and anywhere the location prints. */
export const LOCATION_LINE = `${BUSINESS.locality}, ${BUSINESS.region} ${BUSINESS.postalCode}`
