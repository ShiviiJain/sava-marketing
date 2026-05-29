import type { Metadata } from "next";
import { type AudienceFeature, AudiencePage } from "../_components/audience-page";

export const metadata: Metadata = {
  title: "For attorneys",
  description:
    "Sava partners with estate-planning attorneys to administer the trusts they draft: Nevada situs, modern operations, and direct collaboration on every matter.",
  alternates: { canonical: "/attorneys" },
};

const FEATURES: AudienceFeature[] = [
  {
    term: "Intake & KYC",
    description: "Streamlined onboarding and KYC handled within a centralized workflow.",
  },
  {
    term: "Document coordination",
    description:
      "Support for funding letters, certifications, and related trust documentation throughout the administration process.",
  },
  {
    term: "Structural integrity",
    description:
      "Directed trust structures and role separation maintained throughout administration as originally drafted.",
  },
  {
    term: "Centralized administration",
    description:
      "Documents, signatures, funding materials, certifications, and communication organized within a single administrative experience.",
  },
];

export default function AttorneysPage() {
  return (
    <AudiencePage
      headline={
        <>
          <span className="block">A fiduciary partner</span>
          <span className="block">
            you can put your name <em className="font-normal italic">behind.</em>
          </span>
        </>
      }
      lede="Designed to support attorneys through intake, funding, certifications, and long-term administration within a more coordinated workflow."
      features={FEATURES}
      featuresHeading={
        <>
          How we work with <em className="font-normal italic">counsel.</em>
        </>
      }
      heroImage={{ src: "/local/attorneys-team.jpg" }}
      leaf="30"
      heroBridged
    />
  );
}
