import type { Metadata } from "next";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { ShowcaseCard } from "@/components/projects/ShowcaseCard";
import { site } from "@/content/config/site";
import { getPublishableProjects, getPublishableShowcaseProjects } from "@/lib/projects";
import { withBasePath } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Project showcase",
  description: "Project case studies and private-project overviews, with technical walkthrough requests.",
  alternates: { canonical: `${site.url}/projects` },
  openGraph: {
    type: "website",
    url: `${site.url}/projects`,
    title: "Project showcase | Tejas Vermani",
    description: "Project case studies and private-project overviews, with technical walkthrough requests.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project showcase | Tejas Vermani",
    description: "Project case studies and private-project overviews, with technical walkthrough requests.",
  },
};

export default function ProjectsIndexPage() {
  const publishedProjects = getPublishableProjects();
  const showcases = getPublishableShowcaseProjects();

  return (
    <section className="project-index-page">
      <div className="site-shell">
        <header className="project-index-header">
          <p className="case-study-back-link"><a href={withBasePath("/")}>← Portfolio home</a></p>
          <p className="case-study-section-label">Project library</p>
          <h1>Project showcase</h1>
          <p>Case studies and concise overviews of private projects, with a conversation about the work one click away.</p>
        </header>

        {publishedProjects.length > 0 ? (
          <section aria-labelledby="case-studies-title">
            <h2 id="case-studies-title" className="project-index-section-title">Case studies</h2>
            <div className="project-grid project-index-grid">
              {publishedProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
          </section>
        ) : (
          <p className="project-index-empty">No case studies are ready for publication yet.</p>
        )}

        {showcases.length > 0 && (
          <section className="private-showcase-section" aria-labelledby="private-showcase-title">
            <h2 id="private-showcase-title">Private projects</h2>
            <p>High-level scope and confirmed contributions. Source code is private; request a technical walkthrough to learn more.</p>
            <div className="project-grid private-showcase-grid">
              {showcases.map((project) => <ShowcaseCard key={project.slug} project={project} />)}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
