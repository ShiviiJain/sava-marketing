import { cn } from "@sava/ui";
import { CheckCircle2, FileCheck, Landmark, Scale } from "lucide-react";
import { CardHeader, Dot, Pill } from "../_components/product-card";
import { Eyebrow } from "../_components/ui/eyebrow";

/**
 * On-brand recreations of the advisor-facing product UI — the directed
 * trust structure, custodian accounts, and statement reconciliation
 * views from the Sava Command Center — for the /advisors platform
 * showcase. Investment authority stays with the advisor; the cards show
 * the role separation and custodial continuity that makes that true.
 */

function RoleRow({
  label,
  name,
  firm,
  you,
  divide,
}: {
  label: string;
  name: string;
  firm?: string;
  you?: boolean;
  divide?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 px-6 py-3.5",
        divide && "border-cedar-900/10 border-t",
        you && "bg-yarrow-200/30"
      )}
    >
      <div className="min-w-0">
        <Eyebrow as="span">{label}</Eyebrow>
        <p className="mt-1.5 flex items-center gap-2 text-cedar-900 text-sm">
          <span className="truncate">{name}</span>
          {you && <Pill tone="yarrow">You</Pill>}
        </p>
      </div>
      {firm && <span className="shrink-0 text-cedar-900/45 text-xs">{firm}</span>}
    </div>
  );
}

/** Directed trust structure — role separation under Nevada's UDTA. */
export function DirectedStructureCard() {
  return (
    <div>
      <CardHeader
        icon={<Scale aria-hidden className="size-5" />}
        title="Trust structure"
        sub="Roles separated under the Nevada Uniform Directed Trust Act."
      />
      <div className="py-1">
        <RoleRow label="Trustee" name="Sava Trust Company" firm="Administration" />
        <RoleRow
          label="Investment director"
          name="Marcus Webb, CFA"
          firm="Webb Capital Partners"
          you
          divide
        />
        <RoleRow label="Distribution director" name="Sava Trust Company" divide />
        <RoleRow
          label="Trust protector"
          name="Richard T. Brennan, Esq."
          firm="Brennan & Voss LLP"
          divide
        />
      </div>
    </div>
  );
}

/** Small chip asserting investment authority stays with the advisor. */
export function AuthorityChip() {
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div>
        <p className="font-medium text-cedar-900 text-sm">Investment authority</p>
        <p className="mt-0.5 text-cedar-900/55 text-xs">Directed to your firm</p>
      </div>
      <div className="flex items-center gap-1.5 whitespace-nowrap text-cedar-700">
        <CheckCircle2 aria-hidden className="size-4" />
        <span className="font-medium text-cedar-900/80 text-xs">Retained</span>
      </div>
    </div>
  );
}

function CustodianRow({
  custodian,
  account,
  kind,
  divide,
}: {
  custodian: string;
  account: string;
  kind: string;
  divide?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-6 py-3.5",
        divide && "border-cedar-900/10 border-t"
      )}
    >
      <div className="min-w-0">
        <p className="truncate font-medium text-cedar-900 text-sm">{custodian}</p>
        <p className="mt-0.5 font-mono text-cedar-900/45 text-xs tracking-wide">{account}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden text-cedar-900/55 text-xs sm:inline">{kind}</span>
        <Pill tone="parchment">Open</Pill>
      </div>
    </div>
  );
}

/** Custodian accounts — existing custody relationships, unchanged. */
export function CustodianAccountsCard() {
  return (
    <div>
      <CardHeader
        icon={<Landmark aria-hidden className="size-5" />}
        title="Custodian accounts"
        sub="External accounts stay where your clients' assets are managed."
      />
      <div className="py-1">
        <CustodianRow custodian="Charles Schwab" account="••••-4471" kind="Taxable brokerage" />
        <CustodianRow custodian="Fidelity" account="••••-9012" kind="IRA" divide />
        <CustodianRow custodian="Wells Fargo" account="••••-3388" kind="Cash management" divide />
      </div>
    </div>
  );
}

/** Small holdings / position snapshot chip. */
export function HoldingChip() {
  return (
    <div className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-cedar-900 text-sm">Vanguard Total Stock</p>
          <p className="mt-0.5 font-mono text-cedar-900/45 text-xs">VTI · Schwab ••••-4471</p>
        </div>
        <div className="text-end">
          <p className="font-medium text-cedar-900 text-sm">$1.42M</p>
          <p className="mt-0.5 text-cedar-700 text-xs">+4.2%</p>
        </div>
      </div>
    </div>
  );
}

function StatementRow({
  custodian,
  account,
  txns,
  confidence,
  status,
  statusTone,
  divide,
}: {
  custodian: string;
  account: string;
  txns: string;
  confidence: string;
  status: string;
  statusTone: "parchment" | "yarrow";
  divide?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-6 py-3.5",
        divide && "border-cedar-900/10 border-t"
      )}
    >
      <div className="min-w-0">
        <p className="truncate font-medium text-cedar-900 text-sm">{custodian}</p>
        <p className="mt-0.5 font-mono text-cedar-900/45 text-xs tracking-wide">{account}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden items-center gap-1.5 text-cedar-900/55 text-xs sm:flex">
          {txns} txns
          <Dot tone="muted" />
          {confidence}
        </span>
        <Pill tone={statusTone}>{status}</Pill>
      </div>
    </div>
  );
}

/** Statement reconciliation — custodian statements parsed and matched. */
export function StatementsCard() {
  return (
    <div>
      <CardHeader
        icon={<FileCheck aria-hidden className="size-5" />}
        title="Statement reconciliation"
        sub="Custodian statements, parsed and matched to your positions."
      />
      <div className="py-1">
        <StatementRow
          custodian="Charles Schwab"
          account="••••-4471"
          txns="47"
          confidence="98%"
          status="Extracted"
          statusTone="parchment"
        />
        <StatementRow
          custodian="Fidelity"
          account="••••-9012"
          txns="23"
          confidence="91%"
          status="Needs review"
          statusTone="yarrow"
          divide
        />
      </div>
    </div>
  );
}

/** Small reconciliation-complete chip. */
export function ReconChip() {
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div>
        <p className="font-medium text-cedar-900 text-sm">January reconciled</p>
        <p className="mt-0.5 text-cedar-900/55 text-xs">All accounts matched</p>
      </div>
      <div className="flex items-center gap-1.5 whitespace-nowrap text-cedar-700">
        <CheckCircle2 aria-hidden className="size-4" />
        <span className="font-medium text-cedar-900/80 text-xs">Balanced</span>
      </div>
    </div>
  );
}
