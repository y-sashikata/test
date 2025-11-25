import { defineCollection, z } from '@nuxt/content'

export const news = defineCollection({
  type: 'page',
  source: 'news/**/*.{md,json,yml,yaml}',
  schema: z.object({
    title: z.string(),
    date: z.string(),
  }),
})
