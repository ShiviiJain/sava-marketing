import { SavaLogo } from "@sava/ui";
import { ArrowRight, Check, FileCheck, FileText, Repeat } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BrandButton } from "../_components/ui/brand-button";
import { Eyebrow } from "../_components/ui/eyebrow";
import { asset } from "../_lib/asset";

export const metadata: Metadata = {
  title: "Nevada to Delaware Trust Converter",
  description:
    "Move a trust's situs between Nevada and Delaware with the governing terms translated cleanly. A standalone tool from Sava Trust Company.",
  alternates: { canonical: "/nevada-to-delaware" },
};

const MAPPING = [
  { label: "Situs", value: "Re-sited to Delaware" },
  { label: "Governing law", value: "Delaware Trust Act" },
  { label: "Perpetuity period", value: "Extended" },
  { label: "Directed-trust roles", value: "Preserved" },
  { label: "Beneficiaries & standard", value: "Unchanged" },
];

const STEPS = [
  {
    Icon: FileText,
    title: "Bring your Nevada instrument",
    body: "Share the executed Nevada trust document. We read the grantor, trustee, distribution standard, and situs provisions as drafted.",
  },
  {
    Icon: Repeat,
    title: "We map it to Delaware law",
    body: "Governing-law language, situs, and administrative provisions are translated to their Delaware equivalents, with nothing quietly dropped.",
  },
  {
    Icon: FileCheck,
    title: "Receive a clean Delaware draft",
    body: "A converted draft, annotated where the two states differ, ready for counsel to review and execute.",
  },
];

export default function NevadaToDelawarePage() {
  return (
    <main className="min-h-screen bg-parchment-50">
      {/* Minimal header — the logo returns to the main landing page. */}
      <header className="border-cedar-900/10 border-b">
        <div className="mx-auto flex h-20 max-w-6xl items-center px-6">
          <Link
            href="/"
            aria-label="Sava Trust Company"
            className="transition-opacity hover:opacity-80"
          >
            <SavaLogo modifier="Trust Company" size="md" />
          </Link>
        </div>
      </header>

      {/* Hero: copy + converter card */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:py-28 lg:gap-20">
        <div>
          <Eyebrow>Jurisdiction tool</Eyebrow>
          <h1 className="mt-6 text-balance font-normal font-serif text-4xl text-cedar-900 leading-[1.04] tracking-[-0.02em] sm:text-5xl">
            The Nevada to Delaware trust <em className="font-normal italic">converter.</em>
          </h1>
          <p className="mt-7 max-w-md text-cedar-900/70 text-lg leading-[1.55]">
            Move a trust between two of the country's strongest trust jurisdictions, with the
            governing terms translated cleanly so nothing is lost in the change.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <BrandButton asChild brand="primary" size="xl">
              <a
                href="https://calendly.com/shivi-savahq/30min"
                target="_blank"
                rel="noreferrer noopener"
              >
                Talk to our team <ArrowRight aria-hidden="true" />
              </a>
            </BrandButton>
          </div>
        </div>

        <ConverterCard />
      </section>

      {/* How it works */}
      <section className="bg-parchment-100/60">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Eyebrow>How it works</Eyebrow>
          <div className="mt-12 grid gap-8 sm:grid-cols-3 md:gap-10">
            {STEPS.map(({ Icon, title, body }, i) => (
              <div key={title}>
                <div className="flex items-center gap-3">
                  <Icon aria-hidden="true" className="size-6 stroke-yarrow-600" strokeWidth={1.5} />
                  <Eyebrow as="span">{String(i + 1).padStart(2, "0")}</Eyebrow>
                </div>
                <h2 className="mt-4 font-normal font-serif text-2xl text-cedar-900 leading-tight">
                  {title}
                </h2>
                <p className="mt-3 text-base text-cedar-900/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-cedar-700 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-balance font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl">
            Considering a move to <em className="font-normal italic">Delaware?</em>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-parchment-100/85 leading-[1.55]">
            Send us the instrument and we'll walk you through what changes, what stays, and what it
            takes to make the switch.
          </p>
          <div className="mt-9 flex justify-center">
            <BrandButton asChild brand="primary" size="xl">
              <a
                href="https://calendly.com/shivi-savahq/30min"
                target="_blank"
                rel="noreferrer noopener"
              >
                Talk to our team <ArrowRight aria-hidden="true" />
              </a>
            </BrandButton>
          </div>
        </div>
      </section>
    </main>
  );
}

function ConverterCard() {
  const leafMask = `url(${asset("leaves/test-22.png")})`;
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="-inset-8 pointer-events-none absolute z-0 scale-110 bg-yarrow-300/40"
        style={{
          maskImage: leafMask,
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
          WebkitMaskImage: leafMask,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
        }}
      />
      <div className="relative z-10 rounded-2xl bg-white p-7 shadow-cedar-900/10 shadow-xl ring-1 ring-cedar-900/10">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div>
            <Eyebrow as="span">From</Eyebrow>
            <p className="mt-1.5 font-normal font-serif text-cedar-900 text-xl">Nevada</p>
          </div>
          <span className="flex size-9 items-center justify-center rounded-full bg-yarrow-200 text-cedar-900">
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
          <div className="text-end">
            <Eyebrow as="span">To</Eyebrow>
            <p className="mt-1.5 font-normal font-serif text-cedar-900 text-xl">Delaware</p>
          </div>
        </div>

        <hr className="my-6 border-cedar-900/10" />

        <dl className="space-y-3.5">
          {MAPPING.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4">
              <dt className="text-cedar-900/60 text-sm">{row.label}</dt>
              <dd className="flex items-center gap-1.5 text-cedar-900 text-sm">
                <Check aria-hidden="true" className="size-3.5 text-yarrow-600" strokeWidth={2.5} />
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
