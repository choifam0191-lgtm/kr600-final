"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"
import { CatalogSection } from "@/components/catalog-section"
import { AboutSection } from "@/components/about-section"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <FeatureCards />
        <CatalogSection />
        <CTASection />
      </main>
    </>
  )
}
