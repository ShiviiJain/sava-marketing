import Image from "next/image";
import { asset } from "../_lib/asset";

// Kept for backwards-compat with callers that pass `leaf="..."` — the
// new two-column layout ignores it since the leaf placement is now part
// of the section's design.
export type ServicesLeafPosition = "header" | "right" | "watermark" | "rows";

interface ServicesSectionProps {
  leaf?: ServicesLeafPosition;
}

export function ServicesSection(_props: ServicesSectionProps = {}) {
  return (
    <section id="services" className="relative overflow-hidden bg-parchment-50 py-24 sm:py-32">
      {/* Leaf lives at the section level so it can extend the full
          section height without dragging the photo column with it. */}
      <ServicesLeaf />
      <div className="relative z-10 grid items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-0">
        {/* Mirror of Why Nevada: photo flush to the LEFT viewport edge,
            rounded on the END (right) side so the curve faces the text. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-e-2xl bg-parchment-200">
          <Image
            src={asset("services-founders.webp")}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            quality={90}
            className="object-cover object-center"
          />
        </div>
        <div className="relative">
          <div className="flex flex-col px-6 md:ps-12 md:pe-8 lg:ps-16 lg:pe-12">
            <div className="max-w-2xl">
              <h2 className="font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem]">
                What we <em className="font-normal italic">administer.</em>
              </h2>
              <div className="mt-8 max-w-2xl space-y-5 text-cedar-900/75 text-lg leading-[1.6] md:text-xl">
                <p>
                  Sava administers Nevada directed trusts — keeping investment authority with your
                  advisors and trust administration with us.
                </p>
                <p>
                  We work alongside your existing advisors, maintaining a clear separation between
                  investment management and the fiduciary work of holding the trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Larger yarrow-toned monstera silhouette anchored off the right
// viewport edge — bleeds top and bottom so it reads as a printed
// editorial accent, not a contained decoration.
function ServicesLeaf() {
  const maskUrl = `url(${asset("leaves/test-06.png")})`;
  return (
    <div
      aria-hidden="true"
      className="-end-4 pointer-events-none absolute inset-y-0 z-0 w-[60%] bg-yarrow-300/45 md:-end-6 md:w-[55%] lg:-end-8 lg:w-[50%]"
      style={{
        maskImage: maskUrl,
        maskRepeat: "no-repeat",
        maskSize: "auto 100%",
        maskPosition: "right center",
        WebkitMaskImage: maskUrl,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "auto 100%",
        WebkitMaskPosition: "right center",
      }}
    />
  );
}
