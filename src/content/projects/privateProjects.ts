import type { EvidenceReference, ProjectMetadata } from "@/content/projects/types";

const reviewedOn = "2026-10-02";
const ownerConfirmedOn = "2026-10-04";

function reviewedEvidence(slug: string): EvidenceReference[] {
  return [
    {
      id: `${slug}-scope`,
      label: "High-level capabilities reviewed against project documentation",
      kind: "documentation-reviewed",
      confirmedOn: reviewedOn,
    },
    {
      id: `${slug}-contribution`,
      label: "Contributor role corroborated by local commit-author attribution",
      kind: "repository-authorship",
      confirmedOn: reviewedOn,
    },
    {
      id: `${slug}-developer-role`,
      label: "Sole developer role, with AI-assisted development, confirmed by the project owner",
      kind: "owner-confirmed",
      confirmedOn: ownerConfirmedOn,
    },
  ];
}

// Curated descriptions only. No private repository URLs, source excerpts,
// infrastructure identifiers, datasets, or unpublished evaluation claims.
// Card readiness is independent of the stricter case-study publication gate.
export const privateProjects = [
  {
    slug: "smart-vault",
    catalogOrder: 3,
    title: "Smart Vault",
    kicker: "Personal finance workspace",
    summary:
      "A personal finance application that brings accounts, transactions, budgets, and liquidity planning into one workspace.",
    tags: [],
    featured: false,
    visual: "overview",
    publication: "unpublished",
    lifecycle: "needs-confirmation",
    source: { kind: "private" },
    screenshots: [],
    video: { state: "unavailable" },
    evidence: [
      ...reviewedEvidence("smart-vault"),
      {
        id: "smart-vault-liquidity",
        label: "Liquidity Optimizer functionality incorporated into Smart Vault, confirmed by the project owner",
        kind: "owner-confirmed",
        confirmedOn: ownerConfirmedOn,
      },
    ],
    showcase: {
      publication: "publishable",
      problem: "Financial activity and upcoming obligations can be difficult to review across separate accounts and tools.",
      contribution: "Built the finance interface and backend, including liquidity-planning functionality.",
      role: { label: "Sole developer (AI-assisted)", evidenceIds: ["smart-vault-developer-role"] },
      potentialValue: "Could make it easier to understand cash needs and financial priorities in one place.",
      evidenceIds: ["smart-vault-scope", "smart-vault-liquidity"],
      reviewedOn: ownerConfirmedOn,
    },
  },
  {
    slug: "life-orchestrator",
    catalogOrder: 4,
    title: "Life Orchestrator",
    kicker: "Personal AI coordination",
    summary:
      "A personal AI coordination system that manages assistant requests, permissions, and human approvals.",
    tags: [],
    featured: false,
    visual: "overview",
    publication: "unpublished",
    lifecycle: "needs-confirmation",
    source: { kind: "private" },
    screenshots: [],
    video: { state: "unavailable" },
    evidence: reviewedEvidence("life-orchestrator"),
    showcase: {
      publication: "publishable",
      problem: "Personal AI tools need a consistent way to coordinate work while keeping sensitive actions under human control.",
      contribution: "Built the orchestration backend and operator dashboard, including human-approval workflows.",
      role: { label: "Sole developer (AI-assisted)", evidenceIds: ["life-orchestrator-developer-role"] },
      potentialValue: "Could help people supervise assistant activity and keep permission decisions consistent across tools.",
      evidenceIds: ["life-orchestrator-scope"],
      reviewedOn: ownerConfirmedOn,
    },
  },
  {
    slug: "kinscape",
    catalogOrder: 5,
    title: "Kinscape",
    kicker: "Market research and personal watchlists",
    summary: "A market-research workspace with quotes, news, and personal watchlists for signed-in users.",
    tags: [],
    featured: false,
    visual: "overview",
    publication: "unpublished",
    lifecycle: "needs-confirmation",
    source: { kind: "private" },
    screenshots: [],
    video: { state: "unavailable" },
    evidence: [
      ...reviewedEvidence("kinscape"),
      {
        id: "kinscape-identity",
        label: "Unified research and account-based watchlist scope confirmed by the project owner",
        kind: "owner-confirmed",
        confirmedOn: reviewedOn,
      },
    ],
    showcase: {
      publication: "publishable",
      problem: "Researching a company can mean moving between quote pages, news, and separate lists of companies to follow.",
      contribution: "Built the market-research application and its interface for company research and personal watchlists.",
      role: { label: "Sole developer (AI-assisted)", evidenceIds: ["kinscape-developer-role"] },
      potentialValue: "Could help users organize market research around the companies they follow, with watchlists tied to their account.",
      evidenceIds: ["kinscape-scope", "kinscape-identity"],
      reviewedOn: ownerConfirmedOn,
    },
  },
  {
    slug: "home-llm",
    catalogOrder: 6,
    title: "Home LLM",
    kicker: "Personal AI chat interface",
    summary:
      "A private chat interface for a personal AI system, with conversation history, model choices, and approval prompts.",
    tags: [],
    featured: false,
    visual: "overview",
    publication: "unpublished",
    lifecycle: "needs-confirmation",
    source: { kind: "private" },
    screenshots: [],
    video: { state: "unavailable" },
    evidence: reviewedEvidence("home-llm"),
    showcase: {
      publication: "publishable",
      problem: "Working with a personal AI system needs a usable interface for conversations and supervised actions.",
      contribution: "Built the chat application, including conversation management, model selection, and approval prompts.",
      role: { label: "Sole developer (AI-assisted)", evidenceIds: ["home-llm-developer-role"] },
      potentialValue: "Could make a personal AI system easier to use while keeping approval decisions visible.",
      evidenceIds: ["home-llm-scope"],
      reviewedOn: ownerConfirmedOn,
    },
  },
  {
    slug: "prediction-arb-bot",
    catalogOrder: 7,
    title: "Prediction Arb Bot",
    kicker: "Inactive research project",
    summary:
      "An inactive research bot for comparing related prediction markets across exchanges.",
    tags: [],
    featured: false,
    visual: "overview",
    publication: "unpublished",
    lifecycle: "inactive",
    source: { kind: "private" },
    screenshots: [],
    video: { state: "unavailable" },
    evidence: [
      ...reviewedEvidence("prediction-arb-bot"),
      {
        id: "prediction-arb-bot-inactive",
        label: "Inactive status supplied by the project owner",
        kind: "owner-confirmed",
        confirmedOn: reviewedOn,
      },
    ],
    showcase: {
      publication: "publishable",
      problem: "Related prediction markets can be difficult to compare when exchanges describe and price events differently.",
      contribution: "Built the research bot and API for reviewing market comparisons.",
      role: { label: "Sole developer (AI-assisted)", evidenceIds: ["prediction-arb-bot-developer-role"] },
      potentialValue: "Could support discussion of market-data comparison and research limitations. No live trading access or returns are presented.",
      evidenceIds: ["prediction-arb-bot-scope", "prediction-arb-bot-inactive"],
      reviewedOn: ownerConfirmedOn,
    },
  },
] satisfies ProjectMetadata[];
