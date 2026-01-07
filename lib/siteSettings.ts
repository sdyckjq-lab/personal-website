import { sanityFetch, siteSettingsQueries } from "@/lib/sanity"

export interface SiteSettings {
    heroTitle: string
    heroHighlight: string
    heroDescription: string
    ctaPrimaryText: string
    ctaPrimaryTarget: string
    ctaSecondaryText: string
    ctaSecondaryTarget: string
}

// 默认值（当CMS无数据时使用）
const defaultSettings: SiteSettings = {
    heroTitle: "36岁，开始我的",
    heroHighlight: "AI与代码之旅",
    heroDescription: "从零开始，记录每一步成长。用代码解决实际问题，用AI探索未来可能。这是一个普通人的技术学习与实践之路。",
    ctaPrimaryText: "查看我的项目",
    ctaPrimaryTarget: "workshop",
    ctaSecondaryText: "阅读学习笔记",
    ctaSecondaryTarget: "growth",
}

/**
 * 获取站点设置
 */
export async function getSiteSettings(): Promise<SiteSettings> {
    const settings = await sanityFetch<SiteSettings>(siteSettingsQueries.get)
    return settings ?? defaultSettings
}
