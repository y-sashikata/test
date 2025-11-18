<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'
const navLinks = [
  { label: 'サービス', to: '/pages/service' },
  { label: '導入事例', to: '/pages/case' },
  { label: 'ブログ', to: '/news' },
  { label: 'お問い合わせ', to: '/contact' },
]

type Slide = {
  title: string
  caption: string
  image: string
}

const slides: Slide[] = [
  {
    title: 'テストイメージ１',
    caption: 'あああああああああああああああああ',
    image: '/images/img1.jpeg',
  },
  {
    title: 'テストイメージ２',
    caption: 'いいいいいいいいいいいいいいいいいいいいいい',
    image: '/images/img2.jpeg',
  },
  {
    title: 'テストイメージ３',
    caption: 'うううううううううううううううううううううううううううううううううう',
    image: '/images/img3.jpeg',
  },
]

const isMenuOpen = ref(false)
const activeSlide = ref(0)
const slideInterval = 4500
let slideTimer: ReturnType<typeof setInterval> | null = null

const startSlider = () => {
  stopSlider()
  slideTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % slides.length
  }, slideInterval)
}

const stopSlider = () => {
  if (slideTimer) {
    clearInterval(slideTimer)
    slideTimer = null
  }
}

const goToSlide = (index: number) => {
  activeSlide.value = index
}

onMounted(() => {
  startSlider()
})

onBeforeUnmount(() => {
  stopSlider()
})

const { data: latestNews } = await useAsyncData<ParsedContent[]>(
  'home-news',
  () =>
    queryContent('news')
      .sort({ date: -1 })
      .limit(3)
      .find(),
  { default: () => [] }
)

const formatDate = (value?: string | Date) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('ja-JP')
}
</script>

<template>
  <main class="home">


    <section class="hero-visual">
      <div class="hero__carousel" @mouseenter="stopSlider" @mouseleave="startSlider">
        <ul class="carousel__track" :style="{ transform: `translateX(-${activeSlide * 100}%)` }">
          <li v-for="slide in slides" :key="slide.title" class="carousel__item">
            <img :src="slide.image" :alt="slide.title" loading="lazy" />
            <div class="carousel__caption">
              <h3>{{ slide.title }}</h3>
              <p>{{ slide.caption }}</p>
            </div>
          </li>
        </ul>
        <div class="carousel__dots">
          <button
            v-for="(slide, index) in slides"
            :key="slide.title"
            type="button"
            :class="['carousel__dot', { active: index === activeSlide }]"
            aria-label="スライド切替"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>
    </section>

    <section class="latest-news">
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
    <section class="sections">
      <article>
        <p class="eyebrow">ううううう</p>
        <h2>テストテスト</h2>
        <p>てすとてすとてすとてすと</p>
      </article>
      <article>
        <p class="eyebrow"></p>
        <h2>testtest</h2>
        <p>あああああああああああああああああああああああああああああああああああああ</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.home {
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 20;
  background: #f9fafb;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.header__logo {
  font-weight: 700;
  text-decoration: none;
  font-size: 1.1rem;
  color: #111827;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.header__link {
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
}

.header__cta {
  margin-left: 0.5rem;
}

.header__toggle {
  display: none;
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: transparent;
}

.header__toggle span,
.header__toggle span::before,
.header__toggle span::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 2px;
  background: #111827;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.3s;
}

.header__toggle span {
  top: 50%;
}

.header__toggle span::before {
  top: -6px;
}

.header__toggle span::after {
  top: 6px;
}

.header__toggle span.open {
  background: transparent;
}

.header__toggle span.open::before {
  transform: translate(-50%, 6px) rotate(45deg);
}

.header__toggle span.open::after {
  transform: translate(-50%, -6px) rotate(-45deg);
}

.hero-visual {
  margin-top: 0.5rem;
}

.hero__carousel {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.15);
}

.carousel__track {
  display: flex;
  transition: transform 0.6s ease;
}

.carousel__item {
  min-width: 100%;
  position: relative;
}

.carousel__item img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
}

.carousel__caption {
  position: absolute;
  left: 1.5rem;
  right: 1.5rem;
  bottom: 1.25rem;
  background: rgba(15, 23, 42, 0.7);
  color: #fff;
  border-radius: 12px;
  padding: 1rem;
}

.carousel__caption h3 {
  margin: 0 0 0.35rem;
  font-size: 1.1rem;
}

.carousel__dots {
  position: absolute;
  left: 50%;
  bottom: 0.75rem;
  transform: translateX(-50%);
  display: flex;
  gap: 0.4rem;
}

.carousel__dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  border: 0;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.carousel__dot.active {
  background: #10b981;
}

.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  align-items: center;
}

.hero--info {
  padding-top: 0;
}

.hero h1 {
  font-size: clamp(2.2rem, 5vw, 3rem);
  margin: 0;
}

.hero__lead {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #4b5563;
}

.hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.sections article {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  background: #f8fafc;
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

.btn--ghost {
  border-color: #d1d5db;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
  color: #697077;
  margin: 0 0 0.35rem;
}

.latest-news {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 2rem;
  background: #fff;
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

@media (max-width: 768px) {
  .home {
    padding-top: 0;
  }

  .header__nav {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    width: min(280px, 90vw);
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: 0.2s ease;
  }

  .header__nav--open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .header__toggle {
    display: block;
  }
}
</style>
