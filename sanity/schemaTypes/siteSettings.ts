import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
    name: 'siteSettings',
    title: '站点设置',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero 主标题',
            type: 'string',
            description: '首页大标题，如"36岁，开始我的"',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'heroHighlight',
            title: 'Hero 高亮文字',
            type: 'string',
            description: '主标题下方高亮部分，如"AI与代码之旅"',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'heroDescription',
            title: 'Hero 描述',
            type: 'text',
            rows: 3,
            description: '首页副标题描述文字',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'ctaPrimaryText',
            title: '主按钮文字',
            type: 'string',
            description: '如"查看我的项目"',
            initialValue: '查看我的项目',
        }),
        defineField({
            name: 'ctaPrimaryTarget',
            title: '主按钮跳转目标',
            type: 'string',
            description: '页面内锚点ID，如 workshop',
            initialValue: 'workshop',
        }),
        defineField({
            name: 'ctaSecondaryText',
            title: '次按钮文字',
            type: 'string',
            description: '如"阅读学习笔记"',
            initialValue: '阅读学习笔记',
        }),
        defineField({
            name: 'ctaSecondaryTarget',
            title: '次按钮跳转目标',
            type: 'string',
            description: '页面内锚点ID，如 growth',
            initialValue: 'growth',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: '站点设置',
                subtitle: 'Hero区域内容配置',
            }
        },
    },
})
