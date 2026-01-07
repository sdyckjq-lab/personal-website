"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Heart } from "lucide-react"
import { FadeInUp } from "@/components/ui/motion"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const prefersReducedMotion = useReducedMotion()

  return (
    <footer className="py-12 px-6 bg-background border-t border-border/50 relative overflow-hidden">
      {/* 顶部霓虹渐变线 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <FadeInUp>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {currentYear} AI Journey</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                Made with{" "}
                <motion.span
                  animate={prefersReducedMotion ? {} : { 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <Heart className="w-4 h-4 text-accent fill-accent" />
                </motion.span>
                {" "}and curiosity
              </span>
            </div>

            <div className="flex items-center gap-6">
              {["GitHub", "Twitter", "邮箱联系"].map((text) => (
                <motion.a
                  key={text}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  {text}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              永远保持好奇心，永远在学习的路上 🚀
            </p>
          </div>
        </div>
      </FadeInUp>
    </footer>
  )
}
