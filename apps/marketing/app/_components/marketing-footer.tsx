"use client";

import { SavaLogo } from "@sava/ui";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { Eyebrow } from "./ui/eyebrow";

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface SocialLink {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sava-yc",
    Icon: Linkedin,
  },
  {
    label: "X",
    href: "https://x.com/savayc35",
    Icon: XIcon,
  },
];

interface FooterLink {
  label: string;
  href: string;
  /** External targets open in a new tab and skip the Next.js prefetch path. */
  external?: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    heading: "Who we serve",
    links: [
      { label: "For families", href: "/families" },
      { label: "For attorneys", href: "/attorneys" },
      { label: "For advisors", href: "/advisors" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Assurance", href: "/assurance" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function MarketingFooter() {
  const pathname = usePathname();

  // Splash route is rendered chrome-less — just the savahq.com text.
  if (pathname === "/landing") return null;

  // Contact page already *is* the contact form — the banner CTA below
  // would just point users back to the page they're on.
  const showContactBanner = pathname !== "/contact";

  return (
    <footer>
      {showContactBanner && (
      /* Talk-to-our-team box — contained rectangular card with the
          permanence photo behind a gradient. Sits on a parchment wash so
          it reads as a separate block from the dark cedar footer below. */
      <div className="bg-parchment-50 px-4 py-10 md:py-14">
        <section className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-2xl">
          <Image
            src="/local/permanence-band.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            quality={85}
            className="object-cover object-center"
          />
          {/* Gradient overlay — deeper on the left for legibility of the
              headline + copy, lighter on the right so the photo can read. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-cedar-900/80 via-cedar-900/55 to-cedar-700/30"
          />
          <div className="relative z-10 flex flex-col gap-6 px-8 py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-12 md:px-12 md:py-14">
            <div className="max-w-md">
              <h2 className="font-normal font-serif text-2xl text-parchment-50 leading-[1.1] tracking-[-0.01em] sm:text-3xl">
                Talk to our team.
              </h2>
              <p className="mt-3 text-base text-parchment-100/80 leading-relaxed">
                Drafting a new trust, moving an existing one, or just figuring out
                what's next. We'll reply within a business day.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-md bg-parchment-50 px-7 py-3.5 font-sans font-semibold text-cedar-900 text-sm transition-colors hover:bg-parchment-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parchment-50"
            >
              Contact us
            </Link>
          </div>
        </section>
      </div>
      )}

      <div className="bg-cedar-950 text-parchment-50">
        <div className="mx-auto max-w-7xl ps-4 pe-6">
          {/* Main grid — brand block on the left, link columns on the right */}
          <div className="grid gap-x-12 gap-y-12 py-14 md:grid-cols-[5fr_7fr] md:py-16">
          <div className="space-y-6">
            <div className="text-parchment-50">
              <SavaLogo modifier="Trust Company" size="md" />
            </div>
            <p className="max-w-sm text-parchment-100/85 text-sm leading-relaxed">
              A Nevada-chartered trust company built for modern families and the attorneys who
              serve them.
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Sava on ${label}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex size-7 items-center justify-center rounded text-parchment-100/75 transition-colors hover:bg-parchment-50/10 hover:text-yarrow-300"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.heading} className="space-y-5">
                <Eyebrow ground="cedar">{col.heading}</Eyebrow>
                <ul className="space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-parchment-50 transition-colors hover:text-yarrow-300"
                        {...(link.external
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : undefined)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom rail — copyright + legal mini-links, separated by a hairline rule */}
        <div className="border-parchment-50/10 border-t">
          <div className="flex flex-col gap-2 py-6 text-parchment-100/55 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Sava Trust Company. All rights reserved.</p>
            <p className="flex gap-6">
              <Link href="/privacy" className="hover:text-parchment-100">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-parchment-100">
                Terms
              </Link>
            </p>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}
