import { cn } from "@sava/ui";
import type { ReactNode } from "react";

interface SectionHeadProps {
  title: ReactNode;
  body?: ReactNode;
  align?: "center" | "start";
  className?: string;
}

/**
 * Section heading pattern used across marketing sections — display serif
 * title with italic-emphasis terminal phrase, optional supporting prose.
 * Mirrors the `.v3-section-head` register from Shivi's prototype.
 */
export function SectionHead({ title, body, align = "center", className }: SectionHeadProps) {
  return (
    <header
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "text-start",
        className
      )}
    >
      <h2 className="font-normal font-serif text-4xl text-foreground leading-[1.06] tracking-[-0.025em] sm:text-5xl md:text-[56px]">
        {title}
      </h2>
      {body && (
        <p className="mt-6 text-foreground-secondary text-lg leading-[1.55] md:text-xl">{body}</p>
      )}
    </header>
  );
}
