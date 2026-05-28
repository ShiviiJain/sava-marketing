import { cn } from "@sava/ui";
import type { InputHTMLAttributes } from "react";

export interface MarketingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

/**
 * Marketing-scoped input atom. Mirrors the look-and-feel of the `apps/web`
 * Input primitive but stays self-contained — promoting `@/components/ui/input`
 * out of apps/web into `@sava/ui` is a separate effort, and the marketing
 * form only needs a small subset of that primitive (no leadingVisual, no
 * trailingAction, no loading state). Keep this lean.
 */
export function MarketingInput({ className, invalid, ...props }: MarketingInputProps) {
  return (
    // biome-ignore lint: marketing-scoped Input atom — raw <input> is the implementation detail it hides; promoting apps/web Input to @sava/ui is tracked separately.
    <input
      className={cn(
        "block w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground transition-colors",
        "placeholder:text-muted-foreground",
        "hover:border-border-strong",
        "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
        "disabled:pointer-events-none disabled:opacity-50",
        invalid &&
          "border-destructive focus:border-destructive focus:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
