import type { MetadataRoute } from "next";

import { site } from "@/content/config/site";
import { withBasePath } from "@/lib/paths";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: withBasePath("/"),
    },
    sitemap: new URL(withBasePath("/sitemap.xml"), site.url).toString(),
  };
}
