import Image from "next/image";

import { experience } from "@/content/config/experience";

export function Experience() {
  return (
    <section id="experience" className="page-section" aria-labelledby="experience-title">
      <div className="site-shell">
        <header className="section-heading">
          <p>02 / Experience</p>
          <div>
            <h2 id="experience-title">Production-minded from day one.</h2>
            <p>Ambitious systems, clear ownership, work that holds up in production.</p>
          </div>
        </header>

        <ol className="experience-list">
          {experience.map((job) => (
            <li key={`${job.company}-${job.startDate}`}>
              <div className="experience-dates">
                <span>{job.startDate}</span>
                <span>{job.endDate}</span>
              </div>
              <div className="company-mark">
                <Image
                  src={job.image}
                  alt={job.imageAlt ?? `${job.company} logo`}
                  fill
                  sizes="88px"
                />
              </div>
              <div className="experience-main">
                <div className="experience-title-row">
                  <div>
                    <h3>{job.role}</h3>
                    <p>{job.company} · {job.location}</p>
                  </div>
                  {job.current && <span className="current-pill">Now</span>}
                </div>
                <p className="experience-summary">{job.summary}</p>
                <ul>
                  {job.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
