import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { PurposeSection } from "@/components/sections/purpose-section";
import { ImpactAreasSection } from "@/components/sections/impact-areas-section";
import { StoriesSection } from "@/components/sections/stories-section";
import { ImpactOverviewSection } from "@/components/sections/impact-overview-section";
import { ParticipationSection } from "@/components/sections/participation-section";
import { ClosingSection } from "@/components/sections/closing-section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  ...(siteConfig.url ? { alternates: { canonical: siteConfig.url } } : {}),
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PurposeSection />
      <ImpactAreasSection />
      <StoriesSection />
      <ImpactOverviewSection />
      <ParticipationSection />
      <ClosingSection />
    </>
  );
}
