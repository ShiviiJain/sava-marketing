import { cn } from "@sava/ui";
import Image from "next/image";
import type { ReactNode } from "react";
import { Eyebrow } from "./ui/eyebrow";

/**
 * Shared primitives for the on-brand product cards in the audience
 * platform showcases (/families, /attorneys, /advisors). These recreate
 * real product UI in the brand palette — cedar-900 text, Charter serif
 * titles, yarrow-mono labels, parchment/yarrow accents — so the cards
 * read as part of the marketing page rather than pasted-in screenshots.
 */

/** Round avatar — a photo when `src` is set, otherwise a yarrow monogram. */
export function Avatar({ initials, src, alt }: { initials: string; src?: string; alt?: string }) {
  if (src) {
    return (
      <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-parchment-200">
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes="36px"
          className="object-cover object-[center_30%]"
        />
      </span>
    );
  }
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-yarrow-200 font-medium font-mono text-[0.7rem] text-cedar-900 tracking-wide">
      {initials}
    </span>
  );
}

/** Eyebrow-labelled value, used in the detail grids. */
export function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <Eyebrow as="span">{label}</Eyebrow>
      <p className="mt-1.5 text-cedar-900 text-sm leading-snug">{value}</p>
    </div>
  );
}

/** Icon + serif title + sub, divided from the card body below. */
export function CardHeader({ icon, title, sub }: { icon: ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-3 border-cedar-900/10 border-b px-6 py-5">
      <span className="mt-0.5 text-cedar-700">{icon}</span>
      <div>
        <h4 className="font-normal font-serif text-cedar-900 text-lg leading-tight">{title}</h4>
        <p className="mt-1 text-cedar-900/55 text-xs leading-snug">{sub}</p>
      </div>
    </div>
  );
}

type PillTone = "parchment" | "yarrow" | "outline";

const PILL_TONE: Record<PillTone, string> = {
  parchment: "bg-parchment-200 text-cedar-900/80",
  yarrow: "bg-yarrow-200 text-yarrow-900",
  outline: "ring-1 ring-cedar-900/15 text-cedar-900/70",
};

/** Small status / stage pill. */
export function Pill({ children, tone = "parchment" }: { children: ReactNode; tone?: PillTone }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 font-medium text-xs",
        PILL_TONE[tone]
      )}
    >
      {children}
    </span>
  );
}

type DotTone = "yarrow" | "cedar" | "muted";

const DOT_TONE: Record<DotTone, string> = {
  yarrow: "bg-yarrow-500",
  cedar: "bg-cedar-600",
  muted: "bg-cedar-900/25",
};

/** Small status dot. */
export function Dot({ tone = "muted" }: { tone?: DotTone }) {
  return <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", DOT_TONE[tone])} />;
}
