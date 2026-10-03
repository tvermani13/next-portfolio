import { caseStudies } from "@/content/projects/caseStudies";
import { privateProjects } from "@/content/projects/privateProjects";
import type { Project, ProjectMetadata } from "@/content/projects/types";

const projectMetadata = [
  {
    slug: "real-estate-simulator",
    selectedOrder: 1,
    catalogOrder: 1,
    number: "01",
    title: "Hearthline",
    kicker: "Sell vs SBLOC decision model",
    summary:
      "A full-stack simulator that compares selling equities with borrowing against them for a real-estate down payment, modeling taxes, opportunity cost, cash flow, and margin-call risk.",
    visual: "simulator",
    tags: ["Next.js", "TypeScript", "FastAPI", "Monte Carlo"],
    featured: true,
    publication: "unpublished",
    lifecycle: "needs-confirmation",
    source: {
      kind: "public-repository",
      url: "https://github.com/tvermani13/real-estate-simulator",
      scope: "Public repository",
      verifiedOn: "2026-10-01",
    },
    demo: {
      url: "https://real-estate-simulator-self.vercel.app/demo",
      mode: "synthetic-interactive",
      disclosure:
        "Synthetic inputs, local result updates, and illustrative assumptions; not financial advice.",
      reviewedOn: "2026-10-01",
    },
    screenshots: [],
    video: { state: "unavailable" },
    evidence: [
      {
        id: "hearthline-readme",
        label: "Hearthline public repository README",
        kind: "public-url",
        publicUrl: "https://github.com/tvermani13/real-estate-simulator",
        confirmedOn: "2026-10-01",
      },
    ],
  },
  {
    slug: "tokensmith-query-decomp",
    selectedOrder: 2,
    catalogOrder: 2,
    number: "02",
    title: "TokenSmith Query Decomposition",
    kicker: "Planner and evaluation harness",
    summary:
      "Across three passes on 19 questions, the planner reported a 4.04 vs 3.93 mean judge score, 0.580 vs 0.579 keyword recall, and 23.3s vs 14.7s mean request latency.",
    visual: "evaluation",
    tags: ["Python", "RAG", "Evals", "Local LLMs"],
    featured: false,
    publication: "publishable",
    lifecycle: "needs-confirmation",
    source: {
      kind: "public-snapshot",
      url: "https://github.com/tvermani13/tokensmith-query-decomp",
      scope: "Planner and evaluation snapshot; separate backend not included",
      verifiedOn: "2026-10-01",
    },
    screenshots: [],
    architecture: {
      title: "Planner and evaluation flow",
      steps: [
        "Classify the question as simple or complex.",
        "For complex questions, create two to five dependency-aware subqueries.",
        "Merge, deduplicate, and rerank evidence before answer generation.",
      ],
      explanation:
        "This flow summarizes the planner stages described in the public snapshot. The evaluation scripts call a separately configured local TokenSmith backend; that backend is not part of the linked snapshot.",
      evidenceIds: ["tokensmith-readme"],
    },
    video: { state: "unavailable" },
    evidence: [
      {
        id: "tokensmith-readme",
        label: "TokenSmith public planner/evaluation snapshot README",
        kind: "public-url",
        publicUrl: "https://github.com/tvermani13/tokensmith-query-decomp",
        confirmedOn: "2026-10-01",
      },
      {
        id: "tokensmith-aggregate",
        label: "Three-pass aggregate results",
        kind: "public-url",
        publicUrl:
          "https://github.com/tvermani13/tokensmith-query-decomp/blob/main/eval/multi_run/aggregate.json",
        confirmedOn: "2026-10-01",
      },
    ],
  },
  ...privateProjects,
] satisfies ProjectMetadata[];

export const projects: Project[] = projectMetadata.map((project) => ({
  ...project,
  caseStudy: caseStudies[project.slug],
}));
