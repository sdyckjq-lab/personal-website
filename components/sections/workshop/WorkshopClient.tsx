"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ExternalLink, Sparkles, Play } from "lucide-react"
import Image from "next/image"
import type { WorkItem, ProjectWork, VideoWork } from "@/lib/works"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion"
import { isValidExternalUrl } from "@/lib/utils"

type WorkType = "全部" | "项目" | "视频"

const categories: WorkType[] = ["全部", "项目", "视频"]

interface WorkshopSectionClientProps {
    works: WorkItem[]
}

export function WorkshopSectionClient({ works }: WorkshopSectionClientProps) {
    const [selectedType, setSelectedType] = useState<WorkType>("全部")
    const prefersReducedMotion = useReducedMotion()

    const filteredItems = selectedType === "全部"
        ? works
        : works.filter(item =>
            selectedType === "项目" ? item.type === "project" : item.type === "video"
        )

    return (
        <section id="workshop" className="py-24 md:py-32 px-6 bg-background">
            <div className="max-w-6xl mx-auto">
                <FadeInUp>
                    <div className="text-center space-y-4 mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                            <Sparkles className="w-4 h-4" />
                            实践工坊
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">项目与作品</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                            将学习转化为实践，用代码和创意解决真实问题
                        </p>
                    </div>
                </FadeInUp>

                {/* 筛选按钮 */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setSelectedType(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === selectedType
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border text-foreground hover:border-primary/50"
                                }`}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>

                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <StaggerItem key={item.title}>
                            {item.type === "project" ? (
                                <ProjectCard project={item} />
                            ) : (
                                <VideoCard video={item} />
                            )}
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    )
}

// 项目卡片组件
function ProjectCard({ project }: { project: ProjectWork }) {
    const hasValidLink = project.status === "已上线" && project.link && isValidExternalUrl(project.link)
    const CardWrapper = hasValidLink ? "a" : "div"
    const wrapperProps = hasValidLink ? {
        href: project.link,
        target: "_blank",
        rel: "noopener noreferrer",
    } : {}

    return (
        <CardWrapper {...wrapperProps} className="block h-full">
            <Card className="neon-card h-full flex flex-col overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group cursor-pointer">
                {/* 封面图 */}
                <div className="relative aspect-video bg-muted">
                    {project.cover ? (
                        <Image
                            src={project.cover}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <span className="text-4xl">🛠️</span>
                        </div>
                    )}
                    {/* 状态标签 */}
                    <div className="absolute top-3 right-3">
                        <span
                            className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${project.status === "已上线"
                                ? "bg-green-500 text-white"
                                : project.status === "开发中"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-500 text-white"
                                }`}
                        >
                            {project.status}
                        </span>
                    </div>
                </div>

                {/* 项目信息 */}
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mt-3">
                        {project.description}
                    </p>

                    {/* 技术标签 */}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags?.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground rounded-full border border-border"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-primary text-sm font-medium mt-auto pt-4">
                        {project.status === "已上线" ? "查看详情" : "敬请期待"}
                        <ExternalLink className="w-4 h-4" />
                    </div>
                </div>
            </Card>
        </CardWrapper>
    )
}

// 视频卡片组件
function VideoCard({ video }: { video: VideoWork }) {
    const hasValidLink = video.link && isValidExternalUrl(video.link)

    // 如果链接无效，渲染为div而不是a标签
    if (!hasValidLink) {
        return (
            <div className="block h-full cursor-not-allowed opacity-75">
                <VideoCardContent video={video} />
            </div>
        )
    }

    return (
        <a
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
        >
            <VideoCardContent video={video} />
        </a>
    )
}

// 视频卡片内容组件
function VideoCardContent({ video }: { video: VideoWork }) {
    return (
        <Card className="neon-card h-full flex flex-col overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group cursor-pointer">
            {/* 视频封面 */}
            <div className="relative aspect-video bg-muted">
                {video.cover ? (
                    <Image
                        src={video.cover}
                        alt={video.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                )}
                {/* 播放按钮遮罩 */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                    </div>
                </div>
            </div>

            {/* 视频信息 */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {video.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mt-3">
                    {video.description}
                </p>

                {/* 平台标签 */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {video.platforms?.map((p) => (
                        <span
                            key={p}
                            className="text-xs px-3 py-1 bg-accent/20 text-accent rounded-full border border-accent/30"
                        >
                            {p}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-primary text-sm font-medium mt-auto pt-4">
                    点击观看
                    <ExternalLink className="w-4 h-4" />
                </div>
            </div>
        </Card>
    )
}
