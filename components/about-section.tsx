import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, Twitter } from "lucide-react"

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Playwright",
  "Grok API",
  "Supabase",
  "Vercel",
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            关于我
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">一个热爱学习的普通人</h2>
        </div>

        <Card className="p-8 md:p-12 bg-card border border-border space-y-8">
          <div className="space-y-4">
            <p className="text-lg text-foreground leading-relaxed text-pretty">
              你好！我是一名36岁的体制内"老登"（自嘲一下😄）。很高兴在这里遇见你。
            </p>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              过去的12年里，我一直是一名标准的体制内职员，过着朝九晚五、一眼望到头的生活。
              36岁这一年，面对AI技术的爆发式增长，我感受到了前所未有的焦虑——
              但更多的是<strong className="text-foreground">跃跃欲试的兴奋</strong>。
              我幻想着有一天，也能像各位大佬那样，成为一个真正的"超级个体"。
            </p>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              于是我决定不再等待。利用业余时间，我开始从零学习 Vibe Coding 和 AI 应用构建。
              我坚信，在这个<strong className="text-foreground">AI赋能个体的时代</strong>，
              年龄不再是限制，经验与新技术的结合将产生独特的价值。
            </p>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              如果你对独立开发、AI应用落地感兴趣，同时不嫌弃我这个新手菜鸟，欢迎与我交流！
              让我们一起在这条路上探索前行 🚀
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold text-foreground">技术栈</h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold text-foreground">联系方式</h3>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:sdyckjq@gmail.com">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Mail className="w-4 h-4" />
                  邮箱
                </Button>
              </a>
              <a href="https://github.com/sdyckjq-lab" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              </a>
              <a href="https://twitter.com/LocationCk" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
