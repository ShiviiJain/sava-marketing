import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Sava Trust Company handles your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <p className="font-semibold text-2xs text-muted-foreground uppercase tracking-[0.16em]">
        Privacy policy
      </p>
      <h1 className="mt-4 font-normal font-serif text-3xl leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
        Privacy policy.
      </h1>
      <p className="mt-4 text-muted-foreground text-sm">Last updated May 7, 2026.</p>

      <div className="mt-12 space-y-6 text-base text-foreground-secondary leading-relaxed">
        <p>
          Sava Lakh Inc collects personal information necessary to administer trusts and process
          distributions, including names, contact details, financial account information, and
          beneficiary data. This information is used solely to provide fiduciary services and comply
          with legal obligations.
        </p>
        <p>
          We do not sell or share your information except as authorized by you and required for
          trust administration, including with your designated fiduciaries, attorneys, accountants,
          and financial institutions.
        </p>
        <p>
          Your data is protected with industry-standard security measures. We retain information for
          the duration of the trust and as required by law.
        </p>
        <p>
          You have the right to access and request correction of your information. Contact us with
          privacy questions or concerns at{" "}
          <a
            href="mailto:privacy@savahq.com"
            className="underline decoration-foreground/30 underline-offset-4"
          >
            privacy@savahq.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
