import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ContactForm } from "../_components/contact-form";
import { asset } from "../_lib/asset";

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
          <p className="mt-8 max-w-2xl text-lg text-cedar-900/70 leading-[1.55] md:text-xl">
            Tell us a little about where you are in the process. We reply within one business day.
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

        {/* Photo column — plain rectangle, lightly rounded. */}
        <div className="hidden md:block">
          <div
            className="relative overflow-hidden rounded-[4px] bg-parchment-200"
            style={{ aspectRatio: "5 / 6" }}
          >
            <Image
              src={asset("contact-hero.webp")}
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
