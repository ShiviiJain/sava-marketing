import { ArrowRight, Send, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { asset } from "../_lib/asset";
import { BrandButton } from "./ui/brand-button";

/**
 * Homepage platform snippet between the assurance teaser and the audience
 * cards. Photo bleeds to the left viewport edge (like the services / Nevada
 * rows) with feature chips down its right edge; copy + leaf on the right.
 */
export function AboutTeaser() {
  return (
    <section className="relative isolate overflow-hidden bg-cedar-700 py-24 sm:py-32">
      <AboutLeaf />
      <div className="relative z-10 grid items-center gap-10 md:grid-cols-2 md:gap-0">
        {/* Photo flush to the LEFT edge, rounded on the end (right) side. */}
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-e-[4px] bg-cedar-800">
            <Image
              src={asset("about-platform.webp")}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={90}
              className="object-cover object-center"
            />
          </div>
          {/* Feature chips stacked inside the photo, toward its right side. */}
          <div className="absolute top-1/2 right-6 z-20 flex -translate-y-1/2 flex-col items-end gap-2.5 sm:right-10">
            <Chip Icon={Zap} label="Faster onboarding" />
            <Chip Icon={Sparkles} label="Smart interface" />
            <Chip Icon={Send} label="Quick distributions" />
          </div>
        </div>

        {/* Copy — padded so its inner edge aligns to the max-w-7xl margin. */}
        <div className="px-6 md:ps-12 md:pe-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:ps-16">
          <h2 className="whitespace-nowrap font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Why we built Sava.
          </h2>
          <div className="mt-8 max-w-md space-y-4 text-[1.0625rem] text-parchment-100/85 leading-[1.55] md:text-[1.1875rem]">
            <p>
              Every part of how we hold a trust, built with no legacy incentives and no inherited
              conflicts.
            </p>
            <p>
              Built to operate across generations rather than across quarters.
            </p>
          </div>
          <div className="mt-10">
            <BrandButton
              asChild
              brand="cedar"
              size="xl"
              className="rounded-sm border border-parchment-200 bg-parchment-100 font-sans text-cedar-900 transition-colors hover:border-cedar-700 hover:bg-cedar-700 hover:text-parchment-50"
            >
              <Link href="/about">
                Learn more <ArrowRight aria-hidden="true" />
              </Link>
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chip({ Icon, label }: { Icon: ComponentType<SVGProps<SVGSVGElement>>; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1.5 font-medium text-cedar-900 text-xs shadow-lg shadow-cedar-950/30 ring-1 ring-cedar-900/10">
      <Icon aria-hidden="true" className="size-3.5 text-cedar-700" strokeWidth={2} />
      {label}
    </span>
  );
}

// Leaf silhouette bleeding off the RIGHT edge behind the copy, one shade
// lighter than the cedar ground.
function AboutLeaf() {
  const maskUrl = `url(${asset("leaves/test-12.png")})`;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-12 end-4 z-0 w-[40%] bg-cedar-600 md:end-8 md:w-[34%]"
      style={{
        maskImage: maskUrl,
        maskRepeat: "no-repeat",
        maskSize: "contain",
        maskPosition: "center right",
        WebkitMaskImage: maskUrl,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "center right",
      }}
    />
  );
}
