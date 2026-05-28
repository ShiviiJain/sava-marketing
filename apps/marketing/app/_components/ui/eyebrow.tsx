import { cn } from "@sava/ui";
import type * as React from "react";

type Ground = "cedar" | "parchment";

const GROUND_COLOR: Record<Ground, string> = {
  cedar: "text-yarrow-500",
  parchment: "text-yarrow-600",
};

interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  ground?: Ground;
  as?: "p" | "span";
  // Numeric labels ("01", "02") share the same mono accent treatment
  // but skip uppercase. Default true for text eyebrows.
  uppercase?: boolean;
}

export function Eyebrow({
  ground = "parchment",
  as: Tag = "p",
  uppercase = true,
  className,
  children,
  ...rest
}: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "font-mono font-semibold text-2xs tracking-[0.18em]",
        uppercase && "uppercase",
        GROUND_COLOR[ground],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
