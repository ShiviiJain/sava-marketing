"use client";

import { ChevronDown } from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import type * as React from "react";
import { createContext, useContext } from "react";

import { Button, type ButtonVariantProps } from "./button";
import { cn } from "./cn";

// SplitButton pairs a primary action with a caret-triggered dropdown of
// related alternatives (Save / Save and exit / Save as draft). The compound
// shape (Action + Menu + Item) lets consumers drop in any DropdownMenu
// content — separators, labels, destructive items, shortcuts — without
// the root needing to know about every menu primitive.

type SplitButtonContextValue = {
  variant: NonNullable<ButtonVariantProps["variant"]>;
  tone: NonNullable<ButtonVariantProps["tone"]>;
  size: NonNullable<ButtonVariantProps["size"]>;
  disabled: boolean;
  loading: boolean;
};

const SplitButtonContext = createContext<SplitButtonContextValue | null>(null);

function useSplitButtonContext(component: string) {
  const ctx = useContext(SplitButtonContext);
  if (!ctx) {
    throw new Error(`<SplitButton.${component}> must be rendered inside <SplitButton>.`);
  }
  return ctx;
}

interface SplitButtonRootProps extends React.ComponentProps<"div"> {
  variant?: NonNullable<ButtonVariantProps["variant"]>;
  tone?: NonNullable<ButtonVariantProps["tone"]>;
  size?: Exclude<NonNullable<ButtonVariantProps["size"]>, "icon" | "icon-sm" | "icon-lg">;
  /** Disables both the action and the caret. */
  disabled?: boolean;
  /**
   * Marks the primary action as loading. The caret stays interactive so
   * users can still open the menu and pick an alternative while the primary
   * action is in flight.
   */
  loading?: boolean;
}

function SplitButtonRoot({
  className,
  variant = "default",
  tone = "default",
  size = "default",
  disabled = false,
  loading = false,
  children,
  ...props
}: SplitButtonRootProps) {
  return (
    <SplitButtonContext.Provider value={{ variant, tone, size, disabled, loading }}>
      <div
        data-slot="split-button"
        data-variant={variant}
        data-tone={tone}
        data-size={size}
        className={cn("inline-flex", className)}
        {...props}
      >
        {children}
      </div>
    </SplitButtonContext.Provider>
  );
}

type SplitButtonActionProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant" | "tone" | "size" | "disabled" | "loading"
>;

function SplitButtonAction({ className, ...props }: SplitButtonActionProps) {
  const { variant, tone, size, disabled, loading } = useSplitButtonContext("Action");
  return (
    <Button
      data-slot="split-button-action"
      variant={variant}
      tone={tone}
      size={size}
      disabled={disabled}
      loading={loading}
      // Primary keeps the left rounding; the right edge is shared with
      // the caret. focus-visible:z-10 lifts the focus ring above the
      // adjacent caret so it doesn't get clipped by the negative margin.
      className={cn("rounded-e-none focus-visible:z-10", className)}
      {...props}
    />
  );
}

interface SplitButtonMenuProps {
  /** aria-label for the icon-only caret trigger. Required for a11y. */
  ariaLabel: string;
  /** Optional className passed to the dropdown content surface. */
  contentClassName?: string;
  /** Match DropdownMenu.Content `align`. Defaults to `end` so the menu hugs the caret. */
  align?: React.ComponentProps<typeof DropdownMenuPrimitive.Content>["align"];
  /** Match DropdownMenu.Content `sideOffset`. */
  sideOffset?: number;
  /** Forwarded onOpenChange so consumers can react to menu state. */
  onOpenChange?: React.ComponentProps<typeof DropdownMenuPrimitive.Root>["onOpenChange"];
  children: React.ReactNode;
}

function SplitButtonMenu({
  ariaLabel,
  contentClassName,
  align = "end",
  sideOffset = 4,
  onOpenChange,
  children,
}: SplitButtonMenuProps) {
  const { variant, tone, size, disabled } = useSplitButtonContext("Menu");
  // The caret matches the primary's height via the icon-* size in the same
  // tier. Loading on the primary should not lock the caret — that's the
  // whole point of offering alternatives mid-flight — so we only forward
  // `disabled`, never `loading`.
  const iconSize: NonNullable<ButtonVariantProps["size"]> =
    size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon";

  return (
    <DropdownMenuPrimitive.Root onOpenChange={onOpenChange}>
      <DropdownMenuPrimitive.Trigger asChild>
        <Button
          data-slot="split-button-trigger"
          variant={variant}
          tone={tone}
          size={iconSize}
          disabled={disabled}
          aria-label={ariaLabel}
          // -ml-px collapses the doubled border between the two buttons so
          // the seam reads as a single divider rather than a 2px stripe.
          className="-ml-px rounded-s-none focus-visible:z-10"
        >
          <ChevronDown />
        </Button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          data-slot="split-button-content"
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in",
            contentClassName
          )}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

type SplitButtonItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  /** Use `destructive` for items like "Discard draft". Mirrors DropdownMenuItem. */
  variant?: "default" | "destructive";
  inset?: boolean;
};

function SplitButtonItem({
  className,
  variant = "default",
  inset,
  ...props
}: SplitButtonItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="split-button-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:ps-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      {...props}
    />
  );
}

function SplitButtonSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="split-button-separator"
      className={cn("-mx-1 my-1 h-px bg-border-subtle", className)}
      {...props}
    />
  );
}

function SplitButtonLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="split-button-label"
      data-inset={inset}
      className={cn("px-2 py-1.5 font-medium text-sm data-[inset]:ps-8", className)}
      {...props}
    />
  );
}

const SplitButton = Object.assign(SplitButtonRoot, {
  Action: SplitButtonAction,
  Menu: SplitButtonMenu,
  Item: SplitButtonItem,
  Separator: SplitButtonSeparator,
  Label: SplitButtonLabel,
});

export type {
  SplitButtonActionProps,
  SplitButtonItemProps,
  SplitButtonMenuProps,
  SplitButtonRootProps as SplitButtonProps,
};
export { SplitButton };
