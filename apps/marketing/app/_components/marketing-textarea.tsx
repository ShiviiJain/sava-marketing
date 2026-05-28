import { cn } from "@sava/ui";
import type { TextareaHTMLAttributes } from "react";

export interface MarketingTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function MarketingTextarea({ className, invalid, ...props }: MarketingTextareaProps) {
  return (
    <textarea
      className={cn(
        "block w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground transition-colors",
        "placeholder:text-muted-foreground",
        "hover:border-border-strong",
        "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
        "disabled:pointer-events-none disabled:opacity-50",
        "resize-y",
        invalid && "border-destructive focus:border-destructive focus:ring-destructive/20",
        className
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
