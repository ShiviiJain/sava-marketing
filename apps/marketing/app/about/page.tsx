import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "../_components/ui/eyebrow";
import { asset } from "../_lib/asset";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sava is a Nevada-chartered trust company building the operational infrastructure for modern fiduciary administration.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      {/* Editorial about header: breadcrumb, heading on the left with a short
          intro on the right, a two-up image band, then the "Our story" block. */}
      <section className="bg-parchment-50">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
          <p className="font-mono font-semibold text-2xs text-cedar-900 uppercase tracking-[0.18em]">
            About
          </p>

          <div className="mt-8 grid items-start gap-8 md:mt-10 lg:grid-cols-2 lg:gap-16">
            <h1 className="font-normal font-serif text-xl text-cedar-900 leading-[1.15] tracking-[-0.01em] sm:text-2xl lg:text-3xl">
              We built the trust company we wished had{" "}
              <em className="font-normal italic">existed.</em>
            </h1>
            <div className="lg:pt-3">
              <p className="text-base text-cedar-900/70 leading-relaxed md:text-lg">
                Sava is a Nevada-chartered trust company building the operational infrastructure for
                modern fiduciary administration, trusted for clarity, independence, and permanence.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-[1fr_2fr] md:mt-16 md:gap-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-parchment-200">
              <Image
                src={asset("about-story-1.webp")}
                alt=""
                fill
                sizes="(min-width: 640px) 30vw, 100vw"
                quality={90}
                className="object-cover object-center"
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-parchment-200">
              <Image
                src={asset("about-story-2.webp")}
                alt=""
                fill
                sizes="(min-width: 640px) 60vw, 100vw"
                quality={90}
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-[10rem_1fr] md:gap-12 lg:gap-16">
            <Eyebrow as="h2">Our story</Eyebrow>
            <div className="max-w-3xl">
              {/* Lead — small */}
              <p className="text-lg text-cedar-900/85 leading-relaxed md:text-xl">
                The work of holding a trust is changing slowly, and for the better. It can be more
                careful, more independent, more built to last. But the institutions doing that work
                mostly aren't built for it.
              </p>
              {/* Body — even smaller */}
              <div className="mt-6 space-y-4 text-cedar-900 text-base leading-relaxed md:text-lg">
                <p>
                  Everyone tried to fix this by adding layers. More products to cross-sell. More
                  incentives that quietly pulled the trustee and the investment advisor onto the same
                  balance sheet. More reasons to make leaving hard.
                </p>
                <p>
                  We believe a trust company should be built differently from the foundation, not
                  patched at the edges. So we had to start from ground zero.
                </p>
                <p className="font-medium text-cedar-900">So we built Sava.</p>
                <p>
                  A chartered fiduciary in Nevada, owned by its partners and built to operate across
                  generations rather than across quarters. Every part of how we hold a trust, we
                  built from the ground up, with no legacy incentives and no inherited conflicts. We
                  are purpose-built to administer trusts for the next hundred years.
                </p>
                <p>
                  And we are just getting started. The chartered fiduciary is the foundation. The
                  part that has to be unimpeachable before anything else can stand on it. From here
                  we intend to build outward: more of the work that families and their advisors have
                  always had to stitch together themselves, held to the same standard.
                </p>
                <p>
                  Trusts belong to the families that create them. We just hold the chair, and we
                  plan to make it the best-built chair in the country.
                </p>
                <p>
                  If you'd like to work with us, these are our{" "}
                  <Link
                    href="/careers"
                    className="font-medium text-cedar-900 underline decoration-cedar-900/30 underline-offset-4 transition-colors hover:decoration-cedar-900"
                  >
                    open roles
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
