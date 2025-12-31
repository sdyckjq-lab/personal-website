import { type SchemaTypeDefinition } from 'sanity'
import { articleType } from './article'
import { workType } from './work'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [articleType, workType],
}
