import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "../../_components/ui/eyebrow";
import { asset } from "../../_lib/asset";

export const metadata: Metadata = {
  title: "Styles — Leaf gallery",
  robots: { index: false, follow: false },
};

const LEAF_NUMBERS = Array.from({ length: 36 }, (_, i) => i + 1);

export default function LeafGalleryPage() {
  return (
    <main className="bg-parchment-50">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Eyebrow>Marketing — assets</Eyebrow>
        <h1 className="mt-6 font-normal font-serif text-4xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-5xl">
          Leaf <em className="font-normal italic">gallery.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-cedar-900/70 text-lg leading-[1.55]">
          36 linocut leaves cropped from{" "}
          <code className="font-mono text-base">/local/leaves-source.jpg</code>. All rendered at
          full silhouette on parchment + cedar grounds so you can read shape and weight before
          picking. Tell me a number and I'll wire it into whichever section.
        </p>

        <h2 className="mt-16 font-mono font-semibold text-2xs text-yarrow-600 uppercase tracking-[0.18em]">
          On parchment (cedar tint)
        </h2>
        <ul className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
          {LEAF_NUMBERS.map((n) => (
            <LeafThumb key={`p-${n}`} number={n} ground="parchment" />
          ))}
        </ul>
      </section>

      <section className="bg-cedar-700 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-mono font-semibold text-2xs text-yarrow-500 uppercase tracking-[0.18em]">
            On cedar (parchment tint)
          </h2>
          <ul className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
            {LEAF_NUMBERS.map((n) => (
              <LeafThumb key={`c-${n}`} number={n} ground="cedar" />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

interface LeafThumbProps {
  number: number;
  ground: "parchment" | "cedar";
}

function LeafThumb({ number, ground }: LeafThumbProps) {
  const padded = String(number).padStart(2, "0");
  return (
    <li
      className={`relative flex aspect-square items-center justify-center rounded-sm p-3 ${
        ground === "parchment"
          ? "bg-parchment-100 ring-1 ring-cedar-900/10"
          : "bg-cedar-900/30 ring-1 ring-parchment-50/10"
      }`}
    >
      <Image
        src={asset(`leaves/test-${padded}.png`)}
        alt={`Leaf ${padded}`}
        width={200}
        height={200}
        className={`h-full w-full object-contain ${
          ground === "parchment" ? "opacity-70" : "opacity-80 invert"
        }`}
      />
      <span
        className={`absolute start-2 top-1 font-mono font-semibold text-2xs tracking-[0.12em] ${
          ground === "parchment" ? "text-cedar-900/55" : "text-parchment-100/65"
        }`}
      >
        {padded}
      </span>
    </li>
  );
}
