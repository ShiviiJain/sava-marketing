import { cn } from "@sava/ui";
import Image from "next/image";
import { asset } from "../_lib/asset";
import type { ShowcaseCard } from "./platform-showcase";

interface FeatureVisualProps {
  photo?: string;
  /** Photo size/aspect/offset, e.g. "aspect-[4/5] w-[56%]". */
  photoClassName?: string;
  cards: ShowcaseCard[];
  /** Leaf silhouette number behind the layered visual. */
  leaf?: string;
  /** Leaf position/size, e.g. "top-[-10%] left-[-8%] w-[120%] h-[120%]".
   *  Omit to keep the default centered watermark (`-inset-8 scale-125`). */
  leafClassName?: string;
  /** Visual sits on a cedar ground — tints the leaf cedar-600 (one shade
   *  lighter than cedar-700) instead of the parchment-ground yarrow. */
  onCedar?: boolean;
  /** Slide the visual outward to center it in the cedar half on wide screens. */
  shift?: boolean;
  flip: boolean;
}

/**
 * Layered feature visual: a leaf watermark behind a photo, with product-UI
 * cards floated over it. Each card positions itself via its own className
 * (top/right/left + width + scale).
 */
export function FeatureVisual({
  photo,
  photoClassName,
  cards,
  leaf,
  leafClassName,
  onCedar = false,
  shift = false,
  flip,
}: FeatureVisualProps) {
  return (
    <div
      className={cn(
        "relative isolate py-6",
        flip && "md:order-1",
        // On split rows past the max-w-7xl cap, the cedar half grows wider than
        // the content column — nudge the whole visual outward so it sits
        // centered in the cedar block. Same size/positions, just shifted.
        shift && (flip ? "xl:translate-x-[calc(320px-25vw)]" : "xl:translate-x-[calc(25vw-320px)]")
      )}
    >
      {leaf && <LeafTexture leaf={leaf} leafClassName={leafClassName} onCedar={onCedar} />}

      <div
        className={cn(
          "relative z-10 mx-auto overflow-hidden rounded-2xl bg-parchment-200 shadow-cedar-900/15 shadow-xl ring-1 ring-cedar-900/10",
          photoClassName ?? "aspect-[4/5] w-[56%]"
        )}
      >
        {photo && (
          <Image
            src={photo}
            alt=""
            fill
            sizes="(min-width: 768px) 70rem, 70vw"
            quality={90}
            draggable={false}
            className="object-cover object-center"
          />
        )}
      </div>

      {cards.map((card, i) => {
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
            {card.node ? (
              card.node
            ) : (
              <Image
                src={card.src ?? ""}
                alt={card.alt ?? ""}
                width={card.width}
                height={card.height}
                sizes="(min-width: 768px) 32rem, 55vw"
                quality={90}
                draggable={false}
                className="h-auto w-full"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function LeafTexture({
  leaf,
  leafClassName,
  onCedar,
}: {
  leaf: string;
  leafClassName?: string;
  onCedar?: boolean;
}) {
  const maskUrl = `url(${asset(`leaves/test-${leaf}.png`)})`;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-0",
        // On a cedar ground, one shade lighter (cedar-600); otherwise the
        // parchment-ground yarrow tint.
        onCedar ? "bg-cedar-600" : "bg-yarrow-300/45",
        leafClassName ?? "-inset-8 scale-125"
      )}
      style={{
        // Scale the watermark up ~30% from its center.
        transform: "scale(1.3)",
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
