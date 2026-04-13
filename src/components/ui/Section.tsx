import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /**
   * Visible section title for accessibility and layout
   */
  title?: string;
  eyebrow?: string;
};

export function Section({ id, children, className, title, eyebrow }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-16 sm:py-24", className)}
    >
      <div className="mx-auto max-w-3xl px-6 lg:max-w-5xl">
        {(title || eyebrow) && (
          <header className="mb-10 max-w-2xl">
            {eyebrow && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
