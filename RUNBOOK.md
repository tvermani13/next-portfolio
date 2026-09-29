# Portfolio site runbook

Last reviewed: 2026-09-28

## Current state

| Item | Value |
| --- | --- |
| Live URL | `https://tejasvermani.com/portfolio` (`/` → 307 → `/portfolio`) |
| Host | Vercel (linked project in `.vercel/`, Git-integrated) |
| Last production build | 2026-09-04 02:51 UTC, by the Vercel CLI from an **uncommitted** local working tree |
| Code that is live | Branch `sync/live-site-2026-09-04` (PR #<n>) |
| `main` on GitHub | `24d5998` (2026-08-30), older than production until PR #<n> is merged |

## Merging the sync PR (git catches up to production)

PR #<n> holds the code that is live in production. Nothing else needs to be
committed first.

- Merging PR #<n> into `main` redeploys production from git through the Vercel
  Git integration. Do not push to `main` directly, and do not run
  `vercel --prod`.
- Production env vars (`STRAVA_*`, `GOOGLE_HEALTH_*`, `NEXT_PUBLIC_*`) are
  already present in Vercel, so no secrets need to be added for the redeploy.
- The GitHub Pages workflow (`.github/workflows/deploy-github-pages.yml`) is
  removed in this PR, so there is no failing Pages run on merge.
- The branch also gets a Vercel preview deployment (preview only, not
  production).

### Post-merge checks

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://tejasvermani.com/portfolio          # 200
curl -s -o /dev/null -w '%{http_code}\n' https://tejasvermani.com/portfolio/privacy  # 200
curl -s https://tejasvermani.com/portfolio/sitemap.xml | head                        # lastmod shows the new build
```

- `/portfolio` and `/portfolio/privacy` must both return 200.
- The sitemap `lastmod` must show the new build time (later than 2026-09-04).
- Open the Pulse section and confirm the Strava and Fitbit cards are populated,
  not the empty "Idle" state.

## Local development

```bash
npm install
cp .env.example .env.local        # fill Strava / Google Health values to see a live Pulse
npm run dev                       # http://localhost:3000
npm run lint && npm run build     # static export to out/
```

To test the production subpath locally, run
`NEXT_PUBLIC_BASE_PATH=/portfolio NEXT_PUBLIC_SITE_URL=https://tejasvermani.com/portfolio npm run build`.

A local build with real activity credentials calls Strava and Google. Blank the
`STRAVA_*` and `GOOGLE_HEALTH_*` variables to build with an empty Pulse, which
avoids refreshing tokens that production also uses.

## OAuth refresh tokens

```bash
npm run strava:auth      # scripts/strava-oauth.mjs → writes STRAVA_REFRESH_TOKEN to .env.local
npm run health:auth      # scripts/google-health-oauth.mjs → writes GOOGLE_HEALTH_REFRESH_TOKEN to .env.local
```

Store the values as Vercel environment variables (Production), never with a
`NEXT_PUBLIC_` prefix. `.env.local` is git-ignored; never commit it.

## Deploy

Production deploys come from git, through the Vercel Git integration:

- Merge a PR into `main` to deploy to production.
- Push any other branch to get a preview deployment only.

After a production deploy, run the post-merge checks above. Pulse data is
fetched at build time, so the cards refresh only when the site rebuilds. For
fresher data, add a scheduled Vercel deploy hook or cron.
