"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ExternalLink, Sparkles, Play } from "lucide-react"
import Image from "next/image"
import type { WorkItem, ProjectWork, VideoWork } from "@/lib/works"

type WorkType = "全部" | "项目" | "视频"

const categories: WorkType[] = ["全部", "项目", "视频"]

interface WorkshopSectionClientProps {
    works: WorkItem[]
}

export function WorkshopSectionClient({ works }: WorkshopSectionClientProps) {
    const [selectedType, setSelectedType] = useState<WorkType>("全部")



    const filteredItems = selectedType === "全部"
        ? works
        : works.filter(item =>
            selectedType === "项目" ? item.type === "project" : item.type === "video"
        )

    return (
        <section id="workshop" className="py-24 md:py-32 px-6">
            <div className="max-w-6xl mx-auto">
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

                {/* 筛选按钮 */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedType(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === selectedType
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border text-foreground hover:border-primary/50"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item, index) => (
                        item.type === "project" ? (
                            <ProjectCard key={index} project={item as ProjectWork} />
                        ) : (
                            <VideoCard key={index} video={item as VideoWork} />
                        )
                    ))}
                </div>
            </div>
        </section>
    )
}

// 项目卡片组件
function ProjectCard({ project }: { project: ProjectWork }) {
    const CardWrapper = project.status === "已上线" ? "a" : "div"
    const wrapperProps = project.status === "已上线" ? {
        href: project.link,
        target: "_blank",
        rel: "noopener noreferrer",
    } : {}

    return (
        <CardWrapper {...wrapperProps} className="block">
            <Card className="overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group cursor-pointer">
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
                <div className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {project.description}
                    </p>

                    {/* 技术标签 */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags?.map((tag, i) => (
                            <span
                                key={i}
                                className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground rounded-full border border-border"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2">
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
    return (
        <a
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
        >
            <Card className="overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group cursor-pointer">
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
                <div className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {video.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {video.description}
                    </p>

                    {/* 平台标签 */}
                    <div className="flex flex-wrap gap-2">
                        {video.platforms?.map((p, i) => (
                            <span
                                key={i}
                                className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded-full border border-red-200"
                            >
                                {p}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2">
                        点击观看
                        <ExternalLink className="w-4 h-4" />
                    </div>
                </div>
            </Card>
        </a>
    )
}
