import { site } from "@/content/config/site";
import type { Project } from "@/content/projects/types";

export function WalkthroughCTA({ project }: Readonly<{ project: Project }>) {
  const subject = encodeURIComponent(`Technical walkthrough: ${project.title}`);

  return (
    <aside className="walkthrough-cta" aria-labelledby="walkthrough-title">
      <div>
        <p className="project-kicker">Continue the conversation</p>
        <h2 id="walkthrough-title">Request a technical walkthrough</h2>
        <p>Ask about the architecture, evaluation, and tradeoffs described here.</p>
      </div>
      <a className="button button-quiet" href={`mailto:${site.links.email}?subject=${subject}`}>
        Email about {project.title} <span aria-hidden="true">↗</span>
      </a>
      <p className="walkthrough-email">Or email {site.links.email}</p>
    </aside>
  );
}
