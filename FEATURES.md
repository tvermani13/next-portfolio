# next-portfolio — Feature Catalog

Last reviewed: 2026-10-03

README: [`README.md`](README.md). Runbook: [`RUNBOOK.md`](RUNBOOK.md).
Implementation handoff: [`SHOWCASE-HANDOFF.md`](SHOWCASE-HANDOFF.md).
`REDESIGN.md` is historical design material, not the active design system.

## Purpose and rendering

Personal portfolio built with Next.js App Router, TypeScript, React, and
Tailwind CSS. `next.config.ts` enables static export. Routes and case-study
content render at build time; no project page calls a project backend.

## Pages and sections

| Route or section | Behavior |
| --- | --- |
| `/` | Hero, Selected Work, Experience, About, Skills, AI Tools, Pulse, and Contact, in that order. |
| `/projects` | Complete, publishable case studies and eligible concise private-project cards. |
| `/projects/[slug]` | Static detail routes generated only for complete, publishable records. Unknown or unpublished slugs are excluded. |
| `/privacy` | Privacy policy for activity integrations. |
| `/sitemap.xml`, `/robots.txt` | Generated metadata routes; the sitemap includes the index and published detail pages. |

Selected Work order remains Hearthline, then TokenSmith Query Decomposition.
Hearthline remains featured and retains its synthetic demo. Project source links
are optional and use explicit availability labels. TokenSmith's source action
is labeled as a limited public planner/evaluation snapshot.

## Case-study content and publication

- Project metadata: `src/content/config/projects.ts`.
- Shared content types: `src/content/projects/types.ts`.
- Case-study narratives: `src/content/projects/caseStudies.ts`.
- Curated private-project cards: `src/content/projects/privateProjects.ts`.
- Publication filter and lookup functions: `src/lib/projects.ts`.
- Shared cards, status labels, case-study sections, evidence, and email CTAs:
  `src/components/projects/`.

A detail page is generated only when publication is explicitly enabled and the
problem, audience, contribution, implementation, decisions, limitations,
lessons, evidence references, and disclosure are complete. Numerical claims
require linked evidence. An empty evaluation array renders “Evaluation details
are not published.” Missing screenshots are stated plainly; reviewed diagrams
can provide the visual overview. An unavailable video is labeled without a fake
player. Each published page has unique title, description, canonical, and Open
Graph URL metadata, plus a project-specific `mailto:` walkthrough CTA.

Five concise private-project cards appear after Selected Work and on the index:
Smart Vault, Life Orchestrator, Kinscape, Home LLM, and Prediction Arb Bot. A
separate showcase gate requires complete copy, dated scope and role evidence,
private-source metadata, and no demo, source link, or media. The cards qualify
potential value and do not report adoption, production status, returns, or
measured impact. Prediction Arb Bot is labeled inactive. Liquidity Optimizer is
withheld. Only TokenSmith currently has a generated detail route.

Unpublished records are not confidentiality controls. Keep all repository
content and assets safe to publish because the portfolio repository is public.
Never add project source, private data, credentials, internal infrastructure
identifiers, or unreviewed media.

## Activity integrations

- **Strava:** latest activity through OAuth; data is fetched during the build.
- **Google Health / Fitbit:** recent exercise, steps, and monthly distance;
  data is fetched during the build.
- **Last.fm:** paused; code remains, environment variables are commented out.
- The Pulse section fails closed when provider data is unavailable. Static
  export does not provide scheduled refreshing; `revalidate` does not refresh
  the exported site.

## Hosting and known limits

Vercel Git integration publishes the public `main` branch at
`https://tejasvermani.com/portfolio`; other branches receive preview deployments.
The existing production deployment and publishing branch were checked on
October 3 before the authorized showcase merge. A successful merge alone does
not prove that a deployment is ready; verify the deployment and live content.
See [`RUNBOOK.md`](RUNBOOK.md) for publication checks.

There are no approved screenshots or videos for the case studies currently in
the catalog. The TokenSmith aggregate reuses one 19-question benchmark across
three passes and reports limitations alongside its metrics. Public repository
access was verified; an open-source license was not verified.
