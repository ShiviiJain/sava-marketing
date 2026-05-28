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

function MaskedIcon({ src }: { src: string }) {
  const maskUrl = `url(${src})`;
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-10 items-center justify-center rounded-sm bg-yarrow-500/90"
    >
      <span
        className="block size-5 bg-cedar-900"
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
    </span>
  );
}

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
        <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
          <Tenet
            index="01"
            term="Families"
            body="The trust serves the family. Every act of administration is measured against the people it's meant to protect, including the ones who aren't in the room yet."
            src="/local/tenet-families.jpg"
            iconSrc="/local/icons/sprout.svg"
            align="left"
          />
          <div className="flex justify-end">
            <div className="relative aspect-[3/1] w-3/4 overflow-hidden rounded-sm shadow-2xl shadow-cedar-900/30 ring-1 ring-cedar-900/5">
              <Image
                src="/local/families-matcha-band.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 60vw, 90vw"
                quality={95}
                className="object-cover object-center"
              />
            </div>
          </div>
          <Tenet
            index="02"
            term="Permanence"
            body="A trust company built to outlast its founders. The records, the relationships, the institution, all designed to be inherited."
            src="/local/tenet-permanence.jpg"
            iconSrc="/local/icons/landmark.svg"
            align="right"
            leaf="06"
          />
          <div className="flex justify-start">
            <div className="relative aspect-[3/1] w-3/4 overflow-hidden rounded-sm shadow-2xl shadow-cedar-900/30 ring-1 ring-cedar-900/5">
              <Image
                src="/local/permanence-band.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 60vw, 90vw"
                quality={95}
                className="object-cover object-center"
              />
            </div>
          </div>
          <Tenet
            index="03"
            term="Stewardship"
            body="Care is the work. We administer with the rigor and attentiveness the trusts in our care deserve, in writing and in practice."
            src="/local/tenet-stewardship.jpg"
            iconSrc="/local/icons/compass.svg"
            align="left"
            leaf="01"
          />
          <div className="flex justify-end">
            <div className="relative aspect-[3/1] w-3/4 overflow-hidden rounded-sm shadow-2xl shadow-cedar-900/30 ring-1 ring-cedar-900/5">
              <Image
                src="/local/stewardship-band.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 60vw, 90vw"
                quality={95}
                className="object-cover object-center"
              />
            </div>
          </div>
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
  accentSrc,
  iconSrc,
  align,
  leaf = "15",
  aspect = "portrait",
}: {
  index: string;
  term: string;
  body: string;
  src?: string;
  accentSrc?: string;
  iconSrc?: string;
  align: "left" | "right";
  /** Leaf number from /local/leaves/test-NN.png — defaults to 15 (Fig). */
  leaf?: string;
  /** Photo card aspect — portrait (4/5) or landscape (3/2). */
  aspect?: "portrait" | "landscape";
}) {
  const imageOrder = align === "right" ? "md:order-2" : "md:order-1";
  const textOrder = align === "right" ? "md:order-1" : "md:order-2";
  const leafUrl = `url(/local/leaves/test-${leaf}.png)`;

  // Simple layout (no accent image): bigger primary photo on one side,
  // leaf motif sized large behind the text on the other. When `src` is
  // omitted, the photo column is skipped and the text panel runs full
  // width with the leaf still anchored to its side.
  if (!accentSrc) {
    return (
      <article
        className={cn(
          "grid items-center gap-10 md:gap-16",
          src && "md:grid-cols-2"
        )}
      >
        {src && (
          <div
            className={cn(
              "relative overflow-hidden rounded-sm bg-parchment-200 shadow-xl shadow-cedar-900/20",
              aspect === "landscape" ? "aspect-[3/2]" : "aspect-[4/5]",
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
            {iconSrc && (
              <span className="absolute end-4 bottom-4 z-10">
                <MaskedIcon src={iconSrc} />
              </span>
            )}
          </div>
        )}
        <div
          className={cn(
            "relative isolate flex flex-col justify-center self-stretch py-12",
            textOrder
          )}
        >
          <div
            aria-hidden="true"
            className="-z-10 pointer-events-none absolute inset-0"
            style={{
              backgroundColor: "oklch(0.334 0.041 210 / 0.18)",
              maskImage: leafUrl,
              maskRepeat: "no-repeat",
              maskSize: "contain",
              maskPosition: align === "right" ? "right center" : "left center",
              WebkitMaskImage: leafUrl,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              WebkitMaskPosition: align === "right" ? "right center" : "left center",
            }}
          />
          <div className="relative">
            <Eyebrow as="span" uppercase={false}>
              {index}
            </Eyebrow>
            <h3 className="mt-3 font-normal font-serif text-2xl text-cedar-900 leading-tight md:text-3xl">
              {term}
            </h3>
            <p className="mt-4 text-base text-cedar-900/70 leading-relaxed md:text-lg">{body}</p>
          </div>
        </div>
      </article>
    );
  }

  // Layered layout (used when accentSrc is provided): primary photo plus
  // smaller accent photo behind it, with the leaf as a centered backdrop.
  return (
    <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className={cn("relative aspect-[7/6]", imageOrder)}>
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute aspect-square h-[80%] bg-cedar-900/20",
            align === "right" ? "top-0 start-0" : "top-0 end-0"
          )}
          style={{
            maskImage: "url(/local/leaves/test-15.png)",
            maskRepeat: "no-repeat",
            maskSize: "contain",
            maskPosition: "center",
            WebkitMaskImage: "url(/local/leaves/test-15.png)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            WebkitMaskPosition: "center",
          }}
        />
        {src && (
          <div
            className={cn(
              "absolute top-0 z-20 aspect-[4/5] h-[85%] overflow-hidden rounded-sm bg-parchment-200 shadow-xl shadow-cedar-900/20",
              align === "right" ? "end-0" : "start-0"
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 768px) 18rem, 50vw"
              className="object-cover object-center"
            />
            {iconSrc && (
              <span className="absolute end-4 bottom-4 z-10">
                <MaskedIcon src={iconSrc} />
              </span>
            )}
          </div>
        )}
        <div
          aria-hidden="true"
          className={cn(
            "absolute bottom-0 z-10 aspect-[4/5] h-[85%] overflow-hidden rounded-sm bg-parchment-200 shadow-lg shadow-cedar-900/15",
            align === "right" ? "start-0" : "end-0"
          )}
        >
          <Image
            src={accentSrc}
            alt=""
            fill
            sizes="(min-width: 768px) 18rem, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className={textOrder}>
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

