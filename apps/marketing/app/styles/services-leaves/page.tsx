import type { Metadata } from "next";
import { type ServicesLeafPosition, ServicesSection } from "../../_components/services-section";
import { Eyebrow } from "../../_components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Styles — Services leaf positions",
  robots: { index: false, follow: false },
};

const POSITIONS: { value: ServicesLeafPosition; label: string; note: string }[] = [
  {
    value: "header",
    label: "1. Centered behind the heading",
    note: "Leaf sits behind the heading band at the top. Doesn't overlap the grid.",
  },
  {
    value: "right",
    label: "2. Right-anchored, vertically centered",
    note: "Tucks into the right margin halfway down the section. Hidden below lg.",
  },
  {
    value: "watermark",
    label: "3. Large centered watermark",
    note: "Fills the section as a faint backdrop. Scaled to 80% so it doesn't clip.",
  },
  {
    value: "rows",
    label: "4. Behind the grid, between rows",
    note: "Vertical centerline through the 2-column grid. Hidden below lg.",
  },
];

export default function ServicesLeavesPreviewPage() {
  return (
    <main className="bg-parchment-100">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Eyebrow>Marketing — preview</Eyebrow>
        <h1 className="mt-6 font-normal font-serif text-4xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-5xl">
          Services leaf <em className="font-normal italic">positions.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-cedar-900/70 text-lg leading-[1.55]">
          Four candidate placements for the linocut leaf in the "What we administer" section. Each
          variant uses the same mask (test-23) and tint — only the position changes.
        </p>
      </section>

      {POSITIONS.map((p) => (
        <div key={p.value}>
          <div className="bg-cedar-900 px-6 py-4">
            <div className="mx-auto flex max-w-5xl items-baseline justify-between gap-4">
              <Eyebrow ground="cedar">{p.label}</Eyebrow>
              <span className="text-parchment-100/70 text-sm">{p.note}</span>
            </div>
          </div>
          <ServicesSection leaf={p.value} />
        </div>
      ))}
    </main>
  );
}
