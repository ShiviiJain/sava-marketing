import type { Metadata } from "next";
import { AudiencePage } from "../_components/audience-page";
import { asset } from "../_lib/asset";

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
          <span className="lg:block">
            <em className="font-normal italic">generations.</em>
          </span>
        </>
      }
      lede="Built for families thinking across generations, where the institution behind the trust matters as much as the structure of the trust itself."
      heroImage={{ src: asset("families-hero-v2.webp") }}
      leaf="12"
      heroBridged
      platform={{
        eyebrow: "The family portal",
        heading: (
          <>
            How we serve <em className="font-normal italic">families.</em>
          </>
        ),
        features: [
          {
            eyebrow: "At a glance",
            heading: (
              <>
                See where every trust <em className="font-normal italic">stands.</em>
              </>
            ),
            lede: "No mailed forms, no quarterly guesswork. Sign in to see exactly where each trust stands and what, if anything, needs you.",
            points: ["Live trust status", "Document tracking", "Action flags"],
            leaf: "06",
            photo: asset("families-portrait.webp"),
            photoClassName: "aspect-[4/5] w-[56%]",
            cards: [
              {
                src: asset("real-trusts.webp"),
                alt: "Trust accounts across the family, with status and officer",
                width: 2388,
                height: 860,
                className: "top-0 right-0 w-[66%]",
              },
            ],
          },
          {
            eyebrow: "Total transparency",
            heading: (
              <>
                Understand exactly how it <em className="font-normal italic">works.</em>
              </>
            ),
            lede: "The grantor, trustee, distribution standard, and beneficiaries that govern your trust, in plain language and always at hand.",
            points: ["Trust terms", "Distribution standard", "Beneficiaries"],
            leaf: "15",
            photo: asset("tenet-families.webp"),
            photoClassName: "aspect-[4/5] w-[56%]",
            cards: [
              {
                src: asset("real-trustinfo.webp"),
                alt: "Key trust info: type, jurisdiction, term, and total AUM",
                width: 748,
                height: 350,
                className: "top-0 left-0 w-[62%]",
              },
            ],
          },
          {
            eyebrow: "Your team",
            heading: (
              <>
                A dedicated officer, directed <em className="font-normal italic">oversight.</em>
              </>
            ),
            lede: "One named trust officer who knows your family, plus the directors and protectors who keep the trust accountable.",
            points: ["Dedicated officer", "Directors", "Trust protector"],
            leaf: "01",
            photo: asset("hero-family-portrait.webp"),
            photoClassName: "aspect-[4/5] w-[56%]",
            cards: [
              {
                src: asset("real-people.webp"),
                alt: "Key people on the trust and their roles",
                width: 748,
                height: 626,
                className: "top-[6%] right-0 w-[52%]",
              },
            ],
          },
        ],
      }}
      showNevada
    />
  );
}
