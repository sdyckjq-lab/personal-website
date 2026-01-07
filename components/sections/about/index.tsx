import { getAboutContent } from "@/lib/aboutContent"
import { AboutSectionClient } from "./AboutClient"

export async function AboutSection() {
  const content = await getAboutContent()
  return <AboutSectionClient content={content} />
}
