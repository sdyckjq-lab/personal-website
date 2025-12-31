import { client } from "@/sanity/lib/client"
import type { Article } from "@/types"

// 重新导出类型供其他模块使用
export type { Article } from "@/types"

/**
 * 获取所有文章
 */
export async function getArticles(): Promise<Article[]> {
    try {
        const query = `*[_type == "article"] | order(date desc) {
            title,
            "slug": slug.current,
            date,
            category,
            tags,
            excerpt
        }`

        const articles = await client.fetch<Article[]>(query)
        return articles ?? []
    } catch (error) {
        console.error("Failed to fetch articles from Sanity:", error)
        return []
    }
}

/**
 * 根据 slug 获取单篇文章
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const query = `*[_type == "article" && slug.current == $slug][0] {
            title,
            "slug": slug.current,
            date,
            category,
            tags,
            excerpt,
            body
        }`

        const article = await client.fetch<Article | null>(query, { slug })
        return article
    } catch (error) {
        console.error("Failed to fetch article from Sanity:", error)
        return null
    }
}
