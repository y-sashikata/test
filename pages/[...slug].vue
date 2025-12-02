<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
const path = Array.isArray(slug) ? `/${slug.join('/')}` : `/${slug}`

const { data: page } = await useAsyncData(
  () => `page-${route.fullPath}`, // パスごとにキー分離
  () => {
    const s = route.params.slug
    const p = Array.isArray(s) ? `/${s.join('/')}` : `/${s}`
    return queryCollection('pages').path(p).first()
  },
  { watch: [() => route.fullPath] }
)

const { data: breadcrumbs } = await useAsyncData(
  () => `crumbs-${route.fullPath}`,
  () => {
    const s = route.params.slug
    const p = Array.isArray(s) ? `/${s.join('/')}` : `/${s}`
    return useBreadcrumbs(p)
  },
  { watch: [() => route.fullPath] }
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'ページが見つかりませんでした' })
}
</script>

<template>
  <main class="doc-page">
    <article>
      <nav class="doc-breadcrumbs">
        <NuxtLink to="/">TOP</NuxtLink>
        <span v-if="breadcrumbs?.length"> &gt; </span>
        <template v-for="(crumb, index) in breadcrumbs" :key="crumb.to">
          <NuxtLink :to="crumb.to">{{ crumb.label }}</NuxtLink>
          <span v-if="index < breadcrumbs.length - 1"> &gt; </span>
        </template>
      </nav>
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

.doc-breadcrumbs {
  font-size: 0.9rem;
  color: #475569;
  margin: 0 0 0.75rem;
}

.doc-breadcrumbs :deep(a) {
  color: #0f766e;
  text-decoration: underline;
  text-underline-offset: 0.18em;
  text-decoration-thickness: 0.12em;
  font-weight: 600;
}

.doc-breadcrumbs :deep(a:hover) {
  color: #115e59;
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

:deep(a) {
  color: #0f766e;
  text-decoration: underline;
  text-decoration-thickness: 0.12em;
  text-underline-offset: 0.2em;
  font-weight: 600;
}

:deep(a:hover) {
  color: #115e59;
}
</style>
