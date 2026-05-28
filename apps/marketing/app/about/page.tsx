import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sava is a Nevada-chartered trust company building the operational infrastructure for modern fiduciary administration.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-cedar-700">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 py-20 md:grid-cols-[1fr_1fr] md:gap-16 md:py-28 lg:py-32">
          <div className="flex h-full flex-col justify-center">
            <h1 className="font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              <span className="block">We built the trust</span>
              <span className="block">
                company we wished had <em className="font-normal italic">existed.</em>
              </span>
            </h1>
            <p className="mt-10 max-w-xl text-lg text-parchment-100/85 leading-[1.55] md:text-xl">
              Sava is a Nevada-chartered trust company. We administer trusts the way our families
              and their advisors actually want: with clarity, with documentation that makes sense,
              and on a software stack we built ourselves because the alternative didn't exist.
            </p>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[28rem] overflow-hidden bg-parchment-200 md:max-w-none md:justify-self-end">
            <Image
              src="/local/about-founders.jpeg"
              alt=""
              fill
              sizes="(min-width: 768px) 40rem, 90vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-parchment-50 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-normal font-serif text-lg text-cedar-900 leading-snug tracking-tight sm:text-xl">
            Get in touch at{" "}
            <a
              href="mailto:hello@savahq.com"
              className="italic underline decoration-cedar-900/30 underline-offset-4 hover:decoration-cedar-900"
            >
              hello@savahq.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
