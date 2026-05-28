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
cp .env.example .env # then fill in MAILTRAP_TOKEN
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
    └── src/
        ├── app/
        │   ├── layout.tsx       # root layout + GA
        │   ├── page.tsx         # landing page
        │   ├── globals.css
        │   └── api/contact/route.ts
        ├── components/          # ContactModal, PartnerCard, etc.
        └── lib/
            └── mail.ts          # Mailtrap client wrapper
```

## Email transport

Contact-form submissions are emailed to `tom@eastcoastutility.com` via the [Mailtrap Send API](https://send.api.mailtrap.io/api/send). Configure with `MAILTRAP_TOKEN` in `.env`.
