import { defineCollection, z } from '@nuxt/content'

export const nav = defineCollection({
  type: 'data',
  source: 'nav/**/*.json',
  schema: z.object({
    label: z.string(),
    to: z.string().optional(),
    order: z.number().default(0),
    children: z
      .array(
        z.object({
          label: z.string(),
          to: z.string(),
          order: z.number().default(0),
          children: z
            .array(
              z.object({
                label: z.string(),
                to: z.string(),
                order: z.number().default(0),
              })
            )
            .optional(),
        })
      )
      .optional(),
  }),
})
