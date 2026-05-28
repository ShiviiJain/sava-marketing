# @sava/tokens

Single source of truth for Sava's CSS variable tokens and JS token registry.

## What's here

- `tokens.css` — every CSS custom property: OKLch primitives (`:root`, `.dark`) and Tailwind v4 theme aliases (`@theme inline`). Edit this file to add or change tokens.
- `src/tokens.generated.ts` — JS-readable token registry, light + dark values. Auto-generated from `tokens.css`. Committed.
- `src/tokens.contrast.ts` — WCAG contrast pairs auto-discovered from `*-foreground` siblings. Committed.
- `scripts/sync-tokens.ts` — parses `tokens.css`, emits the two `.ts` modules. Run after editing tokens.

## Consumers

| Surface | How it consumes |
|---|---|
| `apps/web` | CSS — `@import "@sava/tokens/tokens.css"` in `globals.css` |
| `apps/design` | CSS `@import` + JS — `import { TOKENS, RAMPS, CONTRAST } from "@sava/tokens"` for the color and typography preview pages |
| `apps/tools` (planned) | CSS `@import` from day one |
| Storybook | Transitively via `apps/web/globals.css` — no config change |

## Workflow

```bash
# 1. Edit tokens.css
# 2. Regenerate the JS registry
bun run --filter=@sava/tokens sync

# 3. Commit both tokens.css and the regenerated src/*.ts
```

## Adding a new token

- Add the light-mode value under `:root` in `tokens.css`.
- If it's mode-aware, add the dark-mode value under `.dark`.
- If it's a Tailwind v4 theme alias (`--color-X`, `--text-X`, etc.), add it to `@theme inline`.
- If it's part of a `name-foreground` pair, the contrast checker picks it up automatically.

## Why this package exists

Before this package, the tokens lived inline in `apps/web/app/globals.css` and were hand-mirrored into `apps/design/app/global.css` — a subset of ~160/750 tokens, already drifting. Adding a third surface (`apps/tools`) by hand-mirror would have made it three copies. Now there's one file; every surface `@import`s it.
