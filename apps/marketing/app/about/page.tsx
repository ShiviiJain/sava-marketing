import type { Metadata } from "next";

// Faint linocut leaf silhouette anchored to the right edge of the hero,
// the same CSS-mask treatment used elsewhere on the site.
function LeafBackdrop() {
  const maskUrl = "url(/local/leaves/test-15.png)";
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
            Trusts hold trillions of dollars on behalf of American families.
            The institutions that administer them mostly do not.
          </p>
        </div>
      </section>

      <section className="bg-parchment-50 py-20 sm:py-28">
        <article className="mx-auto max-w-2xl px-6 text-cedar-900">
          <div className="space-y-8 text-justify text-lg leading-[1.7]">
            <p>
              The trust industry has been quietly broken for a long time. Statements
              arrive late or not at all. Tax documents land months after they're
              due. Routine requests, like a distribution, a beneficiary update,
              or a question about an investment line, sit in inboxes for weeks
              before anyone answers them. Families who set up their trust
              expecting quiet stewardship instead inherit a slow-motion
              administrative burden.
            </p>
            <p>
              We spoke to dozens of families, attorneys, and advisors before we
              wrote a line of code. The pattern was consistent. The people on
              the ground, drafting documents, advising clients, reading
              statements, were doing thoughtful work. The institutions sitting
              between them were not. Bank trust departments treated trusts as a
              line item. Old-line trust companies treated software as something
              someone else would do. Nobody owned the operational experience
              end to end.
            </p>
          </div>

          <h2 className="mt-16 font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl">
            What we're <em className="font-normal italic">building.</em>
          </h2>

          <div className="mt-8 space-y-8 text-justify text-lg leading-[1.7]">
            <p>
              Sava is a Nevada-chartered trust company that owns both halves of
              the problem: the fiduciary work and the system of record that
              supports it. Trust officers, accountants, and engineers sit on the
              same team. The software they use is the software we wrote. Every
              statement, every tax document, every distribution moves through a
              single workflow we control end to end.
            </p>
            <p>
              Our job is to make trust administration feel the way it always
              should have: clear, current, and quietly competent. Families
              should be able to log in and see what their trust actually owns.
              Attorneys should be able to draft and know their work will be
              honored as written. Advisors should be able to manage assets
              without re-litigating their relationship with the family.
            </p>
            <p>
              We chose Nevada deliberately. The legal framework, with directed
              trusts, dynasty terms, and strong asset protection, was built for
              what modern families need. We chose to charter from day one
              because the alternative is to be a technology company writing
              checks to old institutions. The trust company we wished had
              existed could not be a vendor. It had to be the institution.
            </p>
          </div>

          <h2 className="mt-16 font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl">
            What we <em className="font-normal italic">won't do.</em>
          </h2>

          <div className="mt-8 space-y-8 text-justify text-lg leading-[1.7]">
            <p>
              We don't sell investment products. We don't take a cut of the
              assets we administer. We don't blur the line between trustee and
              investment advisor. Directed trust structures keep the two
              cleanly separated, and we honor that separation rather than
              quietly absorb it. And if a family ever decides they'd rather
              work with someone else, we make leaving easy. Trusts belong to
              the families that create them. We just hold the chair.
            </p>
          </div>
        </article>
      </section>

      <section className="bg-parchment-100 py-16">
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
