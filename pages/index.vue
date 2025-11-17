<script setup lang="ts">
const { data: latestNews } = await useAsyncData('home-news', () =>
  queryContent('news')
    .sort({ date: -1 })
    .limit(3)
    .find()
)

const formatDate = (value?: string | Date) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('ja-JP')
}
</script>

<template>
  <main class="page">
    <section class="hero">
      <p class="eyebrow">Nuxt + Decap CMS</p>
      <h1>営業も触れる静的サイト基盤</h1>
      <p>
        Decap CMS でお知らせや固定ページを編集すると Git にコミットされ、Nuxt が静的ファイルを再生成して配信します。
      </p>
      <div class="hero__actions">
        <NuxtLink class="btn btn--primary" to="/news">お知らせ一覧へ</NuxtLink>
        <a class="btn" href="/admin" rel="noopener">管理画面（/admin）</a>
      </div>
    </section>

    <section v-if="latestNews?.length" class="latest-news">
      <header>
        <div>
          <p class="eyebrow">Latest</p>
          <h2>最新のお知らせ</h2>
        </div>
        <NuxtLink class="link" to="/news">すべて見る</NuxtLink>
      </header>
      <ul>
        <li v-for="article in latestNews" :key="article._path">
          <NuxtLink :to="article._path">{{ article.title }}</NuxtLink>
          <p class="latest-news__meta">{{ formatDate(article.date) }}</p>
          <p>{{ article.description }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.page {
  margin: 0 auto;
  max-width: 960px;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero h1 {
  font-size: clamp(2.2rem, 5vw, 3rem);
  margin: 0;
}

.hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  border: 1px solid #ccc;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  font-weight: 600;
}

.btn--primary {
  background: #059669;
  border-color: #059669;
  color: #fff;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
  color: #697077;
  margin: 0;
}

.latest-news header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}

.latest-news ul {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.latest-news li {
  padding: 1.25rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.latest-news li a {
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  color: #065f46;
}

.latest-news__meta {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0.25rem 0 0.5rem;
}

.link {
  color: #059669;
  text-decoration: none;
  font-weight: 600;
}
</style>
