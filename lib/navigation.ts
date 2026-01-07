import { sanityFetch, navigationQueries } from "@/lib/sanity"

export interface MenuItem {
    label: string
    target: string
    isExternal: boolean
}

export interface NavigationConfig {
    siteName: string
    menuItems: MenuItem[]
}

// 默认值（当CMS无数据时使用）
const defaultNavigation: NavigationConfig = {
    siteName: "AI Journey",
    menuItems: [
        { label: "首页", target: "hero", isExternal: false },
        { label: "实践工坊", target: "workshop", isExternal: false },
        { label: "成长轨迹", target: "growth", isExternal: false },
        { label: "关于我", target: "about", isExternal: false },
    ],
}

/**
 * 获取导航配置
 */
export async function getNavigationConfig(): Promise<NavigationConfig> {
    const config = await sanityFetch<NavigationConfig>(navigationQueries.get)
    return config ?? defaultNavigation
}
