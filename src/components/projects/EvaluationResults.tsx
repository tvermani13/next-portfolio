import type { Evaluation } from "@/content/projects/types";

function formatValue(value: number, unit: string): string {
  if (unit === "seconds") return `${value.toFixed(1)} s`;
  if (unit === "score / 5") return `${value.toFixed(2)} / 5`;
  if (unit === "recall") return value.toFixed(3);
  return `${(value * 100).toFixed(1)}%`;
}

export function EvaluationResults({ evaluations }: Readonly<{ evaluations: Evaluation[] }>) {
  if (evaluations.length === 0) {
    return <p className="evaluation-unavailable">Evaluation details are not published.</p>;
  }

  return (
    <div className="evaluation-list">
      {evaluations.map((evaluation, index) => {
        const titleId = `evaluation-title-${index + 1}`;
        return (
        <section className="evaluation-item" key={evaluation.title} aria-labelledby={titleId}>
          <h3 id={titleId}>{evaluation.title}</h3>
          <p>{evaluation.method}</p>
          <p className="evaluation-scope">{evaluation.scope}</p>
          {evaluation.rows.length > 0 ? (
            <div className="evaluation-table-wrap">
              <table className="evaluation-table">
                <thead>
                  <tr>
                    <th scope="col">Metric</th>
                    <th scope="col">Baseline</th>
                    <th scope="col">Planner</th>
                    <th scope="col">Interpretation</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluation.rows.map((row) => (
                    <tr key={row.metric}>
                      <th scope="row">
                        {row.metric}
                        <span className="metric-unit">{row.unit}</span>
                      </th>
                      <td>{row.baseline === null ? "—" : formatValue(row.baseline, row.unit)}</td>
                      <td>{formatValue(row.result, row.unit)}</td>
                      <td>{row.interpretation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="evaluation-unavailable">Evaluation details are not published.</p>
          )}
          {evaluation.limitations.length > 0 && (
            <ul className="case-study-list">
              {evaluation.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
            </ul>
          )}
        </section>
        );
      })}
    </div>
  );
}
