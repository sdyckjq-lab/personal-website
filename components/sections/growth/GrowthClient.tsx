"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Calendar, Tag } from "lucide-react"
import type { Article } from "@/lib/articles"

const categories = ["全部", "学习笔记", "项目复盘", "资源收集"]

interface GrowthSectionClientProps {
    articles: Article[]
}

export function GrowthSectionClient({ articles }: GrowthSectionClientProps) {
    const [selectedCategory, setSelectedCategory] = useState("全部")

    const filteredArticles = selectedCategory === "全部"
        ? articles
        : articles.filter(article => article.category === selectedCategory)

    return (
        <section id="growth" className="py-24 md:py-32 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        成长轨迹
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">学习与思考</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                        记录每一步成长，分享学习经验与项目心得
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === selectedCategory
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border text-foreground hover:border-primary/50"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {filteredArticles.map((article, index) => (
                        <Link
                            key={index}
                            href={article.slug ? `/article/${article.slug}` : "#"}
                            className="block"
                        >
                            <Card
                                className="p-6 bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group cursor-pointer h-full"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {article.date}
                                        </span>
                                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                            {article.category}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug text-balance">
                                        {article.title}
                                    </h3>

                                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                                        {article.excerpt && article.excerpt.length > 100
                                            ? `${article.excerpt.slice(0, 100)}...`
                                            : article.excerpt}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {article.tags?.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="flex items-center gap-1 text-xs px-3 py-1 bg-muted/50 text-muted-foreground rounded-full border border-border"
                                            >
                                                <Tag className="w-3 h-3" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
