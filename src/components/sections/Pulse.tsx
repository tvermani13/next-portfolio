import Image from "next/image";

import { getAppleMusicActivity, getGoogleHealthActivity } from "@/lib/activity";

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
  const [appleMusic, googleHealth] = await Promise.all([
    getAppleMusicActivity(),
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
            <p>
              A small live window into the music and movement behind the work. Data
              refreshes automatically when the integrations are connected.
            </p>
          </div>
        </header>

        <div className="pulse-grid">
          <article className="pulse-card">
            <header>
              <span>Apple Music</span>
              <PulseStatus
                connected={appleMusic.connected}
                label={appleMusic.connected ? "Recent" : "API ready"}
              />
            </header>
            <div className="music-media">
              {appleMusic.albumArt ? (
                <Image
                  className="music-art"
                  src={appleMusic.albumArt}
                  alt={`Album artwork for ${appleMusic.title}`}
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
              <p>{appleMusic.connected ? "Recently played" : "Listening soon"}</p>
              <h3>{appleMusic.title}</h3>
              <span>{appleMusic.artist}</span>
            </div>
            <ActivityLink href={appleMusic.url}>Open in Apple Music</ActivityLink>
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
                <dt>This month</dt>
                <dd>{googleHealth.connected ? `${googleHealth.monthDistanceMiles.toFixed(1)} mi` : "—"}</dd>
              </div>
            </dl>
            <ActivityLink>Synced from Google Health</ActivityLink>
          </article>

          <article className="pulse-card">
            <header>
              <span>Now</span>
              <span>Summer 2026</span>
            </header>
            <div className="pulse-card-copy">
              <p>Current direction</p>
              <h3>Engineering at Amazon, full-time.</h3>
              <span>
                Georgia Tech alumnus now building and operating production software as
                an SDE I at Amazon.
              </span>
            </div>
            <a className="pulse-link" href="#contact">
              Start a conversation <span aria-hidden="true">↓</span>
            </a>
          </article>
        </div>

        {!appleMusic.connected && !googleHealth.connected && (
          <p className="integration-note">
            The live cards are running in preview mode. We&apos;ll connect your private API
            credentials together during deployment.
          </p>
        )}
      </div>
    </section>
  );
}
