"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ExternalLink, Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { WorkItem, ProjectWork, VideoWork } from "@/lib/works"

type WorkType = "全部" | "项目" | "视频"

const categories: WorkType[] = ["全部", "项目", "视频"]

interface WorkshopSectionClientProps {
    works: WorkItem[]
}

export function WorkshopSectionClient({ works }: WorkshopSectionClientProps) {
    const [selectedType, setSelectedType] = useState<WorkType>("全部")

    // 调试：打印收到的数据
    console.log("Works received in client:", works)

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
    return (
        <Card className="p-6 bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${project.status === "已上线"
                            ? "bg-green-100 text-green-700"
                            : project.status === "开发中"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {project.status}
                    </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

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

                {project.status === "已上线" ? (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-center gap-2 text-primary hover:text-primary hover:bg-primary/10"
                        >
                            查看详情
                            <ExternalLink className="w-4 h-4" />
                        </Button>
                    </a>
                ) : (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-center gap-2 text-primary hover:text-primary hover:bg-primary/10"
                        disabled
                    >
                        查看详情
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                )}
            </div>
        </Card>
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
