import Link from "next/link";

import { site } from "@/content/config/site";
import { Section } from "@/components/ui/Section";

const external = { target: "_blank" as const, rel: "noopener noreferrer" };

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let’s talk">
      <p className="max-w-2xl text-muted-foreground">
        Prefer email or socials — swap in a server action, Resend, or a form
        service when you are ready; no secrets belong in the repo.
      </p>
      <ul className="mt-8 flex flex-col gap-4 text-foreground sm:flex-row sm:gap-10">
        <li>
          <a
            href={`mailto:${site.links.email}`}
            className="font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            {site.links.email}
          </a>
        </li>
        <li>
          <Link
            href={site.links.linkedin}
            className="font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            {...external}
          >
            LinkedIn
          </Link>
        </li>
        <li>
          <Link
            href={site.links.github}
            className="font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            {...external}
          >
            GitHub
          </Link>
        </li>
      </ul>
    </Section>
  );
}
