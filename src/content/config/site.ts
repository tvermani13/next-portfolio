import { basePath, withBasePath } from "@/lib/paths";

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  return fromEnv || `https://tejasvermani.com${basePath}`;
}

export const site = {
  url: resolveSiteUrl(),
  name: "Tejas Vermani",
  shortName: "TV",
  headshot: withBasePath("/Headshot.png"),
  aboutImage: withBasePath("/Me3.jpeg"),
  title: "Tejas Vermani — Software Development Engineer at Amazon",
  titleTemplate: "%s | Tejas Vermani",
  description:
    "Amazon SDE I and Georgia Tech alumnus building useful systems across software, AI, finance, and the web.",
  defaultOgImage: withBasePath("/og.png"),
  location: "New York",
  availability: "Building at the edge of software, ML, and finance",
  links: {
    github: "https://github.com/tvermani13",
    linkedin: "https://www.linkedin.com/in/tejasvermani",
    twitter: "https://twitter.com/tvermani13",
    email: "tejasvermani@gmail.com",
    resume: withBasePath("/Resume.pdf"),
  },
  nav: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "About", href: "#about" },
    { label: "Pulse", href: "#pulse" },
  ],
} as const;

export type SiteNavItem = (typeof site.nav)[number];
