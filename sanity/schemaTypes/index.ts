import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './post'
import { productType } from './product'
import rangePage from './rangePage'
import heroSlider from './heroSlider'
import { competitionType } from './competition'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, productType, rangePage, heroSlider, competitionType],
}