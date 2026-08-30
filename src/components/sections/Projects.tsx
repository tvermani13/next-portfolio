import Image from "next/image";

import { projects } from "@/content/config/projects";

const external = { target: "_blank" as const, rel: "noopener noreferrer" };

function SimulatorVisual() {
  return (
    <div className="simulator-visual" aria-hidden="true">
      <div className="simulator-heading">
        <span>SELL</span>
        <span>SBLOC</span>
      </div>
      <div className="simulator-bars">
        <span style={{ height: "42%" }} />
        <span style={{ height: "66%" }} />
        <span style={{ height: "54%" }} />
        <span style={{ height: "82%" }} />
        <span style={{ height: "71%" }} />
      </div>
      <p>Compare capital paths over time →</p>
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
                    <SimulatorVisual />
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
