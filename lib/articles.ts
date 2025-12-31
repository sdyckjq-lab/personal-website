import { sanityFetch, sanityFetchList, articleQueries } from "@/lib/sanity"
import type { Article } from "@/types"

// 重新导出类型供其他模块使用
export type { Article } from "@/types"

/**
 * 获取所有文章
 */
export async function getArticles(): Promise<Article[]> {
    return sanityFetchList<Article>(articleQueries.list)
}

/**
 * 根据 slug 获取单篇文章
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
    return sanityFetch<Article>(articleQueries.bySlug, { slug })
}
