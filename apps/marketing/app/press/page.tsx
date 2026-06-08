import { Play } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "../_components/ui/eyebrow";
import { ScrollReveal } from "../_components/ui/scroll-reveal";
import { asset } from "../_lib/asset";
import { PRESS_RELEASES } from "./releases";

// Oversized fern silhouette laid on its side so it spans the full width of
// the cover as a faint editorial backdrop. The leaf art is a tall portrait
// (~1:2), so we size a portrait box to the leaf and rotate it 90°; its long
// axis then runs horizontally across the page.
function CoverLeaf() {
  const maskUrl = `url(${asset("leaves/test-01.png")})`;
  const mask = {
    maskImage: maskUrl,
    maskRepeat: "no-repeat",
    maskSize: "auto 100%",
    maskPosition: "center",
    WebkitMaskImage: maskUrl,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "auto 100%",
    WebkitMaskPosition: "center",
  } as const;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="-translate-x-1/2 -translate-y-1/2 -rotate-90 absolute top-1/2 start-1/2 h-[64vw] w-[30vw] max-h-[420px] max-w-[200px] bg-cedar-200/50"
        style={mask}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press releases and coverage of Sava Trust Company. For media inquiries, contact press@savahq.com.",
  alternates: { canonical: "/press" },
};

export default function PressPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-parchment-50">
        <CoverLeaf />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col px-6 py-16 sm:py-20 lg:py-24">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-yarrow-500" />
            <span className="font-mono font-semibold text-2xs text-yarrow-600 uppercase tracking-[0.18em]">
              May 2026 · Press
            </span>
          </div>

          <h1 className="mt-10 max-w-3xl font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Press.
          </h1>

          <div className="mt-10 flex flex-col gap-2 border-cedar-900/15 border-t pt-5 font-mono font-semibold text-2xs text-cedar-900/55 uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:justify-between">
            <a href="mailto:press@savahq.com" className="transition-colors hover:text-cedar-900">
              For media inquiries · press@savahq.com
            </a>
            <span>Updated · May 2026</span>
          </div>
        </div>
      </section>

      <section className="bg-parchment-50 pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <header className="border-cedar-900/15 border-t pt-6">
            <Eyebrow as="h2">Press releases</Eyebrow>
          </header>
          <ScrollReveal>
            <ul className="mt-8 space-y-6">
              {PRESS_RELEASES.map((release) => {
                const cardClass =
                  "group grid overflow-hidden rounded-xl border border-cedar-900/10 bg-parchment-100/50 transition-colors hover:border-cedar-900/25 sm:grid-cols-[2fr_3fr]";
                const inner = (
                  <>
                    <div className="relative aspect-[16/10] overflow-hidden bg-parchment-200 sm:aspect-auto sm:min-h-[220px]">
                      <Image
                        src={release.image}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 40vw, 100vw"
                        quality={90}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {release.href && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex size-14 items-center justify-center rounded-full bg-cedar-900/65 text-parchment-50 ring-1 ring-parchment-50/30 backdrop-blur-sm transition-transform group-hover:scale-105">
                            <Play
                              aria-hidden="true"
                              className="size-5 translate-x-0.5"
                              fill="currentColor"
                            />
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col justify-center p-6 md:p-8">
                      <div className="flex items-baseline gap-3">
                        <Eyebrow as="span">{release.outlet}</Eyebrow>
                        <span className="font-mono text-cedar-900/55 text-xs uppercase tracking-[0.12em]">
                          {release.date}
                        </span>
                      </div>
                      <h3 className="mt-3 text-balance font-normal font-serif text-2xl text-cedar-900 leading-[1.15] tracking-[-0.01em] transition-colors group-hover:text-cedar-700">
                        {release.headline}
                      </h3>
                      <p className="mt-3 text-base text-cedar-900/70 leading-relaxed">
                        {release.excerpt}
                      </p>
                    </div>
                  </>
                );
                return (
                  <li key={release.slug}>
                    {release.href ? (
                      <a
                        href={release.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={cardClass}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link href={`/press/${release.slug}`} className={cardClass}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
