import type { PortableTextBlock } from "@portabletext/types"

/**
 * 文章类型定义
 */
export interface Article {
    title: string
    slug?: string
    date: string
    category: string
    tags: string[]
    excerpt: string
    body?: PortableTextBlock[]
}

/**
 * 文章分类
 */
export type ArticleCategory = "项目复盘" | "学习笔记" | "资源收集"
