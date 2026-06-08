import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { asset } from "../_lib/asset";
import { BrandButton } from "./ui/brand-button";

const FACTS = [
  {
    headline: "No state income tax.",
    body: "Nevada levies no state income tax on trusts, the income they earn, or the capital gains they realize. Over a generation, that gap compounds into real principal.",
  },
  {
    headline: "Trusts that last 365 years.",
    body: "Nevada permits dynasty trusts to run for up to 365 years, long enough to pass wealth through roughly ten generations without re-triggering federal estate or gift tax along the way.",
  },
  {
    headline: "Directed trusts, by statute.",
    body: "Nevada law lets your investment advisor stay on the portfolio while Sava handles administration. The separation between the two roles is clean, formally recognized, and enforceable.",
  },
  {
    headline: "Strongest asset protection in the country.",
    body: "Nevada offers a two-year creditor lookback (the shortest in the U.S.) and recognizes no exception creditors. Once the statute of limitations runs, the protection is absolute.",
  },
];

interface NevadaSectionProps {
  /** Two-column hero with the photo on the right + leaf bleeding off the
   *  left. Used on the landing page. Audience pages render text-only. */
  showPhoto?: boolean;
  /** Render the four-fact row underneath the headline. Used on /families,
   *  /attorneys, /advisors. */
  showFacts?: boolean;
  /** Render the "Read more" CTA. Used on the landing page; the destination
   *  is configurable per surface. */
  showButton?: boolean;
  /** Where the "Read more" CTA links to. Defaults to /advisors#why-nevada. */
  ctaHref?: string;
}

export function NevadaSection({
  showPhoto = false,
  showFacts = false,
  showButton = false,
  ctaHref = "/advisors#why-nevada",
}: NevadaSectionProps = {}) {
  return (
    <section id="why-nevada" className="relative overflow-hidden bg-cedar-700 py-24 sm:py-32">
      {/* Leaf side mirrors the layout: with-photo hero has the photo on
          the right, so the leaf bleeds off the left. Text-only hero has
          no photo, so the leaf bleeds off the right (a la /attorneys). */}
      <NevadaLeaf side={showPhoto ? "left" : "right"} />

      {showPhoto ? (
        <div className="relative z-10 grid items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-0">
          <div className="px-6 md:ps-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] md:pe-10 lg:pe-16">
            <TextPanel showButton={showButton} ctaHref={ctaHref} />
          </div>
          <PhotoPanel />
        </div>
      ) : (
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <TextPanel wide showButton={showButton} ctaHref={ctaHref} />
        </div>
      )}

      {showFacts && (
        <div className="relative z-10 mx-auto mt-20 max-w-7xl px-6">
          <FactsRow />
        </div>
      )}
    </section>
  );
}

function PhotoPanel() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-s-2xl bg-parchment-200">
      <Image
        src={asset("why-nevada.webp")}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        quality={90}
        className="object-cover object-center"
      />
    </div>
  );
}

function TextPanel({
  wide = false,
  showButton = false,
  ctaHref,
}: {
  wide?: boolean;
  showButton?: boolean;
  ctaHref?: string;
}) {
  return (
    <div>
      <h2 className="font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
        Why <em className="font-normal italic">Nevada.</em>
      </h2>
      <div
        className={`mt-8 space-y-4 text-lg text-parchment-100/85 leading-[1.55] md:text-xl ${
          wide ? "max-w-3xl" : "max-w-md"
        }`}
      >
        <p>
          Nevada has one of the most modern and protective trust frameworks in the United States.
        </p>
        <p>
          Sava situs trusts here because the legal structure meaningfully benefits the families and
          advisors we serve.
        </p>
      </div>
      {showButton && ctaHref && (
        <div className="mt-10">
          <BrandButton asChild brand="primary" size="xl">
            <Link href={ctaHref}>
              Read more <ArrowRight aria-hidden="true" />
            </Link>
          </BrandButton>
        </div>
      )}
    </div>
  );
}

function FactsRow() {
  return (
    <dl className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
      {FACTS.map((fact, idx) => (
        <div key={fact.headline} className="border-yarrow-500/40 border-t pt-6">
          <span className="font-mono font-light text-3xl text-yarrow-500 leading-none tracking-tight">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <dt className="mt-6 font-normal font-serif text-xl text-parchment-50 leading-tight">
            {fact.headline}
          </dt>
          <dd className="mt-3 text-base text-parchment-100/75 leading-relaxed">{fact.body}</dd>
        </div>
      ))}
    </dl>
  );
}

// Cedar-toned leaf bleeding off either the LEFT or RIGHT viewport edge.
// Same size / opacity treatment as services-section for visual rhyme.
function NevadaLeaf({ side }: { side: "left" | "right" }) {
  const maskUrl = `url(${asset("leaves/test-15.png")})`;
  const left = side === "left";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 z-0 w-[60%] bg-cedar-900/55 md:w-[55%] lg:w-[50%] ${
        left ? "-start-4 md:-start-6 lg:-start-8" : "-end-4 md:-end-6 lg:-end-8"
      }`}
      style={{
        maskImage: maskUrl,
        maskRepeat: "no-repeat",
        maskSize: "auto 100%",
        maskPosition: left ? "left center" : "right center",
        WebkitMaskImage: maskUrl,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "auto 100%",
        WebkitMaskPosition: left ? "left center" : "right center",
      }}
    />
  );
}
