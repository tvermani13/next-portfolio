import Image from "next/image";

import type { Project } from "@/content/projects/types";
import { withBasePath } from "@/lib/paths";

export function ProjectMedia({ project }: Readonly<{ project: Project }>) {
  if (project.screenshots.length === 0) {
    return (
      <div className="media-unavailable">
        <p>No reviewed screenshots are published for this case study.</p>
        {project.architecture ? (
          <p>The architecture summary below is the available visual overview.</p>
        ) : (
          <p>Evidence is presented through the written explanation and linked sources.</p>
        )}
      </div>
    );
  }

  return (
    <div className="project-media-grid">
      {project.screenshots.map((image) => (
        <figure key={image.src}>
          <Image
            src={withBasePath(image.src)}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 900px) 50vw, 100vw"
          />
          <figcaption>
            {image.caption} <span>({image.dataKind} data; reviewed {image.reviewedOn})</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
