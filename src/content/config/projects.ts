export type Project = {
  slug: string;
  number: string;
  title: string;
  kicker: string;
  summary: string;
  image?: string;
  visual: "simulator" | "music" | "credit" | "network";
  tags: string[];
  links: { github?: string; demo?: string };
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "real-estate-simulator",
    number: "01",
    title: "Real Estate SBLOC Simulator",
    kicker: "Quantitative decision tool",
    summary:
      "A full-stack simulator that compares selling equities with borrowing against them for a real-estate down payment—modeling taxes, opportunity cost, cash flow, and margin-call risk.",
    visual: "simulator",
    tags: ["Next.js", "TypeScript", "FastAPI", "Monte Carlo"],
    links: {
      github: "https://github.com/tvermani13/real-estate-simulator",
      demo: "https://real-estate-simulator-self.vercel.app",
    },
    featured: true,
  },
  {
    slug: "global-music-trends",
    number: "02",
    title: "Exploring Global Music Trends",
    kicker: "Interactive data story",
    summary:
      "A geographic exploration of how Spotify audio features, popularity, and economic indicators move across countries.",
    image: "/dva.png",
    visual: "music",
    tags: ["Next.js", "D3", "Spotify data", "Visualization"],
    links: {
      github: "https://github.com/tvermani13/spotify-vis-dva",
      demo: "https://spotify-vis-dva.vercel.app",
    },
    featured: false,
  },
  {
    slug: "predicting-credit-risk",
    number: "03",
    title: "Predicting Credit Risk",
    kicker: "Machine learning product",
    summary:
      "A model-backed application for exploring borrower risk and making the factors behind a prediction easier to understand.",
    image: "/credit.jpg",
    visual: "credit",
    tags: ["Python", "Machine learning", "Streamlit"],
    links: {
      github: "https://github.com/Predicting-Credit-Risk/predicting-credit-risk",
      demo: "https://predicting-credit-risk-jysg5sq5rq6dbfuznc5cqz.streamlit.app",
    },
    featured: false,
  },
  {
    slug: "liquidity-optimizer",
    number: "04",
    title: "Neural Net Income",
    kicker: "Financial systems experiment",
    summary:
      "A liquidity optimization experiment that applies neural-network techniques to questions about cash, income, and allocation.",
    image: "/Bank.png",
    visual: "network",
    tags: ["Python", "Neural networks", "Finance"],
    links: { github: "https://github.com/tvermani13/liquidity-optimizer" },
    featured: false,
  },
];
