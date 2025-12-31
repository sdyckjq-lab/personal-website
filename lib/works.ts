import { client } from "@/sanity/lib/client"
import type { WorkItem } from "@/types"

// 重新导出类型供其他模块使用
export type { ProjectWork, VideoWork, WorkItem } from "@/types"

/**
 * 获取所有作品
 */
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
        return works ?? []
    } catch (error) {
        console.error("Failed to fetch works from Sanity:", error)
        return []
    }
}
