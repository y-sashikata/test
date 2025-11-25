<script setup lang="ts">
type NavChild = {
  label: string
  to: string
}

type NavGroup = {
  title?: string
  items: NavChild[]
}

type NavSection = {
  label: string
  to: string
  groups?: NavGroup[]
}

const navSections: NavSection[] = [
  {
    label: '企業情報',
    to: '/company',
    groups: [
      {
        items: [
          { label: 'ごあいさつ', to: '' },
          { label: 'ニュースリリース', to: '/news' },
          { label: '会社概要', to: '' },
          { label: 'CSR', to: '' },
          { label: '沿革', to: '' },
          { label: 'SDGsへの取り組み', to: '' },
          { label: 'ディーソルグループ 各地の事業拠点', to: '/solution/center' },
        ],
      },
    ],
  },
  {
    label: 'IT SOLUTION',
    to: '/it-solution',
    groups: [
      {
        title: 'システム',
        items: [
          { label: 'AIの取り組み', to: '/system' },
          { label: 'リカーエース', to: '' },
          { label: '受発注業務支援サービス（EOS）', to: '' },
          { label: '帳票Web配信サービス「Web Delivery Service」', to: '' },
          { label: '働き方改革「業務まるごとテレワーク」', to: '' },
          { label: '農業遠隔監視システム 「Sfumato」', to: '' },
          { label: '販売管理システム', to: '' },
          { label: '受発注業務支援サービス(EDI)', to: '' },
        ],
      },
      {
        title: 'アウトソーシング',
        items: [
          { label: '特定健診支援サービス', to: '' },
          { label: '試験処理代行', to: '' },
          { label: 'データ入力', to: '' },
          { label: '受付業務', to: '' },
          { label: '臨床検査関連', to: '' },
          { label: '自治体関連', to: '' },
          { label: 'データ処理', to: '' },
          { label: '発送代行', to: '' },
          { label: '予診票入力サービス', to: '' },
          { label: '事務局運営', to: '' },
          { label: 'WEBサービス', to: '' },
          { label: '受注代行業務', to: '' },
        ],
      },
      {
        title: '印刷・発送',
        items: [
          { label: 'レジロールで広告・宣伝', to: '' },
          { label: '流通向け印刷物', to: '' },
          { label: '印字・データプリント', to: '' },
          { label: '印刷サービス', to: '' },
        ],
      },
    ],
  },
  {
    label: 'PAPER SUPPLY',
    to: '/paper-supply',
    groups: [
      {
        title: '加工製品',
        items: [
          { label: 'クリアプレコ（半透明紙ホルダー）', to: '' },
          { label: 'プレコ（紙ホルダー）', to: '' },
          { label: '裏面広告レジロール', to: '' },
          { label: 'ミニ製本', to: '' },
        ],
      },
      {
        title: '用紙関連',
        items: [
          { label: 'インクジェット用紙', to: '' },
          { label: 'コピー・OA用紙', to: '' },
          { label: '設計・製図・デザイン用紙', to: '' },
          { label: '計測記録・情報記録用紙', to: '' },
          { label: 'クリーンペーパー類', to: '' },
          { label: '偽造防止用紙', to: '' },
          { label: '測量野帳', to: '' },
          { label: '製本・運搬材料', to: '' },
          { label: 'メモシリーズ', to: '' },
          { label: '用紙関連価格案内（プリンタ用ロール紙、プリンタ用シート紙、筆記用紙、製本材料、保管・運搬用品）', to: '' },
        ],
      },
      {
        title: 'ORM関連',
        items: [
          { label: '汎用マークシート', to: '' },
          { label: 'OMR機器', to: '' },
          { label: '採点ソフト', to: '' },
        ],
      },
            {
        title: 'その他',
        items: [
          { label: 'FSC認証材製品', to: '' },
          { label: 'AED（レンタル・販売）', to: '' },
          { label: 'ウレタンラック（医療品）', to: '' },
        ],
      },
    ],
  },
  {
    label: '採用情報',
    to: '',
  },
  {
    label: 'お問い合わせ',
    to: '',
  },
]

const isMenuOpen = ref(false)
const openSections = ref<Record<string, boolean>>({})
const openGroups = ref<Record<string, boolean>>({})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (!isMenuOpen.value) {
    openSections.value = {}
    openGroups.value = {}
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  openSections.value = {}
  openGroups.value = {}
}

const onSectionClick = (event: MouseEvent, section: NavSection) => {
  if (section.groups?.length) {
    event.preventDefault()
    const isOpen = !!openSections.value[section.label]
    openSections.value = isOpen ? {} : { [section.label]: true }
    if (!isMenuOpen.value && !isOpen) {
      isMenuOpen.value = true
    }
  } else {
    closeMenu()
  }
}

const groupKey = (section: NavSection, group: NavGroup, index: number) =>
  `${section.label}-${group.title ?? `group-${index}`}`

const isGroupOpen = (key: string) => !!openGroups.value[key]

const toggleGroup = (key: string) => {
  openGroups.value = {
    ...openGroups.value,
    [key]: !isGroupOpen(key),
  }
}
</script>

<template>
  <div class="layout">
    <header class="layout__header">
      <NuxtLink class="logo" to="/">
        <img class="logo__img" src="/images/logo.jpg" alt="D2 Solutions" />
      </NuxtLink>
      <nav class="layout__nav" :class="{ 'layout__nav--open': isMenuOpen }">
        <div v-for="section in navSections" :key="section.label" class="nav-item">
          <template v-if="section.groups?.length">
            <button class="nav-item__label" type="button" @click="onSectionClick($event, section)">
              {{ section.label }}
            </button>
              <div
              class="nav-item__dropdown"
              :class="{ 'nav-item__dropdown--open': openSections[section.label] }"
            >
              <div
                v-for="(group, index) in section.groups"
                :key="group.title ?? group.items[0]?.label ?? `group-${index}`"
                class="nav-group"
              >
                <button
                  class="nav-group__toggle"
                  type="button"
                  @click="toggleGroup(groupKey(section, group, index))"
                >
                  <span>{{ group.title ?? section.label }}</span>
                  <span
                    class="nav-group__icon"
                    :class="{ 'nav-group__icon--open': isGroupOpen(groupKey(section, group, index)) }"
                  >
                    ▾
                  </span>
                </button>
                <transition name="nav-group__transition">
                  <ul v-show="isGroupOpen(groupKey(section, group, index))" class="nav-group__list">
                    <li v-for="child in group.items" :key="child.label">
                      <NuxtLink :to="child.to || '#'" @click="closeMenu">{{ child.label }}</NuxtLink>
                    </li>
                  </ul>
                </transition>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink class="nav-item__label nav-item__label--link" :to="section.to" @click="closeMenu">
              {{ section.label }}
            </NuxtLink>
          </template>
        </div>
      </nav>
      <button class="layout__toggle" type="button" aria-label="メニューを開閉" @click="toggleMenu">
        <span :class="{ open: isMenuOpen }"></span>
      </button>
    </header>
    <slot />
    <footer class="layout__footer">
      <ul>
        <li>
          <a href="">プライバシーポリシー</a>
        </li>
      </ul>
      <p>Copyright© D-solution Co. Ltd.</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout__header,
.layout__footer {
  padding: 1rem 1.5rem;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
  gap: 1rem;
}

  .logo {
    display: inline-flex;
    align-items: center;
  }

.logo__img {
  height: 40px;
  width: auto;
}

.layout__nav {
  display: flex;
  align-items: stretch;
  flex: 1;
  justify-content: center;
  margin: 0 auto;
  margin-left: 30px;
}

.layout__nav a,
.nav-item__label {
  text-decoration: none;
  color: #1f2937;
  font-weight: 600;
}

.layout__nav a.router-link-active {
  color: #059669;
}

.nav-item {
  position: relative;
  padding: 1rem;
  border-left: 1px solid #d1d5db;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.nav-item:last-child {
  border-right: 1px solid #d1d5db;
}

.nav-item__label {
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: inherit;
  text-align: center;
}

.nav-item__label--link {
  text-decoration: none;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.nav-item__dropdown {
  position: absolute;
  left: 0;
  top: 100%;
  transform: translateY(10px);
  width: 100%;
  background: #003f86;
  color: #fff;
  padding: 2rem 2.5rem;
  display: flex;
  gap: 2rem;
  opacity: 0;
  pointer-events: none;
  transition: 0.2s ease;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-height: 70vh;
  overflow-y: auto;
  min-width: 300px;
  max-width: 300px;
}

.nav-item__dropdown--open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.nav-group {
  min-width: 200px;
  max-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: left;
}

.nav-group__toggle {
  border: 0;
  background: transparent;
  color: currentColor;
  font-weight: 700;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0;
}

.nav-group__icon {
  font-size: 0.85rem;
  transition: transform 0.2s ease;
}

.nav-group__icon--open {
  transform: rotate(180deg);
}

.nav-group__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.nav-group__list a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  border-left: 2px solid rgba(255, 255, 255, 0.6);
  padding-left: 0.4rem;
  display: block;
  white-space: normal;
  word-break: break-word;
  line-height: 1.45;
  text-align: left;
}

.nav-group__transition-enter-active,
.nav-group__transition-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.nav-group__transition-enter-from,
.nav-group__transition-leave-to {
  opacity: 0;
  transform: translateY(-2px);
}

.layout__footer {
  margin-top: auto;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.layout__toggle {
  display: none;
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: transparent;
}

.layout__toggle span,
.layout__toggle span::before,
.layout__toggle span::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 2px;
  background: #111827;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.3s;
}

.layout__toggle span {
  top: 50%;
}

.layout__toggle span::before {
  top: -6px;
}

.layout__toggle span::after {
  top: 6px;
}

.layout__toggle span.open {
  background: transparent;
}

.layout__toggle span.open::before {
  transform: translate(-50%, 6px) rotate(45deg);
}

.layout__toggle span.open::after {
  transform: translate(-50%, -6px) rotate(-45deg);
}

@media (max-width: 768px) {
  .layout__nav {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    width: min(320px, 90vw);
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: 0.2s ease;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
  }

  .layout__nav--open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .nav-item {
    width: 100%;
    border: none;
    padding: 0.5rem 0;
    align-items: flex-start;
    text-align: left;
  }

  .nav-item__dropdown {
    position: static;
    opacity: 0;
    pointer-events: none;
    transform: none;
    flex-direction: column;
    gap: 1rem;
    padding: 0.75rem;
    border-radius: 0;
    margin-top: 0.4rem;
    display: none;
    background: #003f86;
    color: #fff;
    width: 100%;
    max-height: none;
    overflow: visible;
  }

  .nav-group {
    min-width: 100%;
    max-width: 100%;
  }

  .nav-item__dropdown--open {
    display: flex;
    opacity: 1;
    pointer-events: auto;
  }

  .layout__toggle {
    display: block;
  }

  .layout__actions {
    display: none;
  }

  .logo__img {
    height: 32px;
  }
}
</style>
.layout__content {
  width: min(1200px, 100%);
  margin: 0 auto;
}
.layout__actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
  flex-shrink: 0;
}

.layout__phone {
  font-weight: 700;
  color: #111827;
  text-decoration: none;
}

.btn-contact {
  border: 1px solid #059669;
  border-radius: 999px;
  padding: 0.4rem 1.25rem;
  background: #059669;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}
