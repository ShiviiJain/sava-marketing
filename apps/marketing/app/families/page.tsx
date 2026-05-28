import type { Metadata } from "next";
import { type AudienceFeature, AudiencePage } from "../_components/audience-page";

export const metadata: Metadata = {
  title: "For families",
  description:
    "Sava is a Nevada-chartered trust company built for modern families who expect clarity, transparency, and service from their fiduciary.",
  alternates: { canonical: "/families" },
};

const FEATURES: AudienceFeature[] = [
  {
    term: "Digital administration",
    description:
      "Fully digital onboarding, signatures, document handling, and communication, without mailed forms or fragmented workflows.",
  },
  {
    term: "Clear visibility",
    description:
      "Real-time access to balances, statements, distributions, and trust records through a centralized family portal.",
  },
  {
    term: "Dedicated trust officer",
    description:
      "One trust officer overseeing the relationship with continuity, familiarity, and direct accountability over time.",
  },
  {
    term: "Distribution handling",
    description:
      "Distribution requests handled with greater speed, consistency, and visibility throughout the process.",
  },
];

export default function FamiliesPage() {
  return (
    <AudiencePage
      headline={
        <>
          <span className="lg:block">Built for the family</span>{" "}
          <span className="lg:block">thinking across</span>{" "}
          <span className="lg:block">
            <em className="font-normal italic">generations.</em>
          </span>
        </>
      }
      lede="Built for families thinking across generations, where the institution behind the trust matters as much as the structure of the trust itself."
      features={FEATURES}
      featuresHeading={
        <>
          How we serve <em className="font-normal italic">families.</em>
        </>
      }
      heroImage={{ src: "/local/family-moving.jpeg" }}
      leaf="33"
    />
  );
}
