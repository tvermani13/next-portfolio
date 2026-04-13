import Image from "next/image";
import Link from "next/link";

import { projects } from "@/content/config/projects";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const external = { target: "_blank" as const, rel: "noopener noreferrer" };

export function Projects() {
  const ordered = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );

  return (
    <Section id="projects" eyebrow="Projects" title="Selected work">
      <ul className="grid gap-6 sm:grid-cols-2">
        {ordered.map((project) => (
          <li key={project.slug}>
            <Card className="flex h-full flex-col overflow-hidden p-0">
              {project.image ? (
                <div className="relative aspect-[16/10] w-full bg-muted">
                  <Image
                    src={project.image}
                    alt={`Screenshot for ${project.title}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "aspect-[16/10] w-full bg-gradient-to-br from-muted to-muted/50",
                  )}
                  aria-hidden
                />
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="shrink-0 rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-medium text-foreground">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {project.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <span className="text-xs text-muted-foreground">#{tag}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium">
                  {project.links.demo && (
                    <Link
                      href={project.links.demo}
                      className="text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                      {...external}
                    >
                      Live demo
                    </Link>
                  )}
                  {project.links.github && (
                    <Link
                      href={project.links.github}
                      className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                      {...external}
                    >
                      Source
                    </Link>
                  )}
                  {project.links.paper && (
                    <Link
                      href={project.links.paper}
                      className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                      {...external}
                    >
                      Paper
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
