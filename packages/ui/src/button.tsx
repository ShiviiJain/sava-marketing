import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { Slot } from "radix-ui";
import type * as React from "react";

import { cn } from "./cn";

const buttonVariants = cva(
  [
    "touch-target",
    "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium text-sm",
    "transition-[color,background-color,border-color,box-shadow,opacity] duration-[var(--duration-fast)] ease-default",
    "outline-none",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      tone: {
        default: "",
        destructive: "",
        // Success tone — for buttons that produce a visible "accepted /
        // completed / approved" outcome (bulk-accept proposals, confirm
        // actions whose result lands as green inline state). Reserved for
        // actions where green is the visual continuity with the result;
        // generic affirmative actions stay tone="default" (primary).
        success: "",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4 [&_svg:not([class*='size-'])]:size-[1.125rem]",
        // Hero CTAs — onboarding "Get started", "Begin verification", flow
        // primary actions on portal surfaces. Sized for one-button-per-screen
        // moments where the button is the visual anchor.
        xl: "h-12 rounded-md px-8 text-base has-[>svg]:px-6 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-9",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-[1.125rem]",
      },
    },
    compoundVariants: [
      // tone="destructive" mirrors the destructive color across the neutral
      // hierarchy (Carbon-style). `default` collapses to the existing
      // destructive variant; `outline` and `ghost` keep their structural
      // shape but adopt destructive foreground + hover.
      {
        variant: "default",
        tone: "destructive",
        className:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
      },
      {
        variant: "outline",
        tone: "destructive",
        className:
          "border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive/20 dark:border-destructive/40 dark:bg-input/0 dark:hover:bg-destructive/15",
      },
      {
        variant: "ghost",
        tone: "destructive",
        className:
          "text-destructive hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/15",
      },
      // tone="success" mirrors the success token across the same hierarchy.
      // `default` is filled green (use sparingly — same restraint as the
      // primary CTA), `outline` is the most common form (secondary action
      // tinted to signal the green outcome), `ghost` for inline accept
      // affordances that don't want a chip border.
      {
        variant: "default",
        tone: "success",
        className:
          "bg-success text-success-foreground hover:bg-success/90 focus-visible:ring-success/30",
      },
      {
        variant: "outline",
        tone: "success",
        className:
          "border-success/40 text-success hover:border-success hover:bg-status-success focus-visible:ring-success/30 dark:border-success/40 dark:bg-input/0 dark:hover:bg-success/15",
      },
      {
        variant: "ghost",
        tone: "success",
        className:
          "text-success hover:bg-status-success hover:text-success dark:hover:bg-success/15",
      },
    ],
    defaultVariants: {
      variant: "default",
      tone: "default",
      size: "default",
    },
  }
);

interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /**
   * When true, prepends a spinner, fades the label, and sets `aria-busy`.
   * The button stays focusable but click is suppressed (rendered with
   * `disabled` semantics). Has no visual effect when `asChild` is true —
   * the consumer renders their own loading affordance.
   */
  loading?: boolean;
}

function Button({
  className,
  variant = "default",
  tone = "default",
  size = "default",
  asChild = false,
  loading = false,
  children,
  "aria-busy": ariaBusy,
  ...props
}: ButtonProps) {
  const isInert = props.disabled || loading;
  const computedAriaBusy = loading ? true : ariaBusy;
  const dataLoading = loading ? "" : undefined;
  const cls = cn(buttonVariants({ variant, tone, size, className }));

  if (asChild) {
    // `disabled` flows through ...props onto the slotted child (Slot.Root
    // doesn't expose `disabled` in its type, so we can't name it here).
    // For loading-only state, we surface aria-disabled instead — the
    // consumer is responsible for pairing asChild with a native <button>
    // and managing the actual disabled prop themselves.
    return (
      <Slot.Root
        data-slot="button"
        data-variant={variant}
        data-tone={tone}
        data-size={size}
        data-loading={dataLoading}
        aria-busy={computedAriaBusy}
        aria-disabled={isInert || undefined}
        className={cls}
        {...props}
      >
        {children}
      </Slot.Root>
    );
  }

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-tone={tone}
      data-size={size}
      data-loading={dataLoading}
      aria-busy={computedAriaBusy}
      className={cls}
      {...props}
      disabled={isInert}
    >
      {loading ? (
        <>
          <Loader2 aria-hidden className="animate-spin" />
          <span className="inline-flex items-center gap-1.5 opacity-70 [&_svg]:hidden">
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export { Button, buttonVariants };
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
