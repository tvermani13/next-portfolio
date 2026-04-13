export type Experience = {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  summary: string;
  highlights?: string[];
};

export const experience: Experience[] = [
  {
    company: "Example Corp",
    role: "Software Engineer",
    location: "Remote",
    startDate: "2024-01",
    summary:
      "Lead with impact metrics and stack; edit this block to match your résumé.",
    highlights: [
      "Shipped features used by X users / Y% improvement",
      "Partnered with design and product on Z",
    ],
  },
  {
    company: "Previous Org",
    role: "Intern / Junior Role",
    startDate: "2022-06",
    endDate: "2023-12",
    summary: "Earlier experience — internships, labs, or part-time work.",
  },
];
