// Pricing — flat annual fee per trust, presented as tier cards. Sava
// charges the same fee whether the trust holds $1M or $50M; the second
// tier covers directed/complex structures and is the highlighted card.
import { cn } from "@sava/ui";
import { Check } from "lucide-react";
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
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <header>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-6 text-balance font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Flat fees.
          </h2>
          <p className="mt-6 text-cedar-900/75 text-lg leading-[1.55]">
            A fixed annual administration fee per trust, billed quarterly, with no onboarding fee.
          </p>
        </header>

        <div className="mt-14 overflow-hidden rounded-2xl bg-white ring-1 ring-cedar-900/10 md:mt-16">
          <div className="grid divide-y divide-cedar-900/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {TIERS.map((tier) => (
              <PricingColumn key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingColumn({ tier }: { tier: Tier }) {
  const { name, price, unit, features, featured } = tier;
  return (
    // The "complex" tier keeps a faint parchment wash for hierarchy instead
    // of the old black card — no dark grounds in this section.
    <div className={cn("flex flex-col p-7 sm:p-8", featured && "bg-parchment-100/50")}>
      <span className="inline-flex self-start rounded-full bg-parchment-200 px-3 py-1 font-medium text-cedar-900/80 text-sm">
        {name}
      </span>

      <div className="mt-6">
        <span className="font-normal font-serif text-3xl text-cedar-900 tracking-[-0.02em] lg:text-4xl">
          {price}
        </span>
        <span className="mt-1.5 block text-cedar-900/55 text-sm">{unit}</span>
      </div>

      <hr className="my-6 border-cedar-900/10 border-t" />

      <ul className="flex-1 space-y-3.5">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-cedar-900/80 text-sm">
            <Check
              aria-hidden="true"
              className="size-4 shrink-0 text-yarrow-600"
              strokeWidth={2.5}
            />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
