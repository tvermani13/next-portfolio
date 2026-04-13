/**
 * Single source of truth for site identity and URLs.
 * Set NEXT_PUBLIC_SITE_URL in production (no trailing slash), e.g. https://yoursite.com
 */
function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const site = {
  url: resolveSiteUrl(),
  name: "Tejas",
  /** Used as default title; child routes can use template in root metadata */
  title: "Tejas Vermani — Portfolio",
  titleTemplate: "%s | Tejas Vermani",
  description:
    "Portfolio and professional profile — projects, experience, and contact.",
  defaultOgImage: "/og.png",
  links: {
    github: "https://github.com/tvermani13",
    linkedin: "https://www.linkedin.com/in/tejasvermani",
    email: "tejasvermani@gmail.com",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Timeline", href: "#timeline" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type SiteNavItem = (typeof site.nav)[number];
