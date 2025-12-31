import { getWorks } from "@/lib/works"
import { WorkshopSectionClient } from "./workshop-section-client"

export async function WorkshopSection() {
  const works = await getWorks()

  return <WorkshopSectionClient works={works} />
}
