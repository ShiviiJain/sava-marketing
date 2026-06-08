/**
 * Resolve a marketing image to a `/local/...` path.
 *
 * Code references each image by its path under `public/local`, e.g.
 * `asset("families-hero-v2.webp")` or `asset(`leaves/test-${n}.png`)`.
 * In dev these serve straight from `public/local`; in production
 * next.config rewrites `/local/*` to the Vercel Blob store, so the same
 * paths resolve without shipping the binaries in the repo.
 *
 * Override the base with `NEXT_PUBLIC_ASSET_BASE` if you need to point at
 * an alternate mirror.
 */
const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE ?? "/local";

export function asset(path: string): string {
  return `${ASSET_BASE}/${path.replace(/^\/+/, "")}`;
}
