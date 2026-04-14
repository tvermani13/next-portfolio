import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Pin Turbopack root when multiple package-lock.json files exist (e.g. in $HOME).
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** Subpath when using GitHub project pages (`/{repo}`). Empty for `username.github.io` repos. */
const rawBase =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "").trim() ?? "";
const basePath = rawBase && rawBase !== "/" ? rawBase : undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
