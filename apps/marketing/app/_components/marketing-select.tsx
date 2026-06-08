import { cn } from "@sava/ui";
import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

export interface MarketingSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

/**
 * Marketing-scoped select atom. Matches MarketingInput (parchment ground,
 * cedar border + focus ring) and replaces the native chevron with a brand
 * ChevronDown via `appearance-none`.
 */
export function MarketingSelect({ className, invalid, children, ...props }: MarketingSelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "block w-full appearance-none rounded-md border border-cedar-900/20 bg-parchment-50 px-4 py-3 pe-11 text-base text-cedar-900 transition-colors",
          "hover:border-cedar-900/40",
          "focus:border-cedar-900 focus:outline-none focus:ring-2 focus:ring-cedar-900/20",
          "disabled:pointer-events-none disabled:opacity-50",
          invalid && "border-destructive focus:border-destructive focus:ring-destructive/20",
          className
        )}
        aria-invalid={invalid || undefined}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="-translate-y-1/2 pointer-events-none absolute end-4 top-1/2 size-4 text-cedar-900/50"
      />
    </div>
  );
}
