import { getSiteSettings } from "@/lib/siteSettings"
import { HeroSectionClient } from "./HeroClient"

export async function HeroSection() {
  const settings = await getSiteSettings()
  return <HeroSectionClient settings={settings} />
}
