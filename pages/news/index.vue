<script setup lang="ts">
import { queryCollection } from '#imports'
import type { ParsedContent } from '@nuxt/content'

const { data: newsEntries } = await useAsyncData<ParsedContent[]>(
  'news-list',
  () => queryCollection('news').order('date', 'DESC').all(),
  { default: () => [] }
)

const formatDate = (value?: string | Date) => {
  if (!value) return ''
  const date = new Date(value)
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}.${month}.${day}`
}
</script>

<template>
  <main class="release-page">
    <header class="release-hero">
      <p class="release-hero__eyebrow">NEWS RELEASE</p>
      <h1>ニュースリリース</h1>
    </header>

    <section class="release-panel">
      <div class="release-panel__label">NEWS RELEASE</div>
      <ul v-if="newsEntries?.length" class="release-list">
        <li v-for="article in newsEntries" :key="article._path">
          <time :datetime="article.date">{{ formatDate(article.date) }}</time>
          <NuxtLink :to="article._path">{{ article.title }}</NuxtLink>
        </li>
      </ul>
      <p v-else class="release-empty">現在表示できるニュースリリースはありません。</p>
    </section>
  </main>
</template>

<style scoped>
.release-page {
  margin: 0 auto;
  max-width: 920px;
  padding: 3rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.release-hero {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.release-hero h1 {
  margin: 0;
  font-size: clamp(2.2rem, 4vw, 2.8rem);
  letter-spacing: 0.05em;
}

.release-hero__eyebrow {
  font-size: 0.85rem;
  letter-spacing: 0.3em;
  color: #2563eb;
  margin: 0;
}

.release-hero__lead {
  margin: 0;
  color: #475467;
  line-height: 1.8;
}

.release-panel {
  border: 1px solid #dbe4ff;
  border-radius: 16px;
  background: linear-gradient(180deg, #f8fbff 0%, #fff 35%);
  padding: 0;
  overflow: hidden;
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
}

.release-panel__label {
  background: #1d4ed8;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.2em;
  padding: 0.85rem 1.5rem;
}

.release-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.release-list li {
  display: grid;
  grid-template-columns: minmax(140px, 180px) 1fr;
  gap: 1.5rem;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.release-list li:first-of-type {
  border-top-color: transparent;
}

.release-list time {
  font-size: 1rem;
  letter-spacing: 0.08em;
  color: #0f172a;
  font-weight: 600;
}

.release-list a {
  color: #0f172a;
  font-size: 1.05rem;
  text-decoration: none;
  line-height: 1.6;
}

.release-list a:hover {
  color: #2563eb;
  text-decoration: underline;
}

.release-empty {
  margin: 0;
  padding: 2rem 1.5rem;
  color: #64748b;
}

@media (max-width: 600px) {
  .release-list li {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .release-list time {
    font-size: 0.95rem;
  }
}
</style>
