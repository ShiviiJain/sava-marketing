#!/usr/bin/env bun
/**
 * Reads packages/tokens/tokens.css, extracts every OKLch primitive from
 * `:root` and `.dark`, and emits two TypeScript modules:
 *
 *   packages/tokens/src/tokens.generated.ts   token registry, light + dark
 *   packages/tokens/src/tokens.contrast.ts    AA / AAA pairs, computed
 *
 * Usage:  bun run --filter=@sava/tokens sync
 *
 * Output is committed to git so JS consumers (apps/design's color +
 * typography preview pages, future surfaces) don't need to regenerate
 * after a fresh clone. Re-run this script whenever you edit tokens.css
 * and commit both the source and the generated output.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE = resolve(__dirname, "../tokens.css");
const OUT_TOKENS = resolve(__dirname, "../src/tokens.generated.ts");
const OUT_CONTRAST = resolve(__dirname, "../src/tokens.contrast.ts");

interface TokenMap {
  [name: string]: { light?: string; dark?: string };
}

// ---------------------------------------------------------------------------
// Parse :root / .dark from globals.css
// ---------------------------------------------------------------------------

function parseTokens(): TokenMap {
  let css: string;
  try {
    css = readFileSync(SOURCE, "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error(
        `[sync-tokens] Cannot read ${SOURCE}. The token sync reads packages/tokens/tokens.css — make sure the workspace is fully checked out and try \`bun install\` from the repo root.`
      );
    }
    throw err;
  }
  const root = postcss.parse(css);
  const tokens: TokenMap = {};

  // Only top-level :root and .dark — skip rules nested inside @media or @layer
  // so preference overrides (e.g. prefers-reduced-motion) don't clobber the
  // canonical token values.
  root.walkRules((rule) => {
    if (rule.parent?.type !== "root") return;
    const mode = rule.selector === ":root" ? "light" : rule.selector === ".dark" ? "dark" : null;
    if (!mode) return;
    rule.walkDecls((decl) => {
      if (!decl.prop.startsWith("--")) return;
      const name = decl.prop.slice(2);
      tokens[name] ??= {};
      tokens[name][mode] = decl.value.trim();
    });
  });

  // `@theme inline` is Tailwind v4's canonical token-definition site. Most of
  // its declarations are aliases (`--color-card: var(--card)`) for tokens that
  // already live in :root, but a handful — `--radius-sm/md/lg/xl`, the
  // `--text-*` size+line-height pairs — are *only* defined here. Walk @theme
  // inline and add any name not already populated by :root/.dark so the docs
  // registry covers them. Skip names already seen so :root/.dark mode-aware
  // values aren't shadowed by single-mode @theme aliases. Skip the
  // `--color-X` aliases for tokens already exposed under their base name —
  // they're Tailwind utility plumbing, not new doc-facing tokens.
  root.walkAtRules("theme", (atRule) => {
    if (atRule.parent?.type !== "root") return;
    if (atRule.params.trim() !== "inline") return;
    atRule.walkDecls((decl) => {
      if (!decl.prop.startsWith("--")) return;
      const name = decl.prop.slice(2);
      if (name in tokens) return;
      if (name.startsWith("color-") && name.slice("color-".length) in tokens) return;
      tokens[name] = { light: decl.value.trim() };
    });
  });

  return tokens;
}

// ---------------------------------------------------------------------------
// OKLch → sRGB → relative luminance → WCAG contrast ratio
// Reference: https://drafts.csswg.org/css-color-4/#color-conversion-code
// ---------------------------------------------------------------------------

const OKLCH_RE = /oklch\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\s*(?:\/\s*([0-9.]+))?\s*\)/;

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function oklchToSrgb(L: number, C: number, h: number): Rgb {
  // OKLch → OKLab
  const a = C * Math.cos((h * Math.PI) / 180);
  const b = C * Math.sin((h * Math.PI) / 180);
  // OKLab → linear sRGB (matrix from CSS Color 4 spec)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  const lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  // linear → gamma-corrected sRGB
  const toGamma = (x: number) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055);
  return {
    r: Math.max(0, Math.min(1, toGamma(lr))),
    g: Math.max(0, Math.min(1, toGamma(lg))),
    b: Math.max(0, Math.min(1, toGamma(lb))),
  };
}

function relativeLuminance({ r, g, b }: Rgb): number {
  // WCAG 2.2 references the IEC 61966-2-1 sRGB linearisation cutoff at 0.04045.
  // (An older WCAG draft used 0.03928; close, but produces slightly wrong
  //  luminance for channel values in the (0.03928, 0.04045] range.)
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function parseOklch(value: string): Rgb | null {
  const m = OKLCH_RE.exec(value);
  if (!m) return null;
  const [, L, C, H] = m;
  return oklchToSrgb(parseFloat(L), parseFloat(C), parseFloat(H));
}

function level(ratio: number): "AAA" | "AA" | "AA-Large" | "Fail" {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA-Large";
  return "Fail";
}

// ---------------------------------------------------------------------------
// Resolve var(--foo) references against the token map until we land on an
// oklch() literal. Returns null if the chain bottoms out on a non-oklch value
// (e.g. `transparent`) or hits a missing reference.
// ---------------------------------------------------------------------------

const VAR_RE = /^var\(\s*--([a-z0-9-]+)\s*\)$/i;

function resolveValue(name: string, mode: "light" | "dark", tokens: TokenMap): string | null {
  const seen = new Set<string>();
  let current: string | undefined = tokens[name]?.[mode] ?? tokens[name]?.light;
  while (current) {
    const ref = VAR_RE.exec(current);
    if (!ref) return current;
    const [, target] = ref;
    if (seen.has(target)) return null; // cycle
    seen.add(target);
    current = tokens[target]?.[mode] ?? tokens[target]?.light;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Discover fg/bg pairs automatically: every token X where X-foreground exists
// gets a pair. Falls through aliases, so `--status-success: var(--moss-100)`
// still resolves to the underlying oklch value for contrast computation.
// ---------------------------------------------------------------------------

function discoverPairs(tokens: TokenMap): Array<[string, string]> {
  const pairs: Array<[string, string]> = [];
  for (const name of Object.keys(tokens).sort()) {
    if (name.endsWith("-foreground")) continue;
    if (!(`${name}-foreground` in tokens)) continue;
    pairs.push([name, `${name}-foreground`]);
  }
  return pairs;
}

// ---------------------------------------------------------------------------
// Emit TS modules
// ---------------------------------------------------------------------------

// Family names for next/font CSS variables. The variables themselves are
// only meaningful inside the cascade, so for the JS token registry we
// substitute the resolved family name — Storybook panels and any other JS
// consumer can read the value directly without needing the browser to
// resolve var(--font-*).
const FONT_VAR_FAMILY: Record<string, string> = {
  "font-charter": "Charter",
  "font-geist-sans": "Geist",
  "font-geist-mono": "Geist Mono",
};

const FONT_VAR_RE = /var\(\s*--([a-z0-9-]+)\s*\)/gi;

function resolveFontVars(value: string | undefined): string | undefined {
  if (!value) return value;
  return value.replace(FONT_VAR_RE, (full, name) => {
    const family = FONT_VAR_FAMILY[name];
    return family ? JSON.stringify(family) : full;
  });
}

function emit(): void {
  const tokens = parseTokens();
  const tokenEntries = Object.entries(tokens).sort(([a], [b]) => a.localeCompare(b));

  // Discover ramps — any token following the `name-step` pattern with a numeric
  // step gets grouped so the docs can render the full ramp without hardcoding
  // step counts (Ash has 22 steps, Tundra has 14, the rest have 11).
  const ramps: Record<string, number[]> = {};
  for (const name of Object.keys(tokens)) {
    const m = /^([a-z]+)-(\d+)$/.exec(name);
    if (!m) continue;
    const [, ramp, step] = m;
    if (!ramps[ramp]) ramps[ramp] = [];
    ramps[ramp].push(parseInt(step, 10));
  }
  // Ramps use 25/50/100/.../900/950 steps; non-ramp numbered series like
  // chart-1..10 use small ordinal slots. Filter on min step to keep the
  // discovery generic — adding a new ramp shouldn't require editing this list.
  const rampEntries = Object.entries(ramps)
    .filter(([, steps]) => steps.length >= 5 && Math.min(...steps) >= 25)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, steps]) => [name, steps.sort((a, b) => a - b)] as const);

  const tokensTs = [
    "// AUTO-GENERATED — do not edit by hand.",
    "// Regenerated from packages/tokens/tokens.css by packages/tokens/scripts/sync-tokens.ts.",
    "// Run `bun run --filter=@sava/tokens sync` from the repo root to refresh.",
    "",
    "export const TOKENS = {",
    ...tokenEntries.map(([name, modes]) => {
      const isFontFamily = name.startsWith("font-") && name !== "font-cursive";
      const light = isFontFamily ? resolveFontVars(modes.light) : modes.light;
      const dark = isFontFamily ? resolveFontVars(modes.dark) : modes.dark;
      return `  ${JSON.stringify(name)}: { light: ${JSON.stringify(light ?? null)}, dark: ${JSON.stringify(dark ?? null)} },`;
    }),
    "} as const;",
    "",
    "export type TokenName = keyof typeof TOKENS;",
    "",
    "/** Named ramps grouped by step so docs can render full ramp gradients. */",
    "export const RAMPS = {",
    ...rampEntries.map(([name, steps]) => `  ${JSON.stringify(name)}: [${steps.join(", ")}],`),
    "} as const;",
    "",
    "export type RampName = keyof typeof RAMPS;",
    "",
  ].join("\n");

  writeFileSync(OUT_TOKENS, tokensTs);

  // Contrast pairs — auto-discovered from every token with a -foreground sibling
  const pairs = discoverPairs(tokens);
  const contrastEntries: string[] = [];
  for (const [bgName, fgName] of pairs) {
    const lightBgValue = resolveValue(bgName, "light", tokens);
    const lightFgValue = resolveValue(fgName, "light", tokens);
    const darkBgValue = resolveValue(bgName, "dark", tokens);
    const darkFgValue = resolveValue(fgName, "dark", tokens);
    const lightBg = lightBgValue ? parseOklch(lightBgValue) : null;
    const lightFg = lightFgValue ? parseOklch(lightFgValue) : null;
    const darkBg = darkBgValue ? parseOklch(darkBgValue) : null;
    const darkFg = darkFgValue ? parseOklch(darkFgValue) : null;
    const lightRatio = lightBg && lightFg ? contrastRatio(lightBg, lightFg) : null;
    const darkRatio = darkBg && darkFg ? contrastRatio(darkBg, darkFg) : null;
    contrastEntries.push(
      `  ${JSON.stringify(bgName)}: {
    light: ${
      lightRatio === null
        ? "null"
        : `{ ratio: ${lightRatio.toFixed(2)}, level: ${JSON.stringify(level(lightRatio))} }`
    },
    dark: ${
      darkRatio === null
        ? "null"
        : `{ ratio: ${darkRatio.toFixed(2)}, level: ${JSON.stringify(level(darkRatio))} }`
    },
  },`
    );
  }

  const contrastTs = [
    "// AUTO-GENERATED — do not edit by hand.",
    "// Computes WCAG contrast ratios from the OKLch primitives in tokens.generated.ts.",
    "// OKLch → sRGB conversion: CSS Color 4 spec.",
    "// WCAG luminance formula: https://www.w3.org/WAI/WCAG22/Techniques/general/G18.",
    "",
    "export interface ContrastResult {",
    "  ratio: number;",
    '  level: "AAA" | "AA" | "AA-Large" | "Fail";',
    "}",
    "",
    "export const CONTRAST: Record<string, { light: ContrastResult | null; dark: ContrastResult | null }> = {",
    ...contrastEntries,
    "};",
    "",
  ].join("\n");

  writeFileSync(OUT_CONTRAST, contrastTs);

  console.log(
    `[sync-tokens] wrote ${tokenEntries.length} tokens, ${contrastEntries.length} contrast pairs.`
  );
}

emit();
