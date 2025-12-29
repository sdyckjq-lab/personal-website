import { getArticleBySlug, getArticles } from "@/lib/articles"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { PortableText } from "@portabletext/react"

interface ArticlePageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const articles = await getArticles()
    return articles
        .filter(article => article.slug)
        .map((article) => ({
            slug: article.slug,
        }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params
    const article = await getArticleBySlug(slug)

    if (!article) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-background">
            <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
                {/* 返回按钮 */}
                <Link
                    href="/#growth"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    返回文章列表
                </Link>

                {/* 文章头部 */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                        </span>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {article.category}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                        {article.title}
                    </h1>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {article.excerpt}
                    </p>

                    {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6">
                            {article.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="flex items-center gap-1 text-xs px-3 py-1 bg-muted/50 text-muted-foreground rounded-full border border-border"
                                >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                {/* 分隔线 */}
                <hr className="border-border mb-12" />

                {/* 文章正文 */}
                <div className="prose prose-lg max-w-none 
                    prose-headings:text-foreground 
                    prose-p:text-muted-foreground 
                    prose-strong:text-foreground
                    prose-blockquote:border-primary
                    prose-blockquote:text-muted-foreground
                    prose-code:text-primary
                    prose-code:bg-muted/50
                    prose-code:px-1.5
                    prose-code:py-0.5
                    prose-code:rounded
                    prose-a:text-primary
                    prose-a:no-underline
                    hover:prose-a:underline
                ">
                    {article.body ? (
                        <PortableText value={article.body} />
                    ) : (
                        <p className="text-muted-foreground italic">
                            文章正文暂未添加，请在 Sanity 后台编辑此文章的"正文"字段。
                        </p>
                    )}
                </div>

                {/* 底部返回 */}
                <div className="mt-16 pt-8 border-t border-border">
                    <Link
                        href="/#growth"
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        返回文章列表
                    </Link>
                </div>
            </article>
        </main>
    )
}
