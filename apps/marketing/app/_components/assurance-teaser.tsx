import { cn } from "@sava/ui";
import { ArrowRight, BadgeCheck, Building2, Coins, Scale, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { BrandButton } from "./ui/brand-button";

interface Tag {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  /** Scatter position + slight rotation. */
  className: string;
}

// Fiduciary concepts scattered as little (upright) icon chips over the dot
// field, with an animated line tracing through them.
const TAGS: Tag[] = [
  { Icon: Scale, label: "Chartered", className: "top-[8%] left-[16%]" },
  { Icon: Building2, label: "Custodian", className: "top-[22%] right-[4%]" },
  { Icon: ShieldCheck, label: "Segregation", className: "top-[42%] left-[44%]" },
  { Icon: BadgeCheck, label: "KYC", className: "top-[54%] left-[4%]" },
  { Icon: Coins, label: "Capital reserve", className: "top-[74%] right-[8%]" },
  { Icon: UserRound, label: "Trust officer", className: "top-[88%] left-[22%]" },
];

// Grid-routed (Manhattan) path through the chip centers, top to bottom:
// Chartered → Custodian → Segregation → KYC → Capital reserve → Trust officer.
// Vertical-then-horizontal with small rounded corners; coords in viewBox %.
const TRACE_PATH =
  "M 27 12.5 L 27 22 Q 27 26.5 31 26.5 L 86 26.5 L 86 41 Q 86 46.5 81 46.5 L 59 46.5 L 59 53.5 Q 59 58.5 54 58.5 L 11 58.5 L 11 73.5 Q 11 78.5 16 78.5 L 79 78.5 L 79 87 Q 79 92 74 92 L 33 92";

/**
 * Homepage assurance teaser. The visual is a scattered field of little
 * icon-chips (the fiduciary primitives Sava handles) floating over a faint
 * dot grid, pointing to the full /assurance page.
 */
export function AssuranceTeaser() {
  return (
    <section className="overflow-hidden bg-parchment-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2 md:gap-20">
        <div>
          <h2 className="font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Built-in layers of protection.
          </h2>
          <p className="mt-6 max-w-md text-[1.0625rem] text-cedar-900/70 leading-[1.55] md:text-[1.1875rem]">
            Your assets stay yours, kept separate from Sava and looked after at every step.
          </p>
          <BrandButton
            asChild
            brand="cedar"
            size="xl"
            className="mt-8 rounded-sm bg-cedar-700 font-sans text-parchment-50 hover:bg-cedar-800"
          >
            <Link href="/assurance">
              How your trust is protected <ArrowRight aria-hidden="true" />
            </Link>
          </BrandButton>
        </div>

        <TagField />
      </div>
    </section>
  );
}

function TagField() {
  return (
    <div className="relative h-80 w-full sm:h-96">
      {/* Tiny dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(20,35,31,0.10) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Animated line tracing the path through the chips. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={TRACE_PATH}
          fill="none"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          className="stroke-cedar-900/10"
        />
        <path
          d={TRACE_PATH}
          fill="none"
          strokeWidth={1.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={100}
          className="tag-trace-line stroke-yarrow-500"
        />
      </svg>
      {TAGS.map((tag) => (
        <span
          key={tag.label}
          className={cn(
            "absolute inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1.5 font-medium text-cedar-900 text-xs shadow-lg shadow-cedar-900/15 ring-1 ring-cedar-900/10",
            tag.className
          )}
        >
          <tag.Icon aria-hidden="true" className="size-3.5 text-cedar-700" strokeWidth={2} />
          {tag.label}
        </span>
      ))}
    </div>
  );
}
