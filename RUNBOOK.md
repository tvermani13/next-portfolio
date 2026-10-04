# Portfolio site runbook

Last reviewed: 2026-10-04

## Current state

| Item | Value |
| --- | --- |
| Public URL in repository documentation | `https://tejasvermani.com/portfolio` |
| Local branch at implementation start | `main` |
| Showcase publication | Owner authorized commit and merge on 2026-10-03 |
| Rendering | Next.js static export (`output: "export"`) |
| Case-study routes | Generated from complete records marked `publishable` |
| Concise private-project cards | Separate evidence/readiness gate; no private-source link or live integration |
| Production baseline before showcase merge | `ae4f1a5`; Vercel reported Ready on 2026-10-03 |
| Publishing branch and host | Public repository `main`; Vercel Git integration |

Use a pull request into `main` for an authorized production update. Branch
pushes can create Vercel preview deployments, and merging can publish to the
production aliases. The October 3 request authorizes publishing this showcase.
Do not run `vercel --prod` as part of local validation.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. For the portfolio subpath, configure both public
values:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio
NEXT_PUBLIC_SITE_URL=https://tejasvermani.com/portfolio
```

Internal links and local media use `withBasePath()` from `src/lib/paths.ts`.
Metadata and sitemap URLs use `NEXT_PUBLIC_SITE_URL`.

## Credential-free validation

The Pulse integrations can refresh activity tokens during a build. Set every
provider credential to an empty value for lint/build validation so `.env.local`
cannot supply live credentials to the process. Do not print, copy, or commit
credential values.

Run the static checks:

```bash
npm run lint
npx tsc --noEmit --incremental false
```

Build with an empty base path:

```bash
env STRAVA_CLIENT_ID= STRAVA_CLIENT_SECRET= STRAVA_REFRESH_TOKEN= \
  GOOGLE_HEALTH_CLIENT_ID= GOOGLE_HEALTH_CLIENT_SECRET= GOOGLE_HEALTH_REFRESH_TOKEN= \
  LASTFM_USERNAME= LASTFM_API_KEY= NEXT_PUBLIC_BASE_PATH= \
  NEXT_PUBLIC_SITE_URL=https://tejasvermani.com npm run build
```

Build with the production-shaped subpath URLs:

```bash
env STRAVA_CLIENT_ID= STRAVA_CLIENT_SECRET= STRAVA_REFRESH_TOKEN= \
  GOOGLE_HEALTH_CLIENT_ID= GOOGLE_HEALTH_CLIENT_SECRET= GOOGLE_HEALTH_REFRESH_TOKEN= \
  LASTFM_USERNAME= LASTFM_API_KEY= NEXT_PUBLIC_BASE_PATH=/portfolio \
  NEXT_PUBLIC_SITE_URL=https://tejasvermani.com/portfolio npm run build
```

After each build, inspect the generated `out/` tree:

- `/projects`, eligible overview cards, and only publishable project details
  are present.
- Withheld drafts are absent. Detail routes and detail sitemap entries share
  the complete-case-study filter; overview cards have a separate filter.
- Internal links, canonical URLs, Open Graph URLs, and asset paths include the
  configured base path exactly once.
- The TokenSmith evaluation shows judge score, recall, latency, and its method
  limits together.
- Unknown slugs do not have generated pages.
- No private project data, credentials, or internal identifiers appear in the
  generated HTML, scripts, or assets.

Review `git status --short` and the full diff after validation. Preserve any
pre-existing changes. The output directory is generated; do not commit it.

## Content publication review

Before marking a record `publishable` in `src/content/config/projects.ts`:

1. Confirm the problem, intended audience, personal contribution, implementation
   description, project status, and disclosure rights.
2. Confirm every claim against public URLs or safe, dated owner confirmation.
3. Include source visibility and label a limited repository snapshot accurately.
   Do not call a public repository “open source” unless its license is verified.
4. Review every screenshot, diagram, caption, alt text, filename, and asset
   metadata. Use synthetic or approved public material only.
5. Read the generated page and inspect the complete diff before any publication.

The `publication` field is a route filter, not a confidentiality boundary. The
repository is public, so even unpublished content committed here is public.
Unconfirmed or incomplete case studies stay out of the index, routes, and
sitemap.

For a concise card, use `showcase.publication` and the card eligibility gate.
Its documented scope, contribution, role evidence, and potential value must be
safe for public disclosure; source must be private, with no source URL, demo, or
media. Do not mark the full project case study publishable merely to show a
card. Check the rendered card and all committed metadata, including withheld
drafts, before publishing. Readiness checks do not verify the truth of future
claims.

## Activity integrations

- `npm run strava:auth` and `npm run health:auth` write refresh tokens to the
  ignored `.env.local` file. Use only when intentionally refreshing credentials.
- Keep activity credentials server-side; never use a `NEXT_PUBLIC_` prefix.
- Last.fm is paused. Do not re-enable it without a separate product decision.
- Static export fetches activity data at build time; it does not refresh on a
  timer. The privacy policy is at `/privacy`.

## Publication checks

1. Run the required local checks with activity credentials blanked. Webpack is
   an available local build path when sandbox restrictions prevent Turbopack's
   CSS worker from binding a port (`next build --webpack`).
2. Review the full staged diff and scan committed files and generated output
   for disclosures. Keep `.env*`, private keys, `.vercel/`, `out/`, and local
   screenshot/validation scratch out of the commit.
3. Push a showcase branch, open a pull request, and check its Vercel preview and
   any required checks. Merge the reviewed commit into `main`.
4. Confirm the production deployment is Ready for the merge commit and that
   `/portfolio`, `/portfolio/projects`, and the TokenSmith detail return 200.
5. Confirm the five private cards, walkthrough links, original Selected Work
   order, and absence of a separate Liquidity Optimizer card on the live homepage
   and index; liquidity planning belongs to Smart Vault.
   Verify `/portfolio` asset/canonical prefixes and private-detail sitemap
   exclusion. Do not describe a pending deployment as live.
