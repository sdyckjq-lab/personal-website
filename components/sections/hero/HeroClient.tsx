"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import type { SiteSettings } from "@/lib/siteSettings"
import type { Easing } from "framer-motion"

interface HeroSectionClientProps {
  settings: SiteSettings
}

// 动画变体 - 使用正确的类型
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const easeOut: Easing = [0.16, 1, 0.3, 1]

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: easeOut }
  },
}

export function HeroSectionClient({ settings }: HeroSectionClientProps) {
  const prefersReducedMotion = useReducedMotion()
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  // 如果用户偏好减少动效，返回静态版本
  if (prefersReducedMotion) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              {settings.heroTitle}
              <span className="gradient-text block mt-2">{settings.heroHighlight}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              {settings.heroDescription}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => scrollToSection(settings.ctaPrimaryTarget)}
              size="lg"
              className="neon-button px-8 py-3 font-semibold"
            >
              {settings.ctaPrimaryText}
            </Button>
            <Button
              onClick={() => scrollToSection(settings.ctaSecondaryTarget)}
              size="lg"
              variant="outline"
              className="px-8 border-muted-foreground/30 hover:border-primary hover:text-primary"
            >
              {settings.ctaSecondaryText}
            </Button>
          </div>

          <div className="pt-12">
            <ArrowDown className="w-6 h-6 text-primary mx-auto animate-bounce" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* 背景渐变叠加层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center space-y-8 relative z-10"
      >
        <div className="space-y-6">
          {/* 主标题 */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance"
          >
            {settings.heroTitle}
            <motion.span 
              className="gradient-text block mt-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {settings.heroHighlight}
            </motion.span>
          </motion.h1>
          
          {/* 副标题 */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty"
          >
            {settings.heroDescription}
          </motion.p>
        </div>

        {/* CTA 按钮组 */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => scrollToSection(settings.ctaPrimaryTarget)}
              size="lg"
              className="neon-button px-8 py-3 font-semibold pulse-glow"
            >
              {settings.ctaPrimaryText}
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => scrollToSection(settings.ctaSecondaryTarget)}
              size="lg"
              variant="outline"
              className="px-8 border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors"
            >
              {settings.ctaSecondaryText}
            </Button>
          </motion.div>
        </motion.div>

        {/* 滚动指示器 */}
        <motion.div 
          variants={itemVariants}
          className="pt-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ArrowDown className="w-6 h-6 text-primary mx-auto" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
