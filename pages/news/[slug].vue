<script setup lang="ts">
import { queryCollection } from '#imports'

const route = useRoute()
const slugParam = route.params.slug
const articlePath = `/news/${Array.isArray(slugParam) ? slugParam.join('/') : slugParam}`

const { data: article } = await useAsyncData(
  () => queryCollection('news').path(articlePath).first(),
  { watch: [() => route.fullPath] }
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: '記事が見つかりませんでした' })
}

const formatDate = (value?: string | Date) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <main class="article-page">
    <article>
      <p class="article-page__meta">
        <NuxtLink class="article-page__back" to="/news">お知らせ一覧に戻る</NuxtLink>
        <time :datetime="article?.date">{{ formatDate(article?.date) }}</time>
      </p>
      <h1>{{ article?.title }}</h1>
      <ContentRenderer :value="article" />
    </article>
  </main>
</template>

<style scoped>
.article-page {
  margin: 0 auto;
  width: min(1100px, 100%);
  padding: 2rem 0 3rem;
}

.article-page h1 {
  margin: 0 0 0.5rem;
  font-size: clamp(2rem, 4vw, 2.75rem);
}

.article-page__meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: #6b7280;
}

.article-page__back {
  text-decoration: none;
  color: #059669;
}

:deep(h2) {
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

:deep(p) {
  line-height: 1.85;
  margin-bottom: 1rem;
}

:deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.25rem auto;
}

@media (max-width: 600px) {
  .article-page {
    padding: 2.5rem 1rem;
  }
}
</style>
