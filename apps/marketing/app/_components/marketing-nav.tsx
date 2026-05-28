"use client";

import { cn, SavaLogo } from "@sava/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandButton } from "./ui/brand-button";
import { WhoWeServeMenu } from "./who-we-serve-menu";

const PRIMARY_LINKS = [
  { href: "/assurance", label: "Assurance" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
];

// Routes whose hero uses `-mt-20` to bleed the cedar background
// behind the nav — only these can host a transparent header without
// the light text falling on white body bg.
const CEDAR_HERO_ROUTES = new Set(["/", "/attorneys", "/families", "/advisors"]);

// Nav flips at this scroll distance. 32px feels like "past the hero
// top edge" without flickering at the very top.
const SCROLL_THRESHOLD = 32;

export function MarketingNav() {
  const pathname = usePathname();
  const scrolledPastHero = useScrolled(SCROLL_THRESHOLD);

  // Splash route is rendered chrome-less — just the savahq.com text.
  if (pathname === "/landing") return null;

  // Treat parchment-background pages like the scrolled state so the
  // dark links stay legible — there's no dark hero to anchor light text.
  const scrolled = scrolledPastHero || !CEDAR_HERO_ROUTES.has(pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-border-subtle border-b bg-white"
          : "border-transparent border-b bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between ps-4 pe-6"
      >
        <Link
          href="/"
          aria-label="Sava Trust Company home"
          className={cn(
            "transition-colors duration-300 hover:opacity-80",
            scrolled ? "text-foreground" : "text-parchment-50"
          )}
        >
          <SavaLogo
            modifier="Trust Company"
            size="md"
            modifierClassName={cn(
              "transition-colors duration-300",
              scrolled ? "text-muted-foreground" : "text-parchment-100/70"
            )}
          />
        </Link>
        <div className="flex items-center gap-1 md:gap-2">
          <div className="hidden items-center gap-1 md:flex">
            <WhoWeServeMenu scrolled={scrolled} />
            {PRIMARY_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center rounded-md px-3 font-medium text-sm underline decoration-transparent underline-offset-[6px] transition-[color,text-decoration-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                    scrolled
                      ? cn(
                          "focus-visible:outline-foreground/40",
                          active
                            ? "text-yarrow-600"
                            : "text-foreground hover:decoration-foreground/60"
                        )
                      : cn(
                          "focus-visible:outline-parchment-50/40",
                          active
                            ? "text-yarrow-300"
                            : "text-parchment-50 hover:decoration-parchment-50/60"
                        )
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <BrandButton asChild brand={scrolled ? "outline-cedar" : "outline-light"} size="sm">
            <Link href="/contact">Contact us</Link>
          </BrandButton>
        </div>
      </nav>
    </header>
  );
}

// Tracks whether the window has scrolled past `threshold`. Adds a
// passive listener and immediately reads window.scrollY on mount so
// the state is correct on hydration (the page may already be scrolled).
function useScrolled(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}
