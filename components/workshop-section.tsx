import { Card } from "@/components/ui/card"
import { ExternalLink, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Twitter Hunter",
    description: "基于Grok API和Playwright开发的Twitter热点监控工具，实时追踪热门话题和趋势，自动化内容分析。",
    tags: ["Grok API", "Playwright", "Next.js"],
    status: "已上线",
    link: "https://github.com/sdyckjq-lab/Twitter-Hunte",
  },
  {
    title: "项目工具 #2",
    description: "即将推出的新工具，敬请期待。专注于提升工作效率和自动化流程。",
    tags: ["AI", "Automation"],
    status: "开发中",
    link: "#",
  },
  {
    title: "项目工具 #3",
    description: "更多创意项目正在酝酿中，持续探索AI在实际场景中的应用价值。",
    tags: ["Coming Soon"],
    status: "规划中",
    link: "#",
  },
]

export function WorkshopSection() {
  return (
    <section id="workshop" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            实践工坊
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">项目与工具</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            将学习转化为实践，用代码解决真实问题
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="p-6 bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
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
                  {project.tags.map((tag, i) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}
