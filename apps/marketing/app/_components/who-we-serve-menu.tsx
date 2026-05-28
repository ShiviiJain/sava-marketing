"use client";

import { cn } from "@sava/ui";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

interface MenuItem {
  href: string;
  label: string;
  description: string;
}

const ITEMS: MenuItem[] = [
  {
    href: "/families",
    label: "For families",
    description: "Modern trust administration for families thinking across generations.",
  },
  {
    href: "/attorneys",
    label: "For attorneys",
    description: "A fiduciary partner for the trusts you draft. Nevada situs, modern ops.",
  },
  {
    href: "/advisors",
    label: "For advisors",
    description: "Directed trust services that keep assets where they're managed.",
  },
];

export function WhoWeServeMenu({ scrolled = true }: { scrolled?: boolean }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const pathname = usePathname();
  const triggerActive = ITEMS.some((item) => item.href === pathname);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-9 items-center gap-1 rounded-md px-3 font-medium text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          scrolled
            ? cn(
                "focus-visible:outline-foreground/40",
                triggerActive
                  ? "text-yarrow-600"
                  : "text-foreground hover:text-foreground-secondary"
              )
            : cn(
                "focus-visible:outline-parchment-50/40",
                triggerActive ? "text-yarrow-300" : "text-parchment-50 hover:text-parchment-100/80"
              )
        )}
      >
        Who we serve
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        id={menuId}
        role="menu"
        aria-label="Who we serve"
        className={cn(
          "absolute top-full start-0 z-50 w-56 py-1.5 transition-[opacity,transform] duration-200",
          scrolled ? "bg-white shadow-lg shadow-black/5" : "bg-transparent",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        )}
      >
        {ITEMS.map((item) => {
          const active = item.href === pathname;
          return (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              aria-current={active ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={cn(
                "block border-yarrow-500 border-s-2 border-s-transparent px-3 py-2.5 font-medium text-sm transition-colors focus-visible:outline-none",
                scrolled
                  ? cn(
                      "hover:bg-parchment-100 hover:border-s-yarrow-500 focus-visible:bg-parchment-100",
                      active ? "border-s-yarrow-500 text-yarrow-600" : "text-foreground"
                    )
                  : cn(
                      "hover:bg-parchment-50/10 hover:border-s-yarrow-500 focus-visible:bg-parchment-50/10",
                      active ? "border-s-yarrow-500 text-yarrow-300" : "text-parchment-50"
                    )
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
