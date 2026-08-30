import Image from "next/image";

import { getGoogleHealthActivity, getMusicActivity } from "@/lib/activity";

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

export async function Pulse() {
  const [music, googleHealth] = await Promise.all([
    getMusicActivity(),
    getGoogleHealthActivity(),
  ]);

  const activityDate = googleHealth.date
    ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
        new Date(googleHealth.date),
      )
    : "At launch";

  return (
    <section id="pulse" className="pulse-section" aria-labelledby="pulse-title">
      <div className="site-shell">
        <header className="pulse-heading">
          <p>04 / The personal feed</p>
          <div>
            <h2 id="pulse-title">What&apos;s moving off the clock.</h2>
            <p>A live feed of music and activity.</p>
          </div>
        </header>

        <div className="pulse-grid">
          <article className="pulse-card">
            <header>
              <span>Apple Music · via Last.fm</span>
              <PulseStatus
                connected={music.connected}
                label={music.connected ? (music.nowPlaying ? "Playing" : "Recent") : "Idle"}
              />
            </header>
            <div className="music-media">
              {music.connected && music.albumArt ? (
                <Image
                  className="music-art"
                  src={music.albumArt}
                  alt={`Album artwork for ${music.title}`}
                  width={96}
                  height={96}
                  unoptimized
                />
              ) : (
                <div className="music-art music-art-placeholder" aria-hidden="true">
                  ♪
                </div>
              )}
            </div>
            <div className="pulse-card-copy">
              <p>
                {music.connected
                  ? music.nowPlaying
                    ? "Now playing"
                    : "Recently played"
                  : "Listening"}
              </p>
              <h3>{music.connected ? music.title : "—"}</h3>
              {music.connected ? <span>{music.artist}</span> : null}
            </div>
            <ActivityLink href={music.connected ? music.url : undefined}>
              View on Last.fm
            </ActivityLink>
          </article>

          <article className="pulse-card">
            <header>
              <span>Google Health</span>
              <PulseStatus
                connected={googleHealth.connected}
                label={googleHealth.connected ? "Connected" : "API ready"}
              />
            </header>
            <div className="pulse-card-copy">
              <p>{googleHealth.connected ? `${googleHealth.sport} · ${activityDate}` : "Latest activity"}</p>
              <h3>{googleHealth.title}</h3>
            </div>
            <dl className="activity-stats">
              <div>
                <dt>Distance</dt>
                <dd>{googleHealth.connected ? `${googleHealth.distanceMiles.toFixed(1)} mi` : "—"}</dd>
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
            <ActivityLink>Synced from Google Health</ActivityLink>
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
