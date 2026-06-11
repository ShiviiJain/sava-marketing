import type { Metadata } from "next";
import { AboutTeaser } from "./_components/about-teaser";
import { AssuranceTeaser } from "./_components/assurance-teaser";
import { AudienceSection } from "./_components/audience-section";
import { MarketingHero } from "./_components/marketing-hero";
import { NevadaSection } from "./_components/nevada-section";
import { ServicesSection } from "./_components/services-section";
import { ScrollReveal } from "./_components/ui/scroll-reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <MarketingHero />
      <ScrollReveal>
        <ServicesSection leaf="right" />
      </ScrollReveal>
      <ScrollReveal>
        <NevadaSection showPhoto />
      </ScrollReveal>
      <ScrollReveal>
        <AssuranceTeaser />
      </ScrollReveal>
      <ScrollReveal>
        <AboutTeaser />
      </ScrollReveal>
      <ScrollReveal>
        <AudienceSection />
      </ScrollReveal>
    </main>
  );
}
