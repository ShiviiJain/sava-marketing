"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";

/**
 * Contact form submission handler. Validates the persona-tagged intake,
 * fans the submission out to whichever notify backends are configured,
 * then redirects to `/contact/thanks` on success.
 *
 * Routing model (mirrors the API stub Nimit drafted):
 *
 *   persona: 'grantor'              -> intent: 'consultation', route: 'trust-officer'
 *   persona: 'attorney' | 'advisor' -> intent: 'demo',         route: 'sales'
 *
 * Returning a `state` shape from the action lets the client surface
 * validation errors in-line via React 19's `useActionState`, without
 * the form having to re-mount.
 */

export type ContactPersona = "grantor" | "attorney" | "advisor";
export type ContactIntent = "consultation" | "demo";
export type ContactRoute = "trust-officer" | "sales";

const PERSONAS = new Set<ContactPersona>(["grantor", "attorney", "advisor"]);
const STAGE_VALUES = new Set(["thinking", "have-attorney", "have-trust", "decant"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 200;
const MAX_ENTITY = 200;
const MAX_EMAIL = 320;
const MAX_FIRM = 200;

type ContactField = "persona" | "firstName" | "lastName" | "email" | "entity" | "firm" | "stage";

export interface ContactState {
  ok?: boolean;
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const persona = (formData.get("persona") ?? "grantor").toString().trim();
  const firstName = (formData.get("firstName") ?? "").toString().trim();
  const lastName = (formData.get("lastName") ?? "").toString().trim();
  const email = (formData.get("email") ?? "").toString().trim();
  const entity = (formData.get("entity") ?? "").toString().trim();
  const firm = (formData.get("firm") ?? "").toString().trim();
  const stage = (formData.get("stage") ?? "").toString().trim();

  const errors: Partial<Record<ContactField, string>> = {};

  if (!PERSONAS.has(persona as ContactPersona)) {
    errors.persona = "Pick the option that fits you.";
  }

  if (!firstName) errors.firstName = "Please share your first name.";
  else if (firstName.length > MAX_NAME) errors.firstName = "First name is too long.";

  if (!lastName) errors.lastName = "Please share your last name.";
  else if (lastName.length > MAX_NAME) errors.lastName = "Last name is too long.";

  if (!email) errors.email = "Email is required.";
  else if (email.length > MAX_EMAIL) errors.email = "Email is too long.";
  else if (!EMAIL_RE.test(email)) errors.email = "That doesn't look like an email.";

  if (entity.length > MAX_ENTITY) errors.entity = "That field is too long.";
  if (firm.length > MAX_FIRM) errors.firm = "That field is too long.";

  // Persona-specific required fields
  if (persona === "grantor") {
    if (!stage) errors.stage = "Pick the option that fits best.";
    else if (!STAGE_VALUES.has(stage)) errors.stage = "Pick the option that fits best.";
  } else if (persona === "attorney" || persona === "advisor") {
    if (!firm) errors.firm = "Your firm name helps us route the request.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { persona, firstName, lastName, email, entity, firm, stage },
    };
  }

  const submission: ContactSubmission = {
    persona: persona as ContactPersona,
    name: `${firstName} ${lastName}`.trim(),
    email,
    entity,
    firm,
    stage,
  };
  await Promise.allSettled([notifyContactSubmission(submission), sendContactEmail(submission)]);

  redirect("/contact/thanks");
}

interface ContactSubmission {
  persona: ContactPersona;
  name: string;
  email: string;
  entity: string;
  firm: string;
  stage: string;
}

/** Persona → route + intent table. Keeps the routing logic in one place. */
function routeFor(persona: ContactPersona): { intent: ContactIntent; route: ContactRoute } {
  if (persona === "grantor") return { intent: "consultation", route: "trust-officer" };
  return { intent: "demo", route: "sales" };
}

/**
 * Dispatch the validated submission to the configured notify backend.
 * Wired to a Slack webhook when `MARKETING_CONTACT_SLACK_WEBHOOK` is set;
 * otherwise logs server-side so dev runs don't silently swallow
 * submissions. The webhook URL is intentionally not stamped into a
 * client-visible env var — the action runs on the server.
 */
async function notifyContactSubmission(payload: ContactSubmission) {
  const { route } = routeFor(payload.persona);
  const webhook = process.env.MARKETING_CONTACT_SLACK_WEBHOOK;
  if (!webhook) {
    console.info("[marketing/contact] submission (no webhook configured)", {
      persona: payload.persona,
      route,
      name: payload.name,
      email: payload.email,
      firm: payload.firm || null,
      entity: payload.entity || null,
      stage: payload.stage || null,
    });
    return;
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: formatSlackMessage(payload) }),
    });
    if (!res.ok) {
      console.error("[marketing/contact] slack webhook failed; preserving payload in logs", {
        status: res.status,
        ...payloadForLogs(payload),
      });
    }
  } catch (err) {
    console.error("[marketing/contact] slack webhook error; preserving payload in logs", {
      error: err instanceof Error ? err.message : String(err),
      ...payloadForLogs(payload),
    });
  }
}

/**
 * Escape user input destined for a Slack `text` payload. Slack resolves
 * `<!channel>`, `<!here>`, and `<URL|label>` as live tokens even inside
 * prose, which would let an anonymous form submitter spam the receiving
 * channel or embed phishing links. Per Slack's formatting docs the
 * three characters that need escaping for plain prose are `<`, `>`, `&`.
 */
function escapeSlackText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatSlackMessage(p: ContactSubmission): string {
  const { intent, route } = routeFor(p.persona);
  const personaLabel = PERSONA_LABELS[p.persona] ?? p.persona;
  const lines = [
    `*New marketing contact — ${escapeSlackText(personaLabel)} (${intent}, → ${route})*`,
    `*Name:* ${escapeSlackText(p.name)}`,
    `*Email:* ${escapeSlackText(p.email)}`,
    p.firm ? `*Firm:* ${escapeSlackText(p.firm)}` : null,
    p.entity ? `*Family/entity:* ${escapeSlackText(p.entity)}` : null,
    p.stage ? `*Stage:* ${escapeSlackText(STAGE_LABELS[p.stage] ?? p.stage)}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

function payloadForLogs(p: ContactSubmission) {
  return {
    persona: p.persona,
    name: p.name,
    email: p.email,
    firm: p.firm || null,
    entity: p.entity || null,
    stage: p.stage || null,
  };
}

const PERSONA_LABELS: Record<ContactPersona, string> = {
  grantor: "Family member",
  attorney: "Attorney",
  advisor: "Wealth advisor",
};

const STAGE_LABELS: Record<string, string> = {
  thinking: "Just starting to think about it",
  "have-attorney": "Have an attorney, no trust yet",
  "have-trust": "Have a trust, want to modernize",
  decant: "Looking to decant or restructure",
};

/**
 * Send the submission as an email via Resend, routed to the right inbox.
 *
 * Recipient resolution:
 *   - grantor      -> CONTACT_EMAIL_TO_GRANTOR || CONTACT_EMAIL_TO
 *   - attorney/advisor (sales) -> CONTACT_EMAIL_TO_SALES || CONTACT_EMAIL_TO
 *
 * That way you can split the inbox later without touching code; today
 * everything can land in one shared inbox via CONTACT_EMAIL_TO.
 *
 * Env vars (all optional except the API key):
 *   RESEND_API_KEY           — Resend project API key
 *   CONTACT_EMAIL_FROM       — sender, defaults to Resend's sandbox address
 *   CONTACT_EMAIL_TO         — fallback recipient
 *   CONTACT_EMAIL_TO_GRANTOR — recipient for consultation requests
 *   CONTACT_EMAIL_TO_SALES   — recipient for demo requests
 */
async function sendContactEmail(payload: ContactSubmission) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[marketing/contact] RESEND_API_KEY not set — email skipped");
    return;
  }

  const { intent, route } = routeFor(payload.persona);
  const from = process.env.CONTACT_EMAIL_FROM ?? "Sava Contact <onboarding@resend.dev>";
  const routedTo =
    route === "trust-officer"
      ? process.env.CONTACT_EMAIL_TO_GRANTOR
      : process.env.CONTACT_EMAIL_TO_SALES;
  const toRaw = routedTo ?? process.env.CONTACT_EMAIL_TO ?? "founders@savahq.com";
  const to = toRaw
    .split(",")
    .map((addr) => addr.trim())
    .filter(Boolean);

  const personaLabel = PERSONA_LABELS[payload.persona];
  const subject = `[${intent}] ${personaLabel} contact: ${payload.name}`;
  const lines = [
    `Persona: ${personaLabel}`,
    `Route: ${route}`,
    `Intent: ${intent}`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.firm ? `Firm: ${payload.firm}` : null,
    payload.entity ? `Family/entity: ${payload.entity}` : null,
    payload.stage ? `Stage: ${STAGE_LABELS[payload.stage] ?? payload.stage}` : null,
  ].filter(Boolean);
  const text = lines.join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject,
      text,
    });
    if (error) {
      console.error("[marketing/contact] resend send failed; preserving payload in logs", {
        error,
        ...payloadForLogs(payload),
      });
    }
  } catch (err) {
    console.error("[marketing/contact] resend error; preserving payload in logs", {
      error: err instanceof Error ? err.message : String(err),
      ...payloadForLogs(payload),
    });
  }
}
