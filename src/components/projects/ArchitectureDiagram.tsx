import type { ArchitectureOverview } from "@/content/projects/types";

export function ArchitectureDiagram({ architecture }: Readonly<{ architecture: ArchitectureOverview }>) {
  const titleId = "architecture-title";
  const descriptionId = "architecture-description";

  return (
    <figure className="architecture-figure" aria-labelledby={titleId} aria-describedby={descriptionId}>
      <h3 id={titleId}>{architecture.title}</h3>
      <ol className="architecture-flow">
        {architecture.steps.map((step, index) => (
          <li key={step}>
            <span className="architecture-step-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <figcaption id={descriptionId}>{architecture.explanation}</figcaption>
    </figure>
  );
}
