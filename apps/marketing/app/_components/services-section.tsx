import { cn } from "@sava/ui";
import { Eyebrow } from "./ui/eyebrow";

export type ServicesLeafPosition = "header" | "right" | "watermark" | "rows";

const SERVICES = [
  {
    name: "Revocable trust",
    body: "Allows families to maintain control and flexibility during life while establishing a framework for future administration.",
  },
  {
    name: "Dynasty trust",
    body: "Built to last a century, or longer. Wealth passes from generation to generation without re-triggering estate tax along the way.",
  },
  {
    name: "Directed trust",
    body: "Sava works alongside your existing advisors, maintaining clear separation between investment management and trust administration.",
  },
  {
    name: "Life insurance trust",
    body: "Designed to hold life insurance outside of the taxable estate, helping preserve more wealth for future generations.",
  },
  {
    name: "GRAT & IDGT",
    body: "Two of the most efficient ways to pass appreciation to the next generation, with little or no gift tax.",
  },
  {
    name: "Decanting",
    body: "When an older trust no longer reflects a family's needs, Nevada law can allow assets to move into a more modern trust structure while preserving the original intent.",
  },
];

interface ServicesSectionProps {
  leaf?: ServicesLeafPosition;
}

export function ServicesSection({ leaf }: ServicesSectionProps = {}) {
  return (
    <section
      id="services"
      className={cn("bg-parchment-50 py-24 sm:py-32", leaf && "relative overflow-hidden")}
    >
      {leaf && <ServicesLeaf position={leaf} />}
      <div className={cn("mx-auto max-w-6xl px-6", leaf && "relative z-10")}>
        <header className="max-w-3xl">
          <h2 className="font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            What we <em className="font-normal italic">administer.</em>
          </h2>
          <p className="mt-8 max-w-xl text-cedar-900/70 text-lg leading-[1.55]">
            From foundational revocable trusts to highly customized estate structures, Sava works
            alongside attorneys and advisors on the long arc of family administration.
          </p>
        </header>
        <ol className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 sm:gap-y-14 md:mt-20">
          {SERVICES.map((service, idx) => (
            <li key={service.name} className="grid grid-cols-[2.5rem_1fr] gap-x-5">
              <Eyebrow as="span" uppercase={false} className="pt-2">
                {String(idx + 1).padStart(2, "0")}
              </Eyebrow>
              <div>
                <h3 className="font-normal font-serif text-xl text-cedar-900 leading-tight sm:text-2xl">
                  {service.name}
                </h3>
                <p className="mt-3 text-base text-cedar-900/70 leading-relaxed">{service.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-14 max-w-xl text-cedar-900/55 text-sm italic leading-relaxed">
          Sava also supports specialized and non-traditional trust structures.
        </p>
      </div>
    </section>
  );
}

// Four candidate placements for the linocut leaf motif inside the
// Services section. All render the same /local/leaves/test-23.png as a
// CSS mask tinted to a soft cedar scrim against parchment — only the
// box that holds the mask changes shape and position.
const LEAF_MASK_URL = "url(/local/leaves/test-06.png)";

const LEAF_LAYOUTS: Record<
  ServicesLeafPosition,
  { className: string; maskSize: string; maskPosition: string }
> = {
  // Header — leaf sits behind the heading band at the top of the section,
  // mostly aligned with the header column. Doesn't overlap the grid below.
  header: {
    className: "absolute start-0 end-0 top-0 h-[28rem]",
    maskSize: "auto 100%",
    maskPosition: "30% center",
  },
  // Right — anchored to the upper-right area. Pulled inward from the
  // right edge and scaled up so it bleeds down into the right column of
  // the grid, layering behind the service copy.
  right: {
    className: "absolute top-40 end-8 hidden h-[44rem] w-[40rem] lg:block",
    maskSize: "auto 100%",
    maskPosition: "center",
  },
  // Watermark — fills the section as a faint backdrop. The leaf is
  // scaled to 80% so it doesn't clip at the section edges.
  watermark: {
    className: "absolute inset-0",
    maskSize: "auto 80%",
    maskPosition: "center",
  },
  // Rows — leaf positioned vertically through the middle of the grid.
  // Centered horizontally so the silhouette reads between the two columns.
  rows: {
    className:
      "absolute start-1/2 top-[55%] hidden h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 lg:block",
    maskSize: "auto 100%",
    maskPosition: "center",
  },
};

function ServicesLeaf({ position }: { position: ServicesLeafPosition }) {
  const layout = LEAF_LAYOUTS[position];
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none z-0 bg-cedar-900/[0.06]", layout.className)}
      style={{
        maskImage: LEAF_MASK_URL,
        maskRepeat: "no-repeat",
        maskSize: layout.maskSize,
        maskPosition: layout.maskPosition,
        WebkitMaskImage: LEAF_MASK_URL,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: layout.maskSize,
        WebkitMaskPosition: layout.maskPosition,
      }}
    />
  );
}
