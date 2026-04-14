import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/config/site";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className={cn(
        "border-b border-border/40 bg-linear-to-b from-muted/40 to-background",
      )}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="w-full min-w-0 flex-1 text-center lg:text-left">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Portfolio
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-tight">
              My name is {site.name}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
              {site.description}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
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
          <div className="relative w-full max-w-[min(100%,20rem)] shrink-0 sm:max-w-xs lg:max-w-sm">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-border/60 bg-muted/40 shadow-lg ring-1 ring-border/20">
              <Image
                src={site.headshot}
                alt={`${site.name} — portrait`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 20rem"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
