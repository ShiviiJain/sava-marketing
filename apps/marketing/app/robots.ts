import type { MetadataRoute } from "next";
import { SITE_URL } from "./_lib/seo";

/**
 * robots.txt directives.
 *
 * Allow everything by default; the `disallow` list mirrors routes that carry
 * `robots: { index: false }` in their page-level metadata, so crawlers
 * respect the same boundary at both layers.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/contact/thanks"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
