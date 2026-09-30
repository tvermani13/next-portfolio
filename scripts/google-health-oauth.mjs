import { createServer } from "node:http";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PORT = 8788;
const REDIRECT_URI = `http://localhost:${PORT}/exchange_token`;
const SCOPE = "https://www.googleapis.com/auth/googlehealth.activity_and_fitness.readonly";
const ENV_PATH = resolve(process.cwd(), ".env.local");

function loadEnv(path) {
  const env = {};
  let text = "";
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return { env, text };
  }

  for (const line of text.split("\n")) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const index = line.indexOf("=");
    env[line.slice(0, index)] = line.slice(index + 1).trim().replace(/^["']|["']$/g, "");
  }

  return { env, text };
}

function upsertEnv(path, currentText, updates) {
  let text = currentText;
  for (const [key, value] of Object.entries(updates)) {
    const line = `${key}=${value}`;
    const pattern = new RegExp(`^${key}=.*$`, "m");
    if (pattern.test(text)) {
      text = text.replace(pattern, line);
    } else {
      text = `${text.replace(/\s*$/, "")}\n${line}\n`;
    }
  }
  writeFileSync(path, text);
}

const { env, text } = loadEnv(ENV_PATH);
const clientId = process.env.GOOGLE_HEALTH_CLIENT_ID || env.GOOGLE_HEALTH_CLIENT_ID;
const clientSecret = process.env.GOOGLE_HEALTH_CLIENT_SECRET || env.GOOGLE_HEALTH_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("Add GOOGLE_HEALTH_CLIENT_ID and GOOGLE_HEALTH_CLIENT_SECRET to .env.local, then rerun:");
  console.error("  node scripts/google-health-oauth.mjs");
  process.exit(1);
}

const authorizeUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authorizeUrl.searchParams.set("client_id", clientId);
authorizeUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authorizeUrl.searchParams.set("response_type", "code");
authorizeUrl.searchParams.set("access_type", "offline");
authorizeUrl.searchParams.set("prompt", "consent");
authorizeUrl.searchParams.set("scope", SCOPE);

console.log("In Google Cloud, this OAuth client's Authorized redirect URIs must include:");
console.log(`  ${REDIRECT_URI}`);
console.log("Publishing status should be In production, or the refresh token expires in 7 days.");
console.log("Open this URL and allow activity access:\n");
console.log(authorizeUrl.toString());
console.log(`\nWaiting on ${REDIRECT_URI} …`);

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://localhost:${PORT}`);
  if (url.pathname !== "/exchange_token") {
    response.writeHead(404);
    response.end();
    return;
  }

  const error = url.searchParams.get("error");
  if (error) {
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.end(`Google returned ${error}`);
    console.error("Google OAuth error:", error, url.searchParams.get("error_description"));
    server.close();
    return;
  }

  const code = url.searchParams.get("code");
  if (!code) {
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.end("Missing authorization code.");
    return;
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  const payload = await tokenResponse.json();
  if (!tokenResponse.ok || !payload.refresh_token) {
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Token exchange failed. Check the terminal.");
    console.error(
      "Token exchange failed:",
      tokenResponse.status,
      payload.error || payload.error_description || payload,
    );
    server.close();
    return;
  }

  upsertEnv(ENV_PATH, text, {
    GOOGLE_HEALTH_CLIENT_ID: clientId,
    GOOGLE_HEALTH_CLIENT_SECRET: clientSecret,
    GOOGLE_HEALTH_REFRESH_TOKEN: payload.refresh_token,
  });

  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end("<p>Fitbit / Google Health connected. You can close this tab and return to the terminal.</p>");
  console.log("Wrote GOOGLE_HEALTH_REFRESH_TOKEN to .env.local. Do not commit that file.");
  console.log("Granted scope:", payload.scope ?? SCOPE);
  server.close();
});

server.listen(PORT);
