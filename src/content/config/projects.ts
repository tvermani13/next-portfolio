export type Project = {
  slug: string;
  number: string;
  title: string;
  kicker: string;
  summary: string;
  image?: string;
  visual: "simulator" | "vault" | "orchestrator" | "market" | "eval";
  tags: string[];
  // Every project shown on the public portfolio must be independently verifiable.
  links: { github: string; demo?: string };
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "real-estate-simulator",
    number: "01",
    title: "Hearthline",
    kicker: "Sell vs SBLOC decision model",
    summary:
      "A full-stack simulator that compares selling equities with borrowing against them for a real-estate down payment—modeling taxes, opportunity cost, cash flow, and margin-call risk.",
    visual: "simulator",
    tags: ["Next.js", "TypeScript", "FastAPI", "Monte Carlo"],
    links: {
      github: "https://github.com/tvermani13/real-estate-simulator",
      demo: "https://real-estate-simulator-self.vercel.app/demo",
    },
    featured: true,
  },
  {
    slug: "tokensmith-query-decomp",
    number: "02",
    title: "TokenSmith Query Decomposition",
    kicker: "Planner and evaluation harness",
    summary:
      "A planner for multi-hop retrieval whose three-pass evaluation raised mean judge score from 3.93 to 4.04 while increasing mean latency from 14.7s to 23.3s.",
    visual: "eval",
    tags: ["Python", "RAG", "Evals", "Local LLMs"],
    links: {
      github: "https://github.com/tvermani13/tokensmith-query-decomp",
    },
    featured: false,
  },
];
