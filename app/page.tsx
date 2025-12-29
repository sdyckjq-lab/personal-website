import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { WorkshopSection } from "@/components/workshop-section"
import { GrowthSection } from "@/components/growth-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WorkshopSection />
      <GrowthSection />
      <AboutSection />
      <Footer />
    </main>
  )
}
