import { sanityFetchList, workQueries } from "@/lib/sanity"
import type { WorkItem } from "@/types"

// 重新导出类型供其他模块使用
export type { ProjectWork, VideoWork, WorkItem } from "@/types"

/**
 * 获取所有作品
 */
export async function getWorks(): Promise<WorkItem[]> {
    return sanityFetchList<WorkItem>(workQueries.list)
}
