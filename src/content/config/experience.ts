import { withBasePath } from "@/lib/paths";

export type Experience = {
  company: string;
  role: string;
  image: string;
  imageAlt?: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    company: "Amazon",
    role: "Software Development Engineer I",
    image: withBasePath("/amazon.png"),
    location: "New York, NY",
    startDate: "Jul 2026",
    endDate: "Present",
    summary:
      "SDE I in New York. Converted from the internship that shipped a Bedrock data-retrieval agent for Creator Assistant.",
    highlights: ["Creator Assistant internship conversion", "Creator Social Share Services"],
    current: true,
  },
  {
    company: "VIVA Finance",
    role: "Software Engineering Intern",
    image: withBasePath("/viva.png"),
    location: "Atlanta, GA",
    startDate: "Aug 2025",
    endDate: "Dec 2025",
    summary:
      "Modernized loan-servicing workflows spanning forbearances, settlements, principal changes, and reimbursements.",
    highlights: ["NACHA remittance automation", "End-to-end reimbursement flows"],
  },
  {
    company: "Amazon",
    role: "Software Development Engineer Intern",
    image: withBasePath("/amazon.png"),
    location: "New York, NY",
    startDate: "May 2025",
    endDate: "Aug 2025",
    summary:
      "Built a data-retrieval agent for Creator Assistant with Amazon Bedrock, Java, Spring Boot, and internal reporting APIs. Used Return Control so tool calls execute in the application rather than the model, and automated evals for accuracy, relevance, latency, and tool selection.",
    highlights: [
      "Return Control against prompt injection",
      "Evals: accuracy, relevance, latency, tool selection",
    ],
  },
  {
    company: "GT Investments Management Club",
    role: "Founder & Chief Investment Officer",
    image: withBasePath("/gt.jpg"),
    imageAlt: "Georgia Tech seal",
    location: "Atlanta, GA",
    startDate: "Aug 2023",
    endDate: "Aug 2025",
    summary:
      "Founded and led a student-managed fund with $100k+ in privately raised capital. Authored the investment strategy, managed sector leads, and built quantitative tools for the team.",
    highlights: [
      "$100k+ student-managed fund",
      "Authored strategy and managed sector leads",
      "Quantitative investment tools",
    ],
  },
  {
    company: "CVS Health",
    role: "Software Engineering Intern",
    image: withBasePath("/cvs.jpg"),
    location: "New York, NY",
    startDate: "May 2024",
    endDate: "Aug 2024",
    summary:
      "Implemented automatic client-side field-level encryption for sensitive patient data in a Spring Boot and MongoDB platform.",
    highlights: ["PHI-aware data protection", "Kubernetes resource automation"],
  },
];
