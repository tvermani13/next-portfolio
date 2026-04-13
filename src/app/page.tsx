import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="divide-y divide-border/40">
        <About />
        <Experience />
        <Timeline />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
