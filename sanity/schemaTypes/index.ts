import { type SchemaTypeDefinition } from 'sanity'
import { articleType } from './article'
import { workType } from './work'
import { siteSettingsType } from './siteSettings'
import { aboutContentType } from './aboutContent'
import { navigationType } from './navigation'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    articleType,
    workType,
    siteSettingsType,
    aboutContentType,
    navigationType,
  ],
}
