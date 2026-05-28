"use client";

import { cn } from "@sava/ui";
import { type MouseEvent, type ReactNode, useRef, useState } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

// Yarrow fill with a soft white sheen that sweeps across on hover. The
// sweep is a single absolutely-positioned span translated from -100% to
// +100% over 800ms — same primitive as a "shine" effect on premium
// product pages.
export function ShimmerButton({ children, className }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "group relative overflow-hidden rounded-md bg-yarrow-500 px-6 py-3 font-medium text-cedar-900 text-sm shadow-sm transition-shadow duration-300 hover:shadow-md hover:shadow-yarrow-500/30",
        className
      )}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-[800ms] ease-in-out group-hover:translate-x-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.45) 50%, transparent)",
        }}
      />
    </button>
  );
}

// Parchment outline that fills from the left on hover, label colors
// invert from parchment → cedar. Classic "fill the chip" interaction
// done with clip-free transform on a colored layer.
export function SlideFillButton({ children, className }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "group relative overflow-hidden rounded-md border border-parchment-50 px-6 py-3 font-medium text-parchment-50 text-sm transition-colors duration-500 hover:text-cedar-900",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-parchment-50 transition-transform duration-500 ease-out group-hover:translate-x-0"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}

// Magnetic — button drifts toward the cursor as it moves over the
// bounding box. The displacement is 30% of the cursor's offset from the
// center, capped by the box itself. Uses a transform on the inner span
// so the click target stays in place; only the visible chrome moves.
export function MagneticButton({ children, className }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMove(e: MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    });
  }

  return (
    <button
      ref={ref}
      type="button"
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className={cn(
        "rounded-md bg-yarrow-500 px-6 py-3 font-medium text-cedar-900 text-sm transition-transform duration-200 ease-out will-change-transform hover:bg-yarrow-600",
        className
      )}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      {children}
    </button>
  );
}

// Lifts off the surface on hover — translateY plus a deeper yarrow-tinted
// shadow. Cheap to render, reads as "this is the call to action".
export function LiftButton({ children, className }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-md bg-cedar-900 px-6 py-3 font-medium text-parchment-50 text-sm shadow-sm shadow-cedar-950/40 transition-all duration-300 hover:-translate-y-1 hover:bg-cedar-950 hover:shadow-xl hover:shadow-yarrow-500/30",
        className
      )}
    >
      {children}
    </button>
  );
}

// Split-flap label. Default label slides up out of view, a second copy
// slides in from below. Both labels rendered to keep width stable.
export function SplitFlapButton({ children, className }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "group relative overflow-hidden rounded-md border border-yarrow-500 px-6 py-3 font-medium text-sm text-yarrow-500 transition-colors duration-300 hover:text-yarrow-600",
        className
      )}
    >
      <span className="invisible inline-flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-300 ease-out group-hover:translate-y-0">
        {children}
      </span>
    </button>
  );
}

// Inline text-link with an SVG underline that draws on hover. Uses
// stroke-dashoffset to animate the path from 0 → full length.
export function UnderlineDrawButton({ children, className }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "group relative inline-flex items-center gap-2 font-serif text-base italic text-parchment-50 leading-none",
        className
      )}
    >
      <span>{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 6"
        preserveAspectRatio="none"
        className="absolute -bottom-2 start-0 h-1.5 w-full"
      >
        <path
          d="M0,3 Q25,5 50,3 T100,3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          className="text-yarrow-500 transition-[stroke-dashoffset] duration-700 ease-out group-hover:[stroke-dashoffset:0]"
        />
      </svg>
    </button>
  );
}

// 3D press — layered yarrow chip with a darker yarrow shadow plate
// behind it. Hover lifts; active pushes the top plate back down onto
// its shadow so the button reads as "clicked into the surface".
export function PressButton({ children, className }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "group relative inline-flex items-center gap-2 font-medium text-cedar-900 text-sm",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-1 rounded-md bg-yarrow-700"
      />
      <span className="relative block w-full rounded-md bg-yarrow-500 px-6 py-3 transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-active:translate-y-0.5">
        {children}
      </span>
    </button>
  );
}

// SVG rectangle that traces around the button's perimeter on hover.
// pathLength normalizes the path so a single dasharray covers it
// regardless of aspect ratio.
export function BorderDrawButton({ children, className }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "group relative inline-flex items-center gap-2 px-6 py-3 font-medium text-parchment-50 text-sm",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <rect
          x="1"
          y="1"
          width="98"
          height="38"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
          className="text-yarrow-500 transition-[stroke-dashoffset] duration-[900ms] ease-out group-hover:[stroke-dashoffset:0]"
        />
      </svg>
    </button>
  );
}

// 3D tilt — perspective rotation tracking the cursor. Mouse moves over
// the button get mapped to rotateX/rotateY within a small range, then
// reset on leave. preserve-3d keeps any child transforms readable in
// the rotated space.
export function TiltButton({ children, className }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState("");

  function handleMove(e: MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(600px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`);
  }

  return (
    <button
      ref={ref}
      type="button"
      onMouseMove={handleMove}
      onMouseLeave={() => setTransform("")}
      style={{ transform, transformStyle: "preserve-3d" }}
      className={cn(
        "rounded-md bg-cedar-900 px-6 py-3 font-medium text-parchment-50 text-sm shadow-lg shadow-cedar-950/40 transition-transform duration-150 ease-out will-change-transform hover:bg-cedar-950",
        className
      )}
    >
      {children}
    </button>
  );
}

// Letters animate individually on hover via staggered transition-delays.
// Each character lifts and the yarrow underline grows from left.
export function LetterStaggerButton({ children, className }: ButtonProps & { children: string }) {
  const chars = Array.from(children);
  return (
    <button
      type="button"
      className={cn(
        "group relative inline-flex items-baseline font-medium text-parchment-50 text-sm",
        className
      )}
    >
      <span className="inline-flex">
        {chars.map((c, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: char positions are stable for a given label
            key={i}
            style={{ transitionDelay: `${i * 25}ms` }}
            className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1"
          >
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
      <span
        aria-hidden="true"
        className="absolute -bottom-1 start-0 h-px w-0 bg-yarrow-500 transition-[width] duration-500 ease-out group-hover:w-full"
      />
    </button>
  );
}

// Asymmetric notched corners via clip-path. Cuts a triangle off the
// top-right and bottom-left, giving the button a slightly mechanical /
// engineering register that contrasts the soft fig-leaf motif.
export function NotchButton({ children, className }: ButtonProps) {
  return (
    <button
      type="button"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
      }}
      className={cn(
        "inline-flex items-center gap-2 bg-yarrow-500 px-6 py-3 font-medium text-cedar-900 text-sm transition-colors duration-300 hover:bg-yarrow-600",
        className
      )}
    >
      {children}
    </button>
  );
}

// Frosted glass — parchment overlay at low opacity with backdrop blur,
// so whatever ground sits behind the button shows through tinted. Pairs
// well with photos / leaf motifs and the like.
export function GlassButton({ children, className }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-md border border-parchment-50/20 bg-parchment-50/10 px-6 py-3 font-medium text-parchment-50 text-sm backdrop-blur-md transition-all duration-300 hover:border-parchment-50/40 hover:bg-parchment-50/20",
        className
      )}
    >
      {children}
    </button>
  );
}
