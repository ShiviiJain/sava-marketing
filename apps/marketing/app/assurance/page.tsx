import { cn } from "@sava/ui";
import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "../_components/ui/scroll-reveal";
import { asset } from "../_lib/asset";

interface ProtectionBlock {
  /** Small muted label above the heading (Aesop-style kicker). */
  kicker: string;
  term: string;
  body: string;
  src: string;
}

const PROTECTIONS: ProtectionBlock[] = [
  {
    kicker: "Chartered oversight",
    term: "Law",
    body: "A Nevada state-chartered trust company, examined by the Financial Institutions Division and bound by law to put your interest first.",
    src: asset("assurance-law.webp"),
  },
  {
    kicker: "Segregated assets",
    term: "Structure",
    body: "Your assets sit with independent custodians, legally separate from Sava's balance sheet and beyond the reach of its creditors.",
    src: asset("assurance-structure.webp"),
  },
  {
    kicker: "Capital reserve",
    term: "Discipline",
    body: "A capital reserve of at least $1M from day one, half of it in cash. That floor only ever rises.",
    src: asset("assurance-discipline.webp"),
  },
];

export const metadata: Metadata = {
  title: "Sava Assurance Program",
  description:
    "How Sava protects your trust: chartered oversight, segregated assets, capital reserves, and the freedom to leave on your terms.",
  alternates: { canonical: "/assurance" },
};

export default function AssurancePage() {
  return (
    <main>
      <Hero />
      <ProtectionMechanics />
      <Commitments />
    </main>
  );
}

function Hero() {
  // Bridged hero: cedar text panel on the left with light copy, photo on
  // the right, leaf overlay at the seam. Cedar ground; the nav still sits
  // solid above it (this hero doesn't bleed behind the nav).
  const leafMask = `url(${asset("leaves/test-30.png")})`;
  return (
    <section className="relative isolate overflow-hidden bg-cedar-700">
      <div className="grid items-stretch md:grid-cols-2">
        <div className="relative flex flex-col justify-center overflow-hidden px-6 py-20 md:ps-14 md:pe-10 md:py-28 lg:ps-24 lg:pe-16 lg:py-36">
          <div
            aria-hidden="true"
            className="-end-[22%] pointer-events-none absolute inset-y-0 z-0 w-[78%] bg-cedar-600"
            style={{
              maskImage: leafMask,
              maskRepeat: "no-repeat",
              maskSize: "auto 120%",
              maskPosition: "center",
              WebkitMaskImage: leafMask,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "auto 120%",
              WebkitMaskPosition: "center",
            }}
          />
          <div className="relative z-10">
            <h1 className="font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              How your trust is <em className="font-normal italic">protected.</em>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-parchment-100/85 leading-[1.55] md:text-xl">
              Your assets sit apart from Sava and stay yours at every step. If you ever decide to
              move the trust elsewhere, nothing about how we work will stand in your way.
            </p>
          </div>
        </div>
        <div className="relative min-h-[24rem] w-full overflow-hidden bg-parchment-200 md:min-h-[34rem] lg:min-h-[40rem]">
          <Image
            src={asset("assurance-hero-bg.webp")}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            quality={90}
            className="object-cover object-[68%_center]"
            priority
          />
        </div>
      </div>
    </section>
  );
}

function Commitments() {
  return (
    <section className="overflow-hidden bg-parchment-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <header>
          <h2 className="text-balance font-normal font-serif text-2xl text-cedar-900 leading-[1.1] tracking-[-0.02em] sm:text-3xl">
            The commitments that shape every trust we administer.
          </h2>
        </header>
      </div>
      <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
        <ScrollReveal>
          <Tenet
            index="01"
            term="The family comes first."
            body="Every act of administration answers to the people the trust exists to protect, including the ones who aren't here yet."
            src={asset("tenet-families.webp")}
            align="left"
          />
        </ScrollReveal>
        <ScrollReveal>
          <Tenet
            index="02"
            term="Built to outlast us."
            body="A trust company designed to be inherited. The records, the relationships, the institution itself, all built to carry on without us."
            src={asset("tenet-permanence-v2.webp")}
            align="right"
          />
        </ScrollReveal>
        <ScrollReveal>
          <Tenet
            index="03"
            term="Care is the work."
            body="We administer with the rigor and attention the trusts in our care deserve, on paper and in practice."
            src={asset("tenet-stewardship.webp")}
            align="left"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProtectionMechanics() {
  return (
    <section className="overflow-hidden bg-parchment-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <header>
          <h2 className="font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl">
            Built to protect.
          </h2>
          <p className="mt-6 font-normal font-serif text-cedar-900 text-lg leading-snug md:text-xl">
            Built-in layers of protection stand between your trust and anything that could reach it.
          </p>
        </header>
      </div>
      <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
        {PROTECTIONS.map((protection, i) => (
          <ScrollReveal key={protection.term}>
            <ProtectionRow {...protection} flip={i % 2 === 1} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

// Edge-bleed row: the photo runs to the viewport edge on its side and takes
// half the width; the text column pads itself so its inner edge still lands on
// the page's max-w-6xl (72rem) content margin. Sides alternate per row.
function ProtectionRow({ kicker, term, body, src, flip }: ProtectionBlock & { flip: boolean }) {
  const photo = (
    <div
      className={cn(
        "relative aspect-[3/2] w-full overflow-hidden bg-parchment-200",
        flip ? "md:rounded-s-[2px]" : "md:rounded-e-[2px]"
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        quality={95}
        className="object-cover object-center"
      />
    </div>
  );
  const text = (
    <div
      className={cn(
        "mx-auto flex w-full max-w-xl flex-col md:mx-0 md:max-w-none",
        flip
          ? "px-6 md:pe-12 md:ps-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pe-16"
          : "px-6 md:ps-12 md:pe-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:ps-16"
      )}
    >
      <p className="font-mono text-yarrow-600 text-sm uppercase tracking-[0.16em]">{kicker}</p>
      <h3 className="mt-2 font-normal font-serif text-2xl text-cedar-900 leading-snug md:text-3xl">
        {term}
      </h3>
      <p className="mt-4 max-w-md text-lg text-cedar-900/65 leading-relaxed">{body}</p>
    </div>
  );

  return (
    // Text top-aligns with the top of the photo (items-start). Photo takes
    // ~46.5% (≈7% shorter in length than a clean half) and bleeds to the edge.
    <article
      className={cn(
        "grid items-start gap-8 md:gap-0",
        flip ? "md:grid-cols-[1fr_46.5%]" : "md:grid-cols-[46.5%_1fr]"
      )}
    >
      {flip ? (
        <>
          {text}
          {photo}
        </>
      ) : (
        <>
          {photo}
          {text}
        </>
      )}
    </article>
  );
}

function Tenet({
  index,
  term,
  body,
  src,
  align,
}: {
  index: string;
  term: string;
  body: string;
  src: string;
  align: "left" | "right";
}) {
  // Matches ProtectionRow exactly: photo bleeds to the viewport edge and takes
  // ~46.5%; the text column pads out so its inner edge lands on the page's
  // max-w-6xl (72rem) content margin.
  const photo = (
    <div
      className={cn(
        "relative aspect-[3/2] w-full overflow-hidden bg-parchment-200",
        align === "left" ? "md:rounded-e-[2px]" : "md:rounded-s-[2px]"
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        quality={95}
        className="object-cover object-center"
      />
    </div>
  );
  const text = (
    <div
      className={cn(
        "mx-auto flex w-full max-w-xl flex-col md:mx-0 md:max-w-none",
        align === "left"
          ? "px-6 md:ps-12 md:pe-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:ps-16"
          : "px-6 md:pe-12 md:ps-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pe-16"
      )}
    >
      <p className="font-mono text-yarrow-600 text-sm uppercase tracking-[0.16em]">{index}</p>
      <h3 className="mt-2 font-normal font-serif text-2xl text-cedar-900 leading-snug md:text-3xl">
        {term}
      </h3>
      <p className="mt-4 max-w-md text-lg text-cedar-900/65 leading-relaxed">{body}</p>
    </div>
  );

  return (
    // Text top-aligns with the photo; photo takes ~46.5% (≈7% shorter in
    // length than a clean half) and bleeds to the edge.
    <article
      className={cn(
        "grid items-start gap-8 md:gap-0",
        align === "left" ? "md:grid-cols-[46.5%_1fr]" : "md:grid-cols-[1fr_46.5%]"
      )}
    >
      {align === "left" ? photo : text}
      {align === "left" ? text : photo}
    </article>
  );
}
