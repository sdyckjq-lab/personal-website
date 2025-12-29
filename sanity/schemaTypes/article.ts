import { defineField, defineType } from 'sanity'

export const articleType = defineType({
    name: 'article',
    title: '学习笔记',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: '标题',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL标识',
            type: 'slug',
            description: '用于生成文章链接，点击右侧按钮自动生成',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'date',
            title: '日期',
            type: 'date',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: '分类',
            type: 'string',
            options: {
                list: [
                    { title: '学习笔记', value: '学习笔记' },
                    { title: '项目复盘', value: '项目复盘' },
                    { title: '资源收集', value: '资源收集' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'tags',
            title: '标签',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'excerpt',
            title: '摘要',
            type: 'text',
            description: '简短的文章导语（1-2句话）',
            rows: 3,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'body',
            title: '正文',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: '正文', value: 'normal' },
                        { title: '标题1', value: 'h1' },
                        { title: '标题2', value: 'h2' },
                        { title: '标题3', value: 'h3' },
                        { title: '引用', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: '粗体', value: 'strong' },
                            { title: '斜体', value: 'em' },
                            { title: '下划线', value: 'underline' },
                            { title: '删除线', value: 'strike-through' },
                            { title: '代码', value: 'code' },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            category: 'category',
            date: 'date',
        },
        prepare({ title, category, date }) {
            return {
                title,
                subtitle: `${category} · ${date}`,
            }
        },
    },
})
