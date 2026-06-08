import { cn } from "@sava/ui";
import Image from "next/image";
import type { ReactNode } from "react";
import { asset } from "../_lib/asset";
import { Eyebrow } from "./ui/eyebrow";

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
  /** Product-UI cards floated over the photo (first = top-left, second =
   *  bottom-right). */
  cards: ShowcaseCard[];
}

export interface PlatformShowcaseProps {
  /** Optional section intro above the zig-zag rows. */
  eyebrow?: string;
  heading?: ReactNode;
  features: ShowcaseFeature[];
}

/**
 * Platform feature showcase — a grid of feature boxes. Each box stacks a
 * product-UI stage on top of a title and description. On hover the stage
 * swaps its neutral parchment panel for a cedar→yarrow brand gradient and
 * the cards lift, echoing the reference hover treatment.
 */
export function PlatformShowcase({ eyebrow, heading, features }: PlatformShowcaseProps) {
  return (
    <section className="bg-parchment-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {(eyebrow || heading) && (
          <header className="mx-auto mb-20 max-w-2xl text-center md:mb-24">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {heading && (
              <h2 className="mt-6 text-balance font-normal font-serif text-3xl text-cedar-900 leading-[1.1] tracking-[-0.02em] sm:text-4xl">
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

function FeatureRow({ feature, flip }: { feature: ShowcaseFeature; flip: boolean }) {
  return (
    <div className="grid items-center gap-14 md:grid-cols-2 md:gap-16 lg:gap-24">
      {/* Copy */}
      <div className={cn(flip && "md:order-2")}>
        {feature.eyebrow && <Eyebrow>{feature.eyebrow}</Eyebrow>}
        <h3 className="mt-5 text-balance font-normal font-serif text-2xl text-cedar-900 leading-[1.15] tracking-[-0.02em] sm:text-3xl">
          {feature.heading}
        </h3>
        {feature.lede && (
          <p className="mt-5 text-cedar-900/70 text-lg leading-[1.55]">{feature.lede}</p>
        )}
      </div>

      {/* Layered visual: leaf watermark behind a photo, with product cards
          floated over the photo's corners. */}
      <div className={cn("relative isolate py-6", flip && "md:order-1")}>
        {feature.leaf && <LeafTexture leaf={feature.leaf} />}
        <div
          className={cn(
            "relative z-10 mx-auto overflow-hidden rounded-2xl bg-parchment-200 shadow-cedar-900/15 shadow-xl ring-1 ring-cedar-900/10",
            // Override per feature with `photoClassName` (size/aspect/offset).
            feature.photoClassName ?? "aspect-[4/5] w-[56%]"
          )}
        >
          {feature.photo && (
            <Image
              src={feature.photo}
              alt=""
              fill
              sizes="(min-width: 768px) 20rem, 55vw"
              quality={90}
              className="object-cover object-center"
            />
          )}
        </div>
        {feature.cards.map((card, i) => {
          // Each card positions itself via its own `className` (top/right/
          // bottom/left + w-[…]); falls back to a sensible default per slot.
          const fallback =
            i === 0
              ? cn("top-0 w-[66%]", flip ? "left-0" : "right-0")
              : cn("bottom-[6%] w-[34%]", flip ? "right-0" : "left-0");
          return (
            <div
              key={card.src ?? i}
              className={cn(
                "absolute overflow-hidden rounded-xl bg-white shadow-2xl shadow-cedar-900/25 ring-1 ring-cedar-900/10",
                card.className || fallback
              )}
              style={{ zIndex: 20 + i }}
            >
              {card.node ?? (
                <Image
                  src={card.src ?? ""}
                  alt={card.alt ?? ""}
                  width={card.width}
                  height={card.height}
                  sizes="(min-width: 768px) 16rem, 55vw"
                  quality={90}
                  className="h-auto w-full"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LeafTexture({ leaf }: { leaf: string }) {
  const maskUrl = `url(${asset(`leaves/test-${leaf}.png`)})`;
  return (
    <div
      aria-hidden="true"
      className="-inset-8 pointer-events-none absolute z-0 scale-125 bg-yarrow-300/45"
      style={{
        maskImage: maskUrl,
        maskRepeat: "no-repeat",
        maskSize: "contain",
        maskPosition: "center",
        WebkitMaskImage: maskUrl,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
