"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  const scrollToWorkshop = () => {
    const element = document.getElementById("workshop")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
            36岁，开始我的
            <span className="text-primary block mt-2">AI与代码之旅</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            从零开始，记录每一步成长。用代码解决实际问题，用AI探索未来可能。 这是一个普通人的技术学习与实践之路。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={scrollToWorkshop}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            查看我的项目
          </Button>
          <Button
            onClick={() => {
              const element = document.getElementById("growth")
              element?.scrollIntoView({ behavior: "smooth" })
            }}
            size="lg"
            variant="outline"
            className="px-8"
          >
            阅读学习笔记
          </Button>
        </div>

        <div className="pt-12 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto" />
        </div>
      </div>
    </section>
  )
}
