"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import type { NavigationConfig } from "@/lib/navigation"
import { isValidExternalUrl } from "@/lib/utils"

interface NavigationClientProps {
  config: NavigationConfig
}

// 移动端菜单动画变体
const menuVariants = {
  closed: { opacity: 0, x: "100%" },
  open: { opacity: 1, x: 0 },
}

const menuItemVariants = {
  closed: { opacity: 0, x: 20 },
  open: { opacity: 1, x: 0 },
}

// 动画过渡配置
const menuTransition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }
const menuItemTransition = { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const }

export function NavigationClient({ config }: NavigationClientProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 锁定body滚动当移动菜单打开时
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleNavigation = (target: string, isExternal: boolean) => {
    if (isExternal) {
      if (isValidExternalUrl(target)) {
        window.open(target, '_blank', 'noopener,noreferrer')
      }
    } else {
      const element = document.getElementById(target)
      element?.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const menuItems = config.menuItems ?? []

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/90 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/5" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavigation("hero", false)}
              className="text-lg sm:text-xl font-bold neon-text"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              {config.siteName || 'AI Journey'}
            </motion.button>

            {/* 桌面端导航 */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.target}
                  onClick={() => handleNavigation(item.target, item.isExternal ?? false)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors relative group"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                  {/* 霓虹下划线效果 */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </div>

            {/* CTA 按钮 (桌面端) */}
            <div className="hidden md:block">
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <Button
                  onClick={() => handleNavigation("about", false)}
                  size="sm"
                  className="neon-button"
                >
                  联系我
                </Button>
              </motion.div>
            </div>

            {/* 移动端汉堡按钮 */}
            <motion.button
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
              aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* 移动端侧边菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* 侧边菜单 */}
            <motion.div
              variants={prefersReducedMotion ? undefined : menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={menuTransition}
              className="fixed top-0 right-0 bottom-0 w-72 bg-card border-l border-border z-50 md:hidden"
            >
              <div className="flex flex-col h-full pt-20 px-6">
                {/* 菜单项 */}
                <div className="flex flex-col gap-2">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.target}
                      variants={prefersReducedMotion ? undefined : menuItemVariants}
                      initial="closed"
                      animate="open"
                      transition={{ ...menuItemTransition, delay: index * 0.1 }}
                      onClick={() => handleNavigation(item.target, item.isExternal ?? false)}
                      className="text-left py-3 px-4 text-lg text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                {/* 分隔线 */}
                <div className="my-6 h-px bg-border" />

                {/* CTA 按钮 */}
                <motion.div
                  variants={prefersReducedMotion ? undefined : menuItemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ ...menuItemTransition, delay: menuItems.length * 0.1 }}
                >
                  <Button
                    onClick={() => handleNavigation("about", false)}
                    className="w-full neon-button py-3"
                    size="lg"
                  >
                    联系我
                  </Button>
                </motion.div>

                {/* 底部装饰 */}
                <div className="mt-auto pb-8">
                  <div className="h-1 w-20 mx-auto bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
