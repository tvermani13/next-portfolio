import type { CaseStudy } from "@/content/projects/types";

export const caseStudies: Record<string, CaseStudy> = {
  "tokensmith-query-decomp": {
    problem:
      "TokenSmith's documented baseline uses single-pass retrieval and generation. The project explores whether a planner can route complex questions through decomposition and evidence synthesis, then compares that approach with the baseline.",
    intendedAudience:
      "The public snapshot is presented as a course-project artifact for reviewers evaluating multi-hop retrieval and its measurement.",
    contribution:
      "The public README describes this as my project and identifies the planner layer: simple-versus-complex classification, dependency-aware decomposition of complex questions into two to five subqueries, and evidence synthesis.",
    implementation:
      "The public snapshot contains the planner files, evaluation scripts, benchmark materials, and aggregate outputs. The documented flow classifies a question, decomposes complex questions, then merges, deduplicates, and reranks evidence before answer generation. The evaluation scripts use a separate local TokenSmith backend and locally configured GGUF models; that backend is not included in this snapshot.",
    decisions: [
      {
        decision:
          "Route questions through a simple-versus-complex classifier, and decompose complex questions into dependency-aware subqueries.",
        alternatives: ["TokenSmith's documented single-pass retrieval-and-generation baseline."],
        rationale:
          "The public README documents selective decomposition, but does not publish a more specific rationale for the routing boundary.",
        tradeoff:
          "The planner adds a classification step. The reported classifier accuracy is 68.4% overall, with lower accuracy for complex questions (54.5%).",
        evidenceIds: ["tokensmith-readme", "tokensmith-aggregate"],
      },
      {
        decision:
          "Synthesize evidence by merging, deduplicating, and reranking it before generating the final answer.",
        alternatives: ["The documented single-pass baseline."],
        rationale:
          "This is the evidence-synthesis sequence described in the public planner snapshot; a separate rationale is not published.",
        tradeoff:
          "The three-pass aggregate reports a modest change in judge score and essentially unchanged keyword recall, alongside higher mean request latency.",
        evidenceIds: ["tokensmith-readme", "tokensmith-aggregate"],
      },
    ],
    evaluations: [
      {
        title: "Three-pass aggregate",
        method:
          "The reported comparison aggregates three passes over the same 19-question benchmark. It uses a small local judge model; keyword recall is based on string matching; latency includes request overhead.",
        scope:
          "These results describe this benchmark and setup only. They do not establish broad superiority or statistical significance.",
        rows: [
          {
            metric: "Mean judge score",
            unit: "score / 5",
            baseline: 3.93,
            result: 4.04,
            interpretation: "Small measured gain in this evaluation.",
          },
          {
            metric: "Keyword recall",
            unit: "recall",
            baseline: 0.579,
            result: 0.58,
            interpretation: "Essentially unchanged.",
          },
          {
            metric: "Mean request latency",
            unit: "seconds",
            baseline: 14.7,
            result: 23.3,
            interpretation: "Approximately 58% higher with the planner.",
          },
          {
            metric: "Classifier accuracy",
            unit: "accuracy",
            baseline: null,
            result: 0.684,
            interpretation: "Overall routing accuracy.",
          },
          {
            metric: "Simple-question classification",
            unit: "accuracy",
            baseline: null,
            result: 0.875,
            interpretation: "Reported simple-query classification accuracy.",
          },
          {
            metric: "Complex-question classification",
            unit: "accuracy",
            baseline: null,
            result: 0.545,
            interpretation: "Reported complex-query classification accuracy.",
          },
        ],
        limitations: [
          "Three passes reuse the same 19-question benchmark.",
          "The judge is a small local model, and keyword recall uses string matching.",
          "Latency includes request overhead and is higher for the planner in this aggregate.",
          "The figures do not establish broad superiority or statistical significance.",
        ],
        evidenceIds: ["tokensmith-aggregate", "tokensmith-readme"],
      },
    ],
    limitations: [
      "The public repository is a planner and evaluation snapshot, not the full TokenSmith backend.",
      "Standalone reproduction depends on a separately configured backend and local models.",
      "The benchmark is small and reused across its three passes; its metrics have the methodology limits described above.",
      "The public materials do not provide a separate rationale for each design choice.",
    ],
    lessons: [
      "Read retrieval quality, recall, and latency together: the reported judge score changes slightly, recall is effectively flat, and latency increases.",
      "Classifier performance, especially on complex questions, is a material limit on a planner that routes work by query type.",
    ],
    disclosure:
      "The linked repository is a public planner/evaluation snapshot. It does not include the separate TokenSmith backend. A repository license was not verified, so this page calls it a public snapshot rather than open source.",
    evidenceIds: ["tokensmith-readme", "tokensmith-aggregate"],
    updatedOn: "2026-10-01",
  },
};
