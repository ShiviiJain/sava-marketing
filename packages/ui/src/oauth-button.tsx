import type * as React from "react";
import { Button } from "./button";
import { cn } from "./cn";

/*
 * OAuthButton — provider-aware sign-in button, composed on top of `Button`.
 *
 * Centralizes the brand-mark + label pairing so every surface that needs
 * "Continue with Google" (or future providers) renders the same affordance,
 * and adding a provider means adding one entry to `PROVIDERS` rather than
 * hand-rolling another SVG + label everywhere.
 *
 * Provider brand styling — the surface color, text color, and hover —
 * comes from each provider's published brand guidelines and is baked into
 * the provider's entry in `PROVIDERS`. Google's light-variant button is
 * `#ffffff` bg with `#1f1f1f` text, locked across themes; Microsoft is
 * white-on-dark-text; Apple / GitHub default to black-on-white.
 *
 * Brand marks themselves render in fixed provider colors (e.g. Google's
 * multi-color G). Don't tint them via `text-*` — currentColor isn't
 * applied on these icons.
 */

export type OAuthProvider = "google";

interface ProviderConfig {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  /**
   * Tailwind classes applied to Button's outline variant to match the
   * provider's brand spec. Locked across themes — Google's light button is
   * white in both light and dark surrounding chrome.
   */
  className: string;
}

const PROVIDERS: Record<OAuthProvider, ProviderConfig> = {
  google: {
    label: "Google",
    Icon: GoogleIcon,
    className:
      "bg-white text-ash-950 hover:bg-ash-50 hover:text-ash-950 dark:bg-white dark:text-ash-950 dark:hover:bg-ash-50",
  },
};

export interface OAuthButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "variant" | "children"> {
  provider: OAuthProvider;
  /** Override the visible label. Defaults to "Continue with {Provider}". */
  label?: string;
}

export function OAuthButton({ provider, label, className, ...props }: OAuthButtonProps) {
  const { label: providerLabel, Icon, className: providerClassName } = PROVIDERS[provider];
  return (
    <Button variant="outline" className={cn(providerClassName, className)} {...props}>
      <Icon />
      {label ?? `Continue with ${providerLabel}`}
    </Button>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
