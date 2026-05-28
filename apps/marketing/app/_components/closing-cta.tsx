import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BrandButton } from "./ui/brand-button";

export function ClosingCta() {
  return (
    <section className="bg-cedar-700 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="whitespace-nowrap font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
          Talk to an expert.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-parchment-100/75 leading-[1.55]">
          Whether you're drafting a new trust or moving an existing one, we'll walk you through what
          working with Sava actually looks like.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <BrandButton asChild brand="primary" size="xl">
            <a
              href="https://calendly.com/shivi-savahq/30min"
              target="_blank"
              rel="noreferrer noopener"
            >
              Schedule a call <ArrowRight aria-hidden="true" />
            </a>
          </BrandButton>
          <BrandButton asChild brand="tertiary" size="xl">
            <a href="mailto:hello@savahq.com">hello@savahq.com</a>
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
