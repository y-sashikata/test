<script setup lang="ts">
import { nextTick } from 'vue'
type SubSection = {
  title: string
  body: string
  image: string
}

type Section = {
  title: string
  description: string
  items: SubSection[]
}

const sections: Section[] = [
  {
    title: '構築システム事例',
    description:
      '',
    items: [
      {
        title: '臨床検査システム',
        body: '血液検査などを扱う臨床検査会社において、様々な医療機関から寄せられる検査依頼を処理するシステムです。依頼内容が記載された検査依頼書（マークシート様式）をスキャニングし、イメージデータをOCR・OMR解析して検査依頼の内容を自動認識します。\nシステム上で、マークの精査や属性情報の入力も行うことができます。',
        image: '/images/system/sample-sales.png',
      },
      {
        title: '販売管理システム',
        body: '受発注や仕入、物流を管理するトータルソリューションシステムの構築を通して、運用処理の効率化をご提案しております。現在ご使用中の既存システムと連動させることも可能です。酒販店向けのパッケージソフトウェアの自社開発も手掛け、2008年より「リカーエースⅡ」として全国の酒屋さんに販売しています。',
        image: '/images/system/sample-account.png',
      },
      {
        title: '試験処理システム',
        body: '受験申込受付から受験票発行、採点・合否判定まで、更には合格した有資格者の管理業務まで、国家試験や資格試験の事務運営を幅広くサポートするシステムを構築しています。',
        image: '/images/system/sample-hr.png',
      },
    ],
  },
]

const examThumbs = [
  { src: '/images/WEBページ-288x300.png', alt: '国家試験WEBサイト' },
  { src: '/images/メインメニュー-300x232.png', alt: '申請メインメニュー' },
  { src: '/images/一覧画面-300x196.png', alt: '申請一覧画面' },
  { src: '/images/事務局審査-300x246.png', alt: '事務局での審査画面' },
  { src: '/images/申請画面-300x170.png', alt: '受験申請入力画面' },
]

const horizontalSections = ref<{ wrapper: HTMLElement; track: HTMLElement }[]>([])
const stickyOffset = 0

const collectSections = () => {
  const wrappers = Array.from(document.querySelectorAll<HTMLElement>('[data-horizontal-wrapper]'))
  horizontalSections.value = wrappers
    .map((wrapper) => {
      const track = wrapper.querySelector<HTMLElement>('[data-horizontal-track]')
      if (!track) return null
      return { wrapper, track }
    })
    .filter(Boolean) as { wrapper: HTMLElement; track: HTMLElement }[]
}

const isDesktop = () => window.innerWidth > 768

const resetMobileStyles = () => {
  horizontalSections.value.forEach(({ wrapper, track }) => {
    wrapper.style.height = 'auto'
    track.style.transform = 'translateX(0)'
  })
}

const updateHeights = () => {
  if (!import.meta.client) return
  if (!isDesktop()) {
    resetMobileStyles()
    return
  }
  const stickyHeight = window.innerHeight - stickyOffset
  const viewportWidth = window.innerWidth

  horizontalSections.value.forEach(({ wrapper, track }) => {
    const trackWidth = track.scrollWidth
    const extra = Math.max(trackWidth - viewportWidth, 0)
    const height = stickyHeight + extra
    wrapper.style.height = `${Math.max(height, stickyHeight + 200)}px`
  })
}

const handleScroll = () => {
  if (!import.meta.client || !isDesktop()) return
  const stickyHeight = window.innerHeight - stickyOffset
  const viewportWidth = window.innerWidth
  const scrollY = window.scrollY

  horizontalSections.value.forEach(({ wrapper, track }) => {
    const trackWidth = track.scrollWidth
    const maxTranslate = Math.max(trackWidth - viewportWidth, 0)
    if (maxTranslate <= 0) {
      track.style.transform = 'translateX(0)'
      return
    }

    const start = wrapper.offsetTop
    const end = start + wrapper.offsetHeight - stickyHeight
    if (scrollY < start || scrollY > end) return

    const progress = Math.min(Math.max(scrollY - start, 0), maxTranslate)
    track.style.transform = `translateX(-${progress}px)`
  })
}

const initHorizontalScroll = async () => {
  if (!import.meta.client) return
  await nextTick()
  collectSections()
  updateHeights()
  handleScroll()
}

const onResize = () => {
  updateHeights()
  handleScroll()
}

onMounted(() => {
  initHorizontalScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <main class="hybrid-page">
    <section class="hero" style="background-image: url('/images/システム.jpg')">
      <div class="hero__overlay">
        <h1>システム開発</h1>
        <p class="hero__lead">当社のシステム部門では、これまでに臨床検査センターの検査依頼を処理する受付システム、酒類・食品業界の卸売企業様向け販売管理システム、POSレジ機能を備えた販売管理パッケージシステム、国家試験・資格試験の申込受付から採点・合否判定までのトータル処理システムなど、幅広い分野での開発を手がけております。
    本社のシステム部門と長崎開発センター（長崎県長崎市）とが連携し、調査・分析・設計・製造・テストといった工程を進めていきます。</p>
      </div>
    </section>

    <section
      class="horizontal-wrapper"
      data-horizontal-wrapper
    >
      <div class="horizontal-sticky">
        <header class="horizontal-heading">
          <h2>構築システム事例</h2>
        </header>
        <div class="horizontal-track" data-horizontal-track>
          <article class="horizontal-card horizontal-card--split" style="flex: 0 0 720px">
            <div class="horizontal-card__body">
              <h3>臨床検査システム</h3>
              <p>血液検査などを扱う臨床検査会社において、様々な医療機関から寄せられる検査依頼を処理するシステムです。<br>
                依頼内容が記載された検査依頼書（マークシート様式）をスキャニングし、イメージデータをOCR・OMR解析して検査依頼の内容を自動認識します。<br>
                システム上で、マークの精査や属性情報の入力も行うことができます。</p>
                <p>関連ページはこちら</p>
                <a href="">臨床検査関連</a>
            </div>
          </article>
          <article class="horizontal-card horizontal-card--split" style="flex: 0 0 720px">
            <div class="horizontal-card__body">
              <h3>販売管理システム</h3>
              <p>受発注や仕入、物流を管理するトータルソリューションシステムの構築を通して、運用処理の効率化をご提案しております。現在ご使用中の既存システムと連動させることも可能です。
酒販店向けのパッケージソフトウェアの自社開発も手掛け、2008年より「<a href="">リカーエースⅡ</a>」として全国の酒屋さんに販売しています。</p>
                <p>関連ページはこちら</p>
                <a href="">販売管理関連</a>
            </div>
          </article>
          <article class="horizontal-card horizontal-card--split" style="flex: 0 0 1200px">
            <div class="horizontal-card__body">
              <h3>試験処理システム</h3>
              <p>
                受験申込受付から受験票発行、採点・合否判定まで、更には合格した有資格者の管理業務まで、<br>国家試験や資格試験の事務運営を幅広くサポートするシステムを構築しています。
              </p>
              <p>関連ページはこちら</p>
              <a href="">試験処理代行（アウトソーシング業務を含む）</a>
            </div>
            <div class="horizontal-card__media">
              <div class="horizontal-card__thumb" v-for="(thumb, idx) in examThumbs" :key="`exam-thumb-${idx}`">
                <img :src="thumb.src" :alt="thumb.alt" loading="lazy" />
                <p>{{ thumb.alt }}</p>
              </div>
            </div>
          </article>
          <article class="horizontal-card horizontal-card--split" style="flex: 0 0 720px">
            <div class="horizontal-card__body">
              <h3>運用支援システム(入力代行)</h3>
              <p>当社特許の広域分散入力「VE21」システムをはじめ、当社運用部門で使用する各種データ処理システム、可変情報出力システムまで、ワンストップソリューションを実現する運用システムを自社内で幅広く開発しています。</p>
                <p>関連ページはこちら</p>
                <a href="">データ入力サービス「VE21」</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section
      class="horizontal-wrapper"
      data-horizontal-wrapper
    >
      <div class="horizontal-sticky">
        <header class="horizontal-heading">
          <h2>AI関連事例</h2>
        </header>
        <div class="horizontal-track" data-horizontal-track>
          <article class="horizontal-card horizontal-card--split" style="flex: 0 0 720px">
            <div class="horizontal-card__body">
              <h3>花の栽培(キク・トルコギキョウの自動育成システム)</h3>
              <p>・目的:開花させる月日の指定・自動制御モードにすることで各制御機器をコントロールし開花させること<br>
・制御項目:カーテン開閉・灌水・CO2・ヒートポンプ等<br>
・AI処理詳細:圃場(ほじょう)全体画像より育成不良（水不足・外注）の監視<br>
発見時に農家へメール送信<br>
環境計測値・茎幅・茎丈・真上からの画像を元に開花時期を測定</p>
<p>〇スマートフォンでの表示内容<br>
・圃場の画像を確認することが可能<br>
・上部に縮小された画像が横並びで一覧表示され、左右にスワイプすることで過去の画像を閲覧が可能<br>
・見たい画像があればタップすることで下に拡大表示<br>
・現状はカメラ毎に最新から3枚分表示<br>
・撮影日、ハウス、撮影箇所の情報も確認可能</p>
            </div>
          </article>
          <article class="horizontal-card horizontal-card--split" style="flex: 0 0 720px">
            <div class="horizontal-card__body">
              <h3>帳票種類の識別(複数のフォーマットのスキャン画像を種別ごとに振り分ける)</h3>
              <p>・複数フォーマットの帳票をスキャンし、傾き補正・用紙方向を正しく変換・種類ごとに振り分ける<br>
運用実績例）都道府県・自治体により、微妙なフォーマットの違いがある用紙をまとめてスキャンし適切な場所へ振り分ける<br>
イメージ図）犬・猫・亀の表示の帳票の位置を調整し、それぞれ動物の種類ごとに分ける</p>
            </div>
          </article>
                    <article class="horizontal-card horizontal-card--split" style="flex: 0 0 720px">
            <div class="horizontal-card__body">
              <h3>AIへの取り組み</h3>
              <p>・自社AI OCRの開発<br>
　　健診・治験など匿秘性の高い案件では閉鎖型OCRの開発を進めています。<br>
　　WEBを利用したオープンソースでは漏洩のリスクが高くなります。<br>
　　当社では二次利用の許諾を得た情報に限り、AI学習の素材として活用し専用OCRの精度を高めています。<br>
・コールセンターの音声AI処理導入<br>
　　当社が運用するコールセンターにAIを採用することで情報伝達の精度を高めます。<br>
　　ルールベース型のチャットボット開発や、有人チャットと有人コールのハイブリッド運用開発を進めています。<br>
<br>
・AI運用のガイドライン策定<br>
　　ガイドラインを整備し、社内運用での懸念とメリットを情報漏洩に留意した運用方法を社内教育を徹底しました。<br>
　　導入プログラムではAIを利用した動画を作成し、見やすくわかりやすいコンテンツを作成しました。<br>
　　現在、全社員がAIを利用した業務効率化を各々推進しています。<br>
<br>
・スマートグラスの業務利用<br>
　　ヘルスケア事業の治験業務におけるピッキング作業にて、出荷管理と保管場所の座標管理、スマートグラスの連動により<br>
　　作業効率化と精度の向上を図ります。</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hybrid-page {
  min-height: 100vh;
  background: #f1f5f9;
  padding-bottom: 4rem;
}

.hero {
  position: relative;
  min-height: 420px;
  padding: 4rem 1.5rem;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(15,23,42,.85), rgba(30,64,175,.75));
}

.hero__overlay {
  position: relative;
  max-width: 640px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.hero__eyebrow {
  font-size: 0.85rem;
  letter-spacing: 0.35em;
  color: #2563eb;
  margin: 0;
}

.hero h1 {
  margin: 0;
  font-size: clamp(2.4rem, 4vw, 3rem);
}

.hero__lead {
  margin: 0;
  color: #fff;
  line-height: 1.8;
}

.horizontal-wrapper {
  position: relative;
  height: 100vh;
}

.horizontal-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  padding-left: clamp(240px, 28vw, 360px);
  padding-right: clamp(24px, 5vw, 80px);
  box-sizing: border-box;
}

.horizontal-heading {
  position: absolute;
  left: clamp(32px, 5vw, 80px);
  top: 12%;
  background: rgba(15, 23, 42, 0.7);
  color: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.3);
  z-index: 2;
}

.horizontal-heading p {
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
}

.horizontal-heading h2 {
  margin: 0 0 0.5rem;
  font-size: 1.6rem;
}

.horizontal-heading__desc {
  margin: 0;
  line-height: 1.6;
  color: #e2e8f0;
}

.horizontal-track {
  position: absolute;
  display: flex;
  gap: 1.25rem;
  left: 0;
  top: 45%;
  transform: translateX(0);
  transition: transform 0s;
  will-change: transform;
  padding-bottom: 3rem;
}

.horizontal-card {
  flex: 0 0 min(320px, 70vw);
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.horizontal-card--split {
  flex-direction: row;
  align-items: stretch;
  gap: 1rem;
  min-width: min(520px, 85vw);
}

.horizontal-card__body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.horizontal-card__media {
  flex: 1 1 520px;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 1rem;
  align-content: flex-start;
  overflow: visible;
}

.horizontal-card__thumb {
  flex: 0 1 150px;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-align: center;
  color: #475467;
  font-size: 0.85rem;
}

.horizontal-card__thumb img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.2);
}


@media (max-width: 768px) {
  .horizontal-wrapper {
    height: auto;
    padding: 2rem 1rem;
  }

  .horizontal-sticky {
    position: static;
    height: auto;
  }

  .horizontal-heading {
    position: static;
    left: auto;
    right: auto;
    top: auto;
    max-width: none;
    margin-bottom: 1rem;
  }

  .horizontal-track {
    position: static;
    left: auto;
    right: auto;
    top: auto;
    flex-direction: column;
    transform: none !important;
    gap: 1rem;
    padding: 0;
  }

  .horizontal-card--split {
    flex-direction: column;
  }

  .horizontal-card__media {
    flex: none;
    padding: 0 1rem 1rem;
    flex-wrap: wrap;
  }

  .horizontal-card__thumb {
    flex: 0 0 45%;
  }
}
</style>
