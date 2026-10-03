import Image from "next/image";

import type { Project } from "@/content/projects/types";
import { withBasePath } from "@/lib/paths";
import { ProjectStatus } from "@/components/projects/ProjectStatus";
import { isPublishableCaseStudy } from "@/lib/projects";

const external = { target: "_blank" as const, rel: "noopener noreferrer" };

function formatMetric(value: number, unit: string): string {
  if (unit === "seconds") return `${value.toFixed(1)}s`;
  if (unit === "score / 5") return value.toFixed(2);
  if (unit === "recall") return value.toFixed(3);
  return `${(value * 100).toFixed(1)}%`;
}

function ProjectVisual({ project }: Readonly<{ project: Project }>) {
  if (project.thumbnail) {
    return (
      <figure className="project-visual-reviewed">
        <Image
          src={withBasePath(project.thumbnail.src)}
          alt={project.thumbnail.alt}
          width={project.thumbnail.width}
          height={project.thumbnail.height}
          sizes={project.featured ? "(min-width: 900px) 60vw, 100vw" : "(min-width: 900px) 32vw, 100vw"}
        />
        <figcaption>
          {project.thumbnail.caption} <span>({project.thumbnail.dataKind} data)</span>
        </figcaption>
      </figure>
    );
  }

  if (project.visual === "evaluation") {
    const rows = project.caseStudy?.evaluations[0]?.rows.slice(0, 3) ?? [];
    return (
      <div className="project-evaluation-preview">
        <p className="project-visual-label">Three-pass aggregate · 19 questions</p>
        <dl>
          {rows.map((row) => (
            <div key={row.metric}>
              <dt>{row.metric}</dt>
              <dd>
                {row.baseline === null
                  ? formatMetric(row.result, row.unit)
                  : `${formatMetric(row.baseline, row.unit)} → ${formatMetric(row.result, row.unit)}`}
              </dd>
            </div>
          ))}
        </dl>
        <p className="project-visual-note">Baseline → planner · measured aggregate, limited scope</p>
      </div>
    );
  }

  if (project.visual === "overview") {
    return <div className="project-simulator-preview"><p className="project-visual-label">Project overview</p><p className="project-summary">{project.summary}</p></div>;
  }

  return (
    <div className="project-simulator-preview">
      <p className="project-visual-label">Illustrative comparison</p>
      <div className="project-simulator-options">
        <div>
          <span>Path A</span>
          <strong>Sell equities</strong>
        </div>
        <div>
          <span>Path B</span>
          <strong>Borrow against portfolio</strong>
        </div>
      </div>
      <p className="project-visual-note">No scenario values shown · try the synthetic demo</p>
    </div>
  );
}

export function ProjectCard({
  project,
  showNumber = false,
}: Readonly<{ project: Project; showNumber?: boolean }>) {
  return (
    <article className={`project-card${project.featured ? " project-card-featured" : ""}`}>
      <div className={`project-visual project-visual-${project.visual}`}>
        <ProjectVisual project={project} />
        {showNumber && project.number && <span className="project-number">{project.number}</span>}
      </div>

      <div className="project-body">
        <p className="project-kicker">{project.kicker}</p>
        <h3>{project.title}</h3>
        <ProjectStatus project={project} />
        <p className="project-summary">{project.summary}</p>
        <ul className="tag-list" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className="project-links">
          {isPublishableCaseStudy(project) && (
            <a href={withBasePath(`/projects/${project.slug}`)}>
              Read case study <span aria-hidden="true">→</span>
            </a>
          )}
          {project.demo && (
            <a href={project.demo.url} {...external}>
              {project.demo.mode === "synthetic-interactive" ? "Try synthetic demo" : "View offline replay"}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {(project.source.kind === "public-repository" || project.source.kind === "public-snapshot") && (
            <a href={project.source.url} {...external}>
              {project.source.kind === "public-snapshot" ? "Public planner/evaluation snapshot" : "Public repository"}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
