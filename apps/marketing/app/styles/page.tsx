import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BrandButton } from "../_components/ui/brand-button";
import {
  BorderDrawButton,
  GlassButton,
  LetterStaggerButton,
  LiftButton,
  MagneticButton,
  NotchButton,
  PressButton,
  ShimmerButton,
  SlideFillButton,
  SplitFlapButton,
  TiltButton,
  UnderlineDrawButton,
} from "../_components/ui/experimental-buttons";
import { Eyebrow } from "../_components/ui/eyebrow";
import { GlowButton } from "../_components/ui/glow-button";

export const metadata: Metadata = {
  title: "Styles — Marketing Primitives",
  robots: { index: false, follow: false },
};

const SIZES = ["sm", "default", "lg", "xl"] as const;
type Size = (typeof SIZES)[number];

type Brand =
  | "primary"
  | "secondary"
  | "tertiary"
  | "yarrow"
  | "cedar"
  | "ghost-light"
  | "ghost-dark"
  | "outline-cedar"
  | "outline-yarrow"
  | "outline-light"
  | "link"
  | "chip-cedar"
  | "chip-yarrow";

interface Swatch {
  brand: Brand;
  label: string;
  note: string;
  showSizes?: boolean;
}

const PARCHMENT_SWATCHES: Swatch[] = [
  {
    brand: "outline-cedar",
    label: "outline-cedar",
    note: "Outlined secondary. Fills with cedar on hover.",
  },
  { brand: "ghost-dark", label: "ghost-dark", note: "Quiet secondary on parchment." },
  {
    brand: "link",
    label: "link",
    note: "Inline serif italic link with animated underline.",
    showSizes: false,
  },
  {
    brand: "chip-cedar",
    label: "chip-cedar",
    note: "Dark pill — mono, uppercase, for tags or filter actions.",
    showSizes: false,
  },
];

const CEDAR_SWATCHES: Swatch[] = [
  {
    brand: "yarrow",
    label: "yarrow",
    note: "Brand primary on cedar. Arrow slides on hover.",
  },
  {
    brand: "outline-yarrow",
    label: "outline-yarrow",
    note: "Yarrow-rimmed secondary. Fills yarrow on hover.",
  },
  { brand: "ghost-light", label: "ghost-light", note: "Quiet secondary on cedar." },
  {
    brand: "chip-yarrow",
    label: "chip-yarrow",
    note: "Yarrow pill — pairs with cedar grounds.",
    showSizes: false,
  },
];

const YARROW_SWATCHES: Swatch[] = [
  {
    brand: "cedar",
    label: "cedar",
    note: "Brand primary on yarrow. Arrow slides on hover.",
  },
  {
    brand: "outline-cedar",
    label: "outline-cedar",
    note: "Mirror of the parchment outline — cedar rim, fills on hover.",
  },
  { brand: "ghost-dark", label: "ghost-dark", note: "Quiet secondary on yarrow." },
];

export default function StylesPage() {
  return (
    <main className="bg-parchment-50">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Eyebrow>Marketing — design system</Eyebrow>
        <h1 className="mt-6 font-normal font-serif text-4xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-5xl">
          Buttons.
        </h1>
        <p className="mt-6 max-w-2xl text-cedar-900/70 text-lg leading-[1.55]">
          One primary variant per ground, plus a matching ghost. The primary on each ground is the
          one that reads with the strongest contrast against that ground — not the shared shadcn
          default, which only contrasts on parchment.
        </p>
      </section>

      <section className="bg-cedar-700 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Eyebrow ground="cedar">Marketing — CTA hierarchy</Eyebrow>
          <h2 className="mt-6 font-normal font-serif text-3xl text-parchment-50 leading-[1.1] tracking-[-0.02em] sm:text-4xl">
            Primary, secondary, <em className="font-normal italic">tertiary.</em>
          </h2>
          <p className="mt-6 max-w-2xl text-parchment-100/70 text-lg leading-[1.55]">
            Three CTA tiers on the cedar ground. Primary is parchment-filled — the loudest move on
            the page. Secondary keeps the same parchment text and rims it in yarrow for the "and
            also" action. Tertiary is text-only — the quiet exit ramp.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <HierarchySwatch tier="Primary" note="parchment fill, cedar text. The loudest CTA.">
              <BrandButton brand="primary" size="xl" type="button">
                Schedule a call <ArrowRight aria-hidden="true" />
              </BrandButton>
            </HierarchySwatch>
            <HierarchySwatch
              tier="Secondary"
              note="yarrow outline + parchment text. Paired with primary."
            >
              <BrandButton brand="secondary" size="xl" type="button">
                Read the brief
              </BrandButton>
            </HierarchySwatch>
            <HierarchySwatch tier="Tertiary" note="parchment text only; yarrow on hover.">
              <BrandButton brand="tertiary" size="xl" type="button">
                hello@savahq.com
              </BrandButton>
            </HierarchySwatch>
          </div>
        </div>
      </section>

      <GroundSection ground="parchment" title="On parchment" swatches={PARCHMENT_SWATCHES} />
      <GroundSection ground="cedar" title="On cedar (cedar-700)" swatches={CEDAR_SWATCHES} />
      <GroundSection ground="yarrow" title="On yarrow (yarrow-500)" swatches={YARROW_SWATCHES} />

      <section className="bg-cedar-700 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Eyebrow ground="cedar">Experimental — glow</Eyebrow>
          <h2 className="mt-6 font-normal font-serif text-3xl text-parchment-50 leading-[1.1] tracking-[-0.02em] sm:text-4xl">
            One for the <em className="font-normal italic">evening.</em>
          </h2>
          <p className="mt-6 max-w-2xl text-parchment-100/70 text-lg leading-[1.55]">
            Layered radial gradients — a yarrow halo rising from the bottom edge and a 1px stroke
            along the same arc. Both widen on hover over a slow 1.2s crossfade.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <GlowButton>Schedule a call</GlowButton>
            <GlowButton>Talk to a trustee</GlowButton>
            <GlowButton>Read the brief</GlowButton>
          </div>
        </div>
      </section>

      <section className="bg-cedar-700 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Eyebrow ground="cedar">Experimental — playful</Eyebrow>
          <h2 className="mt-6 font-normal font-serif text-3xl text-parchment-50 leading-[1.1] tracking-[-0.02em] sm:text-4xl">
            Six interactions on <em className="font-normal italic">green.</em>
          </h2>
          <p className="mt-6 max-w-2xl text-parchment-100/70 text-lg leading-[1.55]">
            Six button-shaped tricks that complement the cedar register. Yarrow does the heavy
            lifting where the CTA needs to anchor a section; parchment carries the quieter,
            secondary moves.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <PlayfulSwatch label="Shimmer" note="Sweep of light across the fill on hover.">
              <ShimmerButton>Schedule a call</ShimmerButton>
            </PlayfulSwatch>
            <PlayfulSwatch label="Slide fill" note="Outline fills from the left; label inverts.">
              <SlideFillButton>Read the brief</SlideFillButton>
            </PlayfulSwatch>
            <PlayfulSwatch label="Magnetic" note="Drifts toward the cursor while hovered.">
              <MagneticButton>Talk to a trustee</MagneticButton>
            </PlayfulSwatch>
            <PlayfulSwatch label="Lift" note="translateY plus yarrow-tinted shadow.">
              <LiftButton>Get started</LiftButton>
            </PlayfulSwatch>
            <PlayfulSwatch
              label="Split flap"
              note="Label rolls up; replacement rolls in from below."
            >
              <SplitFlapButton>Sign in</SplitFlapButton>
            </PlayfulSwatch>
            <PlayfulSwatch label="Underline draw" note="Pen-stroke underline traces in on hover.">
              <UnderlineDrawButton>Read more</UnderlineDrawButton>
            </PlayfulSwatch>
            <PlayfulSwatch
              label="3D press"
              note="Yarrow chip on a darker yarrow plate; presses on click."
            >
              <PressButton>Get started</PressButton>
            </PlayfulSwatch>
            <PlayfulSwatch label="Border draw" note="SVG perimeter strokes in over 900ms on hover.">
              <BorderDrawButton>Schedule a call</BorderDrawButton>
            </PlayfulSwatch>
            <PlayfulSwatch label="Tilt 3D" note="Perspective rotation tracking the cursor.">
              <TiltButton>Read the brief</TiltButton>
            </PlayfulSwatch>
            <PlayfulSwatch
              label="Letter stagger"
              note="Each letter lifts in turn; yarrow rule grows beneath."
            >
              <LetterStaggerButton>Schedule a call</LetterStaggerButton>
            </PlayfulSwatch>
            <PlayfulSwatch
              label="Notch"
              note="clip-path corner cuts — mechanical / engineering register."
            >
              <NotchButton>Talk to a trustee</NotchButton>
            </PlayfulSwatch>
            <PlayfulSwatch
              label="Frosted glass"
              note="Translucent parchment with backdrop-blur; reads through to motifs."
            >
              <GlassButton>Read more</GlassButton>
            </PlayfulSwatch>
          </div>
        </div>
      </section>

      <section className="bg-parchment-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Eyebrow>Eyebrow primitive</Eyebrow>
          <h2 className="mt-6 font-normal font-serif text-3xl text-cedar-900 leading-[1.1] tracking-[-0.02em] sm:text-4xl">
            Section <em className="font-normal italic">labels.</em>
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="rounded-sm bg-parchment-50 p-8 ring-1 ring-cedar-900/10">
              <p className="mb-6 text-cedar-900/55 text-xs uppercase tracking-wider">
                ground=&quot;parchment&quot; (default)
              </p>
              <Eyebrow>01 — Protection</Eyebrow>
              <Eyebrow className="mt-4" as="span" uppercase={false}>
                01
              </Eyebrow>
            </div>
            <div className="rounded-sm bg-cedar-700 p-8">
              <p className="mb-6 text-parchment-100/55 text-xs uppercase tracking-wider">
                ground=&quot;cedar&quot;
              </p>
              <Eyebrow ground="cedar">Sava Assurance Program</Eyebrow>
              <Eyebrow ground="cedar" className="mt-4" as="span" uppercase={false}>
                01
              </Eyebrow>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

interface GroundSectionProps {
  ground: "parchment" | "cedar" | "yarrow";
  title: string;
  swatches: Swatch[];
}

const GROUND_BG: Record<GroundSectionProps["ground"], string> = {
  parchment: "bg-parchment-100",
  cedar: "bg-cedar-700",
  yarrow: "bg-yarrow-500",
};

const GROUND_LABEL: Record<GroundSectionProps["ground"], string> = {
  parchment: "text-cedar-900/55",
  cedar: "text-parchment-100/55",
  yarrow: "text-cedar-900/55",
};

function GroundSection({ ground, title, swatches }: GroundSectionProps) {
  return (
    <section className={`${GROUND_BG[ground]} py-20`}>
      <div className="mx-auto max-w-5xl px-6">
        <Eyebrow ground={ground === "cedar" ? "cedar" : "parchment"}>{title}</Eyebrow>
        <div className="mt-12 space-y-12">
          {swatches.map((swatch) => (
            <SwatchRow key={`${swatch.brand}-${swatch.label}`} ground={ground} swatch={swatch} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SwatchRow({ ground, swatch }: { ground: GroundSectionProps["ground"]; swatch: Swatch }) {
  const showSizes = swatch.showSizes !== false;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <code
          className={`font-mono text-sm ${ground === "cedar" ? "text-parchment-50" : "text-cedar-900"}`}
        >
          brand=&quot;{swatch.label}&quot;
        </code>
        <span className={`text-sm ${GROUND_LABEL[ground]}`}>{swatch.note}</span>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {showSizes ? (
          SIZES.map((size) => <SizedButton key={size} brand={swatch.brand} size={size} />)
        ) : (
          <SizedButton brand={swatch.brand} size="default" />
        )}
      </div>
    </div>
  );
}

function SizedButton({ brand, size }: { brand: Brand; size: Size }) {
  // Primary CTAs get the arrow so the hover-slide is visible.
  const arrowVariants: Brand[] = ["primary", "yarrow", "cedar", "link"];
  const showArrow = arrowVariants.includes(brand);

  const label = brand.startsWith("chip-")
    ? "Tag label"
    : brand === "link"
      ? "Read more"
      : size === "sm"
        ? "Button"
        : `Button (${size})`;

  return (
    <BrandButton brand={brand} size={size} type="button">
      {label}
      {showArrow && <ArrowRight aria-hidden="true" />}
    </BrandButton>
  );
}

function HierarchySwatch({
  tier,
  note,
  children,
}: {
  tier: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex h-20 items-center">{children}</div>
      <p className="mt-6 font-mono font-semibold text-parchment-50 text-sm uppercase tracking-[0.16em]">
        {tier}
      </p>
      <p className="mt-2 text-parchment-100/65 text-sm leading-relaxed">{note}</p>
    </div>
  );
}

function PlayfulSwatch({
  label,
  note,
  children,
}: {
  label: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex h-20 items-center">{children}</div>
      <p className="mt-6 font-mono text-parchment-50 text-sm">{label}</p>
      <p className="mt-1 text-parchment-100/55 text-sm">{note}</p>
    </div>
  );
}
