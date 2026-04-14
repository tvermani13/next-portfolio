import Image from "next/image";

import { site } from "@/content/config/site";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="My background"
    >
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-12">
        <div className="relative aspect-square w-full max-w-[min(100%,12rem)] shrink-0 sm:max-w-56">
          <div className="relative size-full overflow-hidden rounded-2xl border border-border/60 bg-muted/40 shadow-lg ring-1 ring-border/20">
            <Image
              src={site.aboutLogo}
              alt="Georgia Institute of Technology"
              fill
              className="object-contain p-4"
              sizes="(min-width: 1024px) 14rem, 12rem"
            />
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-4 text-base leading-relaxed text-muted-foreground lg:max-w-2xl">
          <p>
            I am a machine learning researcher and software engineer currently completing my Master's degree in Machine Learning at the Georgia Institute of Technology, where I also earned my Bachelor's in Computer Science. 
            My technical focus lies at the intersection of advanced AI architectures—including Large Language Models, RAG, and autonomous agents—and robust systems engineering. 
            Recently, my academic research has centered on blockchain technology, specifically exploring Proofs of Useful Work (PoUW) through arbitrary matrix multiplication.

            Beyond academia, I am deeply interested in quantitative finance, statistical arbitrage, and configuring high-performance hardware environments for local AI development. 
            I am excited to bring my background in complex systems and scalable engineering to Amazon, where I will be joining as a Software Engineer this July.
          </p>
          {/* <p>
            The navigation uses in-page anchors so you can add{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">/blog</code>{" "}
            or{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
              /projects/[slug]
            </code>{" "}
            later without redoing the shell.
          </p> */}
        </div>
      </div>
    </Section>
  );
}
