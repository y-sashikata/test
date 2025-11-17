<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
const path = Array.isArray(slug) ? `/${slug.join('/')}` : `/${slug}`

const { data: page } = await useAsyncData(
  () =>
    queryContent()
      .where({ _path: path })
      .findOne(),
  { watch: [() => route.fullPath] }
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'ページが見つかりませんでした' })
}
</script>

<template>
  <main class="doc-page">
    <article>
      <p class="eyebrow">Page</p>
      <h1>{{ page?.title }}</h1>
      <ContentRenderer :value="page" />
    </article>
  </main>
</template>

<style scoped>
.doc-page {
  margin: 0 auto;
  max-width: 760px;
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
</style>
