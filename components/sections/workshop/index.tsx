import { getWorks } from "@/lib/works"
import { WorkshopSectionClient } from "./WorkshopClient"

export async function WorkshopSection() {
  const works = await getWorks()

  return <WorkshopSectionClient works={works} />
}
