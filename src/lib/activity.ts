export type AppleMusicActivity = {
  connected: boolean;
  title: string;
  artist: string;
  album?: string;
  albumArt?: string;
  url?: string;
};

export type GoogleHealthActivity = {
  connected: boolean;
  title: string;
  sport: string;
  distanceMiles: number;
  activeTime: string;
  date?: string;
  monthDistanceMiles: number;
  monthActivities: number;
};

type AppleMusicTrack = {
  attributes?: {
    name?: string;
    artistName?: string;
    albumName?: string;
    url?: string;
    artwork?: { url?: string };
  };
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

const appleMusicFallback: AppleMusicActivity = {
  connected: false,
  title: "Listening signal ready",
  artist: "Apple Music connects when we launch",
};

const googleHealthFallback: GoogleHealthActivity = {
  connected: false,
  title: "Fitness signal ready",
  sport: "Google Health connects when we launch",
  distanceMiles: 0,
  activeTime: "—",
  monthDistanceMiles: 0,
  monthActivities: 0,
};

function formatAppleArtwork(url?: string) {
  return url?.replace("{w}", "300").replace("{h}", "300");
}

export async function getAppleMusicActivity(): Promise<AppleMusicActivity> {
  const developerToken = process.env.APPLE_MUSIC_DEVELOPER_TOKEN;
  const userToken = process.env.APPLE_MUSIC_USER_TOKEN;

  if (!developerToken || !userToken) return appleMusicFallback;

  try {
    const response = await fetch(
      "https://api.music.apple.com/v1/me/recent/played/tracks?types=songs&limit=1",
      {
        headers: {
          Authorization: `Bearer ${developerToken}`,
          "Music-User-Token": userToken,
        },
        next: { revalidate: 900 },
      },
    );

    if (!response.ok) return appleMusicFallback;
    const payload = (await response.json()) as { data?: AppleMusicTrack[] };
    const attributes = payload.data?.[0]?.attributes;
    if (!attributes?.name || !attributes.artistName) {
      return { ...appleMusicFallback, connected: true };
    }

    return {
      connected: true,
      title: attributes.name,
      artist: attributes.artistName,
      album: attributes.albumName,
      albumArt: formatAppleArtwork(attributes.artwork?.url),
      url: attributes.url,
    };
  } catch {
    return appleMusicFallback;
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
    cache: "no-store",
  });

  if (!response.ok) return null;
  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
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

export async function getGoogleHealthActivity(): Promise<GoogleHealthActivity> {
  try {
    const accessToken = await getGoogleHealthAccessToken();
    if (!accessToken) return googleHealthFallback;

    const monthStart = new Date();
    monthStart.setUTCDate(1);
    monthStart.setUTCHours(0, 0, 0, 0);

    const parameters = new URLSearchParams({
      pageSize: "25",
      filter: `exercise.interval.start_time >= "${monthStart.toISOString()}"`,
    });
    const response = await fetch(
      `https://health.googleapis.com/v4/users/me/dataTypes/exercise/dataPoints?${parameters.toString()}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 900 },
      },
    );

    if (!response.ok) return googleHealthFallback;
    const payload = (await response.json()) as { dataPoints?: GoogleHealthDataPoint[] };
    const exercises = (payload.dataPoints ?? [])
      .map((point) => point.exercise)
      .filter((exercise): exercise is GoogleHealthExercise => Boolean(exercise));
    const latest = exercises[0];

    if (!latest) {
      return {
        ...googleHealthFallback,
        connected: true,
        title: "No workouts yet this month",
        sport: "Google Health",
      };
    }

    const totalDistanceMillimeters = exercises.reduce(
      (sum, exercise) => sum + (exercise.metricsSummary?.distanceMillimeters ?? 0),
      0,
    );
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
      monthDistanceMiles: totalDistanceMillimeters / 1_609_344,
      monthActivities: exercises.length,
    };
  } catch {
    return googleHealthFallback;
  }
}
