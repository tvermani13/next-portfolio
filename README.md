# Tejas Vermani — Portfolio

A personal portfolio built with Next.js, TypeScript, and Tailwind CSS. The site is
project-first, responsive, and prepared for live music and Google Health cards.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Subpath deployment

The live site is published at `https://tejasvermani.com/portfolio`. Configure the
build with:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio
NEXT_PUBLIC_SITE_URL=https://tejasvermani.com/portfolio
```

Public assets and metadata URLs are resolved through the configured base path.

`vercel.json` redirects `/` to `/portfolio` so `https://tejasvermani.com` reaches
the site without removing the existing `/portfolio` URL.

Activity credentials are server-only and must never be prefixed with
`NEXT_PUBLIC_` or committed. If a provider is unavailable, the cards fail closed
to a quiet empty state.

## Activity integrations

- Apple Music listening is surfaced through Last.fm scrobbles using the public
  `user.getRecentTracks` endpoint and a server-side API key (`LASTFM_USERNAME`,
  `LASTFM_API_KEY`).
- Google Health uses Google OAuth 2.0 with the
  `googlehealth.activity_and_fitness.readonly` scope to retrieve recent exercises and
  current-month workout distance.
