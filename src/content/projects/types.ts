export type SourceAvailability =
  | { kind: "private" }
  | { kind: "unconfirmed" }
  | {
      kind: "public-repository" | "public-snapshot";
      url: string;
      scope: string;
      verifiedOn: string;
    };

export type EvidenceReference = {
  id: string;
  label: string;
  kind: "public-url" | "owner-confirmed" | "documentation-reviewed" | "repository-authorship";
  publicUrl?: string;
  confirmedOn: string;
};

export type DataKind = "synthetic" | "public" | "conceptual";

export type ReviewedImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  dataKind: DataKind;
  reviewedOn: string;
};

export type EvaluationRow = {
  metric: string;
  unit: string;
  baseline: number | null;
  result: number;
  interpretation: string;
};

export type Evaluation = {
  title: string;
  method: string;
  scope: string;
  rows: EvaluationRow[];
  limitations: string[];
  evidenceIds: string[];
};

export type TechnicalDecision = {
  decision: string;
  alternatives: string[];
  rationale: string;
  tradeoff: string;
  evidenceIds: string[];
};

export type CaseStudy = {
  problem: string;
  intendedAudience: string;
  contribution: string;
  implementation: string;
  decisions: TechnicalDecision[];
  evaluations: Evaluation[];
  limitations: string[];
  lessons: string[];
  disclosure: string;
  evidenceIds: string[];
  updatedOn: string;
};

export type ArchitectureOverview = {
  title: string;
  steps: string[];
  explanation: string;
  evidenceIds: string[];
};

export type ProjectDemo = {
  url: string;
  mode: "synthetic-interactive" | "offline-replay";
  disclosure: string;
  reviewedOn: string;
};

export type ProjectVideo =
  | { state: "unavailable" }
  | {
      state: "published";
      url: string;
      caption: string;
      transcript?: string;
      reviewedOn: string;
    };

export type PublishableShowcase = {
  publication: "publishable";
  problem: string;
  contribution: string;
  role: {
    label: string;
    evidenceIds: string[];
  };
  potentialValue: string;
  proofPoint?: {
    text: string;
    evidenceIds: string[];
  };
  evidenceIds: string[];
  reviewedOn: string;
};

export type ProjectShowcase =
  | PublishableShowcase
  | {
      publication: "unpublished";
      pendingQuestions: string[];
    };

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  tags: string[];
  selectedOrder?: number;
  number?: string;
  catalogOrder: number;
  featured: boolean;
  visual: "simulator" | "evaluation" | "overview";
  publication: "unpublished" | "publishable";
  lifecycle: "active" | "prototype" | "inactive" | "needs-confirmation";
  source: SourceAvailability;
  demo?: ProjectDemo;
  thumbnail?: ReviewedImage;
  screenshots: ReviewedImage[];
  architecture?: ArchitectureOverview;
  video: ProjectVideo;
  evidence: EvidenceReference[];
  showcase?: ProjectShowcase;
  caseStudy?: CaseStudy;
};

export type ProjectMetadata = Omit<Project, "caseStudy">;
