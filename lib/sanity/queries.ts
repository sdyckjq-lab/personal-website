/**
 * Sanity GROQ 查询集中管理
 * 所有查询语句统一在此定义，便于维护和复用
 */

// 文章查询
export const articleQueries = {
    // 获取所有文章列表
    list: `*[_type == "article"] | order(date desc) {
        title,
        "slug": slug.current,
        date,
        category,
        tags,
        excerpt
    }`,

    // 根据 slug 获取单篇文章
    bySlug: `*[_type == "article" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        date,
        category,
        tags,
        excerpt,
        body
    }`,
}

// 作品查询
export const workQueries = {
    // 获取所有作品
    list: `*[_type == "work"] | order(order asc) {
        "type": workType,
        title,
        description,
        link,
        status,
        tags,
        "cover": cover.asset->url,
        platforms,
        order
    }`,
}
