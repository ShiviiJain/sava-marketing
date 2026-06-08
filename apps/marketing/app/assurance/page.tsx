import { cn } from "@sava/ui";
import { Building2, Scale, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { Eyebrow } from "../_components/ui/eyebrow";
import { ScrollReveal } from "../_components/ui/scroll-reveal";
import { asset } from "../_lib/asset";

interface ProtectionBlock {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  term: string;
  body: string;
  src: string;
}

const PROTECTIONS: ProtectionBlock[] = [
  {
    Icon: Scale,
    term: "Law",
    body: "A Nevada state-chartered trust company, examined by the Financial Institutions Division and bound by law to put your interest first.",
    src: asset("assurance-law.webp"),
  },
  {
    Icon: Building2,
    term: "Structure",
    body: "Your assets sit with independent custodians, legally separate from Sava's balance sheet and beyond the reach of its creditors.",
    src: asset("assurance-structure.webp"),
  },
  {
    Icon: ShieldCheck,
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
  // Bridged hero: parchment text panel on the left with cedar copy, photo
  // on the right, leaf overlay at the seam. Light ground, so the nav stays
  // solid (not in CEDAR_HERO_ROUTES).
  const leafMask = `url(${asset("leaves/test-30.png")})`;
  return (
    <section className="relative isolate overflow-hidden bg-parchment-50">
      <div className="grid items-stretch md:grid-cols-2">
        <div className="relative flex flex-col justify-center overflow-hidden px-6 py-20 md:ps-14 md:pe-10 md:py-28 lg:ps-24 lg:pe-16 lg:py-36">
          <div
            aria-hidden="true"
            className="-end-[22%] pointer-events-none absolute inset-y-0 z-0 w-[78%] bg-parchment-300"
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
            <h1 className="font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              How your trust is <em className="font-normal italic">protected.</em>
            </h1>
            <p className="mt-8 max-w-xl text-cedar-900/70 text-lg leading-[1.55] md:text-xl">
              Held by law, segregated by structure, and kept by the discipline we hold ourselves to.
              Your assets sit apart from Sava, and if the day comes to move the trust elsewhere,
              nothing in the way we work will hold it back.
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
      <div className="mx-auto max-w-5xl px-6">
        <header className="max-w-4xl">
          <h2 className="text-balance font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl">
            The commitments that shape every trust we{" "}
            <em className="font-normal italic">administer.</em>
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
    <section className="overflow-hidden bg-cedar-700 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <header className="max-w-3xl">
          <h2 className="font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl">
            Protection, <em className="font-normal italic">by design.</em>
          </h2>
          <p className="mt-8 text-lg text-parchment-100/85 leading-[1.55] md:text-xl">
            Less a promise than a design. Three layers stand between your trust and anything that
            could reach it.
          </p>
        </header>
        <div className="mt-16 grid gap-8 sm:grid-cols-3 md:mt-20 md:gap-10">
          {PROTECTIONS.map((protection, i) => (
            <ScrollReveal key={protection.term} delay={i * 120}>
              <ProtectionCard {...protection} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProtectionCard({ Icon, term, body, src }: ProtectionBlock) {
  return (
    <div className="flex h-full flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-cedar-800">
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 640px) 30vw, 100vw"
          quality={90}
          className="object-cover object-center"
        />
      </div>
      <Icon aria-hidden="true" className="mt-6 size-7 stroke-yarrow-500" strokeWidth={1.5} />
      <h3 className="mt-4 font-normal font-serif text-2xl text-parchment-50 leading-tight">
        {term}
      </h3>
      <p className="mt-3 text-base text-parchment-100/75 leading-relaxed">{body}</p>
    </div>
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
  // Photo column bleeds to the viewport edge on its side. Text column
  // pads itself out so the inner edge of the copy still aligns with the
  // page's max-w-5xl content margin.
  const photo = (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden bg-parchment-200",
        align === "left" ? "md:rounded-e-2xl" : "md:rounded-s-2xl"
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
        "mx-auto flex w-full max-w-xl flex-col justify-center py-10 md:mx-0 md:max-w-none md:py-0",
        align === "left"
          ? "px-6 md:ps-12 md:pe-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))] lg:ps-16"
          : "px-6 md:pe-12 md:ps-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))] lg:pe-16"
      )}
    >
      <Eyebrow as="span" uppercase={false}>
        {index}
      </Eyebrow>
      <h3 className="mt-3 font-normal font-serif text-2xl text-cedar-900 leading-tight md:text-3xl">
        {term}
      </h3>
      <p className="mt-4 text-base text-cedar-900/70 leading-relaxed md:text-lg">{body}</p>
    </div>
  );

  return (
    <article className="grid items-center gap-10 md:grid-cols-2 md:gap-0">
      {align === "left" ? photo : text}
      {align === "left" ? text : photo}
    </article>
  );
}
