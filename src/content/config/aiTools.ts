export type AIToolGroup = {
  label: string;
  tools: string[];
};

export const aiToolGroups: AIToolGroup[] = [
  {
    label: "Models",
    tools: ["Qwen", "Nemotron", "Claude"],
  },
  {
    label: "Hardware",
    tools: ["DGX Spark"],
  },
  {
    label: "Dev tools",
    tools: ["Cursor", "Codex"],
  },
];
