export type MusicActivity = {
  connected: boolean;
  title: string;
  artist: string;
  album?: string;
  albumArt?: string;
  url?: string;
  nowPlaying: boolean;
};

export type GoogleHealthActivity = {
  connected: boolean;
  title: string;
  sport: string;
  distanceMiles: number;
  activeTime: string;
  date?: string;
  weekSteps: number;
};

export type StravaActivity = {
  connected: boolean;
  title: string;
  sport: string;
  distanceMiles: number;
  movingTime: string;
  elevationFeet: number;
  date?: string;
  url?: string;
};

type LastFmTrack = {
  name?: string;
  artist?: { "#text"?: string } | string;
  album?: { "#text"?: string } | string;
  image?: Array<{ "#text"?: string; size?: string }>;
  url?: string;
  "@attr"?: { nowplaying?: string };
};

type GoogleHealthExercise = {
  interval?: { startTime?: string; endTime?: string };
  exerciseType?: string;
  displayName?: string;
  activeDuration?: string;
  metricsSummary?: {
    distanceMillimeters?: number;
    caloriesKcal?: number;
    averageHeartRateBeatsPerMinute?: string;
  };
};

type GoogleHealthDataPoint = {
  exercise?: GoogleHealthExercise;
};

const musicFallback: MusicActivity = {
  connected: false,
  title: "Listening signal ready",
  artist: "Connect Last.fm to share Apple Music activity",
  nowPlaying: false,
};

const googleHealthFallback: GoogleHealthActivity = {
  connected: false,
  title: "Fitness signal ready",
  sport: "Connect Fitbit to share steps and workouts",
  distanceMiles: 0,
  activeTime: "—",
  weekSteps: 0,
};

const stravaFallback: StravaActivity = {
  connected: false,
  title: "Activity signal ready",
  sport: "Connect Strava to share recent workouts",
  distanceMiles: 0,
  movingTime: "—",
  elevationFeet: 0,
};

type StravaActivitySummary = {
  id?: number;
  name?: string;
  sport_type?: string;
  type?: string;
  distance?: number;
  moving_time?: number;
  total_elevation_gain?: number;
  start_date?: string;
};

type CivilDate = { year: number; month: number; day: number };

type StepsRollupPoint = {
  steps?: { countSum?: string };
};

function lastFmText(value?: { "#text"?: string } | string) {
  return typeof value === "string" ? value : value?.["#text"];
}

function lastFmArtwork(images?: LastFmTrack["image"]) {
  return [...(images ?? [])]
    .reverse()
    .find((image) => Boolean(image["#text"]))?.["#text"];
}

export async function getMusicActivity(): Promise<MusicActivity> {
  const username = process.env.LASTFM_USERNAME;
  const apiKey = process.env.LASTFM_API_KEY;

  if (!username || !apiKey) return musicFallback;

  try {
    const parameters = new URLSearchParams({
      method: "user.getrecenttracks",
      user: username,
      api_key: apiKey,
      format: "json",
      limit: "1",
    });
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${parameters}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) return musicFallback;
    const payload = (await response.json()) as {
      recenttracks?: { track?: LastFmTrack[] | LastFmTrack };
    };
    const tracks = payload.recenttracks?.track;
    const latest = Array.isArray(tracks) ? tracks[0] : tracks;
    const artist = lastFmText(latest?.artist);

    if (!latest?.name || !artist) {
      return { ...musicFallback, connected: true };
    }

    return {
      connected: true,
      title: latest.name,
      artist,
      album: lastFmText(latest.album),
      albumArt: lastFmArtwork(latest.image),
      url: latest.url,
      nowPlaying: latest["@attr"]?.nowplaying === "true",
    };
  } catch {
    return musicFallback;
  }
}

async function getGoogleHealthAccessToken() {
  const clientId = process.env.GOOGLE_HEALTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_HEALTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_HEALTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) return null;
  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

function formatMovingTime(totalSeconds?: number) {
  if (!totalSeconds || !Number.isFinite(totalSeconds) || totalSeconds <= 0) return "—";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function formatSportType(value?: string) {
  if (!value) return "Workout";
  return value.replace(/([a-z])([A-Z])/g, "$1 $2");
}

async function getStravaAccessToken() {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const response = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) return null;
  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export async function getStravaActivity(): Promise<StravaActivity> {
  try {
    const accessToken = await getStravaAccessToken();
    if (!accessToken) return stravaFallback;

    const response = await fetch(
      "https://www.strava.com/api/v3/athlete/activities?per_page=1",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!response.ok) return stravaFallback;

    const activities = (await response.json()) as StravaActivitySummary[];
    const latest = activities[0];
    if (!latest?.id) {
      return {
        ...stravaFallback,
        connected: true,
        title: "No recent activities",
        sport: "Strava",
      };
    }

    return {
      connected: true,
      title: latest.name || formatSportType(latest.sport_type || latest.type),
      sport: formatSportType(latest.sport_type || latest.type),
      distanceMiles: (latest.distance ?? 0) / 1609.344,
      movingTime: formatMovingTime(latest.moving_time),
      elevationFeet: (latest.total_elevation_gain ?? 0) * 3.28084,
      date: latest.start_date,
      url: `https://www.strava.com/activities/${latest.id}`,
    };
  } catch {
    return stravaFallback;
  }
}

function formatDuration(duration?: string, startTime?: string, endTime?: string) {
  let totalSeconds = duration ? Number.parseFloat(duration.replace("s", "")) : 0;
  if (!totalSeconds && startTime && endTime) {
    totalSeconds = (new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000;
  }

  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "—";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function formatExerciseType(value?: string) {
  if (!value) return "Workout";
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toCivilDate(date: Date): CivilDate {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

async function getWeekSteps(accessToken: string) {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setUTCDate(now.getUTCDate() - 6);
  weekStart.setUTCHours(0, 0, 0, 0);

  const endExclusive = new Date(now);
  endExclusive.setUTCDate(now.getUTCDate() + 1);
  endExclusive.setUTCHours(0, 0, 0, 0);

  const response = await fetch(
    "https://health.googleapis.com/v4/users/me/dataTypes/steps/dataPoints:dailyRollUp",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        range: {
          start: { date: toCivilDate(weekStart) },
          end: { date: toCivilDate(endExclusive) },
        },
        windowSizeDays: 1,
      }),
    },
  );

  if (!response.ok) return 0;
  const payload = (await response.json()) as { rollupDataPoints?: StepsRollupPoint[] };
  return (payload.rollupDataPoints ?? []).reduce((sum, point) => {
    const count = Number.parseInt(point.steps?.countSum ?? "0", 10);
    return sum + (Number.isFinite(count) ? count : 0);
  }, 0);
}

export async function getGoogleHealthActivity(): Promise<GoogleHealthActivity> {
  try {
    const accessToken = await getGoogleHealthAccessToken();
    if (!accessToken) return googleHealthFallback;

    const lookback = new Date();
    lookback.setUTCDate(lookback.getUTCDate() - 90);
    lookback.setUTCHours(0, 0, 0, 0);

    const parameters = new URLSearchParams({
      pageSize: "25",
      filter: `exercise.interval.civil_start_time >= "${lookback.toISOString().slice(0, 10)}"`,
    });

    const [exerciseResponse, weekSteps] = await Promise.all([
      fetch(
        `https://health.googleapis.com/v4/users/me/dataTypes/exercise/dataPoints?${parameters.toString()}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      ),
      getWeekSteps(accessToken),
    ]);

    if (!exerciseResponse.ok) {
      return weekSteps > 0
        ? {
            ...googleHealthFallback,
            connected: true,
            title: "Moving this week",
            sport: "Fitbit",
            weekSteps,
          }
        : googleHealthFallback;
    }

    const payload = (await exerciseResponse.json()) as { dataPoints?: GoogleHealthDataPoint[] };
    const latest = (payload.dataPoints ?? [])
      .map((point) => point.exercise)
      .find((exercise): exercise is GoogleHealthExercise => Boolean(exercise));

    if (!latest) {
      return {
        ...googleHealthFallback,
        connected: true,
        title: "No recent workouts",
        sport: "Fitbit",
        weekSteps,
      };
    }

    const latestDistanceMillimeters = latest.metricsSummary?.distanceMillimeters ?? 0;

    return {
      connected: true,
      title: latest.displayName || formatExerciseType(latest.exerciseType),
      sport: formatExerciseType(latest.exerciseType),
      distanceMiles: latestDistanceMillimeters / 1_609_344,
      activeTime: formatDuration(
        latest.activeDuration,
        latest.interval?.startTime,
        latest.interval?.endTime,
      ),
      date: latest.interval?.startTime,
      weekSteps,
    };
  } catch {
    return googleHealthFallback;
  }
}
