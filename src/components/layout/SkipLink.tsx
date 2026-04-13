import { cn } from "@/lib/utils";

type SkipLinkProps = Readonly<{
  href?: string;
  className?: string;
}>;

export function SkipLink({ href = "#main", className }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]",
        "focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      Skip to main content
    </a>
  );
}
