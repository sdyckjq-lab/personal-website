import { defineField, defineType } from 'sanity'

export const aboutContentType = defineType({
    name: 'aboutContent',
    title: '关于我',
    type: 'document',
    fields: [
        defineField({
            name: 'sectionTitle',
            title: '板块标题',
            type: 'string',
            description: '如"关于我"',
            initialValue: '关于我',
        }),
        defineField({
            name: 'sectionSubtitle',
            title: '板块副标题',
            type: 'string',
            description: '如"一个热爱学习的普通人"',
            initialValue: '一个热爱学习的普通人',
        }),
        defineField({
            name: 'introParagraphs',
            title: '自我介绍段落',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'text',
                            title: '段落内容',
                            type: 'text',
                            rows: 4,
                        }),
                        defineField({
                            name: 'isHighlight',
                            title: '是否为首段（大字）',
                            type: 'boolean',
                            initialValue: false,
                        }),
                    ],
                    preview: {
                        select: { text: 'text' },
                        prepare({ text }) {
                            return {
                                title: text?.substring(0, 50) + '...',
                            }
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'techStack',
            title: '技术栈',
            type: 'array',
            of: [{ type: 'string' }],
            description: '添加你使用的技术，如 Next.js, React, TypeScript 等',
        }),
        defineField({
            name: 'socialLinks',
            title: '社交链接',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: '平台',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '邮箱', value: 'email' },
                                    { title: 'GitHub', value: 'github' },
                                    { title: 'Twitter', value: 'twitter' },
                                    { title: '微信', value: 'wechat' },
                                    { title: '小红书', value: 'xiaohongshu' },
                                    { title: 'B站', value: 'bilibili' },
                                ],
                            },
                        }),
                        defineField({
                            name: 'url',
                            title: '链接',
                            type: 'string',
                            description: '邮箱填邮箱地址，其他填完整URL',
                        }),
                        defineField({
                            name: 'label',
                            title: '显示文字',
                            type: 'string',
                            description: '按钮上显示的文字',
                        }),
                    ],
                    preview: {
                        select: { platform: 'platform', label: 'label' },
                        prepare({ platform, label }) {
                            return {
                                title: label || platform,
                            }
                        },
                    },
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: '关于我',
                subtitle: '个人介绍内容配置',
            }
        },
    },
})
