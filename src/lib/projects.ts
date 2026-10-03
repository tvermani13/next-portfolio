import { projects } from "@/content/config/projects";
import type { CaseStudy, Project, PublishableShowcase, ReviewedImage } from "@/content/projects/types";

function hasText(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function isHttpsUrl(value: string | undefined): value is string {
  if (!hasText(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && Boolean(url.hostname) && !url.username && !url.password;
  } catch {
    return false;
  }
}

function isReviewedImage(image: ReviewedImage): boolean {
  return (
    image.src.startsWith("/") &&
    !image.src.startsWith("//") &&
    !/[?#\\]/.test(image.src) &&
    hasText(image.alt) &&
    hasText(image.caption) &&
    Number.isFinite(image.width) &&
    image.width > 0 &&
    Number.isFinite(image.height) &&
    image.height > 0 &&
    isIsoDate(image.reviewedOn)
  );
}

export function isPublishableCaseStudy(project: Project): project is Project & { caseStudy: CaseStudy } {
  const { caseStudy, evidence } = project;
  if (project.publication !== "publishable" || !caseStudy) return false;

  const evidenceIds = new Set(evidence.map((item) => item.id));
  const hasEvidence = (ids: string[]) => ids.length > 0 && ids.every((id) => evidenceIds.has(id));
  const hasUniqueEvidence = evidenceIds.size === evidence.length;
  const textFields = [
    project.title,
    project.kicker,
    project.summary,
    caseStudy.problem,
    caseStudy.intendedAudience,
    caseStudy.contribution,
    caseStudy.implementation,
    caseStudy.disclosure,
  ];

  return (
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) &&
    textFields.every(hasText) &&
    Number.isFinite(project.catalogOrder) &&
    caseStudy.decisions.length > 0 &&
    caseStudy.decisions.every(
      (decision) =>
        hasText(decision.decision) &&
        hasText(decision.rationale) &&
        hasText(decision.tradeoff) &&
        decision.alternatives.length > 0 &&
        decision.alternatives.every(hasText) &&
        hasEvidence(decision.evidenceIds),
    ) &&
    caseStudy.evaluations.every(
      (evaluation) =>
        hasText(evaluation.title) &&
        hasText(evaluation.method) &&
        hasText(evaluation.scope) &&
        evaluation.rows.every(
          (row) =>
            hasText(row.metric) &&
            hasText(row.unit) &&
            Number.isFinite(row.result) &&
            (row.baseline === null || Number.isFinite(row.baseline)) &&
            hasText(row.interpretation),
        ) &&
        hasEvidence(evaluation.evidenceIds),
    ) &&
    caseStudy.limitations.length > 0 &&
    caseStudy.limitations.every(hasText) &&
    caseStudy.lessons.length > 0 &&
    caseStudy.lessons.every(hasText) &&
    isIsoDate(caseStudy.updatedOn) &&
    hasEvidence(caseStudy.evidenceIds) &&
    hasUniqueEvidence &&
    evidence.every(
      (item) =>
        hasText(item.id) &&
        hasText(item.label) &&
        isIsoDate(item.confirmedOn) &&
        (item.kind !== "public-url" || isHttpsUrl(item.publicUrl)),
    ) &&
    project.screenshots.every(isReviewedImage) &&
    (!project.thumbnail || isReviewedImage(project.thumbnail)) &&
    (!project.architecture ||
      (hasText(project.architecture.title) &&
        hasText(project.architecture.explanation) &&
        project.architecture.steps.length > 0 &&
        project.architecture.steps.every(hasText) &&
        hasEvidence(project.architecture.evidenceIds))) &&
    (!project.demo ||
      (isHttpsUrl(project.demo.url) && hasText(project.demo.disclosure) && isIsoDate(project.demo.reviewedOn))) &&
    (project.video.state !== "published" ||
      (isHttpsUrl(project.video.url) &&
        hasText(project.video.caption) &&
        (!project.video.transcript || hasText(project.video.transcript)) &&
        isIsoDate(project.video.reviewedOn))) &&
    (project.source.kind !== "public-repository" && project.source.kind !== "public-snapshot" ||
      (isHttpsUrl(project.source.url) &&
        hasText(project.source.scope) &&
        isIsoDate(project.source.verifiedOn)))
  );
}

export function getSelectedProjects(): Project[] {
  return projects
    .filter((project) => typeof project.selectedOrder === "number")
    .sort((left, right) => (left.selectedOrder ?? 0) - (right.selectedOrder ?? 0));
}

export function getPublishableProjects(): Array<Project & { caseStudy: CaseStudy }> {
  return projects
    .filter(isPublishableCaseStudy)
    .sort((left, right) => left.catalogOrder - right.catalogOrder);
}

export function getPublishablePrivateProjects(): Array<Project & { caseStudy: CaseStudy }> {
  return getPublishableProjects().filter((project) => project.source.kind === "private");
}

export function getPublishableProject(slug: string): (Project & { caseStudy: CaseStudy }) | undefined {
  return getPublishableProjects().find((project) => project.slug === slug);
}

export function isPublishableShowcase(project: Project): project is Project & { showcase: PublishableShowcase } {
  const { showcase, evidence } = project;
  if (showcase?.publication !== "publishable" || project.source.kind !== "private") return false;

  const evidenceById = new Map(evidence.map((item) => [item.id, item]));
  const hasEvidence = (ids: string[]) => ids.length > 0 && ids.every((id) => evidenceById.has(id));
  const roleEvidence = showcase.role.evidenceIds.map((id) => evidenceById.get(id));

  return (
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) &&
    Number.isFinite(project.catalogOrder) &&
    [project.title, project.kicker, project.summary, showcase.problem, showcase.contribution,
      showcase.role.label, showcase.potentialValue].every(hasText) &&
    isIsoDate(showcase.reviewedOn) &&
    evidence.length === evidenceById.size &&
    evidence.every((item) =>
      hasText(item.id) && hasText(item.label) && isIsoDate(item.confirmedOn) &&
      item.kind !== "public-url" && item.publicUrl === undefined) &&
    hasEvidence(showcase.evidenceIds) &&
    hasEvidence(showcase.role.evidenceIds) &&
    roleEvidence.every((item) => item?.kind === "repository-authorship" || item?.kind === "owner-confirmed") &&
    (!showcase.proofPoint || (hasText(showcase.proofPoint.text) && hasEvidence(showcase.proofPoint.evidenceIds))) &&
    // These overview cards expose no assets, live integrations, or repository links.
    project.demo === undefined && project.thumbnail === undefined &&
    project.screenshots.length === 0 && project.architecture === undefined &&
    project.video.state === "unavailable" && !("url" in project.source)
  );
}

export function getPublishableShowcaseProjects(): Array<Project & { showcase: PublishableShowcase }> {
  return projects
    .filter(isPublishableShowcase)
    .sort((left, right) => left.catalogOrder - right.catalogOrder);
}
