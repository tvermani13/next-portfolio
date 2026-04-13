import { timeline } from "@/content/config/timeline";
import { Section } from "@/components/ui/Section";

export function Timeline() {
  return (
    <Section id="timeline" eyebrow="Timeline" title="Highlights">
      <ol className="space-y-8">
        {timeline.map((entry) => (
          <li
            key={`${entry.date}-${entry.title}`}
            className="flex flex-col gap-2 sm:flex-row sm:gap-8"
          >
            <span className="shrink-0 text-sm font-semibold tabular-nums text-muted-foreground sm:w-16">
              {entry.date}
            </span>
            <div>
              <h3 className="font-medium text-foreground">{entry.title}</h3>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                {entry.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
