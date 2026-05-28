"use client";

import { cn } from "@sava/ui";
import Link from "next/link";
import type * as React from "react";

interface GlowButtonOwnProps {
  // When set, renders as a Next.js Link instead of a <button> — avoids
  // the invalid <a><button>...</button></a> nesting consumers would hit
  // wrapping a button in <Link>.
  href?: string;
  children: React.ReactNode;
  className?: string;
}

type GlowButtonProps = GlowButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof GlowButtonOwnProps>;

/**
 * Dark pill with a yarrow glow rising from the bottom edge. The same
 * trick from the Uiverse "glow" button — four absolutely-positioned
 * radial gradients (two for the diffuse halo, two for the bottom-edge
 * stroke), with default + hover layers crossfading on a 1.2s ease.
 *
 * Reads against cedar grounds; the halo washes out on parchment.
 */
export function GlowButton({ href, className, children, ...props }: GlowButtonProps) {
  const wrapperClass = cn(
    "group relative flex h-[50px] w-[180px] items-center justify-center rounded-lg outline-none transition-transform active:scale-95",
    className
  );

  const inner = (
    <>
      <Halo size="narrow" />
      <Halo size="wide" />
      <Stroke size="narrow" />
      <Stroke size="wide" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] z-10 rounded-[7px] bg-cedar-700"
      />
      <span
        className="relative z-20 font-medium text-parchment-50 text-sm tracking-wide"
        style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
      >
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={wrapperClass}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" {...props} className={wrapperClass}>
      {inner}
    </button>
  );
}

// Diffuse blurred halo behind the button. `narrow` is the at-rest state,
// `wide` crossfades in on hover.
function Halo({ size }: { size: "narrow" | "wide" }) {
  const isWide = size === "wide";
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-[1200ms] ease-in-out",
        isWide ? "opacity-0 group-hover:opacity-100" : "opacity-100 group-hover:opacity-0"
      )}
      style={{
        background: isWide
          ? "radial-gradient(60% 50% at 50% 100%, var(--color-yarrow-500), transparent)"
          : "radial-gradient(15% 50% at 50% 100%, var(--color-yarrow-500), transparent)",
        filter: isWide ? "blur(18px)" : "blur(15px)",
      }}
    />
  );
}

// Crisp bottom-edge stroke that reads as a 1px rim once the fill layer
// covers everything except the outer ring. Widens to span the whole
// bottom edge on hover.
function Stroke({ size }: { size: "narrow" | "wide" }) {
  const isWide = size === "wide";
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-[1200ms] ease-in-out",
        isWide ? "opacity-0 group-hover:opacity-100" : "opacity-100 group-hover:opacity-0"
      )}
      style={{
        background: isWide
          ? "radial-gradient(60% 50% at 50% 100%, var(--color-yarrow-500), transparent)"
          : "radial-gradient(10% 50% at 50% 100%, var(--color-yarrow-500), transparent)",
      }}
    />
  );
}
