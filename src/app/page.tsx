import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { StoriesSection } from "@/components/sections/stories-section";
import { PurposeSection } from "@/components/sections/purpose-section";
import { ImpactAreasSection } from "@/components/sections/impact-areas-section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  ...(siteConfig.url ? { alternates: { canonical: siteConfig.url } } : {}),
};

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <StoriesSection />
      <PurposeSection />
      <ImpactAreasSection />
    </div>
  );
}
