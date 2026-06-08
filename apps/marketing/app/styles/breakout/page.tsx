import type { Metadata } from "next";
import { BreakoutBanner } from "../../_components/breakout-banner";

export const metadata: Metadata = { title: "Styles — Breakout banner" };

export default function BreakoutPreviewPage() {
  return (
    <main className="bg-parchment-50 py-10">
      <BreakoutBanner />
    </main>
  );
}
