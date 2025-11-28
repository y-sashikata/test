import { defineContentConfig } from "@nuxt/content"
import { nav } from "./content/collections/nav"
import { news } from "./content/collections/news"
import { pages } from "./content/collections/pages"

export default defineContentConfig({
  collections: { nav, news, pages },
})
