import Link from "next/link";

import { site } from "@/content/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground hover:text-accent-foreground"
        >
          {site.name}
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex flex-wrap items-center justify-end gap-1 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Primary mobile" className="md:hidden">
          <details className="group relative">
            <summary className="cursor-pointer list-none rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <ul className="absolute right-0 top-full mt-1 min-w-[10rem] rounded-lg border border-border bg-background py-1 shadow-lg">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </nav>
      </div>
    </header>
  );
}
