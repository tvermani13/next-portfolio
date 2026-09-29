import { createServer } from "node:http";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PORT = 8787;
const REDIRECT_URI = `http://localhost:${PORT}/exchange_token`;
const SCOPE = "read,activity:read_all";
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
const clientId = process.env.STRAVA_CLIENT_ID || env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET || env.STRAVA_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("Add STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET to .env.local, then rerun:");
  console.error("  node scripts/strava-oauth.mjs");
  process.exit(1);
}

const authorizeUrl = new URL("https://www.strava.com/oauth/authorize");
authorizeUrl.searchParams.set("client_id", clientId);
authorizeUrl.searchParams.set("response_type", "code");
authorizeUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authorizeUrl.searchParams.set("approval_prompt", "force");
authorizeUrl.searchParams.set("scope", SCOPE);

console.log("Authorization Callback Domain in Strava must be: localhost");
console.log("Open this URL, then click Authorize:\n");
console.log(authorizeUrl.toString());
console.log(`\nWaiting on ${REDIRECT_URI} …`);

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://localhost:${PORT}`);
  if (url.pathname !== "/exchange_token") {
    response.writeHead(404);
    response.end();
    return;
  }

  const code = url.searchParams.get("code");
  const scope = url.searchParams.get("scope") ?? "";
  if (!code) {
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.end("Missing authorization code.");
    return;
  }

  if (!scope.split(",").includes("activity:read_all") && !scope.split(",").includes("activity:read")) {
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.end("Authorize again and allow activity access.");
    console.error("Strava did not grant activity:read. Scope was:", scope);
    server.close();
    return;
  }

  const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
    }),
  });

  const payload = await tokenResponse.json();
  if (!tokenResponse.ok || !payload.refresh_token) {
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Token exchange failed. Check the terminal.");
    console.error("Token exchange failed:", tokenResponse.status, payload.message || payload.errors || payload);
    server.close();
    return;
  }

  upsertEnv(ENV_PATH, text, {
    STRAVA_CLIENT_ID: clientId,
    STRAVA_CLIENT_SECRET: clientSecret,
    STRAVA_REFRESH_TOKEN: payload.refresh_token,
  });

  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end("<p>Strava connected. You can close this tab and return to the terminal.</p>");
  console.log("Wrote STRAVA_REFRESH_TOKEN to .env.local. Do not commit that file.");
  console.log("Granted scope:", scope);
  server.close();
});

server.listen(PORT);
