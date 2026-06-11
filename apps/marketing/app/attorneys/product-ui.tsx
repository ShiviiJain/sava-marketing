import { cn } from "@sava/ui";
import { Briefcase, CheckCircle2, Clock, FileText, Users } from "lucide-react";
import { Avatar, CardHeader, Dot, Pill } from "../_components/product-card";
import { Eyebrow } from "../_components/ui/eyebrow";
import { asset } from "../_lib/asset";

/**
 * On-brand recreations of the attorney-facing product UI — the intake
 * pipeline, document coordination, and party/KYC views from the Sava
 * Command Center — for the /attorneys platform showcase. Mirrors the
 * /families cards: real product surfaces drawn in the brand palette.
 */

function MatterRow({
  trust,
  account,
  stage,
  tone,
  health,
  healthTone,
  divide,
}: {
  trust: string;
  account: string;
  stage: string;
  tone: "yarrow" | "parchment";
  health: string;
  healthTone: "cedar" | "yarrow";
  divide?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-6 py-4",
        divide && "border-cedar-900/10 border-t"
      )}
    >
      <div className="min-w-0">
        <p className="truncate font-medium text-cedar-900 text-sm">{trust}</p>
        <p className="mt-0.5 font-mono text-cedar-900/45 text-xs tracking-wide">{account}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden items-center gap-1.5 text-cedar-900/60 text-xs sm:flex">
          <Dot tone={healthTone} />
          {health}
        </span>
        <Pill tone={tone}>{stage}</Pill>
      </div>
    </div>
  );
}

/** Intake pipeline — every client matter across each stage. */
export function MattersPipelineCard() {
  return (
    <div>
      <CardHeader
        icon={<Briefcase aria-hidden className="size-5" />}
        title="Your matters"
        sub="Active client trusts across every stage of intake."
      />
      <MatterRow
        trust="Morrison Family Trust"
        account="SAV-2841-45"
        stage="Underwriting"
        tone="yarrow"
        health="On track"
        healthTone="cedar"
      />
      <MatterRow
        trust="Whitfield Dynasty Trust"
        account="SAV-2933-12"
        stage="Funding"
        tone="parchment"
        health="Needs attention"
        healthTone="yarrow"
        divide
      />
      <MatterRow
        trust="Harrington Marital Trust"
        account="SAV-2901-07"
        stage="Funded"
        tone="parchment"
        health="On track"
        healthTone="cedar"
        divide
      />
    </div>
  );
}

const STAGES = ["Intake", "KYC", "Underwriting", "Funding", "Funded"];
const ACTIVE_STAGE = 2;

/** Small stage-progress chip for a single matter. */
export function StageChip() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium text-cedar-900 text-sm">Morrison Family Trust</p>
        <span className="text-cedar-900/45 text-xs">Day 4</span>
      </div>
      <div className="mt-3 flex gap-1">
        {STAGES.map((s, i) => (
          <span
            key={s}
            className={cn(
              "h-1 flex-1 rounded-full",
              i < ACTIVE_STAGE && "bg-cedar-600",
              i === ACTIVE_STAGE && "bg-yarrow-500",
              i > ACTIVE_STAGE && "bg-cedar-900/12"
            )}
          />
        ))}
      </div>
      <p className="mt-2.5 text-cedar-900/60 text-xs">
        <span className="text-cedar-900">Underwriting</span> · Stage 3 of 5
      </p>
    </div>
  );
}

function DocMetric({
  icon,
  count,
  label,
}: {
  icon: React.ReactNode;
  count: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-cedar-900/70 text-xs">
        <span className="font-medium text-cedar-900">{count}</span> {label}
      </span>
    </div>
  );
}

function DocRow({
  name,
  status,
  tone,
  divide,
}: {
  name: string;
  status: string;
  tone: "yarrow" | "parchment" | "outline";
  divide?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-6 py-3",
        divide && "border-cedar-900/10 border-t"
      )}
    >
      <span className="text-cedar-900 text-sm">{name}</span>
      <Pill tone={tone}>{status}</Pill>
    </div>
  );
}

/** Document coordination — the intake packet, tracked by status. */
export function DocCoordinationCard() {
  return (
    <div>
      <CardHeader
        icon={<FileText aria-hidden className="size-5" />}
        title="Document coordination"
        sub="Intake packet for Morrison Family Trust."
      />
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-cedar-900/10 border-b px-6 py-4">
        <DocMetric
          icon={<CheckCircle2 aria-hidden className="size-4 text-cedar-600" />}
          count="8 / 12"
          label="received"
        />
        <DocMetric
          icon={<Clock aria-hidden className="size-4 text-yarrow-600" />}
          count="3"
          label="awaiting"
        />
      </div>
      <div className="py-1">
        <DocRow name="Trust instrument" status="Accepted" tone="parchment" />
        <DocRow name="Certificate of trust" status="Under review" tone="yarrow" divide />
        <DocRow name="EIN assignment letter" status="Received" tone="parchment" divide />
        <DocRow name="Schedule A (initial assets)" status="Requested" tone="outline" divide />
      </div>
    </div>
  );
}

/** Small single document-request chip. */
export function DocRequestChip() {
  return (
    <div className="flex items-center gap-3 p-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg text-yarrow-600 ring-1 ring-cedar-900/10">
        <Clock aria-hidden className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="font-medium text-cedar-900 text-sm leading-tight">Certificate of trust</p>
        <p className="mt-0.5 text-cedar-900/55 text-xs">Awaiting your review</p>
      </div>
    </div>
  );
}

function PartyRow({
  initials,
  src,
  name,
  roleLabel,
  divide,
}: {
  initials: string;
  src?: string;
  name: string;
  roleLabel: string;
  divide?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-6 py-3.5",
        divide && "border-cedar-900/10 border-t"
      )}
    >
      <Avatar initials={initials} src={src} alt={name} />
      <span className="min-w-0 flex-1 truncate text-cedar-900 text-sm">{name}</span>
      <Eyebrow as="span">{roleLabel}</Eyebrow>
    </div>
  );
}

/** Parties & roles — everyone on the matter, kept in sync. */
export function PartiesCard() {
  return (
    <div>
      <CardHeader
        icon={<Users aria-hidden className="size-5" />}
        title="Parties"
        sub="Everyone on the matter, with their role and standing."
      />
      <div className="py-1">
        <PartyRow
          initials="RH"
          src={asset("avatar-robert.webp")}
          name="Robert James Henderson"
          roleLabel="Grantor"
        />
        <PartyRow
          initials="SC"
          src={asset("avatar-sarah.webp")}
          name="Sarah Chen"
          roleLabel="Trust officer"
          divide
        />
        <PartyRow
          initials="DM"
          src={asset("avatar-daniel.webp")}
          name="Daniel Mercer, Esq."
          roleLabel="Attorney"
          divide
        />
        <PartyRow
          initials="EG"
          src={asset("avatar-eleanor.webp")}
          name="Eleanor W. Graham, CPA"
          roleLabel="CPA"
          divide
        />
      </div>
    </div>
  );
}

/** Small KYC completeness chip. */
export function KycChip() {
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div>
        <p className="font-medium text-cedar-900 text-sm">KYC verification</p>
        <p className="mt-0.5 text-cedar-900/55 text-xs">All parties cleared</p>
      </div>
      <div className="flex items-center gap-1.5 whitespace-nowrap text-cedar-700">
        <CheckCircle2 aria-hidden className="size-4" />
        <span className="font-medium text-cedar-900/80 text-xs">5 of 5</span>
      </div>
    </div>
  );
}
