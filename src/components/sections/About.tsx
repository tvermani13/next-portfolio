import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="What I care about"
    >
      <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground">
        <p>
          Replace this copy with a short narrative: your focus areas, what
          kind of problems you like solving, and how you collaborate. Keeping
          this in a section component while the real copy lives here—or later
          in MDX—makes the page easy to extend.
        </p>
        <p>
          The navigation uses in-page anchors so you can add{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">/blog</code>{" "}
          or{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            /projects/[slug]
          </code>{" "}
          later without redoing the shell.
        </p>
      </div>
    </Section>
  );
}
