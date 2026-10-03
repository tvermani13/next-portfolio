import type { Project } from "@/content/projects/types";

function sourceLabel(project: Project): string {
  switch (project.source.kind) {
    case "private":
      return "Source code is private";
    case "unconfirmed":
      return "Source availability needs confirmation";
    case "public-snapshot":
      return "Public planner/evaluation snapshot";
    case "public-repository":
      return "Public repository";
  }
}

function lifecycleLabel(project: Project): string {
  if (project.lifecycle === "needs-confirmation") return "Project status not reported";
  return `Status: ${project.lifecycle}`;
}

export function ProjectStatus({ project }: Readonly<{ project: Project }>) {
  return (
    <ul className="project-status" aria-label="Project disclosures">
      <li>{sourceLabel(project)}</li>
      <li>{lifecycleLabel(project)}</li>
      {project.demo?.mode === "synthetic-interactive" && <li>Synthetic inputs</li>}
      {project.demo?.mode === "offline-replay" && <li>Offline replay</li>}
    </ul>
  );
}
