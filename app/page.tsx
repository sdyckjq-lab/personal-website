import { Navigation } from "@/components/layout/Navigation"
import { HeroSection } from "@/components/sections/hero"
import { WorkshopSection } from "@/components/sections/workshop"
import { GrowthSection } from "@/components/sections/growth"
import { AboutSection } from "@/components/sections/about"
import { Footer } from "@/components/layout/Footer"

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
