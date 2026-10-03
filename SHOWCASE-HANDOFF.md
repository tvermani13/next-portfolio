# Recruiter Showcase — Implementation Handoff

Reviewed and implemented: 2026-10-01

Private-project card expansion: 2026-10-02. Resumed at the owner's request on
2026-10-03; **local implementation and validation complete.**
Publication was authorized on October 3 after local validation. The historical
records below describe the work before publication; the final section records
the verifier and release preparation. Repository visibility is unchanged.

## Plan review

The planned architecture fits the repository: it already uses Next.js App Router
with static export and has a `withBasePath()` helper. The main model gap was the
required GitHub URL. The README, feature catalog, and runbook also contained
stale production/PR claims, and project artwork used decorative bars that could
be mistaken for measured results.

The implementation preserves the current homepage order and the featured
Hearthline → TokenSmith sequence. It removes bar-chart-like decoration from the
project cards and presents TokenSmith's reported metrics directly. It adds
typed, curated content and static routes without a CMS, new dependency, private
backend request, or activity-integration change.

## Delivered

- Optional source-availability metadata for private, unconfirmed, public
  repository, and public snapshot states.
- A completeness/evidence filter shared by the homepage private-project list,
  project index, detail routes, and sitemap.
- `/projects` and a static `/projects/[slug]` route with per-page canonical,
  social metadata, source/data disclosures, evidence, architecture summary,
  responsive evaluation table, honest media states, and a project-specific
  walkthrough email link.
- A TokenSmith case study using the public planner/evaluation snapshot and its
  three-pass aggregate, including judge score, keyword recall, latency, routing
  accuracy, methodology, and limits.
- Existing Hearthline homepage card, public repository link, and synthetic demo
  remain in their original order. Its detail page is not published until the
  personal contribution breakdown is confirmed.
- README, feature catalog, and runbook updates. This file is the remaining-facts
  and deployment handoff.

## Items to confirm before expanding publication

- Hearthline: personal contribution, dates, relationship between the public
  demo and full application, and which architecture details are approved for
  recruiter-facing copy.
- Private-project full case studies: detailed personal contribution,
  collaborators, maturity, dates, evaluation results, and approved technical
  depth still need confirmation. The concise cards added on October 2 use
  documentation-backed scope and a narrow contributor role; they do not claim
  sole ownership, adoption, measured impact, or production status.
- Liquidity Optimizer: confirm whether it is a standalone project (and identify
  its documentation) or Smart Vault's existing liquidity-planning feature. Its
  safe draft remains unpublished and absent from generated site content.
- Media: reviewed screenshots, diagram approvals, video destination, and any
  transcripts. No project screenshot or video was added.
- TokenSmith: reproduction prerequisites and rights/approval for the benchmark
  material, if the write-up is later expanded.
- Deployment: production commit, Vercel project settings, and subpath behavior.
  These were not inspected or changed.

No private project repository was read during the original October 1 work.
On October 2, the owner authorized limited read-only local inspection of
candidate documentation and contribution attribution. The expansion below
contains manually curated descriptions; no private source code, datasets,
repository history, assets, credentials, or private repository links were
copied into the portfolio. Candidate repositories were not modified and their
services were not run.

## October 1 validation record

This is the original case-study validation record. The October 2 and October 3
records below cover the subsequent card expansion and completed browser review.

- `npm run lint`: passed.
- `tsc --noEmit --incremental false`: passed.
- Static export with Webpack: passed with an empty base path and with
  `/portfolio`, with activity credentials explicitly blanked.
- Generated output checks: passed for route filtering, page titles/H1s,
  canonical and Open Graph URLs, sitemap/robots paths, evaluation content,
  project-specific walkthrough links, and credential-value scanning across 99
  generated files. No credential values were printed. A heuristic scan found
  one bare `localhost` marker in Next.js's polyfill bundle; it was not a URL or
  project-page backend reference. No private filesystem paths, private-key
  markers, or API-key-shaped values were found.
- `git diff --check`: passed.
- Browser visual review at the planned viewport sizes is pending. The browser
  rejected the local-file preview and disallowed workarounds, so no screenshots
  were inspected. Do not treat responsive visual QA as complete.

The default Turbopack build could not start its CSS worker because the sandbox
denied local port binding. The same static export completed through the
installed Next.js Webpack build path. Do not commit, push, merge, or deploy from
this handoff without a separate publication request and deployment-setting
review.

## October 2: concise private-project showcase cards

Five cards are render-eligible on the local homepage and `/projects` index:

| Card | Public description | Confirmed role | Sources reviewed locally |
| --- | --- | --- | --- |
| Smart Vault | Personal finance workspace for accounts, transactions, budgets, and planning | Software contributor; attribution corroborated for interface and backend work | Smart Vault `README.md` (Implemented Features), `docs/FEATURES.md` (Purpose); local commit-author metadata |
| Life Orchestrator | Personal AI coordination, permissions, and human approvals | Software contributor; attribution corroborated for backend and operator dashboard work | Life Orchestrator `README.md` (opening description and dashboard), `docs/FEATURES.md` (Purpose and approval behavior); local commit-author metadata |
| Kinscape | One market-research product with signed-in users and personal watchlists | Software contributor | Kinscope `README.md`, `FEATURES.md` (Purpose, Pages, and watchlists); local commit-author metadata; owner's October 2 clarification |
| Home LLM | Personal AI chat interface with conversations, model choices, and approval prompts | Software contributor | Home LLM / Spark Chat root `README.md`, product `spark-chat/README.md`, `FEATURES.md` (Chat); local commit-author metadata |
| Prediction Arb Bot | Inactive prediction-market comparison research project | Software contributor | Prediction Arb Bot `README.md`, `FEATURES.md` (Purpose and Gaps); local commit-author metadata; owner-supplied inactive status |

Each card includes a description, the need it addresses, a contribution
statement, the confirmed role, explicitly potential value, a private-source
disclosure, and a project-specific walkthrough email link. No new public proof
point or measured outcome was established, so optional proof points are omitted.
The documentation supports high-level scope; these inspections do not validate
a running production system. Contribution attribution supports a contributor
role, not sole authorship or ownership of every feature.

Kinscape's documentation calls the product Kinscope. The owner clarified that
market research and login-bounded watchlists belong to one product. The card
uses the requested Kinscape name and makes no household-product claim. No
additional workspace or duplicate product was created.

Prediction Arb Bot is explicitly inactive. No trading link, profitability claim,
strategy formula, matching threshold, or live account data is presented. Do not
reuse the README's risk-free-profit wording for future public copy.

### Implementation boundaries

- Existing Hearthline → TokenSmith selection, numbering, and featured treatment
  are preserved. New cards follow them in a separate Private projects section.
- `privateProjects.ts` contains curated metadata and a safe Liquidity Optimizer
  draft. `ShowcaseCard.tsx` follows the existing dark card/grid visual system.
- `showcase.publication` controls concise-card eligibility independently of
  `project.publication`, which still controls complete case studies. Render
  eligibility is not evidence of deployment or external publication.
- The card gate requires complete copy, valid review dates, scope evidence,
  and contributor-role evidence. It rejects unpublished/unconfirmed entries,
  missing evidence, private URLs, demo/media additions, and invalid metadata.
- All five new cards keep their full case studies unpublished. TokenSmith
  remains the only generated project-detail route and project-detail sitemap
  entry. No new private-project route or backend request is introduced.
- Existing project cards now use the case-study gate when deciding whether to
  render a detail link, avoiding links to unpublished detail pages.
- No dependency, static-export, hosting, or activity-integration changes were
  made in this expansion. All pre-existing uncommitted work was retained.

### October 2 validation completed before pause

- `npm run lint`: passed.
- Installed TypeScript compiler, `--noEmit --incremental false`: passed.
- `next build --webpack`: passed for empty base path and `/portfolio`, with
  Strava, Google Health, and Last.fm credentials explicitly blanked.
- In-memory validation using the installed TypeScript/React tooling: passed
  for preserved selection order, five eligible cards, withheld Liquidity
  Optimizer, unchanged case-study eligibility, email-only card links, and 14
  negative readiness scenarios (including missing role evidence, missing scope
  evidence, duplicate evidence, private URLs, invalid dates, and live media).
- Generated HTML checks: five cards on homepage and index; preserved project
  order; no Liquidity Optimizer; no new private-project detail pages. Both
  builds' asset/internal-link prefixes and `/portfolio` canonical/sitemap URLs
  were checked.
- Empty-base-path export scan: 68 generated text files checked for credential
  literals, private repository links, private filesystem paths, infrastructure
  addresses, private-key markers, API-key patterns, and withheld draft text.
  No matches; no credential values printed. The final `/portfolio` export has
  not yet received the same complete scan.
- Project-index screenshots visually inspected at 360, 390, 768, and 1440px.
  New cards fit their containers and the page had no horizontal overflow at
  those sizes. Homepage DOM checks under `/portfolio` confirmed the five cards,
  no horizontal overflow at 1440px, base-path stylesheet URLs, and no broken
  loaded images.
- `git diff --check`: passed earlier in this expansion, before the pause note.

### Pause / resume record

Work stopped on October 2 at the owner's request. Temporary localhost preview
servers were stopped; browser viewport overrides and the temporary preview tab
were cleaned up. No private project service ran.

Work remaining at the October 2 pause (resolved below, except the withheld
Liquidity Optimizer question):

1. Recheck the working tree and review the incremental changes against the
   pre-expansion state, preserving all existing edits.
2. Finish browser navigation verification for homepage → project index →
   TokenSmith detail under `/portfolio`. The temporary static preview initially
   served a directory listing for the index; its routing was corrected. A
   subsequent browser locator check failed because heading-level filtering was
   unsupported, so end-to-end navigation must not be marked passed yet.
3. Run the final `/portfolio` output disclosure scan and final diff check.
4. Resolve Liquidity Optimizer's scope if the owner supplies that information;
   otherwise keep the draft withheld.

No additional role, metric, adoption, or production claims are needed for the
current five-card scope. More detailed case studies and media remain separate,
confirmation-dependent work. Do not commit, push, merge, deploy, or publish
without an explicit instruction.

## October 3: resumed validation and completion

The owner requested resumption. Reviewed the current working tree and the
expansion's incremental diff against the saved pre-expansion baseline. All
pre-existing uncommitted changes remain present. No application source changes
were needed during this final review, and no candidate repository was inspected
again or modified.

Completed checks:

- Re-ran the in-memory catalog/card validator: the original two selected
  projects retain their order, all five private cards pass, TokenSmith remains
  the only eligible full case study, Liquidity Optimizer is withheld, and all
  14 negative publication scenarios still fail eligibility as expected.
- Confirmed the `/portfolio` export is newer than the application source.
  Rechecked both pages' five-card order, internal-link and asset prefixes,
  absence of duplicate base-path prefixes, generated detail routes, and
  sitemap filtering.
- Scanned all 68 generated text files in the final `/portfolio` export for
  local credential literals, private repository link patterns, private
  filesystem paths, internal URLs, private-key markers, API-key patterns,
  sensitive-file links, and withheld draft text. No matches were found;
  credential values were never printed. This is an output disclosure check,
  not a new runtime or security certification.
- Browser navigation passed under `/portfolio`: homepage → Project showcase
  → TokenSmith case study → homepage. The pages show the expected headings,
  disclosures, content, and walkthrough links.
- Visually inspected the homepage's Selected Work and private-card section
  at 1440px, and the private-card section at 360px. Both have no horizontal
  overflow. At 360px, all five cards fit the 328px content width, their
  project-specific walkthrough links fit, and no duplicate element IDs were
  found. The earlier index reviews at 360, 390, 768, and 1440px remain valid.
- Walkthrough destinations were inspected without opening an email client or
  sending a message. They contain only the public project name and contact
  address. No private-source, demo, trading, or backend link appears on these
  five cards.
- Final whitespace/diff checks passed. The earlier lint, TypeScript, and both
  static-export builds remain applicable because application source did not
  change after those checks.

Local review screenshots were saved outside the repository:

- Desktop index/private section: `/private/tmp/private-showcase-desktop.jpg`
- Mobile homepage/card: `/private/tmp/private-showcase-mobile.jpg`

The temporary preview served only the exported portfolio on `127.0.0.1` and
was stopped after QA. The browser viewport override was reset and the temporary
tab closed. No private-project service, commit, push, merge, deployment, site
publication, or repository-visibility change occurred.

The only unanswered question for a further card is whether Liquidity Optimizer
is a standalone project or Smart Vault's liquidity-planning feature. Its draft
remains unpublished and absent from the generated output. The five-card scope
is complete without that answer.

## October 3: independent verification and authorized publication

The owner requested an Astra subagent verifier, followed by commit and merge so
the site receives the cards. The Astra verifier (`gpt-6-astra`) reported no
blocking findings after inspecting the implementation, generated output, and
saved desktop/mobile screenshots. Its independent checks covered selected
ordering, 13 negative eligibility scenarios, unique rendered IDs, five ordered
cards on each page, withheld draft exclusion, detail routes/sitemap, lint,
TypeScript, whitespace, and disclosure patterns across 68 generated text files.

The verifier did not re-examine private documentation or authorship and did not
run candidate services. This confirms the presentation and gates against the
prior evidence record; it does not establish production outcomes or broader
ownership. Future claims still need factual review.

Root re-ran lint, TypeScript, the 14-scenario catalog/card validator, and a fresh
credential-blanked `/portfolio` Webpack static export before release. The build
passed and generated only TokenSmith's project detail. Both existing source
links were rechecked as public GitHub repositories; no license claim was added.

GitHub's default branch is `main`, at `ae4f1a5` before this release, with no open
pull request at inspection. GitHub and Vercel identified the same successful
production baseline; Vercel reported Ready with the `tejasvermani.com` alias and
the `main` branch alias. Release uses a pull request into `main`, followed by
production deployment and live-content verification. The PR includes the
existing uncommitted case-study/catalog foundation that the new cards require.
No private candidate repository content, credentials, generated export, or
local QA screenshot is included in the commit.
