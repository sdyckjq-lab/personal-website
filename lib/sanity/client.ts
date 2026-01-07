import { createClient, type QueryParams } from "next-sanity"

import { apiVersion, dataset, projectId } from "@/sanity/env"

/**
 * Sanity Client 配置
 */
export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === 'production', // 生产环境使用CDN缓存
})

// Next.js fetch缓存选项类型
interface FetchOptions {
    revalidate?: number | false
    tags?: string[]
}

/**
 * 统一的 Sanity 数据获取函数
 * 提供统一的错误处理和日志
 * @param query GROQ查询
 * @param params 查询参数
 * @param options Next.js缓存选项 (revalidate, tags)
 */
export async function sanityFetch<T>(
    query: string,
    params?: QueryParams,
    options?: FetchOptions
): Promise<T | null> {
    try {
        const result = await client.fetch<T>(query, params ?? {}, {
            next: {
                revalidate: options?.revalidate ?? 60, // 默认60秒重新验证
                tags: options?.tags,
            },
        })
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
    params?: QueryParams,
    options?: FetchOptions
): Promise<T[]> {
    try {
        const result = await client.fetch<T[]>(query, params ?? {}, {
            next: {
                revalidate: options?.revalidate ?? 60,
                tags: options?.tags,
            },
        })
        return result ?? []
    } catch (error) {
        console.error("[Sanity] 列表数据获取失败:", error)
        return []
    }
}
