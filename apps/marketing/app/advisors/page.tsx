import type { Metadata } from "next";
import { AudiencePage } from "../_components/audience-page";
import { asset } from "../_lib/asset";
import {
  AuthorityChip,
  CustodianAccountsCard,
  DirectedStructureCard,
  HoldingChip,
  ReconChip,
  StatementsCard,
} from "./product-ui";

export const metadata: Metadata = {
  title: "For advisors",
  description:
    "Sava is the trust company financial advisors recommend when they need a fiduciary that respects the advisor relationship and keeps assets where they're managed.",
  alternates: { canonical: "/advisors" },
};

export default function AdvisorsPage() {
  return (
    <AudiencePage
      headline={
        <>
          <span className="block">Trust services that</span>
          <span className="block">protect your client</span>
          <span className="block">
            <em className="font-normal italic">relationship.</em>
          </span>
        </>
      }
      lede="Designed for investment advisors and family offices operating within a directed trust structure. Investment authority stays with you while Sava manages administration and fiduciary oversight."
      heroImage={{ src: asset("advisors-hero.webp") }}
      leaf="06"
      heroBridged
      platform={{
        eyebrow: "The advisor workspace",
        heading: (
          <>
            How we work with <em className="font-normal italic">advisors.</em>
          </>
        ),
        features: [
          {
            eyebrow: "Directed structure",
            heading: (
              <>
                Investment authority stays <em className="font-normal italic">with you.</em>
              </>
            ),
            lede: "A directed trust separates administration from investment management. Sava administers, and you keep the investment mandate.",
            points: ["Investment director", "Role separation", "Nevada UDTA"],
            leaf: "12",
            photo: asset("advisors-hero.webp"),
            cards: [
              { node: <DirectedStructureCard />, className: "w-[92%]" },
              { node: <AuthorityChip />, className: "-mt-[9%] ms-[38%] w-[58%]" },
            ],
          },
          {
            eyebrow: "Custodial continuity",
            heading: (
              <>
                Your custodians stay <em className="font-normal italic">put.</em>
              </>
            ),
            lede: "Existing custodians, accounts, and portfolio structures stay intact. Sava administers around them, and assets never move.",
            points: ["Schwab", "Fidelity", "No asset moves"],
            leaf: "24",
            photo: asset("advisor-portrait.webp"),
            cards: [
              { node: <CustodianAccountsCard />, className: "w-[92%]" },
              { node: <HoldingChip />, className: "-mt-[8%] ms-[44%] w-[54%]" },
            ],
          },
          {
            eyebrow: "Reporting continuity",
            heading: (
              <>
                Reporting that reconciles <em className="font-normal italic">itself.</em>
              </>
            ),
            lede: "Custodian statements are parsed and matched to positions automatically, so administration stays aligned with how you already report.",
            points: ["Any custodian", "Auto-reconciled", "Discrepancy flags"],
            leaf: "33",
            photo: asset("advisors-hero.webp"),
            cards: [
              { node: <StatementsCard />, className: "w-[92%]" },
              { node: <ReconChip />, className: "-mt-[9%] ms-[38%] w-[58%]" },
            ],
          },
        ],
      }}
      showNevada
      showPricing
    />
  );
}
