import { site } from "@/content/config/site";
import type { Project, PublishableShowcase } from "@/content/projects/types";

export function ShowcaseCard({ project }: Readonly<{ project: Project & { showcase: PublishableShowcase } }>) {
  const { showcase } = project;
  const titleId = `showcase-${project.slug}-title`;
  const subject = encodeURIComponent(`Technical walkthrough: ${project.title}`);

  return (
    <article className="project-card project-showcase-card" aria-labelledby={titleId}>
      <div className="project-body">
        <p className="project-kicker">{project.kicker}</p>
        <h3 id={titleId}>{project.title}</h3>
        <p className="showcase-disclosure">
          Source code is private{project.lifecycle === "inactive" ? " · Inactive project" : ""}.
        </p>
        <p className="project-summary">{project.summary}</p>

        <dl className="showcase-details">
          <div><dt>The need</dt><dd>{showcase.problem}</dd></div>
          <div><dt>My contribution</dt><dd>{showcase.contribution}</dd></div>
          <div><dt>Role</dt><dd>{showcase.role.label}</dd></div>
          <div><dt>Potential value</dt><dd>{showcase.potentialValue}</dd></div>
          {showcase.proofPoint && <div><dt>Evidence</dt><dd>{showcase.proofPoint.text}</dd></div>}
        </dl>

        <div className="project-links">
          <a href={`mailto:${site.links.email}?subject=${subject}`} aria-label={`Request a technical walkthrough of ${project.title}`}>
            Request a technical walkthrough <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
