import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { asset } from "../_lib/asset";
import { BrandButton } from "./ui/brand-button";

export function MarketingHero() {
  return (
    <section className="relative isolate -mt-20 overflow-hidden bg-cedar-900">
      {/* Full-bleed background image. The nav sits transparently on top
          of this section, so the image extends behind it to the very top
          of the viewport. */}
      <div className="absolute inset-0">
        <Image
          src={asset("hero-family-portrait.webp")}
          alt=""
          fill
          sizes="100vw"
          quality={95}
          className="object-cover object-center"
          priority
        />
        {/* Cedar tint keeps the headline legible against any photo
            without losing the image entirely. */}
        <div className="absolute inset-0 bg-cedar-900/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-[72px] pb-48 md:pt-[88px] md:pb-64 lg:pt-[104px] lg:pb-72">
        <TextPanel />
      </div>
    </section>
  );
}

function TextPanel() {
  return (
    <>
      <h1 className="font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
        <span className="block whitespace-nowrap">For Families,</span>
        <span className="block whitespace-nowrap">thinking across generations</span>
      </h1>
      <p className="mt-8 max-w-2xl text-[1.0625rem] text-parchment-100/85 leading-[1.55] md:text-[1.1875rem]">
        A chartered Nevada fiduciary for families thinking across generations. Experience total
        transparency for families and absolute control for advisors.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <BrandButton
          asChild
          brand="cedar"
          size="xl"
          className="rounded-sm border border-parchment-200 bg-parchment-100 font-sans text-cedar-900 transition-colors hover:border-cedar-700 hover:bg-cedar-700 hover:text-parchment-50"
        >
          <Link href="/contact">
            Contact Us <ArrowRight aria-hidden="true" />
          </Link>
        </BrandButton>
        <a
          href="https://calendly.com/shivi-savahq/30min"
          target="_blank"
          rel="noreferrer noopener"
          className="ms-2 font-sans text-base text-parchment-50 underline decoration-parchment-50/40 underline-offset-4 transition-colors hover:text-yarrow-300 hover:decoration-yarrow-300"
        >
          Request a demo
        </a>
      </div>
    </>
  );
}
