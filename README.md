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

To publish the site at `https://tejasvermani.com/portfolio`, configure the build with:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio
NEXT_PUBLIC_SITE_URL=https://tejasvermani.com/portfolio
```

Public assets and metadata URLs are resolved through the configured base path.

The portfolio works without external credentials. In that state, the activity cards
show polished preview content. All integration credentials are server-only and must
never be prefixed with `NEXT_PUBLIC_` or committed.

## Activity integrations

- Apple Music listening is surfaced through Last.fm scrobbles using the public
  `user.getRecentTracks` endpoint and a server-side API key.
- Google Health uses Google OAuth 2.0 with the
  `googlehealth.activity_and_fitness.readonly` scope to retrieve recent exercises and
  current-month workout distance.
- Both integrations fail closed to preview content if a provider is unavailable.

We will connect provider authorization, hosting, Route 53, and `tejasvermani.com`
together during the deployment session.
