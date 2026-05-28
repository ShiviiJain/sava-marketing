/**
 * Marketing image URLs.
 *
 * Production marketing photography (hero portraits, audience cards, tenet
 * shots, leaf motifs) lives in the shared `sava-fixtures-public` S3 bucket
 * under the `marketing/` prefix — same bucket the web app uses for demo
 * fixtures, just a different prefix. Binaries don't belong in git.
 *
 * During iteration, prefer `/local/<file>` (gitignored) on your machine.
 * Once an image is finalized, upload it under `marketing/<key>` in the
 * bucket and swap the component to `marketingImage("<key>")`.
 *
 * Override the bucket at build-time with `NEXT_PUBLIC_FIXTURE_BASE` if you
 * need a different mirror (preview env, alt bucket, etc).
 */

const FIXTURE_BASE =
  process.env.NEXT_PUBLIC_FIXTURE_BASE ?? "https://sava-fixtures-public.s3.us-east-2.amazonaws.com";

/**
 * Resolve a marketing image key to its public bucket URL.
 *
 * Example:
 *   marketingImage("hero/hero-family.jpg")
 *   // → "https://sava-fixtures-public.s3.us-east-2.amazonaws.com/marketing/hero/hero-family.jpg"
 */
export function marketingImage(key: string): string {
  // Strip a leading slash so callers can pass either "hero/..." or "/hero/...".
  const normalized = key.replace(/^\/+/, "");
  return `${FIXTURE_BASE}/marketing/${normalized}`;
}
