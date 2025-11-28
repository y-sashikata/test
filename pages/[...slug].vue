<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
const path = Array.isArray(slug) ? `/${slug.join('/')}` : `/${slug}`

const { data: page } = await useAsyncData(
  `page-${path}`,
  () => queryCollection('pages').path(path).first(),
  { watch: [() => path] }
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'ページが見つかりませんでした' })
}
</script>

<template>
  <main class="doc-page">
    <article>
      <ContentRenderer :value="page" />
    </article>
  </main>
</template>

<style scoped>
.doc-page {
  margin: 0 auto;
  max-width: 1100px;
  padding: 3rem 1.5rem;
}

.doc-page h1 {
  margin: 0 0 1rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
  color: #697077;
  margin-bottom: 0.5rem;
}

:deep(p) {
  line-height: 1.8;
  margin-bottom: 1rem;
}

:deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.25rem auto;
}
</style>
