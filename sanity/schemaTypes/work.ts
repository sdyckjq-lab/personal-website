import { defineField, defineType } from 'sanity'

export const workType = defineType({
    name: 'work',
    title: '作品管理',
    type: 'document',
    fields: [
        defineField({
            name: 'workType',
            title: '作品类型',
            type: 'string',
            options: {
                list: [
                    { title: '项目/工具', value: 'project' },
                    { title: '视频作品', value: 'video' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'title',
            title: '标题',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: '描述',
            type: 'text',
            rows: 3,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'link',
            title: '链接',
            type: 'url',
            description: '项目GitHub链接 或 视频播放链接',
            validation: (rule) => rule.required(),
        }),
        // 项目专用字段
        defineField({
            name: 'status',
            title: '项目状态',
            type: 'string',
            options: {
                list: [
                    { title: '已上线', value: '已上线' },
                    { title: '开发中', value: '开发中' },
                    { title: '规划中', value: '规划中' },
                ],
            },
            hidden: ({ document }) => document?.workType !== 'project',
        }),
        defineField({
            name: 'tags',
            title: '技术标签',
            type: 'array',
            of: [{ type: 'string' }],
            hidden: ({ document }) => document?.workType !== 'project',
        }),
        // 封面图（项目和视频都可以上传）
        defineField({
            name: 'cover',
            title: '封面图',
            type: 'image',
            description: '项目截图或视频封面，建议16:9比例',
            options: { hotspot: true },
        }),
        defineField({
            name: 'platforms',
            title: '发布平台',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: '小红书', value: '小红书' },
                    { title: '抖音', value: '抖音' },
                    { title: 'B站', value: 'B站' },
                    { title: 'YouTube', value: 'YouTube' },
                ],
            },
            hidden: ({ document }) => document?.workType !== 'video',
        }),
        defineField({
            name: 'order',
            title: '排序',
            type: 'number',
            description: '数字越小越靠前',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            workType: 'workType',
            media: 'cover',
        },
        prepare({ title, workType, media }) {
            return {
                title,
                subtitle: workType === 'project' ? '🛠️ 项目' : '🎬 视频',
                media,
            }
        },
    },
})
