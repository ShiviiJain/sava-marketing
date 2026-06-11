import { cn } from "@sava/ui";
import type { ReactNode } from "react";
import { FeatureVisual } from "./feature-visual";
import { Eyebrow } from "./ui/eyebrow";
import { ScrollReveal } from "./ui/scroll-reveal";

export interface ShowcaseCard {
  /** Rendered faux-UI content. Takes precedence over an image `src` — used
   *  by /families to draw on-brand product cards instead of flat crops. */
  node?: ReactNode;
  src?: string;
  alt?: string;
  /** Intrinsic pixel size of the source crop — drives the aspect ratio.
   *  Only needed for image cards. */
  width?: number;
  height?: number;
  /** Absolute position + size of this card over the photo, e.g.
   *  "top-0 right-0 w-[64%]" or "bottom-[6%] left-0 w-[40%]". Empty string
   *  falls back to a default slot (first card top, second card bottom). */
  className: string;
}

export interface ShowcaseFeature {
  eyebrow?: string;
  heading: ReactNode;
  lede?: string;
  points?: string[];
  /** Leaf silhouette number (1–36) used as a faint watermark behind the
   *  layered visual. */
  leaf?: string;
  /** Lifestyle photo the product cards are layered over. */
  photo?: string;
  /** Override the photo's size/aspect/offset, e.g. "aspect-[4/5] w-[56%]".
   *  Defaults to a centered 4:5 at 56% width. */
  photoClassName?: string;
  /** Override the leaf watermark's position/size, e.g.
   *  "top-[-10%] left-[-8%] w-[120%] h-[120%]". Defaults to a centered
   *  watermark. */
  leafClassName?: string;
  /** Product-UI cards floated over the photo (first = top-left, second =
   *  bottom-right). */
  cards: ShowcaseCard[];
}

export interface PlatformShowcaseProps {
  /** Optional section intro above the zig-zag rows. */
  eyebrow?: string;
  heading?: ReactNode;
  features: ShowcaseFeature[];
  /** Per-row half-split: cedar behind the photo, parchment behind the text;
   *  the visual centers in the cedar block on wide screens. */
  split?: boolean;
  /** Full-width alternating bands: parchment / cedar / parchment … On cedar
   *  bands the whole row's copy flips to light text. */
  bands?: boolean;
}

/**
 * Platform feature showcase — a grid of feature boxes. Each box stacks a
 * product-UI stage on top of a title and description. On hover the stage
 * swaps its neutral parchment panel for a cedar→yarrow brand gradient and
 * the cards lift, echoing the reference hover treatment.
 */
export function PlatformShowcase({
  eyebrow,
  heading,
  features,
  split = false,
  bands = false,
}: PlatformShowcaseProps) {
  if (split) {
    return (
      // pb keeps the last cedar row from touching a cedar section below it.
      <section className="bg-parchment-50 pb-16 md:pb-24">
        {(eyebrow || heading) && (
          <header className="mx-auto max-w-7xl px-6 pt-24 text-left sm:pt-32">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {heading && (
              <h2 className="mt-6 text-balance font-normal font-serif text-3xl text-cedar-900 leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
                {heading}
              </h2>
            )}
          </header>
        )}
        <div className="mt-12 space-y-8 md:mt-16 md:space-y-12">
          {features.map((feature, idx) => {
            const flip = idx % 2 === 1;
            return (
              <ScrollReveal key={feature.leaf ?? idx} className="relative isolate">
                {/* Split band (md+): cedar behind the photo half, parchment behind
                    the text half. The photo side alternates with `flip`. The
                    space-y gap keeps adjacent cedar blocks from touching. */}
                <div
                  aria-hidden="true"
                  className="-z-10 absolute inset-0 bg-parchment-50 md:grid md:grid-cols-2"
                >
                  <div className={cn("hidden md:block", flip ? "bg-cedar-700" : "bg-parchment-50")} />
                  <div className={cn("hidden md:block", flip ? "bg-parchment-50" : "bg-cedar-700")} />
                </div>
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
                  <FeatureRow feature={feature} flip={flip} leafOnCedar shift />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    );
  }

  // Full-width alternating bands: parchment / cedar / parchment …
  if (bands) {
    return (
      <section className="bg-parchment-50">
        {(eyebrow || heading) && (
          <header className="mx-auto mb-2 max-w-7xl px-6 pt-24 text-left sm:pt-32 md:mb-4">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {heading && (
              <h2 className="mt-6 text-balance font-normal font-serif text-3xl text-cedar-900 leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
                {heading}
              </h2>
            )}
          </header>
        )}
        {features.map((feature, idx) => {
          const onCedar = idx % 2 === 1;
          const flip = idx % 2 === 1;
          // Cedar rows get extra height so the enlarged leaf stays inside the
          // block; the first (parchment) row sits close under the heading.
          const pad = onCedar
            ? "py-32 md:py-48"
            : idx === 0
              ? "pt-8 pb-20 md:pt-10 md:pb-28"
              : "py-20 md:py-28";
          return (
            <ScrollReveal
              key={feature.leaf ?? idx}
              className={onCedar ? "bg-cedar-700" : "bg-parchment-50"}
            >
              <div className={cn("mx-auto max-w-7xl px-6", pad)}>
                <FeatureRow feature={feature} flip={flip} copyLight={onCedar} leafOnCedar={onCedar} />
              </div>
            </ScrollReveal>
          );
        })}
      </section>
    );
  }

  return (
    <section className="bg-parchment-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {(eyebrow || heading) && (
          <header className="mx-auto mb-20 max-w-2xl text-center md:mb-24">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {heading && (
              <h2 className="mt-6 text-balance font-normal font-serif text-3xl text-cedar-900 leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
                {heading}
              </h2>
            )}
          </header>
        )}

        <div className="space-y-20 md:space-y-28">
          {features.map((feature, idx) => (
            <FeatureRow key={feature.leaf ?? idx} feature={feature} flip={idx % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({
  feature,
  flip,
  copyLight = false,
  leafOnCedar = false,
  shift = false,
}: {
  feature: ShowcaseFeature;
  flip: boolean;
  /** Copy sits on a cedar ground — flip it to light text. */
  copyLight?: boolean;
  /** Tint the leaf watermark cedar (visual sits on cedar). */
  leafOnCedar?: boolean;
  /** Slide the visual to the center of the cedar block on wide screens. */
  shift?: boolean;
}) {
  return (
    <div className="grid items-center gap-14 md:grid-cols-2 md:gap-16 lg:gap-24">
      {/* Copy — assurance-style: muted kicker, snug serif heading, capped body. */}
      <div className={cn(flip && "md:order-2")}>
        {feature.eyebrow && (
          <Eyebrow ground={copyLight ? "cedar" : "parchment"}>{feature.eyebrow}</Eyebrow>
        )}
        <h3
          className={cn(
            "mt-2 font-normal font-serif text-2xl leading-snug md:text-3xl",
            copyLight ? "text-parchment-50" : "text-cedar-900"
          )}
        >
          {feature.heading}
        </h3>
        {feature.lede && (
          <p
            className={cn(
              "mt-4 max-w-md text-lg leading-relaxed",
              copyLight ? "text-parchment-100/80" : "text-cedar-900/65"
            )}
          >
            {feature.lede}
          </p>
        )}
      </div>

      {/* Layered visual: leaf watermark behind a photo, with product cards
          floated over the photo's corners. */}
      <FeatureVisual
        photo={feature.photo}
        photoClassName={feature.photoClassName}
        cards={feature.cards}
        leaf={feature.leaf}
        leafClassName={feature.leafClassName}
        onCedar={leafOnCedar}
        shift={shift}
        flip={flip}
      />
    </div>
  );
}
