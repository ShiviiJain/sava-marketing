import type { Metadata } from "next";
import { AudienceSection } from "./_components/audience-section";
import { MarketingHero } from "./_components/marketing-hero";
import { NevadaSection } from "./_components/nevada-section";
import { ServicesSection } from "./_components/services-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <MarketingHero />
      <ServicesSection leaf="right" />
      <NevadaSection />
      <AudienceSection />
    </main>
  );
}
