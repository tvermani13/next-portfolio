import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { DemoVideo } from "@/components/projects/DemoVideo";
import { EvaluationResults } from "@/components/projects/EvaluationResults";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ProjectStatus } from "@/components/projects/ProjectStatus";
import { WalkthroughCTA } from "@/components/projects/WalkthroughCTA";
import type { Project } from "@/content/projects/types";
import { withBasePath } from "@/lib/paths";

const external = { target: "_blank" as const, rel: "noopener noreferrer" };

function SourceDisclosure({ project }: Readonly<{ project: Project }>) {
  if (project.source.kind === "private") {
    return <p className="source-disclosure">Source code is private.</p>;
  }

  if (project.source.kind === "unconfirmed") {
    return <p className="source-disclosure">Source availability needs confirmation.</p>;
  }

  return (
    <p className="source-disclosure">
      <a href={project.source.url} {...external}>
        {project.source.kind === "public-snapshot" ? "Public planner/evaluation snapshot" : "Public repository"}{" "}
        <span aria-hidden="true">↗</span>
      </a>
      <span>{project.source.scope}.</span>
    </p>
  );
}

export function CaseStudy({ project }: Readonly<{ project: Project & { caseStudy: NonNullable<Project["caseStudy"]> } }>) {
  const { caseStudy } = project;
  const evidenceIds = new Set([
    ...caseStudy.evidenceIds,
    ...caseStudy.decisions.flatMap((decision) => decision.evidenceIds),
    ...caseStudy.evaluations.flatMap((evaluation) => evaluation.evidenceIds),
    ...(project.architecture?.evidenceIds ?? []),
  ]);
  const evidence = project.evidence.filter((item) => evidenceIds.has(item.id));

  return (
    <article className="case-study-page">
      <div className="site-shell">
        <p className="case-study-back-link">
          <a href={withBasePath("/projects")}>← All published case studies</a>
        </p>

        <header className="case-study-header">
          <p className="project-kicker">{project.kicker}</p>
          <h1>{project.title}</h1>
          <p className="case-study-summary">{project.summary}</p>
          <ProjectStatus project={project} />
          <ul className="tag-list" aria-label="Technologies used">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </header>

        <div className="case-study-layout">
          <div className="case-study-content">
            <section aria-labelledby="case-overview-title">
              <p className="case-study-section-label">01 / Overview</p>
              <h2 id="case-overview-title">The problem and contribution</h2>
              <dl className="case-study-overview">
                <div>
                  <dt>Problem</dt>
                  <dd>{caseStudy.problem}</dd>
                </div>
                <div>
                  <dt>Intended audience</dt>
                  <dd>{caseStudy.intendedAudience}</dd>
                </div>
                <div>
                  <dt>Contribution</dt>
                  <dd>{caseStudy.contribution}</dd>
                </div>
                <div>
                  <dt>Implementation</dt>
                  <dd>{caseStudy.implementation}</dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="case-evidence-title">
              <p className="case-study-section-label">02 / Evidence preview</p>
              <h2 id="case-evidence-title">What the public materials show</h2>
              <ProjectMedia project={project} />
              {project.architecture && <ArchitectureDiagram architecture={project.architecture} />}
            </section>

            <section aria-labelledby="case-decisions-title">
              <p className="case-study-section-label">03 / System design</p>
              <h2 id="case-decisions-title">Technical decisions and tradeoffs</h2>
              <ol className="technical-decision-list">
                {caseStudy.decisions.map((decision) => (
                  <li key={decision.decision}>
                    <h3>{decision.decision}</h3>
                    <p>{decision.rationale}</p>
                    <p><strong>Tradeoff:</strong> {decision.tradeoff}</p>
                    {decision.alternatives.length > 0 && (
                      <p><strong>Documented baseline:</strong> {decision.alternatives.join("; ")}</p>
                    )}
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="case-evaluation-title">
              <p className="case-study-section-label">04 / Evaluation</p>
              <h2 id="case-evaluation-title">Measured results and limits</h2>
              <EvaluationResults evaluations={caseStudy.evaluations} />
            </section>

            <section aria-labelledby="case-lessons-title">
              <p className="case-study-section-label">05 / Reflection</p>
              <h2 id="case-lessons-title">Lessons and current limitations</h2>
              <ul className="case-study-list">
                {caseStudy.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}
              </ul>
              <ul className="case-study-list case-study-limitations">
                {caseStudy.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
              </ul>
            </section>

            <section aria-labelledby="case-boundary-title">
              <p className="case-study-section-label">06 / Public presentation boundary</p>
              <h2 id="case-boundary-title">What this page represents</h2>
              <SourceDisclosure project={project} />
              <p>{caseStudy.disclosure}</p>
              <p className="case-study-updated">Content and evidence reviewed {caseStudy.updatedOn}.</p>
            </section>

            <section aria-labelledby="case-video-title">
              <p className="case-study-section-label">07 / Walkthrough</p>
              <h2 id="case-video-title">Video overview</h2>
              <DemoVideo video={project.video} />
            </section>

            {evidence.length > 0 && (
              <section aria-labelledby="case-sources-title">
                <p className="case-study-section-label">Evidence references</p>
                <h2 id="case-sources-title">Public sources</h2>
                <ul className="case-study-evidence">
                  {evidence.map((item) => (
                    <li key={item.id}>
                      {item.kind === "public-url" && item.publicUrl ? (
                        <a href={item.publicUrl} {...external}>
                          {item.label} <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span>{item.label}</span>
                      )}
                      <span>Reviewed {item.confirmedOn}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="case-study-aside">
            <p className="case-study-section-label">Source and data</p>
            <SourceDisclosure project={project} />
            {project.demo && (
              <p>
                <a href={project.demo.url} {...external}>
                  {project.demo.mode === "synthetic-interactive" ? "Try synthetic demo" : "View offline replay"}{" "}
                  <span aria-hidden="true">↗</span>
                </a>
                <span>{project.demo.disclosure}</span>
              </p>
            )}
            <p>Last content review: {caseStudy.updatedOn}.</p>
          </aside>
        </div>

        <WalkthroughCTA project={project} />
      </div>
    </article>
  );
}
