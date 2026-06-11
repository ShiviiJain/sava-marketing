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
            you can put your name behind.
          </span>
        </>
      }
      lede="Designed to support attorneys through intake, funding, certifications, and long-term administration within a more coordinated workflow."
      heroImage={{ src: asset("attorneys-team.webp") }}
      leaf="30"
      heroBridged
      platform={{
        bands: true,
        heading: (
          <>
            How we work with counsel.
          </>
        ),
        features: [
          {
            eyebrow: "Intake pipeline",
            heading: (
              <>
                Every matter, in one pipeline.
              </>
            ),
            lede: "Track each client trust from intake through KYC, underwriting, and funding. Health and stage stay visible at a glance.",
            points: ["Intake", "KYC", "Underwriting", "Funding"],
            leaf: "18",
            leafClassName: "top-[-21.5%] left-[-19.5%] w-[139.1%] h-[143%]",
            photo: asset("attorneys-1.webp"),
            photoClassName: "aspect-[4/5] w-[58.7%]",
            cards: [
              {
                node: <MattersPipelineCard />,
                className: "top-[48%] left-[-14.8%] w-[92%] scale-[0.6] origin-top-left",
              },
              {
                node: <StageChip />,
                className: "top-[12.7%] left-[57.5%] w-[56%] scale-[0.72] origin-top-left",
              },
            ],
          },
          {
            eyebrow: "Document coordination",
            heading: (
              <>
                Funding documents, coordinated.
              </>
            ),
            lede: "Trust instruments, certificates, EIN letters, and funding schedules requested, tracked, and reviewed in one place.",
            points: ["Trust instrument", "Certificates", "Funding letters"],
            leaf: "22",
            leafClassName: "top-[-21.5%] left-[-19.5%] w-[125.9%] h-[133.4%]",
            photo: asset("attorneys-2.webp"),
            photoClassName: "aspect-[4/5] w-[58.9%] translate-x-[-59px] translate-y-[7px]",
            cards: [
              {
                node: <DocCoordinationCard />,
                className: "top-[48%] left-[54.8%] w-[92%] scale-[0.6] origin-top-left",
              },
              {
                node: <DocRequestChip />,
                className: "top-[21.4%] left-[-13%] w-[52%] scale-[0.84] origin-top-left",
              },
            ],
          },
          {
            eyebrow: "Parties & KYC",
            heading: (
              <>
                Roles and structure, kept intact.
              </>
            ),
            lede: "Grantors, beneficiaries, counsel, and advisors stay in sync, with KYC tracked across every party.",
            points: ["Roles intact", "KYC tracking", "Every party"],
            leaf: "09",
            leafClassName: "top-[-8%] left-[-19.5%] w-[141.1%] h-[132.5%]",
            photo: asset("attorneys-3.webp"),
            photoClassName: "aspect-[4/5] w-[61.5%] translate-x-[41px] translate-y-[16px]",
            cards: [
              {
                node: <PartiesCard />,
                className: "top-[21.1%] left-[-9.1%] w-[92%] scale-[0.58] origin-top-left",
              },
              {
                node: <KycChip />,
                className: "top-[71.9%] left-[59.8%] w-[60%] scale-[0.86] origin-top-left",
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
