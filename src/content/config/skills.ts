export type SkillGroup = {
  label: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Python", "Java", "C++", "C", "TypeScript", "JavaScript", "SQL"],
  },
  {
    label: "ML / AI",
    skills: ["PyTorch", "Hugging Face Transformers", "scikit-learn", "Amazon Bedrock"],
  },
  {
    label: "Systems & Data",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Kafka",
      "Spring Boot",
      "PostgreSQL",
      "MongoDB",
      "OpenMPI",
      "Git",
    ],
  },
];
