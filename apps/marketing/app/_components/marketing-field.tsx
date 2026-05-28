import { cn } from "@sava/ui";
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

interface MarketingFieldProps {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Field wraps a single labeled control. When `error` is set, the field
 * renders a sibling error paragraph AND attaches its id to the control's
 * `aria-describedby` so screen readers announce the message when the
 * control receives focus.
 */
export function MarketingField({
  label,
  htmlFor,
  optional,
  error,
  className,
  children,
}: MarketingFieldProps) {
  const errorId = error ? `${htmlFor}-error` : undefined;
  const control = error && isValidElement(children) ? withDescribedBy(children, errorId) : children;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between">
        <label htmlFor={htmlFor} className="font-medium text-base text-foreground">
          {label}
        </label>
        {optional && <span className="text-muted-foreground text-sm">Optional</span>}
      </div>
      {control}
      {error && (
        <p id={errorId} role="alert" className="text-destructive text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

function withDescribedBy(child: ReactElement, errorId: string | undefined): ReactElement {
  if (!errorId) return child;
  const typed = child as ReactElement<{ "aria-describedby"?: string }>;
  const existing = typed.props["aria-describedby"];
  const merged = existing ? `${existing} ${errorId}` : errorId;
  return cloneElement(typed, { "aria-describedby": merged });
}
