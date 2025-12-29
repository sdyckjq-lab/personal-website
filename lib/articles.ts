import { client } from "@/sanity/lib/client"
import type { PortableTextBlock } from "@portabletext/types"

export interface Article {
    title: string
    slug?: string
    date: string
    category: string
    tags: string[]
    excerpt: string
    body?: PortableTextBlock[]
}

// 默认文章数据（作为后备）
const defaultArticles: Article[] = [
    {
        title: "从零开始学习Next.js：我的第一个全栈项目",
        slug: "nextjs-first-project",
        date: "2025-12-20",
        category: "项目复盘",
        tags: ["Next.js", "React", "全栈开发"],
        excerpt: "记录第一次使用Next.js构建完整项目的经历，从路由配置到API开发，踩过的坑和收获的经验。",
    },
    {
        title: "AI工具选型指南：Grok vs GPT vs Claude",
        slug: "ai-tools-comparison",
        date: "2025-12-15",
        category: "学习笔记",
        tags: ["AI", "Grok", "GPT"],
        excerpt: "对比三大AI模型在实际项目中的表现，分析各自的优势和适用场景，以及API使用体验。",
    },
    {
        title: "Playwright自动化测试入门与实践",
        slug: "playwright-automation",
        date: "2025-12-10",
        category: "学习笔记",
        tags: ["Playwright", "自动化", "测试"],
        excerpt: "学习Playwright的过程记录，如何用它来爬取网页内容，以及在Twitter Hunter项目中的应用。",
    },
    {
        title: "精选开发者资源清单：工具、博客与社区",
        slug: "developer-resources",
        date: "2025-12-05",
        category: "资源收集",
        tags: ["资源", "工具", "社区"],
        excerpt: "整理我在学习过程中发现的优质资源，包括开发工具、技术博客、学习平台和开发者社区。",
    },
    {
        title: "TypeScript类型系统深入理解",
        slug: "typescript-type-system",
        date: "2025-11-28",
        category: "学习笔记",
        tags: ["TypeScript", "类型系统"],
        excerpt: "TypeScript类型系统的学习笔记，从基础类型到泛型、类型推断，逐步建立类型思维。",
    },
    {
        title: "构建Twitter Hunter的技术决策与思考",
        slug: "twitter-hunter-review",
        date: "2025-11-20",
        category: "项目复盘",
        tags: ["项目管理", "架构设计"],
        excerpt: "复盘Twitter Hunter项目，分享技术选型的思考过程、架构设计决策和未来优化方向。",
    },
]

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

        // 如果 Sanity 有数据则使用，否则返回默认数据
        if (articles && articles.length > 0) {
            return articles
        }

        return defaultArticles
    } catch (error) {
        console.error("Failed to fetch articles from Sanity:", error)
        return defaultArticles
    }
}

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

        if (article) {
            return article
        }

        // 尝试从默认数据中查找
        const defaultArticle = defaultArticles.find(a => a.slug === slug)
        return defaultArticle || null
    } catch (error) {
        console.error("Failed to fetch article from Sanity:", error)
        const defaultArticle = defaultArticles.find(a => a.slug === slug)
        return defaultArticle || null
    }
}
