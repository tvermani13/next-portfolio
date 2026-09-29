# Tejas Vermani — Portfolio

A personal portfolio built with Next.js, TypeScript, and Tailwind CSS. The site is
project-first, responsive, and prepared for live music and Google Health cards.

Feature catalog: [`FEATURES.md`](FEATURES.md). Runbook (deploy, OAuth tokens, git-vs-production state): [`RUNBOOK.md`](RUNBOOK.md). Workspace architecture: [`../ECOSYSTEM.md`](../ECOSYSTEM.md).

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

The public work section only includes projects with a public source link or live
demo. Private projects stay off the public cards until a read-only demo is ready.

## Activity integrations

- Strava shows the latest activity via OAuth (`activity:read_all`); run
  `npm run strava:auth` to mint `STRAVA_REFRESH_TOKEN`. Access tokens last six
  hours and are refreshed at build time.
- Google Health (Fitbit data) uses Google OAuth 2.0 with the
  `googlehealth.activity_and_fitness.readonly` scope for recent exercises,
  steps, and current-month workout distance; `npm run health:auth` mints the
  refresh token.
- Last.fm (Apple Music scrobbles via `user.getRecentTracks`) is paused. The
  code remains, and its env vars are commented out in `.env.example`.
- The site is a static export, so activity data is fetched when the site is
  built; `revalidate` has no effect. The privacy policy for these integrations
  is at `/privacy`.
