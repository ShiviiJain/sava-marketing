// In dev, /local/* is served from public/local/ as usual (gitignored,
// fast iteration). In any non-dev build (Vercel deploys, previews) the
// files aren't shipped with the repo, so we transparently proxy /local/*
// to the sava-fixtures-public bucket under the `marketing/` prefix.
// Drop a finalized file at `marketing/<same-filename>` in the bucket and
// the deployed site picks it up — no component changes needed.
const useRemoteImages =
  process.env.NODE_ENV !== "development" || process.env.NEXT_PUBLIC_USE_REMOTE_IMAGES === "true";

const REMOTE_IMAGE_BASE =
  process.env.NEXT_PUBLIC_FIXTURE_BASE ?? "https://sava-fixtures-public.s3.us-east-2.amazonaws.com";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  // Marketing surface composes from the design system; transpile so
  // Tailwind v4 + RSC syntax in @sava/ui and (future) @sava/web
  // components work without a separate build step.
  transpilePackages: ["@sava/ui"],
  images: {
    // next/image requires explicit allow-list for remote hosts. Production
    // photography (hero portraits, audience cards, tenet shots, leaves) lives
    // in the shared sava-fixtures-public bucket alongside the demo fixtures
    // the web app already pulls from. Reference via `marketingImage()` in
    // `./lib/fixture-urls.ts`.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sava-fixtures-public.s3.us-east-2.amazonaws.com",
      },
    ],
    // Allowed quality values when callers pass `quality={...}`. 75 is Next's
    // default. 95 is the high-detail variant we use for portraits where
    // soft compression artifacts on faces are noticeable.
    qualities: [75, 95],
  },
  async rewrites() {
    if (!useRemoteImages) return [];
    return [
      {
        source: "/local/:path*",
        destination: `${REMOTE_IMAGE_BASE}/marketing/:path*`,
      },
    ];
  },
};

export default config;
