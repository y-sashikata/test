<script setup lang="ts">
type CenterCard = {
  title: string
  description: string | string[]
  link?: string
  image?: string
}

type CenterSection = {
  title: string
  cards: CenterCard[]
}

const heroText = {
  title: 'ディーソルグループ 各地の事業拠点',
  intro:
    'お客様に様々なソリューションを提供している各地の自社センターをご紹介いたします。各地のセンターの連携により、インプットからアウトプットに至る全ての工程をワンストップで処理することができます。',
}

const heroImages = [
  { src: '/images/サークル図_事業拠点_20250807v3.png', alt: '事業拠点サークル図' },
  { src: '/images/各地の事業拠点日本地図_20250804.png', alt: '事業拠点マップ' },
]

const centerSections: CenterSection[] = [
  {
    title: 'システム',
    cards: [
      {
        title: '東京本社 システム開発本部',
        description:
          '東京都中央区の本社にあるシステム開発本部です。クライアント企業様にソリューションを提供するための各種のシステム構築を行っています。',
        link: '/solution/center',
        image:'/images/dsolhonsya-225x300.png'
      },
      {
        title: '株式会社ディーソルNSP',
        description:
          '長崎県長崎市にあり、東京本社のシステム部と連携して、調査・分析・設計・製造・テストといった開発工程を進めています。',
        link: '/solution/center',
        image:'/images/web_スタジアムノース外観-300x200.jpg'
      },
    ],
  },
  {
    title: 'アウトソーシング',
    cards: [
      {
        title: 'BPOセンター',
        description: [
          '埼玉県春日部市にあり、各種業務の分析・設計・運用を行う中枢センターです。受託業務を分析して当社の設備・人員から最適な運用プロセスを構築します。入力・処理・出力といった一連のデータ運用を、各センターを集約・コントロールしながらワンストップでご提供しています。',
          '【例】商品受注業務のフロー構築から運用／試験事務代行業務の運営／事務局業務の設計・運用',
        ],
        image:'/images/head-office2-300x226.jpg'
      },
      {
        title: '株式会社ディーソルHPI',
        description:
          '長崎県五島市にあるデータ入力センターです。イメージエントリー方式を採用し、特許技術「VE21」によって機密性の高い情報も細分化しながら安全かつスピーディにデータ化しています。',
        image:'/images/iic-building2.png'
      },
      {
        title: '株式会社ディーソルHPI 佐世保事業所',
        description:
          '長崎県佐世保市にあるコールセンターです。電話をはじめFAX、WEB、郵便など複数のチャネルに対応した総合的な受付・対応業務を行っています。CTI構築や私書箱設置など、日中から夜間までお客様の事業形態に沿った運用が可能です。',
        image:'/images/IDC佐世保画像_調整-1024x517.jpg'
      },
    ],
  },
]
</script>

<template>
  <main class="center-page">
    <section class="center-hero">
      <header>
        <h1>{{ heroText.title }}</h1>
        <p>{{ heroText.intro }}</p>
      </header>
      <div class="center-hero__images">
        <img v-for="image in heroImages" :key="image.src" class="hero-image" :src="image.src" :alt="image.alt" />
      </div>
    </section>

    <section v-for="section in centerSections" :key="section.title" class="center-section">
      <h2>{{ section.title }}</h2>
      <article v-for="card in section.cards" :key="card.title" class="center-card">
        <div class="center-card__text">
          <h3>{{ card.title }}</h3>
          <p v-if="typeof card.description === 'string'">{{ card.description }}</p>
          <template v-else>
            <p v-for="(paragraph, index) in card.description" :key="index">{{ paragraph }}</p>
          </template>
          <NuxtLink v-if="card.link" class="center-card__link" :to="card.link">関連ページはこちら</NuxtLink>
        </div>
        <div class="center-card__image">
          <img v-if="card.image" :src="card.image" :alt="card.title" />
          <span v-else>画像を挿入予定</span>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.center-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.center-hero header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.center-hero h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 2.8rem);
  color: #003f86;
}

.center-hero__images {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.hero-image {
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
}

.center-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.center-section h2 {
  margin: 0;
  font-size: 1.6rem;
  color: #003f86;
}

.center-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 1.5rem;
  background: #fff;
  align-items: center;
}

.center-card__link {
  display: inline-flex;
  margin-top: 0.5rem;
  color: #059669;
  text-decoration: none;
  font-weight: 600;
}

.center-card__image {
  aspect-ratio: 16 / 9;
  width: 100%;
  background: #f0f4fb;
  display: grid;
  place-items: center;
  color: #64748b;
  font-weight: 600;
  overflow: hidden;
}

.center-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.center-card__image span {
  font-weight: 600;
  color: #94a3b8;
}

@media (max-width: 768px) {
  .center-page {
    padding: 2rem 1rem;
  }

  .center-card {
    grid-template-columns: 1fr;
  }

  .center-card__image {
    width: 100%;
    margin-top: 0.5rem;
    border-radius: 0;
  }
}
</style>
