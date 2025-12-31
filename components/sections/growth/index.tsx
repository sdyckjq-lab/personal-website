import { getArticles } from "@/lib/articles"
import { GrowthSectionClient } from "./GrowthClient"

export async function GrowthSection() {
  const articles = await getArticles()

  return <GrowthSectionClient articles={articles} />
}
