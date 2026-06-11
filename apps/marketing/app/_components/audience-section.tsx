import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { asset } from "../_lib/asset";

interface AudienceCard {
  href: string;
  label: string;
  tagline: string;
  /** Local-only photo. Falls back to a parchment placeholder when absent. */
  imageSrc?: string;
  /** Object-position override per image (faces / watermarks vary). */
  imagePosition?: string;
}

const AUDIENCES: AudienceCard[] = [
  {
    href: "/families",
    label: "For families",
    tagline: "Modern administration for the generational family.",
    imageSrc: asset("families-portrait-hi.webp"),
    imagePosition: "50% center",
  },
  {
    href: "/attorneys",
    label: "For attorneys",
    tagline: "A fiduciary partner you can put your name behind.",
    imageSrc: asset("attorneys-portrait-hi.webp"),
    imagePosition: "50% center",
  },
  {
    href: "/advisors",
    label: "For advisors",
    tagline: "Directed services that respect your relationship.",
    imageSrc: asset("advisor-portrait-hi.webp"),
    imagePosition: "50% center",
  },
];

export function AudienceSection() {
  return (
    <section className="bg-parchment-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <header>
          <h2 className="font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:whitespace-nowrap lg:text-5xl">
            Built for the entire trust <em className="font-normal italic">ecosystem.</em>
          </h2>
          <p className="mt-8 max-w-2xl text-cedar-900/70 text-[1.1875rem] leading-[1.55]">
            Every trust involves families, attorneys, and advisors. Sava helps coordinate those
            relationships through clear, modern administration.
          </p>
        </header>
        <div className="mt-20 grid gap-10 sm:grid-cols-3 sm:gap-6 md:mt-24">
          {AUDIENCES.map((audience) => (
            <AudiencePortrait key={audience.href} {...audience} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AudiencePortrait({ href, label, tagline, imageSrc, imagePosition }: AudienceCard) {
  return (
    <Link
      href={href}
      className="group block focus-visible:outline-none"
      aria-label={`${label}, read more`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[4px] bg-parchment-200">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 70rem, (min-width: 640px) 45vw, 90vw"
            quality={95}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ objectPosition: imagePosition ?? "center" }}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
            style={{
              background:
                "radial-gradient(120% 90% at 40% 10%, oklch(0.94 0.025 85) 0%, oklch(0.82 0.05 85) 100%)",
            }}
          />
        )}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-normal font-serif text-xl text-cedar-900 leading-tight sm:text-2xl">
          {label}
        </h3>
        <ArrowRight
          aria-hidden="true"
          className="size-5 text-yarrow-600 transition-transform group-hover:translate-x-1"
        />
      </div>
      <p className="mt-3 text-sm text-cedar-900/70 leading-relaxed">{tagline}</p>
    </Link>
  );
}
