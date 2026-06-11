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
            relationship.
          </span>
        </>
      }
      lede="Designed for investment advisors and family offices operating within a directed trust structure. Investment authority stays with you while Sava manages administration and fiduciary oversight."
      heroImage={{ src: asset("advisors-hero.webp") }}
      leaf="06"
      heroBridged
      platform={{
        bands: true,
        heading: (
          <>
            How we work with advisors.
          </>
        ),
        features: [
          {
            eyebrow: "Directed structure",
            heading: (
              <span className="xl:whitespace-nowrap">Investment authority stays with you.</span>
            ),
            lede: "A directed trust separates administration from investment management. Sava administers, and you keep the investment mandate.",
            points: ["Investment director", "Role separation", "Nevada UDTA"],
            leaf: "12",
            leafClassName: "top-[-21.5%] left-[-19.5%] w-[139.1%] h-[143%]",
            photo: asset("advisors-meditation.webp"),
            photoClassName: "aspect-[4/5] w-[61.1%] translate-x-[1px] translate-y-[4px]",
            cards: [
              {
                node: <DirectedStructureCard />,
                className: "top-[41%] left-[63.5%] w-[92%] scale-[0.56] origin-top-left",
              },
              {
                node: <AuthorityChip />,
                className: "top-[15.4%] left-[-1.5%] w-[58%] scale-[0.79] origin-top-left",
              },
            ],
          },
          {
            eyebrow: "Custodial continuity",
            heading: (
              <>
                Your custodians stay put.
              </>
            ),
            lede: "Existing custodians, accounts, and portfolio structures stay intact. Sava administers around them, and assets never move.",
            points: ["Schwab", "Fidelity", "No asset moves"],
            leaf: "24",
            leafClassName: "top-[-21.5%] left-[-19.5%] w-[139.1%] h-[143%]",
            photo: asset("advisors-custodial.webp"),
            photoClassName: "aspect-[4/5] w-[58.6%] translate-y-[1px]",
            cards: [
              {
                node: <CustodianAccountsCard />,
                className: "top-[56%] left-[-7.3%] w-[92%] scale-[0.53] origin-top-left",
              },
              {
                node: <HoldingChip />,
                className: "top-[14.2%] left-[64%] w-[54%] scale-[0.85] origin-top-left",
              },
            ],
          },
          {
            eyebrow: "Reporting continuity",
            heading: (
              <>
                Reporting that reconciles itself.
              </>
            ),
            lede: "Custodian statements are parsed and matched to positions automatically, so administration stays aligned with how you already report.",
            points: ["Any custodian", "Auto-reconciled", "Discrepancy flags"],
            leaf: "33",
            leafClassName: "top-[-21.5%] left-[-19.5%] w-[139.1%] h-[143%]",
            photo: asset("advisors-reporting-v2.webp"),
            photoClassName: "aspect-[4/5] w-[61.3%]",
            cards: [
              {
                node: <StatementsCard />,
                className: "top-[52.7%] left-[56.3%] w-[92%] scale-[0.62] origin-top-left",
              },
              {
                node: <ReconChip />,
                className: "top-[11.9%] left-[-9.3%] w-[58%] scale-[0.81] origin-top-left",
              },
            ],
          },
        ],
      }}
      showNevada
      showPricing
    />
  );
}
