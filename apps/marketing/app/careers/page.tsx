import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "../_components/ui/eyebrow";
import { asset } from "../_lib/asset";
import { OPEN_ROLES } from "./roles";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Sava is built by exceptional individuals who care deeply about making trust administration modern and accessible.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <main>
      <section className="bg-cedar-700">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <h1 className="font-normal font-serif text-3xl text-parchment-50 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Build the next great trust <em className="font-normal italic">company.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-parchment-100/85 leading-[1.55] md:text-xl">
            Sava is built by exceptional individuals who care deeply about making trust
            administration modern and accessible. We're always looking for people who share that
            mission.
          </p>
        </div>
        <div className="relative aspect-[16/7] w-full overflow-hidden bg-parchment-200">
          <Image
            src={asset("careers-conversation-hi.webp")}
            alt=""
            fill
            sizes="150rem"
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      <section className="bg-parchment-50 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <Eyebrow>Open roles</Eyebrow>
          <h2 className="mt-6 font-normal font-serif text-3xl text-cedar-900 leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            We're <em className="font-normal italic">hiring.</em>
          </h2>
          <ul className="mt-12 border-cedar-900/15 border-t">
            {OPEN_ROLES.map((role) => (
              <li key={role.slug} className="border-cedar-900/15 border-b">
                <Link
                  href={`/careers/${role.slug}`}
                  className="group flex flex-col gap-4 py-8 transition-colors hover:bg-cedar-900/[0.02] md:flex-row md:items-start md:justify-between md:gap-10"
                >
                  <div className="max-w-2xl">
                    <p className="font-mono font-semibold text-2xs text-yarrow-600 uppercase tracking-[0.16em]">
                      {role.meta}
                    </p>
                    <h3 className="mt-3 font-normal font-serif text-2xl text-cedar-900 leading-tight">
                      {role.title}
                    </h3>
                    <p className="mt-3 text-base text-cedar-900/70 leading-relaxed">{role.body}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 self-start font-medium text-cedar-900 text-sm md:self-center">
                    View role
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-14 max-w-2xl text-base text-cedar-900/70 leading-relaxed">
            Don't see your role? If Sava sounds like a place you'd want to help build, send a note
            to{" "}
            <a
              href="mailto:founders@savahq.com"
              className="italic underline decoration-cedar-900/30 underline-offset-4 hover:decoration-cedar-900"
            >
              founders@savahq.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
