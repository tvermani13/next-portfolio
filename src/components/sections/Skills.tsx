import { skills } from "@/content/config/skills";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function Skills() {
  const byCategory = skills.reduce<Record<string, typeof skills>>(
    (acc, skill) => {
      const key = skill.category ?? "General";
      acc[key] = acc[key] ? [...acc[key], skill] : [skill];
      return acc;
    },
    {},
  );

  return (
    <Section id="skills" eyebrow="Skills" title="Tools and practices">
      <div className="grid gap-8 sm:grid-cols-2">
        {Object.entries(byCategory).map(([category, items]) => (
          <div key={category}>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              {category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {items.map((s) => (
                <li key={s.name}>
                  <span
                    className={cn(
                      "inline-flex rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground",
                    )}
                  >
                    {s.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
