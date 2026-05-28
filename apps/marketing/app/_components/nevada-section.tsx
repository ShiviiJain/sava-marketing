import Image from "next/image";
import { Eyebrow } from "./ui/eyebrow";

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

export function NevadaSection() {
  return (
    <section className="relative overflow-hidden bg-cedar-700 py-24 sm:py-32">
      {/* Hero row spans the full viewport so the photo can sit flush
          against the right edge. Text column pads itself out to align
          with the normal max-w-7xl left margin. */}
      <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-0">
        <div className="px-6 md:ps-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] md:pe-10 lg:pe-16">
          <TextPanel />
        </div>
        <PhotoPanel />
      </div>

      <div className="relative z-10 mx-auto mt-20 max-w-7xl px-6">
        <FactsRow />
      </div>
    </section>
  );
}

function PhotoPanel() {
  return (
    // No right padding on the parent grid cell + rounded-s only → photo
    // is flush against the viewport's right edge, "emerging" from there.
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-s-2xl bg-parchment-200">
      <Image
        src="/local/why-nevada.jpg"
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        quality={90}
        className="object-cover object-center"
      />
    </div>
  );
}

function TextPanel() {
  return (
    <div>
      <h2 className="font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
        Why <em className="font-normal italic">Nevada.</em>
      </h2>
      <div className="mt-8 max-w-md space-y-4 text-lg text-parchment-100/85 leading-[1.55]">
        <p>
          Nevada has one of the most modern and protective trust frameworks in the United States.
        </p>
        <p>
          Sava situs trusts here because the legal structure meaningfully benefits the families
          and advisors we serve.
        </p>
      </div>
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

