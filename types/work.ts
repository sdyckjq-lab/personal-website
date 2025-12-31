/**
 * 项目作品类型
 */
export interface ProjectWork {
    type: "project"
    title: string
    description: string
    link: string
    status: ProjectStatus
    tags: string[]
    cover?: string
    order: number
}

/**
 * 视频作品类型
 */
export interface VideoWork {
    type: "video"
    title: string
    description: string
    link: string
    cover: string
    platforms: VideoPlatform[]
    order: number
}

/**
 * 作品联合类型
 */
export type WorkItem = ProjectWork | VideoWork

/**
 * 作品类型标识
 */
export type WorkType = "project" | "video"

/**
 * 项目状态
 */
export type ProjectStatus = "已上线" | "开发中" | "规划中"

/**
 * 视频平台
 */
export type VideoPlatform = "小红书" | "抖音" | "B站" | "YouTube"
