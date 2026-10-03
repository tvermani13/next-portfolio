import type { MetadataRoute } from "next";

import { site } from "@/content/config/site";
import { getPublishableProjects } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages: MetadataRoute.Sitemap = [
    {
      url: `${site.url}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...getPublishableProjects().map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      lastModified: new Date(`${project.caseStudy.updatedOn}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...projectPages,
  ];
}
