<script setup lang="ts">
import { queryCollection } from '#imports'
import type { ParsedContent } from '@nuxt/content'

type NewsEntry = ParsedContent & { path: string }

const { data: newsEntries } = await useAsyncData<NewsEntry[]>(
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
    <header class="release-header">
      <h1>ニュースリリース</h1>
    </header>

    <ul v-if="newsEntries?.length" class="release-list">
      <li v-for="article in newsEntries" :key="article.path">
        <NuxtLink class="release-item" :to="article.path">
          <time :datetime="article.date">{{ formatDate(article.date) }}</time>
          <span class="release-item__title">{{ article.title }}</span>
        </NuxtLink>
      </li>
    </ul>
    <p v-else class="release-empty">現在表示できるニュースリリースはありません。</p>
  </main>
</template>

<style scoped>
.release-page {
  margin: 0 auto;
  width: min(1100px, 100%);
  padding: 2rem 1rem 3rem;
}

.release-header h1 {
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2.2rem);
  border-bottom: 2px solid #1d4ed8;
  padding-bottom: 0.6rem;
  text-align: left;
}

.release-list {
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e5e7eb;
}

.release-list li {
  list-style: none;
}

.release-item {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid #e5e7eb;
  text-decoration: none;
  color: #111827;
  transition: color 0.2s ease;
}

.release-item:hover,
.release-item:focus-visible {
  color: #1d4ed8;
}

.release-item time {
  flex-shrink: 0;
  min-width: 130px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: currentColor;
}

.release-item__title {
  flex: 1;
  line-height: 1.7;
}

.release-item__icon {
  font-size: 1.1rem;
  color: currentColor;
}

.release-empty {
  margin: 2rem 0 0;
  color: #64748b;
}

@media (max-width: 600px) {
  .release-page {
    padding: 2.5rem 1rem;
  }

  .release-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .release-item time {
    min-width: auto;
    font-size: 0.95rem;
  }

  .release-item__icon {
    display: none;
  }
}
</style>
