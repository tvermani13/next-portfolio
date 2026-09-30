import type { Metadata } from "next";

import { site } from "@/content/config/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy policy for Tejas Vermani, including how Strava and Google Health data are used on this personal portfolio.",
  alternates: { canonical: `${site.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <article className="legal-page">
      <div className="site-shell">
        <p>Privacy policy</p>
        <h1>Privacy policy for Tejas Vermani</h1>
        <p>
          This policy describes how the personal website{" "}
          <a href={site.url}>Tejas Vermani</a> ({site.url}) collects, uses, and
          stores information. The operator is {site.name}, reachable at{" "}
          <a href={`mailto:${site.links.email}`}>{site.links.email}</a>. Last
          updated September 3, 2026.
        </p>

        <h2>What this site is</h2>
        <p>
          Tejas Vermani is a public personal portfolio. It does not offer user
          accounts, sign-in, comments, or a consumer product. Visitors are not
          asked to connect Google, Fitbit, or Strava. Health and fitness data
          shown on the site belongs to me, the site owner.
        </p>

        <h2>Information from visitors</h2>
        <p>
          This site does not use advertising cookies, does not run a marketing
          pixel, and does not build profiles of visitors. The host (Vercel) may
          process standard request logs such as IP address, user agent, and
          requested URL for security, uptime, and abuse prevention. Those logs
          are not used to identify visitors for advertising.
        </p>

        <h2>Google user data (Fitbit via Google Health)</h2>
        <p>
          To display my own activity on the Pulse section, this site uses the
          Google Health API with OAuth. The only Google account authorized is
          mine. The application requests this scope:
        </p>
        <ul>
          <li>
            <code>googlehealth.activity_and_fitness.readonly</code> — read-only
            access to activity and fitness data such as exercises, distance,
            duration, and step counts synced from Fitbit and other Google Health
            sources linked to my account.
          </li>
        </ul>
        <p>From that API, the site may read and publicly display:</p>
        <ul>
          <li>Latest workout or exercise type and display name</li>
          <li>Distance and active or moving time</li>
          <li>Weekly step total</li>
          <li>Activity date</li>
        </ul>
        <p>
          The site does not request sleep, heart-rate, location, nutrition,
          contacts, Gmail, Drive, or calendar scopes. It does not write, delete,
          or modify Google Health data.
        </p>

        <h2>How Google user data is used</h2>
        <p>
          Google user data is used only to provide the user-facing Pulse card on
          this portfolio: a snapshot of my latest activity. It is not used for
          advertising, credit decisions, or profiling other people. It is not
          sold. It is not transferred to third parties except as needed to host
          and render the public website (Vercel build and CDN).
        </p>
        <p>
          Access tokens are obtained at site build time using a refresh token I
          store as an encrypted environment variable on Vercel. The refresh
          token is not published in the website source. The public HTML may
          contain the summarized activity fields listed above until the next
          deploy.
        </p>
        <p>
          This use of Google user data complies with the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements. Human access to the
          underlying tokens is limited to me, for security, debugging, and
          operating this site.
        </p>

        <h2>Strava data</h2>
        <p>
          The Pulse section may also show my latest Strava activity (name,
          sport, distance, moving time, elevation, and a link to the activity on
          Strava) using Strava OAuth credentials I control. That data is already
          available on Strava according to my Strava privacy settings.
        </p>

        <h2>Retention and deletion</h2>
        <p>
          OAuth refresh tokens remain until I revoke them in Google or Strava
          account settings, rotate the environment variables, or take the Pulse
          cards down. Public snapshots on this site are replaced when the site
          is rebuilt. To request deletion of the Google connection, email{" "}
          <a href={`mailto:${site.links.email}`}>{site.links.email}</a> or
          revoke access under your Google Account&apos;s third-party app
          settings. Because the only connected account is mine, I can revoke
          access at any time.
        </p>

        <h2>Contact</h2>
        <p>
          Privacy questions:{" "}
          <a href={`mailto:${site.links.email}`}>{site.links.email}</a>.
        </p>
      </div>
    </article>
  );
}
