"use client"

import { useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // 可选：将错误记录到监控服务
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-6"
      >
        {/* 错误图标 */}
        <motion.div
          animate={prefersReducedMotion ? {} : { 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center"
        >
          <AlertCircle className="w-10 h-10 text-destructive" />
        </motion.div>

        {/* 错误信息 */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">出错了</h1>
          <p className="text-muted-foreground">
            抱歉，页面遇到了一些问题。请尝试刷新页面或返回首页。
          </p>
        </div>

        {/* 错误详情 (仅开发环境) */}
        {process.env.NODE_ENV === "development" && (
          <div className="p-4 bg-card border border-border rounded-lg text-left">
            <p className="text-sm font-mono text-destructive break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            variant="default"
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            重试
          </Button>
          <Button
            onClick={() => window.location.href = "/"}
            variant="outline"
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            返回首页
          </Button>
        </div>

        {/* 装饰线 */}
        <div className="pt-6">
          <div className="h-1 w-20 mx-auto bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>
      </motion.div>
    </div>
  )
}
