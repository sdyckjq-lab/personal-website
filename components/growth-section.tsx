import { getArticles } from "@/lib/articles"
import { GrowthSectionClient } from "./growth-section-client"

export async function GrowthSection() {
  const articles = await getArticles()

  return <GrowthSectionClient articles={articles} />
}
