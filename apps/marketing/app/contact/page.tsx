import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ContactForm } from "../_components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Sava Trust Company team. Tell us where you are in the process and we'll be back within a business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="bg-parchment-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[4fr_5fr] md:gap-16 md:py-20 lg:gap-24">
        {/* Form column */}
        <div>
          <h1 className="font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Talk to <em className="font-normal italic">us.</em>
          </h1>
          <p className="mt-4 max-w-md text-base text-cedar-900/70 leading-relaxed">
            Tell us a little about where you are in the process. We reply within
            one business day.
          </p>

          {/* Suspense is required because ContactForm reads `?as=` via
              useSearchParams — without it the route bails out of static
              rendering. */}
          <Suspense fallback={<div className="mt-10 h-96" aria-hidden="true" />}>
            <ContactForm />
          </Suspense>

          <p className="mt-10 text-cedar-900/55 text-sm">
            Prefer email?{" "}
            <a
              href="mailto:founders@savahq.com"
              className="text-cedar-900 underline decoration-cedar-900/30 underline-offset-4 transition-colors hover:decoration-cedar-900"
            >
              founders@savahq.com
            </a>{" "}
            reaches us.
          </p>
        </div>

        {/* Photo column — diagonal-asymmetric shape: large convex
            rounded curves on top-right + bottom-left, small concave
            bites on top-left + bottom-right. Border-radius can't do
            the concave bites, so this uses an SVG clipPath. */}
        <div className="hidden md:block">
          <svg
            width="0"
            height="0"
            aria-hidden="true"
            className="pointer-events-none absolute"
          >
            <defs>
              <clipPath id="contact-blob" clipPathUnits="objectBoundingBox">
                {/* Coords normalized 0–1.
                    - Top-left  concave bite, radius 0.06 (small)
                    - Top-right convex round,  radius 0.18 (large)
                    - Bottom-right concave bite, radius 0.06 (small, mirrors top-left)
                    - Bottom-left  convex round,  radius 0.18 (large, mirrors top-right)
                    The 0.099 / 0.027 numbers come from the standard
                    quarter-arc magic constant (0.5523 × radius), used
                    for both convex (corner-on-the-inside) and concave
                    (corner-on-the-outside) arcs. */}
                <path
                  d="
                    M 0.06 0.00
                    L 0.82 0.00
                    C 0.919 0.00, 1.00 0.081, 1.00 0.18
                    L 1.00 0.94
                    C 1.00 0.973, 0.973 1.00, 0.94 1.00
                    L 0.18 1.00
                    C 0.081 1.00, 0.00 0.919, 0.00 0.82
                    L 0.00 0.06
                    C 0.00 0.027, 0.027 0.00, 0.06 0.00
                    Z
                  "
                />
              </clipPath>
            </defs>
          </svg>
          <div
            className="relative overflow-hidden bg-parchment-200"
            style={{
              aspectRatio: "5 / 6",
              clipPath: "url(#contact-blob)",
            }}
          >
            <Image
              src="/local/contact-hero.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={95}
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
