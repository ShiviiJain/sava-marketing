import { cn } from "@sava/ui";
import { CheckCircle2, ChevronRight, Mail, Scale, ShieldCheck, Users } from "lucide-react";
import { Avatar, CardHeader, Field } from "../_components/product-card";
import { Eyebrow } from "../_components/ui/eyebrow";
import { asset } from "../_lib/asset";

/**
 * On-brand recreations of the family-portal product crops for the
 * /families platform showcase. Built on the shared product-card
 * primitives so the cards read as part of the marketing page rather
 * than pasted-in screenshots.
 */

/** Top trust card — the entity, its workflow stage, and the trust officer. */
export function TrustSummaryCard() {
  return (
    <div className="p-6">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-normal font-serif text-cedar-900 text-xl leading-tight">
          The Henderson Family Dynasty Trust
        </h4>
        <ChevronRight aria-hidden className="mt-1 size-5 shrink-0 text-cedar-900/30" />
      </div>

      <span className="mt-3 inline-flex rounded-full bg-parchment-200 px-3 py-1 font-medium text-cedar-900/80 text-xs">
        New Trust Establishment
      </span>
      <p className="mt-2 font-mono text-cedar-900/45 text-xs tracking-wide">SV-HFT-2026-003</p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-medium text-cedar-900 text-sm">Account Setup</p>
          <p className="mt-0.5 text-cedar-900/55 text-xs">Setting up your account</p>
        </div>
        <div className="flex items-center gap-1.5 text-cedar-700">
          <CheckCircle2 aria-hidden className="size-4" />
          <span className="text-cedar-900/70 text-xs">No action needed</span>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2.5 border-cedar-900/10 border-t pt-4 text-cedar-900/60 text-xs">
        <Avatar initials="SC" src={asset("avatar-sarah.webp")} alt="Sarah Chen" />
        <span className="font-medium text-cedar-900">Sarah Chen</span>
        <span aria-hidden className="size-1 rounded-full bg-cedar-900/25" />
        <span>Trust Officer</span>
        <span aria-hidden className="ms-auto text-cedar-900/45">
          Updated 1 month ago
        </span>
      </div>
    </div>
  );
}

/** Small document-collection status chip card. */
export function DocStatusCard() {
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div>
        <p className="font-medium text-cedar-900 text-sm">Document Collection</p>
        <p className="mt-0.5 text-cedar-900/55 text-xs">Documents needed from you</p>
      </div>
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span aria-hidden className="size-1.5 rounded-full bg-yarrow-500" />
        <span className="font-medium text-yarrow-700 text-xs">5 items need attention</span>
      </div>
    </div>
  );
}

/** Trust details — the governing terms in a two-column grid. */
export function TrustDetailsCard() {
  return (
    <div>
      <CardHeader
        icon={<ShieldCheck aria-hidden className="size-5" />}
        title="Trust details"
        sub="From the executed instrument on file with Sava."
      />
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 px-6 py-6">
        <Field label="Grantor" value="Robert James Henderson" />
        <Field label="Spouse" value="Margaret Ann Henderson" />
        <Field label="Trustee" value="Sava Trust Company" />
        <Field label="Distribution standard" value="HEMS" />
        <Field label="Effective" value="March 1, 2026" />
        <Field label="Term" value="Perpetual (Dynasty), to a 365-year maximum under NRS 111.1031" />
      </div>
    </div>
  );
}

/** Beneficiaries entitled to distributions. */
export function BeneficiariesCard() {
  const rows = ["Ethan Robert Henderson", "Claire Henderson-Walsh"];
  return (
    <div>
      <CardHeader
        icon={<Users aria-hidden className="size-5" />}
        title="Beneficiaries"
        sub="The individuals or entities entitled to distributions under the trust's standard."
      />
      <ul>
        {rows.map((name, i) => (
          <li
            key={name}
            className={cn(
              "flex items-center justify-between px-6 py-4",
              i > 0 && "border-cedar-900/10 border-t"
            )}
          >
            <span className="text-cedar-900 text-sm">{name}</span>
            <Eyebrow as="span">Individual</Eyebrow>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DirectorRow({ label, name, firm }: { label: string; name: string; firm: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <div>
        <Eyebrow as="span">{label}</Eyebrow>
        <p className="mt-1.5 text-cedar-900 text-sm">{name}</p>
      </div>
      <span className="shrink-0 text-cedar-900/45 text-xs">{firm}</span>
    </div>
  );
}

/** Directors & protectors who direct administration under Nevada's UDTA. */
export function DirectorsCard() {
  return (
    <div>
      <CardHeader
        icon={<Scale aria-hidden className="size-5" />}
        title="Directors & protectors"
        sub="The parties who direct Sava under the Nevada Uniform Directed Trust Act."
      />
      <div className="space-y-5 px-6 py-6">
        <DirectorRow
          label="Distribution directors"
          name="Eleanor W. Graham, CPA/PFS"
          firm="Graham Osborne Advisory LLC"
        />
        <DirectorRow
          label="Investment directors"
          name="Peter Grayson, CFA"
          firm="Meridian Capital Advisors, LLC"
        />
        <DirectorRow
          label="Trust protector"
          name="Richard T. Brennan, Esq."
          firm="Brennan & Voss LLP"
        />
      </div>
    </div>
  );
}

/** Dedicated trust-officer contact card. */
export function OfficerCard() {
  return (
    <div className="flex items-center gap-3 p-4">
      <Avatar initials="SC" src={asset("avatar-sarah.webp")} alt="Sarah Chen" />
      <div className="min-w-0">
        <p className="font-medium text-cedar-900 text-sm leading-tight">Sarah Chen</p>
        <p className="mt-0.5 text-cedar-900/55 text-xs">Your trust officer</p>
      </div>
      <span className="ms-auto flex size-9 shrink-0 items-center justify-center rounded-lg text-cedar-700 ring-1 ring-cedar-900/10">
        <Mail aria-hidden className="size-4" />
      </span>
    </div>
  );
}
