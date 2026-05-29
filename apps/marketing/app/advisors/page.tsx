import type { Metadata } from "next";
import { type AudienceFeature, AudiencePage } from "../_components/audience-page";

export const metadata: Metadata = {
  title: "For advisors",
  description:
    "Sava is the trust company financial advisors recommend when they need a fiduciary that respects the advisor relationship and keeps assets where they're managed.",
  alternates: { canonical: "/advisors" },
};

const FEATURES: AudienceFeature[] = [
  {
    term: "Directed trust structure",
    description:
      "Clear separation between investment management responsibilities and trust administration.",
  },
  {
    term: "Custodial continuity",
    description:
      "Existing custodians, investment policies, and portfolio structures remain intact throughout administration.",
  },
  {
    term: "No proprietary products",
    description:
      "Sava does not manufacture, wrap, or distribute investment products to advisory clients.",
  },
  {
    term: "Reporting continuity",
    description: "Reporting and operational workflows aligned with existing advisory practices.",
  },
];

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
      features={FEATURES}
      featuresHeading={
        <>
          How we work with <em className="font-normal italic">advisors.</em>
        </>
      }
      heroImage={{ src: "/local/advisors-hero.jpg" }}
      leaf="06"
      heroBridged
    />
  );
}
