import { site } from "@/content/config/site";

const external = { target: "_blank" as const, rel: "noopener noreferrer" };

export function Contact() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="site-shell contact-grid">
        <p>05 / Say hello</p>
        <div>
          <h2 id="contact-title">Have a hard problem worth making useful?</h2>
          <a className="contact-link" href={`mailto:${site.links.email}`}>
            {site.links.email} <span aria-hidden="true">↗</span>
          </a>
          <div className="contact-secondary-links">
            <a href={site.links.github} {...external}>
              GitHub
            </a>
            <a href={site.links.linkedin} {...external}>
              LinkedIn
            </a>
            <a href={site.links.resume} {...external}>
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
