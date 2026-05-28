import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms governing the use of Sava Trust Company's website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <p className="font-semibold text-2xs text-muted-foreground uppercase tracking-[0.16em]">
        Terms of service
      </p>
      <h1 className="mt-4 font-normal font-serif text-3xl leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
        Terms of service.
      </h1>
      <p className="mt-4 text-muted-foreground text-sm">Last updated May 7, 2026.</p>

      <div className="mt-12 space-y-6 text-base text-foreground-secondary leading-relaxed">
        <p>
          By using Sava Lakh Inc's services, you agree to these terms. We provide fiduciary trust
          administration services in accordance with Nevada law and your trust agreement.
        </p>
        <p>
          You are responsible for providing accurate information and maintaining account security.
        </p>
        <p>
          We are not liable for losses resulting from your failure to provide accurate information,
          unauthorized access due to your negligence, or market performance of trust assets. Our
          liability is limited to fees paid in the preceding twelve months.
        </p>
        <p>
          Services may be terminated by either party with written notice. These terms are governed
          by Nevada law.
        </p>
        <p>Amendments to these terms will be posted on our website with thirty days' notice.</p>
        <p>
          Questions about these terms:{" "}
          <a
            href="mailto:founders@savahq.com"
            className="underline decoration-foreground/30 underline-offset-4"
          >
            founders@savahq.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
