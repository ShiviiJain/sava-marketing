"use client";

import type * as React from "react";
import { Children, cloneElement, createContext, isValidElement, useContext } from "react";

import { cn } from "./cn";

type ButtonGroupSize = "sm" | "default";

interface ButtonGroupContextValue {
  size: ButtonGroupSize;
  inGroup: true;
}

const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

/**
 * Reads the surrounding ButtonGroup size, if any. Available for primitives
 * that want to opt in to inheriting the group's size. Returns `null` when not
 * nested in a group.
 */
function useButtonGroupSize(): ButtonGroupSize | null {
  return useContext(ButtonGroupContext)?.size ?? null;
}

interface ButtonGroupProps extends React.ComponentProps<"div"> {
  /**
   * Size shared by every Button child. Only `sm` and `default` are supported —
   * `lg` reads as too loud in a group per the Primer pattern this is modelled
   * on. Children may still override per-button.
   */
  size?: ButtonGroupSize;
}

// Children inherit `size` via cloneElement so the Button primitive stays
// untouched. We only inject when the child hasn't already been given a `size`
// prop by the caller — explicit per-button overrides win. Context is also
// exposed (via `useButtonGroupSize`) for future primitives that want to
// participate without prop injection.
function injectSize(children: React.ReactNode, size: ButtonGroupSize): React.ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement<{ size?: unknown }>(child)) return child;
    if (child.props.size !== undefined) return child;
    return cloneElement(child, { size });
  });
}

function ButtonGroup({
  className,
  size = "default",
  children,
  role = "group",
  ...props
}: ButtonGroupProps) {
  // Border dedup is handled with sibling-combinator rules so the markup stays
  // flat (no wrapper per child):
  //   1. Flatten the inner radii — every child loses rounded corners, then
  //      first-child re-rounds left, last-child re-rounds right.
  //   2. Pull every non-first child left by 1px so the shared border edge
  //      collapses; raise z-index on focus/hover so the active button's ring
  //      paints over its neighbours' borders.
  // TODO(SAV-673): add ArrowLeft/ArrowRight roving-tabindex keyboard
  // navigation between members. Skipped for v1 to keep the PR small.
  return (
    <ButtonGroupContext.Provider value={{ size, inGroup: true }}>
      <div
        data-slot="button-group"
        data-size={size}
        role={role}
        className={cn(
          "inline-flex items-center",
          "[&>*]:rounded-none",
          "[&>*:first-child]:rounded-s-md",
          "[&>*:last-child]:rounded-e-md",
          "[&>*:not(:first-child)]:-ml-px",
          "[&>*:focus-visible]:relative [&>*:focus-visible]:z-10",
          "[&>*:hover]:relative [&>*:hover]:z-10",
          className
        )}
        {...props}
      >
        {injectSize(children, size)}
      </div>
    </ButtonGroupContext.Provider>
  );
}

export type { ButtonGroupProps, ButtonGroupSize };
export { ButtonGroup, ButtonGroupContext, useButtonGroupSize };
