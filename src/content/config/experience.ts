export type Experience = {
  company: string;
  role: string;
  /** Public path under `/public`, e.g. `/amazon.png` */
  image: string;
  /** Override default alt text (`{company} logo`) */
  imageAlt?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  summary: string;
  highlights?: string[];
};

export const experience: Experience[] = [
  {
    company: "VIVA Finance",
    role: "Software Engineering Intern",
    image: "/viva.png",
    location: "Atlanta, GA",
    startDate: "2025-08",
    endDate: "2025-12",
    summary:
      "Automated and migrated functionality to new LMS for forbearances, settlements, and P&I changes",
    highlights: [
      "Built automation for remittance function within NACHA framework",
      "Redesigned reimbursements flow, applying overpayments to loans, reimbursing, and communications"
    ],
  },
  {
    company: "Amazon",
    role: "Software Development Engineering Intern",
    image: "/amazon.png",
    location: "New York, NY",
    startDate: "2025-05",
    endDate: "2025-08",
    summary:
      "Implemented data retrieval agent for Creator Assistant with Bedrock, Java/Spring Boot, and internal reporting API",
    highlights: [
      "Used Return Control to shift API calling responsibility from agent to application to avoid malicious prompt injection",
      "Leveraged smoke test suite for agent response accuracy, relevance, latency and decision evaluation",
    ],
  },
  {
    company: "CVS Health",
    role: "Software Engineering Intern",
    image: "/cvs.jpg",
    location: "New York, NY",
    startDate: "2024-05",
    endDate: "2024-08",
    summary:
      "Implemented automatic client-side field-level encryption for sensitive patient data for MongoDB in Spring Boot",
    highlights: [
      "Built custom Kubernetes resource connectors for dynamically provisioning and scaling application resources"
    ]
  },
  // {
  //   company: "Cat Rock Capital",
  //   role: "Software Consultant",
  //   image: "/example.png",
  //   location: "Remote",
  //   startDate: "2026-04",
  //   summary:
  //     "Developed a proprietary strategy based on prevailing firm sentiment",
  //   highlights: [
  //     "leveraged agentic processed to perform thorough data analysis",
  //     "recommended trades based on granular analysis of subject financials"
  //   ],
  // }
];
