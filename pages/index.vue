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
    title: '',
    caption: '株式会社ディーソルはデータソリューションカンパニーです。ITと紙の「ハイブリッドDX」を提案します。',
    image: '/images/img_main_50th-1.png',
  },
  {
    title: '',
    caption: '社会に優しい信頼される企業を目指します。 地球環境への負担を低減し、持続可能な社会の貢献をいたします。',
    image: '/images/img2.jpeg',
  },
  {
    title: '',
    caption: 'オリジナル紙製ホルダー専門ECサイト「プレコオンラインオーダー」はじめました！',
    image: '/images/HPクリアプレコ_20240722_2_2.png',
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
    highlight: '好評につき、スパ対応版を公開しました',
    image: '/images/promo_wds.png',
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
    image: '/images/promo_clearpreco.png',
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
    image: '/images/promo_eos.png',
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
    image: '/images/promo_dx.png',
    theme: 'blue',
  },
  {
    badge: 'IT SOLUTION',
    title: '情報提供のワンストップサービス',
    description: [
      '「入力」「開発」「処理」「出力」サービスを提供します。',
      '全国の自社センターをセキュリティ通信網で結び、一連の流れを実現しました。',
    ],
    image: '/images/promo_total.png',
    theme: 'blue',
  },
  {
    badge: 'PAPER SUPPLY',
    title: '情報帳票',
    description: [
      '情報媒体としての製品を自社の生産ラインで製造しています。使用目的に応じて、大量から少量まで、柔軟に対応いたします。感圧紙、特殊紙加工、製本など印刷にかかわるもの全般を提供します。',
    ],
    image: '/images/promo_paper.png',
    theme: 'green',
  },
]
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
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
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
  flex: 0 0 100vw;
  min-width: 100vw;
  position: relative;
}

.carousel__item img {
  width: 100%;
  height: 620px;
  object-fit: cover;
  object-position: center;
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

.promos {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.promo-card {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 1.5rem;
  border-radius: 32px;
  padding: 2.5rem;
  color: #fff;
  box-shadow: 0 30px 60px rgba(5, 28, 77, 0.25);
}

.promo-card--blue {
  background: linear-gradient(135deg, #0f3793, #06255f);
}

.promo-card--green {
  background: linear-gradient(135deg, #8db60e, #5f8d05);
}

.promo-card__badge {
  font-weight: 700;
  letter-spacing: 0.1em;
  margin: 0 0 0.35rem;
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
  font-size: 1.9rem;
}

.promo-card__campaign {
  background: #fff;
  color: #bd1f1f;
  border-radius: 999px;
  padding: 0.4rem 1rem;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 0.95rem;
}

.promo-card__campaign small {
  color: #0f172a;
  font-size: 0.7rem;
}

.promo-card__list {
  list-style: none;
  margin: 0.75rem 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.promo-card__list li {
  position: relative;
  padding-left: 1.1rem;
}

.promo-card__list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgba(255, 255, 255, 0.8);
}

.promo-card__highlight {
  margin: 0.5rem 0 0;
  font-weight: 700;
}

.promo-card__image {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.promo-card__image img {
  max-width: 280px;
  width: 100%;
  border-radius: 14px;
  background: #fff;
  padding: 0.5rem;
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

  .promo-card {
    grid-template-columns: 1fr;
  }

  .promo-card__image {
    justify-content: center;
  }
}
</style>
