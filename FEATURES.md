# next-portfolio — Feature Catalog

Last reviewed: 2026-09-28

README: [`README.md`](README.md). Runbook: [`RUNBOOK.md`](RUNBOOK.md). Redesign
spec: [`REDESIGN.md`](REDESIGN.md). Ecosystem: [`../ECOSYSTEM.md`](../ECOSYSTEM.md).

> **This branch holds the code that is live in production.**
> `https://tejasvermani.com/portfolio` was built on 2026-09-04 02:51 UTC by the
> Vercel CLI from the local working tree, which had never been committed. The
> branch `sync/live-site-2026-09-04` (PR #2) preserves that code: the privacy
> page, Strava feed, and two-project list below.
>
> Merging PR #2 redeploys production from git through the Vercel Git
> integration. Production env vars (`STRAVA_*`, `GOOGLE_HEALTH_*`,
> `NEXT_PUBLIC_*`) are already present in Vercel, so no secrets need to be
> added. Until the PR is merged, `main` is older than production. See
> [`RUNBOOK.md`](RUNBOOK.md) for the post-merge checks.

## Purpose

Public personal portfolio for Tejas Vermani. It's a project-first Next.js
static export with experience, skills, and AI-tools sections, plus an activity
"Pulse" that fails closed to a quiet empty state. It shows only projects with a
public source link. Not registered in Life Orchestrator.

## Sections

| Section | On homepage | Notes |
| --- | --- | --- |
| Hero | Yes | Identity + intro. |
| Projects | Yes | Live list: **Hearthline** (GitHub + `https://real-estate-simulator-self.vercel.app/demo`) and **TokenSmith Query Decomposition** (GitHub). The pre-PR `main` also listed Smart Vault, Life Orchestrator, and Kinscape without links; PR #2 removes them and makes `links.github` required. |
| Experience / About / Skills / AITools | Yes | Content config. |
| Pulse | Yes | Live: Strava latest activity + Google Health (Fitbit) steps and exercise. Last.fm is paused (code kept, env commented out). Data is fetched **at build time**, because static export ignores `revalidate = 900`, so Pulse only changes on a rebuild. |
| Contact | Yes | mailto + socials. |
| Timeline | Component exists | Not mounted. |
| `/privacy` | Separate page (live; committed in PR #2) | Privacy policy covering Strava and Google Health data, for OAuth app review. In the sitemap. |

Also: skip link, header/footer, sitemap, robots, and base-path-aware links for
`/portfolio`. Geist fonts were dropped in PR #2 (system font stacks keep the
static export self-contained).

## Data and auth

No durable store and no site login. Build-time server env:
`STRAVA_CLIENT_ID|CLIENT_SECRET|REFRESH_TOKEN`,
`GOOGLE_HEALTH_CLIENT_ID|CLIENT_SECRET|REFRESH_TOKEN`, and optionally
`LASTFM_USERNAME|API_KEY`. Public: `NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_BASE_PATH`. OAuth helpers: `npm run strava:auth`,
`npm run health:auth` (scripts in `scripts/`; they read credentials from env or
`.env.local`, which is git-ignored).

## Hosting

- **Vercel** (project linked in `.vercel/`) serves `tejasvermani.com`;
  `vercel.json` redirects `/` → `/portfolio`. The project is Git-integrated:
  pushes to `main` deploy to production, and pushes to other branches create
  preview deployments only.
- The GitHub Pages workflow (`.github/workflows/deploy-github-pages.yml`)
  failed on every push because Pages isn't enabled on the repo. It is removed
  in PR #2; Vercel is the only host.
- Public GitHub repo `tvermani13/next-portfolio`. `tvermani13/portfolio` is the
  archived predecessor.

## Gaps

- Until PR #2 is merged, git is behind production (see the note at the top).
- `output/` and `tmp/` (resume PDF render scratch) are git-ignored as of
  PR #2 and excluded from Vercel via `.vercelignore`.
- Pulse freshness depends on rebuilds; nothing rebuilds on a schedule.
- `REDESIGN.md` ("Quiet Precision") is a spec, not a maintained design system.
