import { Button } from "@sava/ui";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thanks",
  description: "We received your message and will be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-32 sm:py-40">
      <p className="font-semibold text-2xs text-muted-foreground uppercase tracking-[0.16em]">
        Thank you
      </p>
      <h1 className="mt-4 font-normal font-serif text-3xl leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
        We'll be in touch.
      </h1>
      <p className="mt-6 text-foreground-secondary text-lg leading-relaxed">
        A member of our team will reply within one business day. If you need us sooner, write
        directly to{" "}
        <a
          href="mailto:founders@savahq.com"
          className="underline decoration-foreground/30 underline-offset-4"
        >
          founders@savahq.com
        </a>
        .
      </p>
      <div className="mt-12">
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
