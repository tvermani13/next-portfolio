import Image from "next/image";

import { experience } from "@/content/config/experience";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

function formatRange(start: string, end?: string) {
  if (end) return `${start} — ${end}`;
  return `${start} — Present`;
}

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I’ve worked"
    >
      <ul
        className="space-y-12 border-l border-border pl-6"
      >
        {experience.map((job) => (
          <li
            key={`${job.company}-${job.startDate}`}
            className="relative flex gap-4 sm:gap-5"
          >
            <span
              className={cn(
                "absolute -left-[25px] top-2 h-2.5 w-2.5 rounded-full border-2 border-background bg-foreground",
              )}
              aria-hidden
            />
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/40 ring-1 ring-border/20 sm:h-16 sm:w-16">
              <Image
                src={job.image}
                alt={job.imageAlt ?? `${job.company} logo`}
                fill
                className="object-contain p-2"
                sizes="(min-width: 640px) 4rem, 3.5rem"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {job.role}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>
                </div>
                <p className="text-sm tabular-nums text-muted-foreground">
                  {formatRange(job.startDate, job.endDate)}
                </p>
              </div>
              <p className="mt-3 max-w-2xl text-muted-foreground">{job.summary}</p>
              {job.highlights && job.highlights.length > 0 && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
