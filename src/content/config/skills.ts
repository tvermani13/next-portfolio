export type Skill = {
  name: string;
  category?: string;
};

export const skills: Skill[] = [
  { name: "TypeScript", category: "Languages" },
  { name: "React / Next.js", category: "Frameworks" },
  { name: "Node.js", category: "Runtime" },
  { name: "PostgreSQL", category: "Data" },
  { name: "System design", category: "Practices" },
  { name: "Accessibility", category: "Practices" },
];
