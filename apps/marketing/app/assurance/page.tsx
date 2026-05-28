import { cn } from "@sava/ui";
import { Building2, Scale, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { Eyebrow } from "../_components/ui/eyebrow";

interface ProtectionBlock {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  term: string;
  body: string;
}

const PROTECTIONS: ProtectionBlock[] = [
  {
    Icon: Scale,
    term: "Law",
    body: "A Nevada state-chartered trust company, regulated by the Nevada Financial Institutions Division and bound by fiduciary duty.",
  },
  {
    Icon: Building2,
    term: "Structure",
    body: "Trust assets sit with independent custodians, legally segregated from Sava and beyond the reach of creditors.",
  },
  {
    Icon: ShieldCheck,
    term: "Discipline",
    body: "A minimum capital reserve of $1M from day one, at least half in cash. The floor only moves up.",
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
      <Commitments />
      <ProtectionMechanics />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-cedar-700 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="-z-10 pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(/local/assurance-hero-bg.jpg)",
          backgroundSize: "150% auto",
          backgroundPosition: "0% 20%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        aria-hidden="true"
        className="-z-10 absolute inset-0 bg-gradient-to-r from-cedar-700/85 from-0% via-cedar-700/40 via-40% to-cedar-700/30 to-100%"
      />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <h1 className="font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
          How your trust is <em className="font-normal italic">protected.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-parchment-100/85 leading-[1.55] md:text-xl">
          Your trust is protected by law, by structure, and by the discipline we hold ourselves to.
          And if it is ever time to leave, we will not stand in your way.
        </p>
      </div>
    </section>
  );
}

function Commitments() {
  return (
    <section className="bg-parchment-50 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <header className="max-w-4xl">
          <h2 className="text-balance font-normal font-serif text-4xl text-cedar-900 leading-[1.1] tracking-[-0.02em] sm:text-5xl">
            The commitments that shape every trust we{" "}
            <em className="font-normal italic">administer.</em>
          </h2>
        </header>
        <div className="mt-14 space-y-16 md:mt-20 md:space-y-20">
          <Tenet
            index="01"
            term="Families"
            body="The trust serves the family. Every act of administration is measured against the people it's meant to protect, including the ones who aren't in the room yet."
            src="/local/tenet-families.jpg"
            align="left"
          />
          <Tenet
            index="02"
            term="Permanence"
            body="A trust company built to outlast its founders. The records, the relationships, the institution, all designed to be inherited."
            src="/local/tenet-permanence.jpg"
            align="right"
          />
          <Tenet
            index="03"
            term="Stewardship"
            body="Care is the work. We administer with the rigor and attentiveness the trusts in our care deserve, in writing and in practice."
            src="/local/tenet-stewardship.jpg"
            align="left"
          />
        </div>
      </div>
    </section>
  );
}

function ProtectionMechanics() {
  return (
    <section className="bg-cedar-700 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <header className="max-w-3xl">
          <h2 className="font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl">
            Protection, <em className="font-normal italic">by design.</em>
          </h2>
          <p className="mt-5 max-w-2xl text-base text-parchment-100/85 leading-[1.55]">
            Your assets are protected by law, structure, and discipline, in that order.
          </p>
        </header>
        <dl className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-3 md:mt-16">
          {PROTECTIONS.map(({ Icon, term, body }) => (
            <div key={term}>
              <Icon
                aria-hidden="true"
                className="size-7 stroke-yarrow-500"
                strokeWidth={1.5}
              />
              <dt className="mt-5 font-normal font-serif text-xl text-parchment-50 leading-tight">
                {term}
              </dt>
              <dd className="mt-3 text-base text-parchment-100/80 leading-relaxed">{body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
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
  const imageOrder = align === "right" ? "md:order-2" : "md:order-1";
  const textOrder = align === "right" ? "md:order-1" : "md:order-2";

  return (
    <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden rounded-sm bg-parchment-200",
          imageOrder
        )}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 768px) 28rem, 90vw"
          quality={95}
          className="object-cover object-center"
        />
      </div>
      <div className={cn("flex flex-col justify-center", textOrder)}>
        <Eyebrow as="span" uppercase={false}>
          {index}
        </Eyebrow>
        <h3 className="mt-3 font-normal font-serif text-2xl text-cedar-900 leading-tight md:text-3xl">
          {term}
        </h3>
        <p className="mt-4 text-base text-cedar-900/70 leading-relaxed md:text-lg">{body}</p>
      </div>
    </article>
  );
}

