import Link from "next/link";

import { site } from "@/content/config/site";
import { cn } from "@/lib/utils";

const externalProps = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "mt-auto border-t border-border/60 bg-muted/30",
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {year} {site.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-4 text-sm">
          <li>
            <Link
              href={site.links.github}
              className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              {...externalProps}
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              href={site.links.linkedin}
              className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              {...externalProps}
            >
              LinkedIn
            </Link>
          </li>
          <li>
            <a
              href={`mailto:${site.links.email}`}
              className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
