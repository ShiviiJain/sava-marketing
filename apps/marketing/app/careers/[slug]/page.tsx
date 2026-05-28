import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { BrandButton } from "../../_components/ui/brand-button";
import { OPEN_ROLES } from "../roles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return OPEN_ROLES.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = OPEN_ROLES.find((r) => r.slug === slug);
  if (!role) return {};
  return {
    title: `${role.title} · Careers`,
    description: role.body,
    alternates: { canonical: `/careers/${role.slug}` },
  };
}

export default async function RolePage({ params }: PageProps) {
  const { slug } = await params;
  const role = OPEN_ROLES.find((r) => r.slug === slug);
  if (!role) notFound();

  const applyHref = role.applyUrl ?? role.mailto;
  const applyIsExternal = Boolean(role.applyUrl);

  return (
    <main className="bg-parchment-50">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <Link
          href="/careers"
          className="inline-flex items-center gap-1.5 text-cedar-900/60 text-sm transition-colors hover:text-cedar-900"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" />
          Careers
        </Link>

        <div className="mt-10 flex flex-col gap-6 border-cedar-900/15 border-b pb-10 md:flex-row md:items-start md:justify-between md:gap-12 md:pb-12">
          <div>
            <h1 className="font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              {role.title}
            </h1>
            <p className="mt-3 text-cedar-900/60 text-sm">{role.meta}</p>
          </div>
          <BrandButton asChild brand="cedar" size="lg" className="self-start">
            <a
              href={applyHref}
              {...(applyIsExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            >
              Apply <ArrowRight aria-hidden="true" />
            </a>
          </BrandButton>
        </div>

        <div className="mt-12 space-y-12">
          <Section heading="About the role">
            <p>{role.body}</p>
          </Section>
          <Section heading="What you'll do">
            <BulletList items={role.responsibilities} />
          </Section>
          <Section heading="What we're looking for">
            <BulletList items={role.qualifications} />
          </Section>
          <Section heading="About Sava">
            <p>
              Sava is building a modern trust company. Trusts hold trillions of dollars and are
              one of the main ways wealth moves between generations. A trust company acts as a
              trustee for trusts by holding the trust's assets and executing the specific wishes
              of a family.
            </p>
            <p className="mt-4">
              Sava is building a new full-stack, chartered trust company. Not only the software
              for banks and lawyers, but also the actual regulated entity.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-semibold text-base text-cedar-900">{heading}</h2>
      <div className="mt-4 text-base text-cedar-900/75 leading-relaxed">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="grid grid-cols-[auto_1fr] items-start gap-x-3 text-base text-cedar-900/75 leading-relaxed"
        >
          <span aria-hidden="true" className="select-none pt-2.5 text-cedar-900/40">
            ·
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
