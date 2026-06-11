import type { Metadata } from "next";
import { AudiencePage } from "../_components/audience-page";
import { asset } from "../_lib/asset";
import {
  BeneficiariesCard,
  DirectorsCard,
  DocStatusCard,
  OfficerCard,
  TrustDetailsCard,
  TrustSummaryCard,
} from "./product-ui";

export const metadata: Metadata = {
  title: "For families",
  description:
    "Sava is a Nevada-chartered trust company built for modern families who expect clarity, transparency, and service from their fiduciary.",
  alternates: { canonical: "/families" },
};

export default function FamiliesPage() {
  return (
    <AudiencePage
      headline={
        <>
          <span className="lg:block">Built for the family</span>{" "}
          <span className="lg:block">thinking across</span>{" "}
          <span className="lg:block">generations.</span>
        </>
      }
      lede="Built for families thinking across generations, where the institution behind the trust matters as much as the structure of the trust itself."
      heroImage={{ src: asset("families-hero-v2.webp") }}
      leaf="12"
      heroBridged
      platform={{
        bands: true,
        heading: (
          <>
            How we serve families.
          </>
        ),
        features: [
          {
            eyebrow: "At a glance",
            heading: (
              <>
                See where every trust stands.
              </>
            ),
            lede: "No mailed forms, no quarterly guesswork. Sign in to see exactly where each trust stands and what, if anything, needs you.",
            points: ["Live trust status", "Document tracking", "Action flags"],
            leaf: "06",
            leafClassName: "top-[-5%] left-[0%] w-[115%] h-[115%]",
            photo: asset("families-glance.webp"),
            photoClassName: "aspect-[4/5] w-[56%] translate-x-[63px] translate-y-[-3px]",
            cards: [
              {
                node: <TrustSummaryCard />,
                className: "top-[29.9%] left-[-1.3%] w-[58%] scale-[0.74] origin-top-left",
              },
              {
                node: <DocStatusCard />,
                className: "top-[80.6%] left-[57.8%] w-[52%] scale-[0.83] origin-top-left",
              },
            ],
          },
          {
            eyebrow: "Total transparency",
            heading: (
              <>
                Understand exactly how it works.
              </>
            ),
            lede: "The grantor, trustee, distribution standard, and beneficiaries that govern your trust, in plain language and always at hand.",
            points: ["Trust terms", "Distribution standard", "Beneficiaries"],
            leaf: "15",
            leafClassName: "top-[-5%] left-[-15%] w-[115%] h-[115%]",
            photo: asset("families-transparency.webp"),
            photoClassName: "aspect-[4/5] w-[56%]",
            cards: [
              {
                node: <TrustDetailsCard />,
                className: "top-[54.2%] left-[-9.3%] w-[62%] scale-[0.7] origin-top-left",
              },
              {
                node: <BeneficiariesCard />,
                className: "top-[14.3%] left-[68.6%] w-[50%] scale-[0.65] origin-top-left",
              },
            ],
          },
          {
            eyebrow: "Your team",
            heading: (
              <>
                A dedicated officer.
              </>
            ),
            lede: "One named trust officer who knows your family, plus the directors and protectors who keep the trust accountable.",
            points: ["Dedicated officer", "Directors", "Trust protector"],
            leaf: "30",
            leafClassName: "top-[-21.5%] left-[-19.5%] w-[139.1%] h-[143%]",
            photo: asset("families-team-xl.webp"),
            photoClassName: "aspect-[4/5] w-[56%] translate-x-[24px] translate-y-[23px]",
            cards: [
              {
                node: <DirectorsCard />,
                className: "top-[43.6%] left-[68.2%] w-[60%] scale-[0.67] origin-top-left",
              },
              {
                node: <OfficerCard />,
                className: "top-[44%] left-[-5.7%] w-[54%] scale-[0.88] origin-top-left",
              },
            ],
          },
        ],
      }}
      showNevada
    />
  );
}
