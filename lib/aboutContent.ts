import { sanityFetch, aboutContentQueries } from "@/lib/sanity"

export interface IntroParagraph {
    text: string
    isHighlight: boolean
}

export interface SocialLink {
    platform: 'email' | 'github' | 'twitter' | 'wechat' | 'xiaohongshu' | 'bilibili'
    url: string
    label: string
}

export interface AboutContent {
    sectionTitle: string
    sectionSubtitle: string
    introParagraphs: IntroParagraph[]
    techStack: string[]
    socialLinks: SocialLink[]
}

// 默认值（当CMS无数据时使用）
const defaultAboutContent: AboutContent = {
    sectionTitle: "关于我",
    sectionSubtitle: "一个热爱学习的普通人",
    introParagraphs: [
        {
            text: "你好！我是一名36岁的体制内\"老登\"（自嘲一下😄）。很高兴在这里遇见你。",
            isHighlight: true,
        },
        {
            text: "过去的12年里，我一直是一名标准的体制内职员，过着朝九晚五、一眼望到头的生活。36岁这一年，面对AI技术的爆发式增长，我感受到了前所未有的焦虑——但更多的是跃跃欲试的兴奋。我幻想着有一天，也能像各位大佬那样，成为一个真正的\"超级个体\"。",
            isHighlight: false,
        },
        {
            text: "于是我决定不再等待。利用业余时间，我开始从零学习 Vibe Coding 和 AI 应用构建。我坚信，在这个AI赋能个体的时代，年龄不再是限制，经验与新技术的结合将产生独特的价值。",
            isHighlight: false,
        },
        {
            text: "如果你对独立开发、AI应用落地感兴趣，同时不嫌弃我这个新手菜鸟，欢迎与我交流！让我们一起在这条路上探索前行 🚀",
            isHighlight: false,
        },
    ],
    techStack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Playwright",
        "Grok API",
        "Supabase",
        "Vercel",
    ],
    socialLinks: [
        { platform: "email", url: "sdyckjq@gmail.com", label: "邮箱" },
        { platform: "github", url: "https://github.com/sdyckjq-lab", label: "GitHub" },
        { platform: "twitter", url: "https://twitter.com/LocationCk", label: "Twitter" },
    ],
}

/**
 * 获取关于我内容
 */
export async function getAboutContent(): Promise<AboutContent> {
    const content = await sanityFetch<AboutContent>(aboutContentQueries.get)
    return content ?? defaultAboutContent
}
