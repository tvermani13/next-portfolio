export type Project = {
  slug: string;
  title: string;
  summary: string;
  image?: string;
  tags: string[];
  links: { github?: string; demo?: string; paper?: string };
  featured: boolean;
  startDate?: string;
  endDate?: string;
};

export const projects: Project[] = [
  {
    slug: "sample-project",
    title: "Sample project",
    summary:
      "Replace this entry with your own work. Use featured: true for items you want to highlight first.",
    tags: ["Next.js", "TypeScript"],
    links: { github: "https://github.com", demo: "https://vercel.com" },
    featured: true,
    startDate: "2025-01",
  },
  {
    slug: "another-build",
    title: "Another build",
    summary: "Short description of scope, stack, and outcome.",
    tags: ["React", "API"],
    links: { github: "https://github.com" },
    featured: false,
  },
];
