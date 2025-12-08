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
  link?: string
}

const slides: Slide[] = [
  {
    title: '',
    caption: '株式会社ディーソルはデータソリューションカンパニーです。ITと紙の「ハイブリッドDX」を提案します。',
    image: '/images/img_main_50th-1.png',
    link: '',
  },
  {
    title: '',
    caption: '社会に優しい信頼される企業を目指します。 地球環境への負担を低減し、持続可能な社会の貢献をいたします。',
    image: '/images/img2.jpeg',
    link: '',
  },
  {
    title: '',
    caption: 'オリジナル紙製ホルダー専門ECサイト「プレコオンラインオーダー」はじめました！',
    image: '/images/HPクリアプレコ_20240722_2_2.png',
    link: 'https://clearprieco.d2sol.co.jp/',
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

const promos = [
  {
    badge: 'IT SOLUTION',
    title: 'WDSシステム',
    campaign: '6ヵ月無料キャンペーン実施中！！',
    deadline: '※2025年11月申し込み限り',
    description: ['シンプルで操作簡単なWEB請求書システムです。', 'コストダウン（郵送料・事務コスト）', 'スピード向上', '人的ミス削減', '受信側も登録ができる'],
    highlight: '好評につき、スマホ対応版を公開しました',
    image: '/images/WDS_PCと請求書_20251029_small.png',
    theme: 'blue',
  },
  {
    badge: 'PAPER SUPPLY',
    title: 'クリアプレコ',
    campaign: 'サンプル無料配布中！！',
    description: [
      'クリアプレコは、100%紙製のクリアホルダーです。',
      '環境にやさしく、耐水性と強度、半透明がきれいに際立つ製品です。A4、A5、B6サイズを用意しました。会社ロゴを印刷したオリジナルをお送りします。お問い合わせよりお申込みください。',
    ],
    image: '/images/HPクリアプレコ_20240722_2_2.png',
    theme: 'green',
  },
  {
    badge: 'IT SOLUTION',
    title: 'スマホ発注WEB（EOSサービス）',
    description: [
      '直感的に使える簡単操作',
      'いつでもどこでも注文可能',
      '受注作業にかかる作業時間削減',
      '注文受付時間の大幅延長',
      '専用サーバーなどの設備要件なし',
      'バーコード(JAN)読み取り 新機能2024年6月～',
    ],
    image: '/images/EOSスマホ_調整.png',
    theme: 'blue',
  },
  {
    badge: 'IT SOLUTION',
    title: '紙を捨てないDX',
    description: [
      '自治体DXへのご提案',
      '行政業務が抱える課題',
      'ティーソルの特徴と強み',
      'ティーソルが提供する解決策例',
      '導入事例（例）',
      'システム連携・構成（例）',
      '今後の展望',
      'まとめ',
    ],
    image: '/images/紙を捨てないDXサークル図-300x232.png',
    theme: 'blue',
  },
  {
    badge: 'IT SOLUTION',
    title: '',
    description: [
      '「入力」「開発」「処理」「出力」サービスを提供します。',
      '全国の自社センターをセキュリティ通信網で結び、一連の流れを実現しました。',
    ],
    image: '',
    theme: 'blue',
  },
  {
    badge: 'PAPER SUPPLY',
    title: '',
    description: [
      '情報媒体としての製品を自社の生産ラインで製造しています。使用目的に応じて、大量から少量まで、柔軟に対応いたします。感圧紙、特殊紙加工、製本など印刷にかかわるもの全般を提供します。',
    ],
    image: '',
    theme: 'green',
  },
]
</script>

<template>
  <main class="home">
    <section class="hero-visual">
        <div class="hero__carousel" @mouseenter="stopSlider" @mouseleave="startSlider">
          <ul class="carousel__track" :style="{ transform: `translateX(-${activeSlide * 100}%)` }">
            <li v-for="slide in slides" :key="slide.title + slide.image" class="carousel__item">
              <NuxtLink
                v-if="slide.link"
                class="carousel__link"
                :to="slide.link"
                @click="stopSlider"
              >
                <img :src="slide.image" :alt="slide.title" loading="lazy" />
                <div class="carousel__caption">
                  <h3>{{ slide.title }}</h3>
                  <p>{{ slide.caption }}</p>
                </div>
              </NuxtLink>
              <div v-else class="carousel__link">
                <img :src="slide.image" :alt="slide.title" loading="lazy" />
                <div class="carousel__caption">
                  <h3>{{ slide.title }}</h3>
                  <p>{{ slide.caption }}</p>
                </div>
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

    <section class="promos">
      <article v-for="promo in promos" :key="promo.title" class="promo-card" :class="`promo-card--${promo.theme}`">
        <div class="promo-card__content">
          <p class="promo-card__badge">{{ promo.badge }}</p>
          <div class="promo-card__heading">
            <h3>{{ promo.title }}</h3>
            <div v-if="promo.campaign" class="promo-card__campaign">
              <span>{{ promo.campaign }}</span>
              <small v-if="promo.deadline">{{ promo.deadline }}</small>
            </div>
          </div>
          <ul class="promo-card__list">
            <li v-for="line in promo.description" :key="line">{{ line }}</li>
          </ul>
          <p v-if="promo.highlight" class="promo-card__highlight">{{ promo.highlight }}</p>
        </div>
        <div class="promo-card__image">
          <img :src="promo.image" :alt="promo.title" />
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.home {
  margin: 0 auto;
  max-width: 1100px;
  padding: 1.5rem 1.75rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
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
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 0 1rem;
}

.hero__shell {
  width: min(1200px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 2rem;
  align-items: center;
  padding: 1rem 0 0;
}

.hero__copy {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.hero__eyebrow {
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  color: #0f766e;
  margin: 0;
}

.hero__copy h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
  letter-spacing: -0.01em;
  color: #0f172a;
}

.hero__lead {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #334155;
  margin: 0;
}

.hero__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1.1rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #0f766e, #0ea5e9);
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  box-shadow: 0 14px 30px rgba(14, 133, 123, 0.25);
}

.hero__btn--ghost {
  background: transparent;
  color: #0f172a;
  border: 1px solid #cbd5e1;
  box-shadow: none;
}

.hero__carousel {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.14);
  background: linear-gradient(135deg, rgba(15, 55, 147, 0.12), rgba(16, 185, 129, 0.12));
}

.carousel__track {
  display: flex;
  transition: transform 0.6s ease;
}

.carousel__item {
  flex: 0 0 100vw;
  min-width: 100vw;
  position: relative;
}

.carousel__link {
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
  position: relative;
  isolation: isolate;
}

.carousel__item img {
  width: 100%;
  height: 520px;
  object-fit: cover;
  object-position: center;
  display: block;
  filter: saturate(1.05);
}

.carousel__caption {
  position: absolute;
  left: 3rem;
  right: 3rem;
  bottom: 2rem;
  background: rgba(15, 23, 42, 0.72);
  color: #fff;
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  backdrop-filter: blur(8px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.18);
}

.carousel__caption h3 {
  margin: 0 0 0.45rem;
  font-size: 1.2rem;
  letter-spacing: 0.01em;
}

.carousel__dots {
  position: absolute;
  left: 50%;
  bottom: 1.1rem;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.carousel__dot {
  width: 28px;
  height: 8px;
  border-radius: 999px;
  border: 0;
  background: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition: background 0.2s ease, width 0.2s ease;
}

.carousel__dot.active {
  background: #10b981;
  width: 44px;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.quick-card {
  background: #fff;
  border-radius: 18px;
  padding: 1.4rem 1.6rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.quick-card__eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  color: #0f766e;
  margin: 0;
}

.quick-card h3 {
  margin: 0;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
  color: #0f172a;
}

.quick-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #0f766e;
  text-decoration: none;
  font-weight: 700;
}

.quick-card__cta::after {
  content: '→';
  font-size: 0.9rem;
  color: inherit;
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

.promos {
  display: flex;
  flex-direction: column;
  gap: 2.75rem;
}

.promo-card {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.5rem;
  border-radius: 28px;
  padding: 2.25rem;
  color: #0f172a;
  background: #fff;
  box-shadow: 0 24px 50px rgba(15, 23, 42, 0.12);
  border: 1px solid #e5e7eb;
}

.promo-card__badge {
  display: inline-block;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin: 0 0 0.35rem;
  color: #0f766e;
  background: rgba(16, 185, 129, 0.12);
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
}

.promo-card__heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.promo-card__heading h3 {
  margin: 0;
  font-size: 1.8rem;
  letter-spacing: -0.01em;
}

.promo-card__campaign {
  background: #fff1f2;
  color: #be123c;
  border-radius: 12px;
  padding: 0.5rem 0.9rem;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 0.95rem;
}

.promo-card__campaign small {
  color: #0f172a;
  font-size: 0.75rem;
}

.promo-card__list {
  list-style: none;
  margin: 0.75rem 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: #1f2937;
}

.promo-card__list li {
  position: relative;
  padding-left: 1.1rem;
}

.promo-card__list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #0f766e;
}

.promo-card__highlight {
  margin: 0.5rem 0 0;
  font-weight: 700;
  color: #0f172a;
}

.promo-card__image {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.promo-card__image img {
  max-width: 260px;
  width: 100%;
  border-radius: 16px;
  background: #f8fafc;
  padding: 0.75rem;
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.1);
}

@media (max-width: 768px) {
  .home {
    padding-top: 0;
  }

  .hero__shell {
    grid-template-columns: 1fr;
  }

  .hero__carousel {
    order: 2;
  }

  .hero__copy {
    order: 1;
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

  .promo-card {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1.75rem;
  }

  .promo-card__image {
    justify-content: center;
  }

  .carousel__caption {
    left: 1.25rem;
    right: 1.25rem;
    bottom: 1.25rem;
  }
}
</style>
