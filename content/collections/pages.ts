import { defineCollection, z } from '@nuxt/content'

export const pages = defineCollection({
  type: 'page',
  source: 'pages/**/*.{md,json,yml,yaml}',
  schema: z.object({
    title: z.string(),
    path: z.string(),
  }),
})
