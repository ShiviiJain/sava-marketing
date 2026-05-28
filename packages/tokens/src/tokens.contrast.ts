// AUTO-GENERATED — do not edit by hand.
// Computes WCAG contrast ratios from the OKLch primitives in tokens.generated.ts.
// OKLch → sRGB conversion: CSS Color 4 spec.
// WCAG luminance formula: https://www.w3.org/WAI/WCAG22/Techniques/general/G18.

export interface ContrastResult {
  ratio: number;
  level: "AAA" | "AA" | "AA-Large" | "Fail";
}

export const CONTRAST: Record<
  string,
  { light: ContrastResult | null; dark: ContrastResult | null }
> = {
  accent: {
    light: { ratio: 6.21, level: "AA" },
    dark: { ratio: 10.85, level: "AAA" },
  },
  brand: {
    light: { ratio: 11.85, level: "AAA" },
    dark: { ratio: 3.14, level: "AA-Large" },
  },
  card: {
    light: { ratio: 19.66, level: "AAA" },
    dark: { ratio: 12.96, level: "AAA" },
  },
  destructive: {
    light: { ratio: 5.38, level: "AA" },
    dark: { ratio: 3.48, level: "AA-Large" },
  },
  info: {
    light: { ratio: 5.94, level: "AA" },
    dark: { ratio: 5.59, level: "AA" },
  },
  muted: {
    light: { ratio: 4.38, level: "AA-Large" },
    dark: { ratio: 6.51, level: "AA" },
  },
  popover: {
    light: { ratio: 19.66, level: "AAA" },
    dark: { ratio: 12.96, level: "AAA" },
  },
  primary: {
    light: { ratio: 7.17, level: "AAA" },
    dark: { ratio: 6.56, level: "AA" },
  },
  secondary: {
    light: { ratio: 10.32, level: "AAA" },
    dark: { ratio: 11.72, level: "AAA" },
  },
  sidebar: {
    light: { ratio: 19.66, level: "AAA" },
    dark: { ratio: 16.24, level: "AAA" },
  },
  "sidebar-accent": {
    light: { ratio: 6.03, level: "AA" },
    dark: { ratio: 10.85, level: "AAA" },
  },
  "sidebar-primary": {
    light: { ratio: 7.17, level: "AAA" },
    dark: { ratio: 6.56, level: "AA" },
  },
  "status-danger": {
    light: { ratio: 8.96, level: "AAA" },
    dark: { ratio: 8.18, level: "AAA" },
  },
  "status-emerald": {
    light: { ratio: 9.08, level: "AAA" },
    dark: { ratio: 8.31, level: "AAA" },
  },
  "status-indigo": {
    light: { ratio: 9.55, level: "AAA" },
    dark: { ratio: 8.58, level: "AAA" },
  },
  "status-info": {
    light: { ratio: 10.17, level: "AAA" },
    dark: { ratio: 8.77, level: "AAA" },
  },
  "status-neutral": {
    light: { ratio: 10.96, level: "AAA" },
    dark: { ratio: 11.32, level: "AAA" },
  },
  "status-orange": {
    light: { ratio: 6.7, level: "AA" },
    dark: { ratio: 9.06, level: "AAA" },
  },
  "status-purple": {
    light: { ratio: 9.35, level: "AAA" },
    dark: { ratio: 8.29, level: "AAA" },
  },
  "status-rose": {
    light: { ratio: 8.24, level: "AAA" },
    dark: { ratio: 8.6, level: "AAA" },
  },
  "status-sky": {
    light: { ratio: 8.15, level: "AAA" },
    dark: { ratio: 8.76, level: "AAA" },
  },
  "status-slate": {
    light: { ratio: 10.96, level: "AAA" },
    dark: { ratio: 11.32, level: "AAA" },
  },
  "status-success": {
    light: { ratio: 9.08, level: "AAA" },
    dark: { ratio: 8.31, level: "AAA" },
  },
  "status-teal": {
    light: { ratio: 8.31, level: "AAA" },
    dark: { ratio: 8.68, level: "AAA" },
  },
  "status-warning": {
    light: { ratio: 9.22, level: "AAA" },
    dark: { ratio: 9.35, level: "AAA" },
  },
  success: {
    light: { ratio: 5.59, level: "AA" },
    dark: { ratio: 5.82, level: "AA" },
  },
  "urgency-critical": {
    light: { ratio: 5.38, level: "AA" },
    dark: { ratio: 3.48, level: "AA-Large" },
  },
  "urgency-high": {
    light: { ratio: 3.74, level: "AA-Large" },
    dark: { ratio: 6.15, level: "AA" },
  },
  "urgency-low": {
    light: { ratio: 5.94, level: "AA" },
    dark: { ratio: 3.63, level: "AA-Large" },
  },
  "urgency-medium": {
    light: { ratio: 7.72, level: "AAA" },
    dark: { ratio: 9.28, level: "AAA" },
  },
  warning: {
    light: { ratio: 7.72, level: "AAA" },
    dark: { ratio: 9.28, level: "AAA" },
  },
};
