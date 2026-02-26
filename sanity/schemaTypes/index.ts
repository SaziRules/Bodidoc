import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './post'
import { productType } from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, productType],
}