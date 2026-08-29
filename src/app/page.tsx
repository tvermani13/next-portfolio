import { About } from "@/components/sections/About";
import { AITools } from "@/components/sections/AITools";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
      <About />
      <Skills />
      <AITools />
      <Contact />
    </>
  );
}
