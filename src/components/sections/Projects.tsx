import Image from "next/image";

import { projects } from "@/content/config/projects";

const external = { target: "_blank" as const, rel: "noopener noreferrer" };

const visualCopy = {
  simulator: { left: "SELL", right: "SBLOC", footer: "Compare capital paths over time →", bars: [42, 66, 54, 82, 71] },
  vault: { left: "ACCOUNTS", right: "PLAN", footer: "Aggregate → understand → act", bars: [70, 46, 84, 58, 76] },
  orchestrator: { left: "ROUTE", right: "EVAL", footer: "Policies, approvals, and traces", bars: [38, 61, 78, 52, 88] },
  market: { left: "SIGNAL", right: "SOURCE", footer: "Research without invented values", bars: [55, 73, 44, 67, 81] },
  eval: { left: "BASELINE", right: "PLANNER", footer: "Quality up; latency measured", bars: [49, 62, 57, 76, 69] },
} as const;

function ProjectVisual({ visual }: Readonly<{ visual: keyof typeof visualCopy }>) {
  const copy = visualCopy[visual];
  return (
    <div className="simulator-visual" aria-hidden="true">
      <div className="simulator-heading">
        <span>{copy.left}</span>
        <span>{copy.right}</span>
      </div>
      <div className="simulator-bars">
        {copy.bars.map((height, index) => <span key={`${visual}-${index}`} style={{ height: `${height}%` }} />)}
      </div>
      <p>{copy.footer}</p>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="page-section work-section" aria-labelledby="work-title">
      <div className="site-shell">
        <header className="section-heading">
          <p>01 / Selected work</p>
          <div>
            <h2 id="work-title">Built to answer real questions.</h2>
            <p>Selected products and experiments across software, data, and finance.</p>
          </div>
        </header>

        <div className="project-grid">
          {projects.map((project) => {
            const hasLinks = Boolean(project.links.demo || project.links.github);

            return (
              <article
                key={project.slug}
                className={`project-card${project.featured ? " project-card-featured" : ""}`}
              >
                <div className={`project-visual project-visual-${project.visual}`}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Preview for ${project.title}`}
                      fill
                      sizes={project.featured ? "(min-width: 900px) 60vw, 100vw" : "(min-width: 900px) 32vw, 100vw"}
                    />
                  ) : (
                    <ProjectVisual visual={project.visual} />
                  )}
                  <span className="project-number">{project.number}</span>
                </div>

                <div className="project-body">
                  <p className="project-kicker">{project.kicker}</p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <ul className="tag-list" aria-label="Technologies used">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  {hasLinks && (
                    <div className="project-links">
                      {project.links.demo && (
                        <a href={project.links.demo} {...external}>
                          View live <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {project.links.github && (
                        <a href={project.links.github} {...external}>
                          Source <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
