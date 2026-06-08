import type { Metadata } from "next";
import { Eyebrow } from "../_components/ui/eyebrow";
import { asset } from "../_lib/asset";

// Faint linocut leaf silhouette anchored to the right edge of the hero,
// the same CSS-mask treatment used elsewhere on the site.
function LeafBackdrop() {
  const maskUrl = `url(${asset("leaves/test-15.png")})`;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 end-0 z-0 w-[60%] bg-parchment-50/[0.08]"
      style={{
        maskImage: maskUrl,
        maskRepeat: "no-repeat",
        maskSize: "auto 110%",
        maskPosition: "right center",
        WebkitMaskImage: maskUrl,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "auto 110%",
        WebkitMaskPosition: "right center",
      }}
    />
  );
}

export const metadata: Metadata = {
  title: "About",
  description:
    "Sava is a Nevada-chartered trust company building the operational infrastructure for modern fiduciary administration.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-cedar-700">
        <LeafBackdrop />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 sm:py-32 md:py-40">
          <h1 className="font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            We built the trust company we wished had{" "}
            <em className="font-normal italic">existed.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-parchment-100/85 leading-[1.55] md:text-xl">
            Trusts hold trillions of dollars on behalf of American families. The institutions that
            administer them mostly do not.
          </p>
        </div>
      </section>

      <Charter />

      <section className="bg-parchment-50 pt-12 pb-20 sm:pt-16 sm:pb-28">
        <article className="mx-auto max-w-2xl px-6 text-cedar-900">
          <h2 className="font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem]">
            What we <em className="font-normal italic">won't do.</em>
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-[1.7]">
            <p>
              We don't sell investment products. We don't take a cut of the assets we administer. We
              don't blur the line between trustee and investment advisor. Directed trust structures
              keep the two cleanly separated, and we honor that separation rather than quietly
              absorb it.
            </p>
            <p>
              If a family ever decides they'd rather work with someone else, we make leaving easy.
              Trusts belong to the families that create them. We just hold the chair.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}

// Two-column "Our Charter" panel. Photo bleeds to the left viewport
// edge; editorial copy sits on a parchment field with a yarrow leaf
// silhouette running off the right edge. Top + bottom hairline rules
// frame the panel like a printed page; the meta footer mirrors a
// magazine masthead.
function Charter() {
  return (
    <section className="relative isolate overflow-hidden bg-parchment-50 pt-20 sm:pt-28">
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6">
        <Eyebrow>Our charter</Eyebrow>
        <p className="mt-10 font-normal font-serif text-cedar-900 text-xl italic leading-snug md:text-2xl">
          We hold what families intend to keep.
        </p>
        <h2 className="mt-8 font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem]">
          Sava is a chartered fiduciary for the long horizon.
        </h2>
        <p className="mt-8 text-base text-cedar-900/75 leading-[1.65] md:text-lg">
          We were founded on a single conviction: that the work of holding a trust deserves more
          care, more independence, and more permanence than a quarterly business model can offer. We
          are chartered in Nevada, with offices in New York, owned by our partners, and built to
          operate across generations.
        </p>
      </div>
    </section>
  );
}
