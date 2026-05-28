import { Button, type ButtonVariantProps, cn } from "@sava/ui";
import type * as React from "react";

// Marketing presets are kept local because Command Center uses shadcn
// neutrals — pushing cedar/yarrow into @sava/ui would mix two registers.
type BrandVariant =
  // Marketing CTA hierarchy on cedar grounds — primary/secondary/tertiary.
  | "primary"
  | "secondary"
  | "tertiary"
  // Legacy named variants for non-cedar grounds and one-off treatments.
  | "yarrow"
  | "cedar"
  | "ghost-light"
  | "ghost-dark"
  | "outline-cedar"
  | "outline-yarrow"
  | "outline-light"
  | "link"
  | "chip-cedar"
  | "chip-yarrow";

// Filled CTAs ground their hover state with a darker shade + nudge any
// trailing arrow icon a hair to the right — the small movement is what
// makes the surface feel alive without becoming chrome.
const ARROW_SLIDE = "[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5";

const VARIANT_CLASSES: Record<BrandVariant, string> = {
  primary: `brand-button-primary-animated rounded-lg font-mono [&_svg]:hidden`,
  secondary:
    "border border-yarrow-500 bg-transparent text-parchment-50 hover:bg-yarrow-500 hover:text-cedar-900",
  tertiary: `text-parchment-50 hover:text-yarrow-300 ${ARROW_SLIDE}`,
  yarrow: `bg-yarrow-500 text-cedar-900 hover:bg-yarrow-600 ${ARROW_SLIDE}`,
  cedar: `bg-cedar-900 text-parchment-50 hover:bg-cedar-950 ${ARROW_SLIDE}`,
  "ghost-light": "text-parchment-50 hover:bg-parchment-50/10 hover:text-parchment-50",
  "ghost-dark": "text-cedar-900 hover:bg-cedar-900/10 hover:text-cedar-900",
  "outline-cedar":
    "border border-cedar-900 bg-transparent text-cedar-900 hover:bg-cedar-900 hover:text-parchment-50",
  "outline-yarrow":
    "border border-yarrow-500 bg-transparent text-yarrow-500 hover:bg-yarrow-500 hover:text-cedar-900",
  "outline-light":
    "border border-parchment-50 bg-transparent text-parchment-50 hover:bg-parchment-50 hover:text-cedar-900",
  // Inline serif italic link — opts out of the Button shell (h-auto, no
  // padding, no bg) so it reads as editorial type, not a chip. Animated
  // underline thickens on hover.
  link: `h-auto bg-transparent px-0 py-0 font-serif text-base italic text-cedar-900 underline decoration-cedar-900/25 decoration-1 underline-offset-[6px] transition-[text-decoration-color,text-decoration-thickness] hover:decoration-cedar-900 hover:decoration-2 ${ARROW_SLIDE}`,
  "chip-cedar":
    "h-auto rounded-full bg-cedar-900 px-4 py-1.5 font-mono font-semibold text-2xs text-parchment-50 uppercase tracking-[0.16em] hover:bg-cedar-700",
  "chip-yarrow":
    "h-auto rounded-full bg-yarrow-500 px-4 py-1.5 font-mono font-semibold text-2xs text-cedar-900 uppercase tracking-[0.16em] hover:bg-yarrow-600",
};

const VARIANT_BASE: Record<BrandVariant, ButtonVariantProps["variant"]> = {
  primary: "default",
  secondary: "outline",
  tertiary: "ghost",
  yarrow: "default",
  cedar: "default",
  "ghost-light": "ghost",
  "ghost-dark": "ghost",
  "outline-cedar": "outline",
  "outline-yarrow": "outline",
  "outline-light": "outline",
  link: "ghost",
  "chip-cedar": "default",
  "chip-yarrow": "default",
};

interface BrandButtonProps extends Omit<React.ComponentProps<typeof Button>, "variant"> {
  brand?: BrandVariant;
}

export function BrandButton({ brand = "primary", className, ...props }: BrandButtonProps) {
  return (
    <Button
      variant={VARIANT_BASE[brand]}
      className={cn(VARIANT_CLASSES[brand], className)}
      {...props}
    />
  );
}
