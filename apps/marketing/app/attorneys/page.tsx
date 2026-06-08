import type { Metadata } from "next";
import { AudiencePage } from "../_components/audience-page";
import { asset } from "../_lib/asset";
import {
  DocCoordinationCard,
  DocRequestChip,
  KycChip,
  MattersPipelineCard,
  PartiesCard,
  StageChip,
} from "./product-ui";

export const metadata: Metadata = {
  title: "For attorneys",
  description:
    "Sava partners with estate-planning attorneys to administer the trusts they draft: Nevada situs, modern operations, and direct collaboration on every matter.",
  alternates: { canonical: "/attorneys" },
};

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
      heroImage={{ src: asset("attorneys-team.webp") }}
      leaf="30"
      heroBridged
      platform={{
        eyebrow: "The attorney workspace",
        heading: (
          <>
            How we work with <em className="font-normal italic">counsel.</em>
          </>
        ),
        features: [
          {
            eyebrow: "Intake pipeline",
            heading: (
              <>
                Every matter, in one <em className="font-normal italic">pipeline.</em>
              </>
            ),
            lede: "Track each client trust from intake through KYC, underwriting, and funding. Health and stage stay visible at a glance.",
            points: ["Intake", "KYC", "Underwriting", "Funding"],
            leaf: "18",
            photo: asset("attorneys-1.webp"),
            cards: [
              { node: <MattersPipelineCard />, className: "w-[92%]" },
              { node: <StageChip />, className: "-mt-[8%] ms-[40%] w-[56%]" },
            ],
          },
          {
            eyebrow: "Document coordination",
            heading: (
              <>
                Funding documents, <em className="font-normal italic">coordinated.</em>
              </>
            ),
            lede: "Trust instruments, certificates, EIN letters, and funding schedules requested, tracked, and reviewed in one place.",
            points: ["Trust instrument", "Certificates", "Funding letters"],
            leaf: "22",
            photo: asset("attorneys-2.webp"),
            cards: [
              { node: <DocCoordinationCard />, className: "w-[92%]" },
              { node: <DocRequestChip />, className: "-mt-[8%] ms-[46%] w-[52%]" },
            ],
          },
          {
            eyebrow: "Parties & KYC",
            heading: (
              <>
                Roles and structure, kept <em className="font-normal italic">intact.</em>
              </>
            ),
            lede: "Grantors, beneficiaries, counsel, and advisors stay in sync, with KYC tracked across every party.",
            points: ["Roles intact", "KYC tracking", "Every party"],
            leaf: "09",
            photo: asset("attorneys-3.webp"),
            cards: [
              { node: <PartiesCard />, className: "w-[92%]" },
              { node: <KycChip />, className: "-mt-[9%] ms-[36%] w-[60%]" },
            ],
          },
        ],
      }}
      showNevada
      showPricing
    />
  );
}
