import Image from "next/image";

import { site } from "@/content/config/site";

export function About() {
  return (
    <section id="about" className="page-section" aria-labelledby="about-title">
      <div className="site-shell">
        <header className="section-heading">
          <p>03 / About</p>
          <div>
            <h2 id="about-title">Equal parts engineer and investigator.</h2>
          </div>
        </header>

        <div className="about-grid">
          <figure className="about-photo">
            <Image
              src={site.aboutImage}
              alt="Tejas paddleboarding on the ocean"
              fill
              sizes="(min-width: 900px) 48vw, 100vw"
            />
            <figcaption>Off screen, preferably near water.</figcaption>
          </figure>

          <div className="about-copy">
            <p className="about-lead">
              My favorite work starts with a messy question and ends with something
              people can actually use.
            </p>
            <p>
              I earned both my Master&apos;s in Machine Learning and B.S. in Computer Science
              from Georgia Tech. My graduate research explored Proofs of Useful Work
              through arbitrary matrix multiplication; my product work spans agentic AI,
              secure data systems, and quantitative tools.
            </p>
            <p>
              Away from the terminal, I follow markets, experiment with local AI
              hardware, and look for reasons to get outside. The through-line is the
              same: go deep, understand the system, then make it clearer.
            </p>
            <div className="about-now">
              <span>Currently focused on</span>
              <strong>Reliable AI · Quantitative systems · Useful interfaces</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
