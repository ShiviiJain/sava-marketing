import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "../../_components/ui/eyebrow";
import { PRESS_RELEASES } from "../releases";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  // External link-outs (e.g. videos) have no article page.
  return PRESS_RELEASES.filter((r) => !r.href).map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = PRESS_RELEASES.find((r) => r.slug === slug);
  if (!release) return {};
  return {
    title: `${release.headline} · Press`,
    description: release.excerpt,
    alternates: { canonical: `/press/${release.slug}` },
  };
}

export default async function PressReleasePage({ params }: PageProps) {
  const { slug } = await params;
  const release = PRESS_RELEASES.find((r) => r.slug === slug);
  if (!release || release.href || !release.body) notFound();

  return (
    <main className="bg-parchment-50">
      <article className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Link
          href="/press"
          className="inline-flex items-center gap-1.5 text-cedar-900/60 text-sm transition-colors hover:text-cedar-900"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" />
          Press
        </Link>

        <div className="mt-10 flex items-baseline gap-3">
          <Eyebrow as="span">{release.outlet}</Eyebrow>
          <span className="font-mono text-cedar-900/55 text-xs uppercase tracking-[0.12em]">
            {release.date}
          </span>
        </div>
        <h1 className="mt-4 font-normal font-serif text-xl text-cedar-900 leading-[1.15] tracking-[-0.01em] sm:text-2xl lg:text-3xl">
          {release.headline}
        </h1>
        <p className="mt-5 max-w-3xl text-cedar-900/70 text-lg leading-relaxed">
          {release.excerpt}
        </p>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-xl bg-parchment-200">
          <Image
            src={release.image}
            alt=""
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            quality={90}
            priority
            className="object-cover object-center"
          />
        </div>

        <div className="mt-10 space-y-6 text-base text-cedar-900/80 leading-relaxed md:text-lg">
          {release.body.map((paragraph, index) => (
            <p key={paragraph.slice(0, 40)}>
              {index === 0 && release.dateline ? (
                <span className="font-semibold text-cedar-900">{release.dateline} — </span>
              ) : null}
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
