import { defineContentConfig } from '@nuxt/content'
import { news } from './content/collections/news'
import { pages } from './content/collections/pages'

export default defineContentConfig({
  collections: {
    news,
    pages,
  },
})
