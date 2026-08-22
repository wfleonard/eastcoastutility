# East Coast Utility, LLC — Marketing Site

Marketing site for **East Coast Utility, LLC** (Tom Colleran, Fair Haven NJ) — a horizontal directional drilling (HDD) and utility construction contractor.

Built as a Next.js 16 (App Router) + TypeScript + Tailwind 4 single-page marketing site with one `/api/contact` route that emails inbound leads to Tom via the Mailtrap API. No database — replaces the previous PHP + MySQL site under `../website2024/`.

## Local development

```bash
cd app
npm install
npm run dev          # http://localhost:3000
```

## Docker

```bash
cp .env.example .env # then fill in MAILTRAP_API_TOKEN
docker compose up --build -d
```

The site will be available on `http://localhost:3000`.

## Project layout

```
.
├── .env / .env.example
├── docker-compose.yml          # one service: nextjs-app
└── app/
    ├── Dockerfile               # Node 20-alpine
    ├── package.json
    ├── next.config.ts
    ├── public/
    │   └── llms.txt             # plain-language summary for AI crawlers
    └── src/
        ├── app/
        │   ├── layout.tsx       # root layout + GA + JSON-LD
        │   ├── page.tsx         # landing page
        │   ├── globals.css
        │   ├── robots.ts        # generates /robots.txt
        │   ├── sitemap.ts       # generates /sitemap.xml
        │   └── api/contact/route.ts
        ├── components/          # ContactModal, PartnerCard, JsonLd, Header, Modal
        └── lib/
            ├── business.ts      # canonical NAP — see below
            └── mail.ts          # Mailtrap client wrapper
```

## Entity consistency and AI search

`app/src/lib/business.ts` holds the canonical business facts — legal name,
address, phone. **It is the single source of truth.** `layout.tsx`, `page.tsx`,
`JsonLd.tsx`, `robots.ts` and `sitemap.ts` all read from it, so the footer, the
structured data and the page copy cannot drift apart.

Change a business fact there and **nowhere else in this repo**. It must also
match, character for character, the Google Business Profile, Bing Places, The
Blue Book, and every directory listing. An assistant that sees "East Coast
Utility, LLC" in one place and "East Coast Utility, Inc" in another has to guess
whether those are one company or two, and that guess has to land before it will
recommend the business by name.

| File | Purpose |
|---|---|
| `src/components/JsonLd.tsx` | JSON-LD graph — `GeneralContractor`, `Service`, `OfferCatalog`, `Person`, `PostalAddress` |
| `src/app/robots.ts` | Generates `/robots.txt`, which previously 404'd. Explicitly allows AI **retrieval** bots — OAI-SearchBot, PerplexityBot, Claude-SearchBot — since blocking those makes the site uncitable |
| `src/app/sitemap.ts` | Generates `/sitemap.xml` |
| `public/llms.txt` | Plain-language summary of the business and services for AI crawlers |

Read the header comment in `robots.ts` before editing it. The distinction it
draws between retrieval bots and training bots is the part that matters.

## Email transport

Contact-form submissions are emailed to `tom@eastcoastutility.com` via the [Mailtrap Send API](https://send.api.mailtrap.io/api/send). Configure with `MAILTRAP_API_TOKEN` in `.env`.
