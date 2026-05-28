import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sava",
  description: "Sava Trust Company.",
  alternates: { canonical: "/landing" },
};

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cedar-700 px-6">
      <Link
        href="/"
        className="font-normal font-serif text-6xl text-parchment-50 leading-[0.98] tracking-[-0.03em] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-yarrow-500 sm:text-7xl md:text-8xl"
      >
        savahq.com
      </Link>
    </main>
  );
}
