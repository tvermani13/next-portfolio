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
      "Building and operating production software full-time after completing graduate work in machine learning and a previous summer at Amazon.",
    highlights: ["Full-time SDE I", "Production software engineering"],
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
    role: "Software Development Engineering Intern",
    image: withBasePath("/amazon.png"),
    location: "New York, NY",
    startDate: "May 2025",
    endDate: "Aug 2025",
    summary:
      "Built a data-retrieval agent for Creator Assistant with Amazon Bedrock, Java, Spring Boot, and internal reporting APIs.",
    highlights: ["Prompt-injection-resistant tool calling", "Agent quality and latency evaluation"],
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
