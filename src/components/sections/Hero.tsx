import Image from "next/image";

import { site } from "@/content/config/site";

const external = { target: "_blank" as const, rel: "noopener noreferrer" };

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="site-shell">
        <div className="hero-copy">
          <div className="hero-status">
            <span className="hero-avatar">
              <Image
                src={site.headshot}
                alt="Portrait of Tejas Vermani"
                fill
                priority
                sizes="40px"
              />
            </span>
            <p className="signal-label">
              <span className="signal-dot" aria-hidden="true" />
              SDE I @ Amazon · {site.location}
            </p>
          </div>
          <h1 id="hero-title">I build systems that make hard ideas useful.</h1>
          <p className="hero-intro">
            I&apos;m Tejas—an SDE at Amazon and Georgia Tech alumnus working across
            production software, machine learning, and quantitative finance.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore the work <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-quiet" href={site.links.resume} {...external}>
              Résumé <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-proof" aria-label="Profile highlights">
          <div>
            <span className="proof-number">05+</span>
            <span className="proof-label">Years building software</span>
          </div>
          <div>
            <span className="proof-number">B.S. + M.S.</span>
            <span className="proof-label">Georgia Tech computer science</span>
          </div>
          <div>
            <span className="proof-number">AI × Finance</span>
            <span className="proof-label">The problems I keep returning to</span>
          </div>
        </div>
      </div>
    </section>
  );
}
