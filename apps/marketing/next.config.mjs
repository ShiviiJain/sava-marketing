/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  // Marketing surface composes from the design system; transpile so
  // Tailwind v4 + RSC syntax in @sava/ui and (future) @sava/web
  // components work without a separate build step.
  transpilePackages: ["@sava/ui"],
  images: {
    // Allowed quality values when callers pass `quality={...}`. 75 is Next's
    // default. 95 is the high-detail variant we use for portraits where
    // soft compression artifacts on faces are noticeable.
    qualities: [75, 95],
  },
};

export default config;
