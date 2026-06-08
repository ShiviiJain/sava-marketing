import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { asset } from "../_lib/asset";
import { BrandButton } from "./ui/brand-button";
import { Eyebrow } from "./ui/eyebrow";

/**
 * Break-out banner — the subject is a transparent cutout layered on top of
 * a rounded, clipped container so it pops out above the top edge while the
 * rest of the composition stays inside. The outer wrapper is intentionally
 * NOT clipped (and carries top padding) so the head can extend past the
 * container; only the inner panel hides its overflow.
 */
export function BreakoutBanner() {
  const leafMask = `url(${asset("leaves/test-12.png")})`;
  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="relative mx-auto max-w-6xl pt-24 sm:pt-28">
        {/* Clipped panel: brand surface, leaf watermark, copy */}
        <div className="relative overflow-hidden rounded-3xl bg-parchment-100 ring-1 ring-cedar-900/10">
          <div
            aria-hidden="true"
            className="-top-12 pointer-events-none absolute right-[-6%] bottom-0 z-0 w-[60%] bg-yarrow-300/40"
            style={{
              maskImage: leafMask,
              maskRepeat: "no-repeat",
              maskSize: "contain",
              maskPosition: "right center",
              WebkitMaskImage: leafMask,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              WebkitMaskPosition: "right center",
            }}
          />
          <div className="relative z-10 grid items-center gap-8 px-8 py-12 sm:px-14 sm:py-16 md:grid-cols-[3fr_2fr]">
            <div className="max-w-xl">
              <Eyebrow>The family portal</Eyebrow>
              <h2 className="mt-5 font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
                Your whole trust, finally easy to <em className="font-normal italic">read.</em>
              </h2>
              <p className="mt-5 max-w-md text-cedar-900/70 text-lg leading-[1.55]">
                Sign in to see exactly where every trust stands, in plain language, the moment
                anything needs you.
              </p>
              <div className="mt-8">
                <BrandButton asChild brand="primary" size="xl">
                  <a
                    href="https://calendly.com/shivi-savahq/30min"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Talk to our team <ArrowRight aria-hidden="true" />
                  </a>
                </BrandButton>
              </div>
            </div>
            {/* reserves the right column where the subject sits */}
            <div aria-hidden="true" className="hidden md:block" />
          </div>
        </div>

        {/* Subject cutout — bottom-aligned to the panel, top extends above it */}
        <div className="pointer-events-none absolute inset-y-0 right-[4%] z-20 flex items-end sm:right-[7%]">
          <Image
            src={asset("reader-subject.webp")}
            alt=""
            width={1391}
            height={1467}
            sizes="(min-width: 768px) 26rem, 55vw"
            quality={90}
            className="h-full w-auto object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
