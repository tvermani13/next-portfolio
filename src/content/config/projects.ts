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
    slug: "real-estate-simulator",
    title: "Real Estate Simulator",
    summary:
      "I created a tool to simulate investments in real estate based on portfolio value and macro conditions, leveraging an SBLOC",
    tags: ["Next.js", "TypeScript"],
    links: { github: "https://github.com/tvermani13/real-estate-simulator#", demo: "https://real-estate-simulator-self.vercel.app" },
    featured: true,
    startDate: "2026-04",
  },
  // {
  //   slug: "another-build",
  //   title: "Another build",
  //   summary: "Short description of scope, stack, and outcome.",
  //   tags: ["React", "API"],
  //   links: { github: "https://github.com" },
  //   featured: false,
  // },
];
