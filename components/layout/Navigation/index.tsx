import { getNavigationConfig } from "@/lib/navigation"
import { NavigationClient } from "./NavigationClient"

export async function Navigation() {
  const config = await getNavigationConfig()
  return <NavigationClient config={config} />
}
