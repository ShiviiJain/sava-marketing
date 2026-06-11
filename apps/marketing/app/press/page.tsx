import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "../_lib/asset";
import { PRESS_RELEASES } from "./releases";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press releases and coverage of Sava Trust Company. For media inquiries, contact press@savahq.com.",
  alternates: { canonical: "/press" },
};

export default function PressPage() {
  // The lead article: Sava's Nevada trust-charter application.
  const article =
    PRESS_RELEASES.find((r) => r.slug === "nevada-trust-charter-application") ?? PRESS_RELEASES[0];

  return (
    <main className="bg-parchment-50">
      {/* Title */}
      <section>
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-12 sm:pt-28 sm:pb-16">
          <h1 className="font-normal font-serif text-4xl text-cedar-900 leading-[1.0] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            Press
          </h1>
          <p className="mt-5 text-lg text-cedar-900/70 md:text-xl">
            For press inquiries, reach out at{" "}
            <a
              href="mailto:press@savahq.com"
              className="font-medium text-cedar-900 underline decoration-cedar-900/30 underline-offset-4 transition-colors hover:decoration-cedar-900"
            >
              press@savahq.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* One article — assurance-page typography. */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href={`/press/${article.slug}`}
            className="group grid items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-20"
          >
            <div className="relative aspect-[16/11] overflow-hidden rounded-[4px] bg-parchment-200">
              <Image
                src={article.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={90}
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div>
              <p className="text-cedar-900/55 text-sm">
                {article.outlet} · {article.date}
              </p>
              <h2 className="mt-2 font-normal font-serif text-2xl text-cedar-900 leading-snug tracking-[-0.01em] transition-colors group-hover:text-cedar-700 md:text-3xl">
                {article.headline}
              </h2>
              <p className="mt-4 max-w-md text-lg text-cedar-900/65 leading-relaxed">
                {article.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-medium text-cedar-900 text-sm transition-colors group-hover:text-cedar-700">
                Read more
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
