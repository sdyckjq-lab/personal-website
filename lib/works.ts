import { client } from "@/sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url"

const builder = imageUrlBuilder(client)

export interface ProjectWork {
    type: "project"
    title: string
    description: string
    link: string
    status: "已上线" | "开发中" | "规划中"
    tags: string[]
    order: number
}

export interface VideoWork {
    type: "video"
    title: string
    description: string
    link: string
    cover: string
    platforms: string[]
    order: number
}

export type WorkItem = ProjectWork | VideoWork

// 默认作品数据（作为后备）
const defaultWorks: WorkItem[] = [
    {
        type: "project",
        title: "Twitter Hunter",
        description: "基于Grok API和Playwright开发的Twitter热点监控工具，实时追踪热门话题和趋势，自动化内容分析。",
        tags: ["Grok API", "Playwright", "Next.js"],
        status: "已上线",
        link: "https://github.com/sdyckjq-lab/Twitter-Hunte",
        order: 0,
    },
    {
        type: "project",
        title: "项目工具 #2",
        description: "即将推出的新工具，敬请期待。专注于提升工作效率和自动化流程。",
        tags: ["AI", "Automation"],
        status: "开发中",
        link: "#",
        order: 1,
    },
    {
        type: "project",
        title: "项目工具 #3",
        description: "更多创意项目正在酝酿中，持续探索AI在实际场景中的应用价值。",
        tags: ["Coming Soon"],
        status: "规划中",
        link: "#",
        order: 2,
    },
]

export async function getWorks(): Promise<WorkItem[]> {
    try {
        const query = `*[_type == "work"] | order(order asc) {
            "type": workType,
            title,
            description,
            link,
            status,
            tags,
            "cover": cover.asset->url,
            platforms,
            order
        }`

        const works = await client.fetch<WorkItem[]>(query)

        // 如果 Sanity 有数据则使用，否则返回默认数据
        if (works && works.length > 0) {
            return works
        }

        return defaultWorks
    } catch (error) {
        console.error("Failed to fetch works from Sanity:", error)
        return defaultWorks
    }
}
