import { aiToolGroups } from "@/content/config/aiTools";

export function AITools() {
  return (
    <section className="capabilities" aria-label="AI tools and workflow">
      <div className="site-shell capability-grid">
        <div className="capability-intro">
          <p>How I use AI</p>
          <span>Local models, real hardware, agentic tooling.</span>
        </div>
        {aiToolGroups.map((group) => (
          <div className="tool-group" key={group.label}>
            <h3>{group.label}</h3>
            <ul>
              {group.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
