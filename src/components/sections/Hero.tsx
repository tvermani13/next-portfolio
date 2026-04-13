import Link from "next/link";

import { site } from "@/content/config/site";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className={cn(
        "border-b border-border/40 bg-gradient-to-b from-muted/40 to-background",
      )}
    >
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28 lg:max-w-5xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Portfolio
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-tight">
          Welcome. My name is {site.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {site.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View projects
          </a>
          <Link
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
