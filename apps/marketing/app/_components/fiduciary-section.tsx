// Update LEAF_NUMBER when picking a different silhouette from /styles/leaves.
const LEAF_NUMBER = "25";

const PROTECTIONS = [
  {
    title: "Bank-grade encryption",
    body: "Documents and balances are encrypted at rest and in transit. Only you and the parties you authorize can read them.",
  },
  {
    title: "Private by default",
    body: "Sava staff cannot view your holdings or open your documents. Privacy is structural, not a setting.",
  },
  {
    title: "Independent oversight",
    body: "Every distribution decision is reviewed by a licensed fiduciary with no stake in the outcome.",
  },
  {
    title: "Yours to export",
    body: "The full trust record exports to PDF on demand. The data lives with you, not inside our software.",
  },
];

export function FiduciarySection() {
  return (
    <section className="relative overflow-hidden bg-cedar-700 py-24 sm:py-32">
      <LeafBackdrop />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-xl">
          <h2 className="font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            How your trust is <em className="font-normal italic">protected.</em>
          </h2>
          <p className="mt-8 max-w-md text-lg text-parchment-100/85 leading-[1.55]">
            Chartered in Nevada. Supervised by state banking authorities. Audited annually. Operated
            under the fiduciary duties trust law requires.
          </p>
        </div>
        <dl className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {PROTECTIONS.map((p, i) => (
            <div key={p.title} className="border-yarrow-500/40 border-t pt-6">
              <span className="font-mono font-light text-3xl text-yarrow-500 leading-none tracking-tight">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="mt-6 font-normal font-serif text-xl text-parchment-50 leading-tight">
                {p.title}
              </dt>
              <dd className="mt-3 text-base text-parchment-100/75 leading-relaxed">{p.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// Section-level leaf backdrop anchored to the right edge — same
// treatment as Nevada so adjacent cedar sections share a register.
function LeafBackdrop() {
  const maskUrl = `url(/local/leaves/test-${LEAF_NUMBER}.png)`;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 end-0 z-0 w-[60%] bg-parchment-50/[0.06]"
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
