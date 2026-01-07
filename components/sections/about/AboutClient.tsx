"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, Twitter } from "lucide-react"
import type { AboutContent } from "@/lib/aboutContent"
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from "@/components/ui/motion"
import { isValidExternalUrl, getSafeHref } from "@/lib/utils"

interface AboutSectionClientProps {
  content: AboutContent
}

// 图标映射
const iconMap: Record<string, typeof Mail> = {
  email: Mail,
  github: Github,
  twitter: Twitter,
  wechat: Mail,
  xiaohongshu: Mail,
  bilibili: Mail,
}

// 安全渲染文本，将 **text** 转换为粗体
function renderTextWithBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2)
      return <strong key={index} className="text-foreground">{boldText}</strong>
    }
    return <span key={index}>{part}</span>
  })
}

export function AboutSectionClient({ content }: AboutSectionClientProps) {
  const prefersReducedMotion = useReducedMotion()

  const getHref = (platform: string, url: string): string | undefined => {
    if (platform === 'email') {
      return getSafeHref(url, 'email')
    }
    return isValidExternalUrl(url) ? url : undefined
  }

  const introParagraphs = content.introParagraphs ?? []
  const techStack = content.techStack ?? []
  const socialLinks = content.socialLinks ?? []

  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <FadeInUp>
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {content.sectionTitle || '关于我'}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              {content.sectionSubtitle || '一个热爱学习的普通人'}
            </h2>
          </div>
        </FadeInUp>

        <ScaleIn>
          <Card className="neon-card p-8 md:p-12 bg-card border border-border space-y-8 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <div className="space-y-4">
              {introParagraphs.map((para, index) => (
                <p
                  key={index}
                  className={
                    para?.isHighlight
                      ? "text-lg text-foreground leading-relaxed text-pretty"
                      : "text-muted-foreground leading-relaxed text-pretty"
                  }
                >
                  {renderTextWithBold(para?.text ?? '')}
                </p>
              ))}
            </div>

            {techStack.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-foreground">技术栈</h3>
                <StaggerContainer className="flex flex-wrap gap-3">
                  {techStack.map((tech) => (
                    <StaggerItem key={tech}>
                      <motion.span
                        className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )}

            {socialLinks.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-foreground">联系方式</h3>
                <StaggerContainer className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => {
                    const Icon = iconMap[link?.platform] || Mail
                    const href = getHref(link?.platform, link?.url)
                    
                    if (!href) return null
                    
                    return (
                      <StaggerItem key={link.platform}>
                        <motion.a
                          href={href}
                          target={link.platform === 'email' ? undefined : '_blank'}
                          rel={link.platform === 'email' ? undefined : 'noopener noreferrer'}
                          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                        >
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent border-border hover:border-primary hover:text-primary">
                            <Icon className="w-4 h-4" />
                            {link.label || link.platform}
                          </Button>
                        </motion.a>
                      </StaggerItem>
                    )
                  })}
                </StaggerContainer>
              </div>
            )}
          </Card>
        </ScaleIn>
      </div>
    </section>
  )
}
