"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            AI Journey
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              首页
            </button>
            <button
              onClick={() => scrollToSection("workshop")}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              实践工坊
            </button>
            <button
              onClick={() => scrollToSection("growth")}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              成长轨迹
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              关于我
            </button>
          </div>

          <Button
            onClick={() => scrollToSection("about")}
            variant="default"
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            联系我
          </Button>
        </div>
      </div>
    </nav>
  )
}
