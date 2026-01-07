import { defineField, defineType } from 'sanity'

export const navigationType = defineType({
    name: 'navigation',
    title: '导航配置',
    type: 'document',
    fields: [
        defineField({
            name: 'siteName',
            title: '站点名称',
            type: 'string',
            description: '显示在导航栏的网站名称',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'menuItems',
            title: '导航菜单',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: '显示文字',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'target',
                            title: '跳转目标',
                            type: 'string',
                            description: '页面内锚点ID（如 workshop）或完整URL',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'isExternal',
                            title: '是否外部链接',
                            type: 'boolean',
                            initialValue: false,
                        }),
                    ],
                    preview: {
                        select: { label: 'label', target: 'target' },
                        prepare({ label, target }) {
                            return {
                                title: label,
                                subtitle: `→ ${target}`,
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
                title: '导航配置',
                subtitle: '菜单项管理',
            }
        },
    },
})
