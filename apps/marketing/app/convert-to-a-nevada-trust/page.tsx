import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "../_components/ui/eyebrow";
import { asset } from "../_lib/asset";

export const metadata: Metadata = {
  title: "Delaware to Nevada Trust Converter",
  description:
    "Moving a trust's situs from Delaware to Nevada is mostly translation, not redrafting. Why Nevada is often worth the move, and how Sava's converter makes it simple.",
  alternates: { canonical: "/convert-to-a-nevada-trust" },
};

export default function ConvertToANevadaTrustPage() {
  return (
    <main>
      <section className="bg-parchment-50">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
          <p className="font-mono font-semibold text-2xs text-cedar-900 uppercase tracking-[0.18em]">
            Delaware to Nevada
          </p>

          <div className="mt-8 grid items-start gap-8 md:mt-10 lg:grid-cols-2 lg:gap-16">
            <h1 className="font-normal font-serif text-xl text-cedar-900 leading-[1.15] tracking-[-0.01em] sm:text-2xl lg:text-3xl">
              Working in Nevada might be easier than you{" "}
              <em className="font-normal italic">thought.</em>
            </h1>
            <div className="lg:pt-3">
              <p className="text-base text-cedar-900/70 leading-relaxed md:text-lg">
                Most attorneys keep a trust in the state where it started. Re-siting it sounds like a
                hassle, so it stays put, even when another state would serve the family better. It
                rarely has to be that way.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-6xl md:mt-16">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-parchment-200">
              <Image
                src={asset("converter-hero.webp")}
                alt=""
                fill
                sizes="(min-width: 1024px) 70rem, 100vw"
                quality={90}
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-[10rem_1fr] md:gap-12 lg:gap-16">
            <Eyebrow as="h2">The converter</Eyebrow>
            <div className="max-w-3xl">
              {/* Lead — small */}
              <p className="text-lg text-cedar-900/85 leading-relaxed md:text-xl">
                Re-siting a trust to Nevada is less rewriting than translating, and Nevada is often
                worth the move.
              </p>
              {/* Body — even smaller */}
              <div className="mt-6 space-y-4 text-cedar-900 text-sm leading-relaxed md:text-base">
                <p>
                  When a client's trust is sited in Delaware, the path of least resistance is to
                  leave it there. Moving the situs sounds like redrafting the instrument from
                  scratch, coordinating with a new trustee, and untangling governing-law provisions.
                  So the trust stays where it is, and the family keeps paying for a jurisdiction that
                  no longer fits.
                </p>
                <p>
                  Nevada pairs one of the strongest trust frameworks in the country with no state
                  income tax on trusts, dynasty trusts that can run up to 365 years, directed-trust
                  roles recognized by statute, and a two-year creditor lookback among the shortest in
                  the United States. For many families, that combination is materially better than
                  where their trust sits today.
                </p>
                <p>
                  The grantor, beneficiaries, and distribution standard stay as drafted. What changes
                  is the governing-law language, the situs provisions, and the administrative
                  mechanics, mapped to their Nevada equivalents, with nothing quietly dropped.
                </p>
                <p>
                  We built a converter for exactly this. Bring your existing Delaware instrument and
                  we map its terms to Nevada law, then hand back a clean draft, annotated wherever
                  the two states differ, ready for counsel to review and execute.
                </p>
                <p>
                  If you'd like to explore a conversion,{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-cedar-900 underline decoration-cedar-900/30 underline-offset-4 transition-colors hover:decoration-cedar-900"
                  >
                    talk to our team
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
