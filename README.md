# Sava Marketing

Standalone marketing site for Sava Trust Company. Forked from the `apps/marketing`
slice of the savaos monorepo with `@sava/ui`, `@sava/tokens`, and `@sava/config`
vendored as workspace packages.

## Stack
- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- Bun (workspaces + package manager)

## Layout
```
apps/marketing/        the Next.js app (port 3020)
packages/ui/           shared UI primitives (Button, SavaLogo, cn, …)
packages/tokens/       brand color / typography tokens (tokens.css)
packages/config/       shared tsconfig + biome presets
```

## Dev
```
bun install
bun run dev          # marketing on http://localhost:3020
bun run build
bun run typecheck
```

## Images
Photography lives under `apps/marketing/public/local/` locally (gitignored).
For Vercel deploys, `/local/*` is rewritten to
`https://sava-fixtures-public.s3.us-east-2.amazonaws.com/marketing/*` — drop a
finalized file there under the same name and the deployed site picks it up.
See `apps/marketing/next.config.mjs`.

## Deploy
```
cd apps/marketing
npx vercel
```
