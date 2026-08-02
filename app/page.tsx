"use client";

import LandingSection from "@/components/landing/LandingSection";
import HeroSection from "@/components/landing/HeroSection";
import CTASection from "@/components/landing/CTASection";
import ObjectiveSection from "@/components/landing/ObjectiveSection";
import GrowthSection from "@/components/landing/GrowthSection";
import MemorySection from "@/components/landing/MemorySection";
import LandingFeatureSection from "@/components/landing/LandingFeatureSection";

export default function Home() {
  return (
    <>
      <LandingSection>
        <HeroSection />
      </LandingSection>
      <LandingFeatureSection>
        <ObjectiveSection />
      </LandingFeatureSection>
      <LandingFeatureSection direction="reverse">
        <GrowthSection />
      </LandingFeatureSection>
      <LandingFeatureSection>
        <MemorySection />
      </LandingFeatureSection>
      <LandingSection>
        <CTASection />
      </LandingSection>
    </>
  );
}
