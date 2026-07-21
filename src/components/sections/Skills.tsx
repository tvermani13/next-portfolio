import { skillGroups } from "@/content/config/skills";

export function Skills() {
  return (
    <section className="capabilities" aria-label="Technical capabilities">
      <div className="site-shell capability-grid">
        <div className="capability-intro">
          <p>What I build with</p>
          <span>Languages, ML, and systems tooling I use regularly.</span>
        </div>
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.label}>
            <h3>{group.label}</h3>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
