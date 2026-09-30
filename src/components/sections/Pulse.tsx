import { getGoogleHealthActivity, getStravaActivity } from "@/lib/activity";

const external = { target: "_blank" as const, rel: "noopener noreferrer" };

function ActivityLink({ href, children }: { href?: string; children: React.ReactNode }) {
  return href ? (
    <a className="pulse-link" href={href} {...external}>
      {children} <span aria-hidden="true">↗</span>
    </a>
  ) : (
    <span className="pulse-link pulse-link-muted">{children}</span>
  );
}

function PulseStatus({ connected, label }: { connected: boolean; label: string }) {
  return (
    <span className={`pulse-status${connected ? " pulse-status-live" : ""}`}>
      <i aria-hidden="true" /> {label}
    </span>
  );
}

function formatPulseDate(value?: string) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
    new Date(value),
  );
}

export async function Pulse() {
  const [strava, googleHealth] = await Promise.all([
    getStravaActivity(),
    getGoogleHealthActivity(),
  ]);

  const stravaDate = formatPulseDate(strava.date);
  const googleHealthDate = formatPulseDate(googleHealth.date);

  return (
    <section id="pulse" className="pulse-section" aria-labelledby="pulse-title">
      <div className="site-shell">
        <header className="pulse-heading">
          <p>04 / The personal feed</p>
          <div>
            <h2 id="pulse-title">What&apos;s moving off the clock.</h2>
            <p>A live feed of activity.</p>
          </div>
        </header>

        <div className="pulse-grid">
          <article className="pulse-card">
            <header>
              <span>Strava</span>
              <PulseStatus
                connected={strava.connected}
                label={strava.connected ? "Recent" : "Idle"}
              />
            </header>
            <div className="pulse-card-copy">
              <p>
                {strava.connected
                  ? stravaDate
                    ? `${strava.sport} · ${stravaDate}`
                    : strava.sport
                  : "Latest activity"}
              </p>
              <h3>{strava.connected ? strava.title : "—"}</h3>
            </div>
            <dl className="activity-stats">
              <div>
                <dt>Distance</dt>
                <dd>
                  {strava.connected && strava.distanceMiles > 0
                    ? `${strava.distanceMiles.toFixed(1)} mi`
                    : "—"}
                </dd>
              </div>
              <div>
                <dt>Moving</dt>
                <dd>{strava.connected ? strava.movingTime : "—"}</dd>
              </div>
              <div>
                <dt>Elev</dt>
                <dd>
                  {strava.connected && strava.elevationFeet > 0
                    ? `${Math.round(strava.elevationFeet)} ft`
                    : "—"}
                </dd>
              </div>
            </dl>
            <ActivityLink href={strava.connected ? strava.url : undefined}>
              View on Strava
            </ActivityLink>
          </article>

          <article className="pulse-card">
            <header>
              <span>Fitbit</span>
              <PulseStatus
                connected={googleHealth.connected}
                label={googleHealth.connected ? "Connected" : "Idle"}
              />
            </header>
            <div className="pulse-card-copy">
              <p>
                {googleHealth.connected
                  ? `${googleHealth.sport} · ${googleHealthDate ?? "At launch"}`
                  : "Latest activity"}
              </p>
              <h3>{googleHealth.title}</h3>
            </div>
            <dl className="activity-stats">
              <div>
                <dt>Distance</dt>
                <dd>
                  {googleHealth.connected ? `${googleHealth.distanceMiles.toFixed(1)} mi` : "—"}
                </dd>
              </div>
              <div>
                <dt>Active</dt>
                <dd>{googleHealth.activeTime}</dd>
              </div>
              <div>
                <dt>Week steps</dt>
                <dd>
                  {googleHealth.connected && googleHealth.weekSteps > 0
                    ? googleHealth.weekSteps.toLocaleString("en-US")
                    : "—"}
                </dd>
              </div>
            </dl>
            <ActivityLink>Synced from Fitbit</ActivityLink>
          </article>

          <article className="pulse-card">
            <header>
              <span>Now</span>
              <span>Fall 2026</span>
            </header>
            <div className="pulse-card-copy">
              <p>Current direction</p>
              <h3>SDE I at Amazon in New York.</h3>
              <span>
                Georgia Tech M.S. CS (Machine Learning) alum, focused on reliable AI,
                quantitative systems, and useful interfaces.
              </span>
            </div>
            <a className="pulse-link" href="#contact">
              Start a conversation <span aria-hidden="true">↓</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
