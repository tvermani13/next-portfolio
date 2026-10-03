# Tejas Vermani — Portfolio

A personal portfolio built with Next.js, TypeScript, and Tailwind CSS. The site is
project-first, responsive, and prepared for live music and Google Health cards.

Feature catalog: [`FEATURES.md`](FEATURES.md). Runbook (deploy, OAuth tokens, git-vs-production state): [`RUNBOOK.md`](RUNBOOK.md).

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

## Project showcase

Project summaries live in `src/content/config/projects.ts`; case-study narratives
and evidence live in `src/content/projects/`. Source availability is explicit and
does not determine whether a project can have a case study. Published detail
pages are generated only for records that pass the completeness and evidence
filter in `src/lib/projects.ts`.

The portfolio keeps Hearthline first and featured, followed by TokenSmith Query
Decomposition. Hearthline retains its synthetic demo. TokenSmith links to a
limited public planner/evaluation snapshot; it does not imply that the separate
backend is included. Numerical claims must have an evidence reference and
publish their methodology and limits.

Before publishing any project, confirm the problem, personal contribution,
implementation description, evidence, and disclosure rights. Review images and
diagrams before adding them. Because this repository is public, even records
marked unpublished and all committed assets must already be safe for public
disclosure. Do not add private source, real private data, credentials,
infrastructure identifiers, or unpublished project details here. Keep private
project detail routes unpublished until their case studies are complete.

Concise private-project cards have a separate readiness gate. Smart Vault, Life
Orchestrator, Kinscape, Home LLM, and the inactive Prediction Arb Bot appear on
the homepage and `/projects` with documentation-backed scope, a narrow
contributor role, potential value, a private-source disclosure, and a walkthrough
email link. These cards expose no project source links, media, live integrations,
or measured outcomes. Liquidity Optimizer remains withheld pending scope
confirmation. Publishing a card does not enable a full case-study route.

Every detail page provides a project-specific technical-walkthrough email link.
The contact section also has a general walkthrough request. These are `mailto:`
links; the site does not store requests or make private backend calls.

See [`SHOWCASE-HANDOFF.md`](SHOWCASE-HANDOFF.md) for the implementation review
and remaining content confirmations. `REDESIGN.md` is historical design
material; follow the active styles in `src/app/globals.css` for new work.

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
