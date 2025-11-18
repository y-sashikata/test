<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

const { data: newsEntries } = await useAsyncData<ParsedContent[]>(
  'news-list',
  () =>
    queryContent('news')
      .sort({ date: -1 })
      .find(),
  { default: () => [] }
)

const formatDate = (value?: string | Date) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <main class="news-page">
    <header class="news-page__header">
      <p class="eyebrow">News</p>
      <h1>お知らせ</h1>
      <p>Decap CMS で登録したニュースを日付の新しい順で表示しています。</p>
    </header>

    <ul v-if="newsEntries?.length" class="news-list">
      <li v-for="article in newsEntries" :key="article._path">
        <NuxtLink :to="article._path">{{ article.title }}</NuxtLink>
        <p class="news-list__meta">
          <time :datetime="article.date">{{ formatDate(article.date) }}</time>
        </p>
        <p>{{ article.description }}</p>
      </li>
    </ul>

    <p v-else class="news-empty">まだお知らせは登録されていません。</p>
  </main>
</template>

<style scoped>
.news-page {
  margin: 0 auto;
  max-width: 800px;
  padding: 3rem 1.5rem;
}

.news-page__header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.news-page__header h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.5rem);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
  color: #697077;
  margin: 0;
}

.news-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.news-list li {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
}

.news-list li a {
  font-size: 1.2rem;
  font-weight: 600;
  color: #065f46;
  text-decoration: none;
}

.news-list__meta {
  margin: 0.35rem 0 0.75rem;
  color: #6b7280;
  font-size: 0.95rem;
}

.news-empty {
  color: #6b7280;
}
</style>
