// Pricing — flat annual fee per trust, presented as tier cards. Sava
// charges the same fee whether the trust holds $1M or $50M; the second
// tier covers directed/complex structures and is the highlighted card.
import { cn } from "@sava/ui";
import { Check } from "lucide-react";
import { asset } from "../_lib/asset";
import { Eyebrow } from "./ui/eyebrow";

const INCLUDED = [
  "Dedicated trust officer",
  "Real-time family portal",
  "Digital onboarding and e-signature",
  "Distribution handling",
  "Custody coordination",
  "Statements and annual review",
];

interface Tier {
  name: string;
  price: string;
  unit: string;
  features: string[];
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Standard administration",
    price: "$3,000",
    unit: "per trust / year",
    features: INCLUDED,
  },
  {
    name: "Complex & directed",
    price: "From $5,000",
    unit: "per trust / year",
    features: [...INCLUDED, "Directed structures and complex provisions"],
    featured: true,
  },
];

export function PricingSection() {
  return (
    <section className="relative isolate overflow-hidden bg-parchment-50 py-24 sm:py-32">
      <PricingLeaf />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <header className="max-w-2xl">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-6 text-balance font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Flat fees based on the trust, not the <em className="font-normal italic">assets.</em>
          </h2>
          <p className="mt-6 max-w-xl text-cedar-900/75 text-lg leading-[1.55]">
            A fixed annual administration fee per trust, billed quarterly, with no onboarding fee.
            The price is the price, whether the trust holds $1M or $50M.
          </p>
        </header>

        <div className="mt-14 grid max-w-3xl gap-6 sm:grid-cols-2 md:mt-16 md:gap-8">
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier }: { tier: Tier }) {
  const { name, price, unit, features, featured } = tier;
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl p-7 ring-1",
        featured ? "bg-cedar-900 ring-cedar-900" : "bg-white ring-cedar-900/10"
      )}
    >
      <span
        className={cn(
          "inline-flex self-start rounded-full px-3 py-1 font-medium text-sm",
          featured ? "bg-parchment-50/15 text-parchment-50" : "bg-parchment-200 text-cedar-900/80"
        )}
      >
        {name}
      </span>

      <div className="mt-6">
        <span
          className={cn(
            "font-normal font-serif text-4xl tracking-[-0.02em] lg:text-5xl",
            featured ? "text-parchment-50" : "text-cedar-900"
          )}
        >
          {price}
        </span>
        <span
          className={cn(
            "mt-1.5 block text-sm",
            featured ? "text-parchment-100/70" : "text-cedar-900/55"
          )}
        >
          {unit}
        </span>
      </div>

      <hr
        className={cn("my-6 border-t", featured ? "border-parchment-50/15" : "border-cedar-900/10")}
      />

      <ul className="flex-1 space-y-3.5">
        {features.map((f) => (
          <li
            key={f}
            className={cn(
              "flex items-center gap-3 text-sm",
              featured ? "text-parchment-100/90" : "text-cedar-900/80"
            )}
          >
            <Check
              aria-hidden="true"
              className={cn("size-4 shrink-0", featured ? "text-yarrow-300" : "text-yarrow-600")}
              strokeWidth={2.5}
            />
            {f}
          </li>
        ))}
      </ul>

      <a
        href="https://calendly.com/shivi-savahq/30min"
        target="_blank"
        rel="noreferrer noopener"
        className={cn(
          "mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold text-sm transition-colors",
          featured
            ? "bg-parchment-50 text-cedar-900 hover:bg-parchment-100"
            : "bg-cedar-900 text-parchment-50 hover:bg-cedar-800"
        )}
      >
        Talk to our team
      </a>
    </div>
  );
}

// Yarrow leaf bleeding off the LEFT viewport edge — same edge treatment
// as the services + Nevada sections, tinted to read against parchment.
function PricingLeaf() {
  const maskUrl = `url(${asset("leaves/test-06.png")})`;
  return (
    <div
      aria-hidden="true"
      className="-start-4 pointer-events-none absolute inset-y-0 z-0 w-[55%] bg-parchment-300/60 md:-start-6 md:w-[48%] lg:-start-8 lg:w-[42%]"
      style={{
        maskImage: maskUrl,
        maskRepeat: "no-repeat",
        maskSize: "auto 100%",
        maskPosition: "left center",
        WebkitMaskImage: maskUrl,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "auto 100%",
        WebkitMaskPosition: "left center",
      }}
    />
  );
}
