"use client";

import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import {
  type ContactPersona,
  type ContactState,
  submitContact,
} from "../actions/contact";
import { BrandButton } from "./ui/brand-button";
import { MarketingField } from "./marketing-field";
import { MarketingInput } from "./marketing-input";

interface PersonaOption {
  value: ContactPersona;
  label: string;
  tagline: string;
}

const PERSONA_OPTIONS: PersonaOption[] = [
  {
    value: "grantor",
    label: "Family member",
    tagline: "Drafting or moving a trust for your family.",
  },
  {
    value: "attorney",
    label: "Estate-planning attorney",
    tagline: "Looking for a trust company to administer trusts you draft.",
  },
  {
    value: "advisor",
    label: "Wealth advisor",
    tagline: "Setting up directed trust services for clients.",
  },
];

const STAGES = [
  { value: "thinking", label: "Just starting to think about it" },
  { value: "have-attorney", label: "Have an attorney, no trust yet" },
  { value: "have-trust", label: "Have a trust, want to modernize" },
  { value: "decant", label: "Looking to decant or restructure" },
];

const INITIAL_STATE: ContactState = {};

function isPersona(value: string | null): value is ContactPersona {
  return value === "grantor" || value === "attorney" || value === "advisor";
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, INITIAL_STATE);
  const { errors, values } = state;

  // Persona resolution order: server-validated `values.persona` (post-submit)
  // → `?as=` URL param (deep-link from /attorneys etc.) → default 'grantor'.
  const searchParams = useSearchParams();
  const urlPersona = searchParams.get("as");
  const initialPersona: ContactPersona = isPersona(values?.persona ?? null)
    ? (values?.persona as ContactPersona)
    : isPersona(urlPersona)
      ? urlPersona
      : "grantor";
  const [persona, setPersona] = useState<ContactPersona>(initialPersona);

  return (
    <form action={formAction} className="mt-12 space-y-8" noValidate>
      {/* Persona dropdown — drives which fields show + the submit label. */}
      <MarketingField label="I am a" htmlFor="contact-persona" error={errors?.persona}>
        <select
          id="contact-persona"
          name="persona"
          value={persona}
          onChange={(e) => setPersona(e.target.value as ContactPersona)}
          aria-invalid={!!errors?.persona || undefined}
          className="block w-full rounded-md border border-cedar-900/20 bg-parchment-50 px-4 py-3 text-base text-cedar-900 transition-colors hover:border-cedar-900/40 focus:border-cedar-900 focus:outline-none focus:ring-2 focus:ring-cedar-900/20 aria-invalid:border-destructive"
        >
          {PERSONA_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </MarketingField>

      <div className="grid gap-8 sm:grid-cols-2">
        <MarketingField
          label="First name"
          htmlFor="contact-firstName"
          error={errors?.firstName}
        >
          <MarketingInput
            id="contact-firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="Jane"
            required
            defaultValue={values?.firstName}
            invalid={!!errors?.firstName}
          />
        </MarketingField>

        <MarketingField
          label="Last name"
          htmlFor="contact-lastName"
          error={errors?.lastName}
        >
          <MarketingInput
            id="contact-lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Doe"
            required
            defaultValue={values?.lastName}
            invalid={!!errors?.lastName}
          />
        </MarketingField>
      </div>

      <MarketingField label="Email" htmlFor="contact-email" error={errors?.email}>
        <MarketingInput
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          required
          defaultValue={values?.email}
          invalid={!!errors?.email}
        />
      </MarketingField>

      {/* Persona-specific fields. The hidden `name=` keeps the action's
          FormData read consistent across personas. */}
      {persona === "grantor" && <GrantorFields values={values} errors={errors} />}
      {(persona === "attorney" || persona === "advisor") && (
        <ProfessionalFields persona={persona} values={values} errors={errors} />
      )}

      <SubmitButton persona={persona} />
    </form>
  );
}

function GrantorFields({
  values,
  errors,
}: Pick<ContactState, "values" | "errors">) {
  return (
    <>
      <MarketingField
        label="Family or entity"
        htmlFor="contact-entity"
        optional
        error={errors?.entity}
      >
        <MarketingInput
          id="contact-entity"
          name="entity"
          type="text"
          autoComplete="organization"
          placeholder="The Morrison Family Trust"
          defaultValue={values?.entity}
          invalid={!!errors?.entity}
        />
      </MarketingField>

      <MarketingField
        label="Where are you in the process"
        htmlFor="contact-stage"
        error={errors?.stage}
      >
        <select
          id="contact-stage"
          name="stage"
          required
          defaultValue={values?.stage ?? ""}
          aria-invalid={!!errors?.stage || undefined}
          className="block w-full rounded-md border border-cedar-900/20 bg-parchment-50 px-4 py-3 text-base text-cedar-900 transition-colors hover:border-cedar-900/40 focus:border-cedar-900 focus:outline-none focus:ring-2 focus:ring-cedar-900/20 aria-invalid:border-destructive"
        >
          <option value="" disabled>
            Select one
          </option>
          {STAGES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </MarketingField>
    </>
  );
}

function ProfessionalFields({
  persona,
  values,
  errors,
}: Pick<ContactState, "values" | "errors"> & { persona: ContactPersona }) {
  const firmLabel = persona === "attorney" ? "Your firm" : "Your firm or RIA";
  return (
    <MarketingField label={firmLabel} htmlFor="contact-firm" error={errors?.firm}>
      <MarketingInput
        id="contact-firm"
        name="firm"
        type="text"
        autoComplete="organization"
        placeholder={
          persona === "attorney" ? "Smith Estate Planning LLP" : "Cypress Wealth Advisors"
        }
        required
        defaultValue={values?.firm}
        invalid={!!errors?.firm}
      />
    </MarketingField>
  );
}

function SubmitButton({ persona }: { persona: ContactPersona }) {
  const { pending } = useFormStatus();
  const label =
    persona === "grantor" ? "Schedule a consultation" : "Request a demo";
  return (
    <BrandButton
      type="submit"
      brand="cedar"
      size="xl"
      disabled={pending}
      className="w-full sm:w-auto"
    >
      {pending ? "Sending…" : label}
      {!pending && <ArrowRight aria-hidden="true" />}
    </BrandButton>
  );
}
