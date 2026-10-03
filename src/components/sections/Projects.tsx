import { ProjectCard } from "@/components/projects/ProjectCard";
import { ShowcaseCard } from "@/components/projects/ShowcaseCard";
import {
  getPublishablePrivateProjects,
  getPublishableProjects,
  getPublishableShowcaseProjects,
  getSelectedProjects,
} from "@/lib/projects";
import { withBasePath } from "@/lib/paths";

export function Projects() {
  const selectedProjects = getSelectedProjects();
  const privateProjects = getPublishablePrivateProjects();
  const showcases = getPublishableShowcaseProjects();
  const hasPublishedProjects = getPublishableProjects().length > 0 || showcases.length > 0;

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
          {selectedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} showNumber />
          ))}
        </div>

        {showcases.length > 0 && (
          <section className="private-showcase-section" aria-labelledby="private-showcase-title">
            <h2 id="private-showcase-title">Private projects</h2>
            <p>What the projects address, my contribution, and their potential value. Request a walkthrough to continue the conversation.</p>
            <div className="project-grid private-showcase-grid">
              {showcases.map((project) => <ShowcaseCard key={project.slug} project={project} />)}
            </div>
          </section>
        )}

        {privateProjects.length > 0 && (
          <section className="private-project-list" aria-labelledby="private-projects-title">
            <h3 id="private-projects-title">Private project case studies</h3>
            <ul>
              {privateProjects.map((project) => (
                <li key={project.slug}>
                  <a href={withBasePath(`/projects/${project.slug}`)}>
                    {project.title} <span aria-hidden="true">→</span>
                  </a>
                  <span>Source code is private.</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {hasPublishedProjects && (
          <p className="project-index-link">
            <a href={withBasePath("/projects")}>
              Browse the project showcase <span aria-hidden="true">→</span>
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
