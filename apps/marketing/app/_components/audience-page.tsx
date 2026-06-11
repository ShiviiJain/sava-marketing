import { cn } from "@sava/ui";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "../_lib/asset";
import { NevadaSection } from "./nevada-section";
import { PlatformShowcase, type PlatformShowcaseProps } from "./platform-showcase";
import { PricingSection } from "./pricing-section";
import { BrandButton } from "./ui/brand-button";
import { Eyebrow } from "./ui/eyebrow";

export interface AudienceFeature {
  term: string;
  description: string;
}

export interface AudienceImage {
  src: string;
  alt?: string;
}

interface AudiencePageProps {
  eyebrow?: string;
  /** Headline with italic emphasis — usually composed inline by the page. */
  headline: ReactNode;
  lede: string;
  /** Features grid ("How we serve…"). Omit both to skip the section
   *  entirely — /families drops it in favor of the platform showcase. */
  features?: AudienceFeature[];
  featuresHeading?: ReactNode;
  /** Closing CTA — opt-in. Omit all three to skip the section entirely. */
  contactEmail?: string;
  closingHeading?: ReactNode;
  closingBody?: string;
  /** Hero image. Switches the hero to a 2-col text+photo layout. */
  heroImage?: AudienceImage;
  /** Editorial image panel between features and the closing CTA. */
  midImage?: AudienceImage;
  /** Leaf number (1–36) from /local/leaves/test-XX.png. Adds a faint
   *  silhouette behind the hero text panel when set. */
  leaf?: string;
  /** Leaf number for the cream-tone silhouette behind the features
   *  grid (the "How we serve…" section). Bleeds off the right edge. */
  featuresLeaf?: string;
  /** Opt-in to the "bridged" hero: photo column is wider, the leaf sits
   *  at the cedar/photo seam overlapping both, and the section bleeds
   *  behind the nav. Pages using this should also be added to
   *  CEDAR_HERO_ROUTES in marketing-nav.tsx so the nav goes transparent. */
  heroBridged?: boolean;
  /** Platform feature showcase (layered product crops). Rendered between
   *  the features grid and the Why Nevada / pricing sections. */
  platform?: PlatformShowcaseProps;
  /** Render the shared Why Nevada section between features and pricing. */
  showNevada?: boolean;
  /** Render the shared Pricing section after features (used by /attorneys + /advisors). */
  showPricing?: boolean;
}

/**
 * Shared layout for /families, /attorneys, /advisors. Cedar hero on
 * top, parchment features grid in the middle, cedar CTA at the bottom.
 * Pages opt into a 2-col hero (heroImage), a mid-section editorial
 * panel (midImage), and a leaf motif (leaf) — defaults stay text-only
 * so the older audience pages aren't perturbed.
 */
export function AudiencePage({
  eyebrow,
  headline,
  lede,
  features,
  featuresHeading,
  contactEmail,
  closingHeading,
  closingBody,
  heroImage,
  midImage,
  leaf,
  featuresLeaf,
  heroBridged,
  platform,
  showNevada,
  showPricing,
}: AudiencePageProps) {
  return (
    <main>
      <Hero
        eyebrow={eyebrow}
        headline={headline}
        lede={lede}
        heroImage={heroImage}
        leaf={leaf}
        bridged={heroBridged}
      />

      {features && features.length > 0 && (
        <section className="relative isolate overflow-hidden bg-parchment-50 py-24 sm:py-32">
          {featuresLeaf && <FeaturesLeaf leaf={featuresLeaf} />}
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            {/* Inner column is shifted to the right at md+ so the text
              starts further into the page, complementing the left-edge
              leaf bleed. Stays centered on mobile so it still reads. */}
            <div className="md:ms-auto md:max-w-3xl lg:max-w-4xl">
              <h2 className="font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:whitespace-nowrap lg:text-5xl">
                {featuresHeading}
              </h2>
              <dl className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 sm:gap-y-14">
                {features.map((feature, idx) => (
                  <div key={feature.term}>
                    <Eyebrow as="span" uppercase={false}>
                      {String(idx + 1).padStart(2, "0")}
                    </Eyebrow>
                    <dt className="mt-3 font-normal font-serif text-2xl text-cedar-900 leading-tight">
                      {feature.term}
                    </dt>
                    <dd className="mt-3 text-base text-cedar-900/70 leading-relaxed">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {platform && <PlatformShowcase {...platform} />}

      {showNevada && <NevadaSection showFacts />}

      {showPricing && <PricingSection />}

      {midImage && <MidImage image={midImage} />}

      {closingHeading && (
        <section className="bg-cedar-700 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              {closingHeading}
            </h2>
            {closingBody && (
              <p className="mx-auto mt-6 max-w-xl text-lg text-parchment-100/85 leading-[1.55]">
                {closingBody}
              </p>
            )}
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
              {contactEmail && (
                <BrandButton asChild brand="tertiary" size="xl">
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </BrandButton>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

interface HeroProps {
  eyebrow?: string;
  headline: ReactNode;
  lede: string;
  heroImage?: AudienceImage;
  leaf?: string;
  bridged?: boolean;
}

function Hero({ eyebrow, headline, lede, heroImage, leaf, bridged }: HeroProps) {
  // 1-col text hero (default) — keeps attorneys / advisors / etc. behaving
  // exactly as before any audience page opts into a hero photo.
  if (!heroImage) {
    return (
      <section className="relative overflow-hidden bg-cedar-700 py-24 sm:py-32">
        {leaf && <LeafMotif leaf={leaf} />}
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          {eyebrow && <Eyebrow ground="cedar">{eyebrow}</Eyebrow>}
          <h1
            className={cn(
              "font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl",
              eyebrow && "mt-8"
            )}
          >
            {headline}
          </h1>
          <p className="mt-8 max-w-2xl text-[1.0625rem] text-parchment-100/75 leading-[1.55] md:text-[1.1875rem]">
            {lede}
          </p>
        </div>
      </section>
    );
  }

  if (bridged) {
    return (
      <BridgedHero
        eyebrow={eyebrow}
        headline={headline}
        lede={lede}
        heroImage={heroImage}
        leaf={leaf}
      />
    );
  }

  // 2-col hero with photo on the right and leaf motif behind the text
  // panel on the left.
  return (
    <section className="relative isolate overflow-hidden bg-cedar-700">
      <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-6 py-20 md:grid-cols-[1fr_1fr] md:gap-14 md:py-28 lg:py-32">
        <div className="relative">
          {leaf && <LeafMotif leaf={leaf} />}
          <div className="relative z-10 flex h-full flex-col justify-center">
            {eyebrow && <Eyebrow ground="cedar">{eyebrow}</Eyebrow>}
            <h1
              className={cn(
                "font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl",
                eyebrow && "mt-8"
              )}
            >
              {headline}
            </h1>
            <p className="mt-8 max-w-xl text-[1.0625rem] text-parchment-100/75 leading-[1.55] md:text-[1.1875rem]">
              {lede}
            </p>
          </div>
        </div>
        <div className="relative h-full min-h-[28rem] w-full overflow-hidden bg-parchment-200">
          <Image
            src={heroImage.src}
            alt={heroImage.alt ?? ""}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Bridged hero: cedar text panel on the left (40%), big photo on the
 * right (60%), a single leaf overlay positioned at the seam so it spans
 * both sides. Section uses `-mt-20` so the cedar bg bleeds behind the
 * (transparent) nav — the route must be in CEDAR_HERO_ROUTES.
 */
function BridgedHero({ eyebrow, headline, lede, heroImage, leaf }: HeroProps) {
  return (
    <section className="relative isolate -mt-20 overflow-hidden bg-cedar-700">
      <div className="grid items-stretch md:grid-cols-[1fr_1fr]">
        <div className="relative flex flex-col justify-center overflow-hidden px-6 pt-32 pb-16 md:ps-14 md:pe-10 md:pt-40 md:pb-24 lg:ps-24 lg:pe-16 lg:pt-48 lg:pb-32">
          {leaf && <PanelLeaf leaf={leaf} />}
          <div className="relative z-10">
            {eyebrow && <Eyebrow ground="cedar">{eyebrow}</Eyebrow>}
            <h1
              className={cn(
                "font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl",
                eyebrow && "mt-8"
              )}
            >
              {headline}
            </h1>
            <p className="mt-8 max-w-xl text-[1.0625rem] text-parchment-100/75 leading-[1.55] md:text-[1.1875rem]">
              {lede}
            </p>
          </div>
        </div>
        <div className="relative min-h-[28rem] w-full overflow-hidden bg-parchment-200 md:min-h-[40rem] lg:min-h-[44rem]">
          <Image
            src={heroImage?.src ?? ""}
            alt={heroImage?.alt ?? ""}
            fill
            sizes="(min-width: 768px) 200rem, 100vw"
            quality={90}
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Leaf inside the cedar text panel, hugging the right (seam) edge. The
 * panel's `overflow-hidden` clips it so it stops at the photo rather than
 * bleeding onto it, and it's one shade lighter than the cedar ground
 * (cedar-600) so it reads as a tonal whisper, not a contrasting accent.
 */
function PanelLeaf({ leaf }: { leaf: string }) {
  const maskUrl = `url(${asset(`leaves/test-${leaf}.png`)})`;
  return (
    <div
      aria-hidden="true"
      className="-end-[22%] pointer-events-none absolute inset-y-0 z-0 w-[78%] bg-cedar-600"
      style={{
        maskImage: maskUrl,
        maskRepeat: "no-repeat",
        maskSize: "auto 120%",
        maskPosition: "center",
        WebkitMaskImage: maskUrl,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "auto 120%",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

function MidImage({ image }: { image: AudienceImage }) {
  return (
    <section className="bg-parchment-50">
      <div className="relative aspect-[16/7] w-full overflow-hidden bg-parchment-200">
        <Image
          src={image.src}
          alt={image.alt ?? ""}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}

function LeafMotif({ leaf }: { leaf: string }) {
  const maskUrl = `url(${asset(`leaves/test-${leaf}.png`)})`;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 bg-parchment-50/[0.12]"
      style={{
        maskImage: maskUrl,
        maskRepeat: "no-repeat",
        maskSize: "auto 120%",
        maskPosition: "center top",
        WebkitMaskImage: maskUrl,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "auto 120%",
        WebkitMaskPosition: "center top",
      }}
    />
  );
}

// Cream-tone leaf silhouette bleeding off the LEFT viewport edge so
// the leaf side alternates with the adjacent sections (Nevada bleeds
// right, Pricing bleeds left → Features bleeds left → keeps the
// page rhythm L → R → L → …).
function FeaturesLeaf({ leaf }: { leaf: string }) {
  const maskUrl = `url(${asset(`leaves/test-${leaf}.png`)})`;
  return (
    <div
      aria-hidden="true"
      className="-start-4 pointer-events-none absolute inset-y-0 z-0 w-[60%] bg-parchment-300/75 md:-start-6 md:w-[55%] lg:-start-8 lg:w-[50%]"
      style={{
        maskImage: maskUrl,
        maskRepeat: "no-repeat",
        maskSize: "auto 100%",
        maskPosition: "left center",
        WebkitMaskImage: maskUrl,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "auto 100%",
        WebkitMaskPosition: "left center",
      }}
    />
  );
}
