# @sava/marketing

The public marketing surface for **savatrustcompany.com** — landing, pricing, brand,
careers, legal, contact.

## Run

```bash
bun run dev:marketing   # from repo root, dev server on :3020
```

Or filter directly: `turbo dev --filter=@sava/marketing`.

## Layout

- `app/` — Next.js App Router pages and route handlers.
- `app/global.css` — Tailwind v4 + `@sava/tokens` palette + typography.
- `public/` — static assets (favicons, OG images, brand SVGs).

## Conventions

- Composes from `@sava/tokens` (colors, type) and `@sava/ui` (Button, etc.).
  Don't duplicate palette CSS or primitive components.
- Server components by default. `"use client"` only when the page needs
  interactivity (e.g., the contact form's inline validation).
- Charter (display) + Geist Sans (body) — matches the canonical Sava type stack.
- Marketing copy lives co-located with the page until it grows past ~3 pages
  of body text; then move to MDX in `content/`.

## History

This app replaces the static prototype that previously lived at `apps/landing/`
(Shivi's PR #959). The prototype was retired once the typed rebuild reached
content parity; see PRs #1430, #1432, #1433, #1438, #1441, #1443 for the
slice-by-slice port.
