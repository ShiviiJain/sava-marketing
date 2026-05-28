"use client";

import { Check } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import type * as React from "react";
import { createContext, useContext, useId } from "react";

import { cn } from "./cn";

// TileRadio is a card-shaped single-select radio group. It owns three
// problems raw <button aria-pressed=...> tiles get wrong:
//   1) ARIA — single-select among siblings is a radio, not a toggle
//      group. Radix RadioGroup gives the right radiogroup / radio /
//      aria-checked contract for free.
//   2) Keyboard — arrow keys move within the group, only the active
//      member is in the tab order. Radix's roving tabindex handles it.
//   3) Visual seam — the selected ring, filled icon, and check
//      indicator stay consistent across surfaces instead of every flow
//      reinventing the styling.
//
// The compound shape — Root + Item — keeps the consumer in control of
// content (icon, title, description, badge) while the Root owns
// selection state, layout, and ARIA grouping.

type TileRadioSize = "default" | "sm";

type TileRadioContextValue = {
  size: TileRadioSize;
};

const TileRadioContext = createContext<TileRadioContextValue | null>(null);

function useTileRadioContext() {
  const ctx = useContext(TileRadioContext);
  if (!ctx) {
    throw new Error("<TileRadio.Item> must be rendered inside <TileRadio.Root>.");
  }
  return ctx;
}

interface TileRadioRootProps
  extends Omit<React.ComponentProps<typeof RadioGroupPrimitive.Root>, "asChild"> {
  /**
   * Tile size. `default` is the standard 5-padding tile used in onboarding
   * flows; `sm` tightens to 3 for dense settings surfaces.
   */
  size?: TileRadioSize;
}

function TileRadioRoot({
  className,
  size = "default",
  orientation = "vertical",
  children,
  ...props
}: TileRadioRootProps) {
  return (
    <TileRadioContext.Provider value={{ size }}>
      <RadioGroupPrimitive.Root
        data-slot="tile-radio"
        data-size={size}
        orientation={orientation}
        // Default to a vertical stack; consumers override with `grid grid-cols-2`
        // or similar via className when they want a 2-column or wider layout.
        className={cn("grid gap-3", className)}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Root>
    </TileRadioContext.Provider>
  );
}

interface TileRadioItemProps
  extends Omit<
    React.ComponentProps<typeof RadioGroupPrimitive.Item>,
    "children" | "asChild" | "title"
  > {
  /**
   * Optional leading icon. Renders inside a pill that fills with the
   * primary tone when the tile is selected.
   */
  icon?: React.ReactNode;
  /** Required label — the affordance the user is choosing. */
  label: React.ReactNode;
  /** Optional description below the label; keep to one short sentence. */
  description?: React.ReactNode;
  /**
   * Optional trailing slot — e.g. a "Recommended" Badge, a price, an
   * external-link icon. Rendered top-right of the tile.
   */
  badge?: React.ReactNode;
  /**
   * When false, hides the radio dot indicator. The selected ring + icon
   * fill still communicate state. Default true.
   */
  showIndicator?: boolean;
}

function TileRadioItem({
  className,
  icon,
  label,
  description,
  badge,
  showIndicator = true,
  id: idProp,
  ...props
}: TileRadioItemProps) {
  const { size } = useTileRadioContext();
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const labelId = `${id}-label`;
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <RadioGroupPrimitive.Item
      id={id}
      data-slot="tile-radio-item"
      data-size={size}
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      className={cn(
        "group relative flex w-full items-start gap-4 rounded-lg border bg-card text-start text-card-foreground",
        "transition-[color,background-color,border-color,box-shadow] duration-[var(--duration-fast,150ms)] ease-default",
        "outline-none",
        "hover:border-foreground/20 hover:bg-accent/40",
        "focus-visible:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary/5 data-[state=checked]:ring-1 data-[state=checked]:ring-primary",
        size === "default" ? "p-5" : "p-3",
        className
      )}
      {...props}
    >
      {icon ? (
        <span
          aria-hidden="true"
          data-slot="tile-radio-icon"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-md transition-colors",
            "bg-muted text-muted-foreground",
            "group-data-[state=checked]:bg-primary group-data-[state=checked]:text-primary-foreground",
            size === "default" ? "size-10 [&_svg]:size-5" : "size-8 [&_svg]:size-4"
          )}
        >
          {icon}
        </span>
      ) : null}

      <span data-slot="tile-radio-body" className="min-w-0 flex-1">
        <span
          id={labelId}
          data-slot="tile-radio-label"
          className={cn(
            "block font-semibold text-foreground",
            size === "default" ? "text-base" : "text-sm"
          )}
        >
          {label}
        </span>
        {description ? (
          <span
            id={descriptionId}
            data-slot="tile-radio-description"
            className={cn(
              "mt-1 block text-muted-foreground leading-relaxed",
              size === "default" ? "text-sm" : "text-xs"
            )}
          >
            {description}
          </span>
        ) : null}
      </span>

      {badge ? (
        <span data-slot="tile-radio-badge" className="ms-auto shrink-0 self-start">
          {badge}
        </span>
      ) : null}

      {showIndicator ? (
        <span
          aria-hidden="true"
          data-slot="tile-radio-indicator"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            "border-muted-foreground/30",
            "group-data-[state=checked]:border-primary group-data-[state=checked]:bg-primary group-data-[state=checked]:text-primary-foreground",
            size === "default" ? "size-5 self-start" : "size-4 self-start",
            // Bring the dot to its own column when there's no badge — keeps
            // the tile from collapsing into a square at narrow widths.
            badge ? "absolute end-3 top-3" : ""
          )}
        >
          <RadioGroupPrimitive.Indicator
            data-slot="tile-radio-indicator-dot"
            className="flex items-center justify-center"
          >
            <Check className={size === "default" ? "size-3" : "size-2.5"} strokeWidth={3} />
          </RadioGroupPrimitive.Indicator>
        </span>
      ) : null}
    </RadioGroupPrimitive.Item>
  );
}

const TileRadio = Object.assign(TileRadioRoot, {
  Root: TileRadioRoot,
  Item: TileRadioItem,
});

export type { TileRadioItemProps, TileRadioRootProps as TileRadioProps };
export { TileRadio, TileRadioItem };
