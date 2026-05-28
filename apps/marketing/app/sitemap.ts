import type { MetadataRoute } from "next";
import { SITE_URL } from "./_lib/seo";

/**
 * Sitemap for crawlers. `lastModified` reflects the last meaningful content
 * change for the page, not a build time — sitemap timestamps that change on
 * every redeploy train search engines to re-fetch unchanged content.
 *
 * Routes intentionally omitted:
 *   - `/contact/thanks` — `noindex` via its page-level metadata, no value
 *     to surface in search results.
 *   - `/signin` — auth-shaped route. Once it grows into a real sign-in
 *     surface (vs. the current "portal is moving" placeholder), it should
 *     stay out of the sitemap so crawl budget concentrates on content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/families`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/attorneys`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/advisors`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/assurance`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date("2026-05-17"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date("2026-05-07"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date("2026-05-07"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
