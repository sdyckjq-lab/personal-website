import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { ParticlesBackground } from "@/components/ui/particles-background"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI Journey - 36岁的代码与AI学习之旅",
  description: "记录一个36岁学习者的编程与AI探索之路，分享项目实践、学习笔记和成长思考",
  generator: "v0.app",
  keywords: ["AI学习", "编程", "Next.js", "个人成长", "技术博客"],
  authors: [{ name: "AI Journey" }],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ParticlesBackground />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
