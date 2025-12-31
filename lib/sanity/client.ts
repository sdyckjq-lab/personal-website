import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId } from "@/sanity/env"

/**
 * Sanity Client 配置
 */
export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // 关闭 CDN 缓存，确保内容实时更新
})

/**
 * 统一的 Sanity 数据获取函数
 * 提供统一的错误处理和日志
 */
export async function sanityFetch<T>(
    query: string,
    params?: Record<string, unknown>
): Promise<T | null> {
    try {
        const result = await client.fetch<T>(query, params)
        return result
    } catch (error) {
        console.error("[Sanity] 数据获取失败:", error)
        return null
    }
}

/**
 * 获取数组数据的封装，失败时返回空数组
 */
export async function sanityFetchList<T>(
    query: string,
    params?: Record<string, unknown>
): Promise<T[]> {
    try {
        const result = await client.fetch<T[]>(query, params)
        return result ?? []
    } catch (error) {
        console.error("[Sanity] 列表数据获取失败:", error)
        return []
    }
}
