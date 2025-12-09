<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue"
import { queryCollection } from "#imports"

type NavChild = { label: string; to: string; order?: number; children?: NavChild[] }
type NavEntry = { label: string; to?: string; order?: number; children?: NavChild[] }

type NavGroup = { title?: string; items: NavChild[] }
type NavSection = { label: string; to?: string; groups?: NavGroup[] }

const { data: navItems } = await useAsyncData<NavEntry[]>(
  'nav-menu',
  () => queryCollection('nav').all(),
  { default: () => [] }
)

const navSections = computed<NavSection[]>(() => {
  const items = (navItems.value || [])
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => {
      const children = item.children?.length
        ? [...item.children]
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((child) => ({
              ...child,
              children: child.children
                ?.slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
            }))
        : []
      return {
        label: item.label,
        to: children.length ? undefined : item.to,
        groups: children.length
          ? [
              {
                title: item.label,
                items: children.map(({ label, to, children }) => ({
                  label,
                  to,
                  children,
                })),
              },
            ]
          : undefined,
      }
    })
  return items
})

const isMenuOpen = ref(false)
const openSections = ref<Record<string, boolean>>({})
const openChildGroups = ref<Record<string, boolean>>({})
const isMobile = ref(false)

const updateIsMobile = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth <= 1100
  }
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener("resize", updateIsMobile)
})

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", updateIsMobile)
  }
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (!isMenuOpen.value) {
    openSections.value = {}
    openChildGroups.value = {}
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  openSections.value = {}
  openChildGroups.value = {}
}

const onSectionClick = (event: MouseEvent, section: NavSection) => {
  if (section.groups?.length) {
    event.preventDefault()
    const isOpen = !!openSections.value[section.label]
    if (isOpen) {
      openSections.value = {}
      openChildGroups.value = {}
      isMenuOpen.value = true
    } else {
      openSections.value = { [section.label]: true }
      openChildGroups.value = {}
      isMenuOpen.value = true
    }
  } else {
    closeMenu()
  }
}

const groupKey = (section: NavSection, group: NavGroup, index: number) =>
  `${section.label}-${group.title ?? `group-${index}`}`

const childKey = (section: NavSection, child: NavChild) => `${section.label}-${child.label}`
const isChildOpen = (key: string) => !!openChildGroups.value[key]
const toggleChild = (key: string) => {
  openChildGroups.value = {
    ...openChildGroups.value,
    [key]: !isChildOpen(key),
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
              <span>{{ section.label }}</span>
              <span class="nav-item__chevron" :class="{ 'nav-item__chevron--open': openSections[section.label] }">
                {{ openSections[section.label] ? "ー" : "＋" }}
              </span>
            </button>
            <div
              class="nav-item__dropdown"
              :class="{ 'nav-item__dropdown--open': openSections[section.label] }"
            >
              <template v-if="isMobile">
                <div class="nav-mobile">
                  <div
                    v-for="(group, index) in section.groups"
                    :key="group.title ?? group.items[0]?.label ?? `group-mobile-${index}`"
                    class="nav-group nav-group--mobile"
                  >
                    <ul class="nav-group__list nav-group__list--mobile">
                      <li v-for="child in group.items" :key="child.label">
                        <template v-if="child.children?.length">
                          <button
                            :class="['nav-subtoggle', { 'nav-subtoggle--open': isChildOpen(childKey(section, child)) }]"
                            type="button"
                            @click="toggleChild(childKey(section, child))"
                          >
                            <span>{{ child.label }}</span>
                            <span
                              class="nav-group__icon"
                              :class="{ 'nav-group__icon--open': isChildOpen(childKey(section, child)) }"
                              aria-hidden="true"
                            ></span>
                          </button>
                          <ul v-show="isChildOpen(childKey(section, child))" class="nav-sublist">
                            <li v-for="grand in child.children" :key="grand.label">
                              <NuxtLink :to="grand.to || '#'" @click="closeMenu">{{ grand.label }}</NuxtLink>
                            </li>
                          </ul>
                        </template>
                        <template v-else>
                          <NuxtLink :to="child.to || '#'" @click="closeMenu">{{ child.label }}</NuxtLink>
                        </template>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="nav-mega">
                  <div class="nav-mega__intro">
                    <p class="nav-mega__eyebrow">&gt;{{ section.label }}</p>
                  </div>
                  <div class="nav-mega__columns">
                    <div
                      v-for="(group, index) in section.groups"
                      :key="group.title ?? group.items[0]?.label ?? `group-${index}`"
                      class="nav-group"
                    >
                      <ul class="nav-group__list">
                        <li v-for="child in group.items" :key="child.label">
                          <template v-if="child.children?.length">
                            <button
                              :class="['nav-subtoggle', { 'nav-subtoggle--open': isChildOpen(childKey(section, child)) }]"
                              type="button"
                              @click="toggleChild(childKey(section, child))"
                            >
                              <span>{{ child.label }}</span>
                              <span
                                class="nav-group__icon"
                                :class="{ 'nav-group__icon--open': isChildOpen(childKey(section, child)) }"
                                aria-hidden="true"
                              ></span>
                            </button>
                            <ul v-show="isChildOpen(childKey(section, child))" class="nav-sublist">
                              <li v-for="grand in child.children" :key="grand.label">
                                <NuxtLink :to="grand.to || '#'" @click="closeMenu">{{ grand.label }}</NuxtLink>
                              </li>
                            </ul>
                          </template>
                          <template v-else>
                            <NuxtLink :to="child.to || '#'" @click="closeMenu">{{ child.label }}</NuxtLink>
                          </template>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </template>
          <template v-else>
            <NuxtLink class="nav-item__label nav-item__label--link" :to="section.to || '#'" @click="closeMenu">
              {{ section.label }}
            </NuxtLink>
          </template>
        </div>
      </nav>
      <button class="layout__toggle" type="button" aria-label="メニューを開閉" @click="toggleMenu">
        <span :class="{ open: isMenuOpen }"></span>
      </button>
    </header>
    <div v-if="isMenuOpen" class="nav-overlay" @click="closeMenu"></div>
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

.layout__header {
  padding: 0.95rem var(--header-padding-x, 2rem);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 30;
  gap: 1.5rem;
  min-height: var(--header-height, 80px);
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
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  gap: 0;
}

.layout__nav a,
.nav-item__label {
  text-decoration: none;
  color: #0b2f61;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.layout__nav a.router-link-active {
  color: #0d6fd3;
}

.nav-item {
  position: relative;
  padding: 0.2rem 0.5rem;
  flex: none;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}

.nav-item__label {
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  letter-spacing: 0.02em;
  border: none;
  background: transparent;
  padding: 0.45rem 0.65rem;
  cursor: pointer;
  color: inherit;
  text-align: center;
  gap: 0.5rem;
  border-radius: 14px;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-item__label--link {
  text-decoration: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  position: relative;
}

.nav-item__label--link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 2px;
  background: linear-gradient(135deg, #0b3f79, #0d6fd3);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}

.nav-item__label--link:hover::after,
.layout__nav a.router-link-active::after {
  transform: scaleX(1);
}

.nav-item__label:hover {
  background: #f1f5f9;
  color: #0f4c81;
}

.nav-item__chevron {
  font-size: 0.7rem;
  color: #0f4c81;
}

.nav-item__dropdown {
  position: fixed;
  left: 50%;
  top: calc(var(--header-height, 80px) + 8px);
  transform: translate(-50%, 12px);
  width: calc(100% - (var(--header-padding-x, 2rem) * 2));
  background: #fff;
  color: #0f172a;
  padding: 2rem 2.5rem;
  display: block;
  opacity: 0;
  pointer-events: none;
  transition: 0.2s ease;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 18px 60px rgba(0, 32, 81, 0.12);
  max-height: 70vh;
  overflow-y: auto;
  z-index: 20;
}

.nav-item__dropdown--open {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, 0);
}

.nav-group {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  text-align: left;
}

.nav-group__toggle,
.nav-subtoggle {
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

.nav-subtoggle {
  width: 100%;
  text-align: left;
  font-weight: 700;
  padding: 0.9rem 0.6rem;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.nav-subtoggle:hover {
  background: #eef2f7;
  border-color: #cbd5e1;
  color: #0b2f61;
}

.nav-subtoggle--open {
  background: #e8f0fb;
  border-color: #b6d0f6;
  color: #0b2f61;
}

.nav-group__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  font-size: 0.85rem;
  color: #0f4c81;
  transition: transform 0.2s ease;
}

.nav-group__icon::before {
  content: '>';
}

.nav-group__icon--open {
  transform: rotate(90deg);
}

.nav-group__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.nav-group__list a {
  color: #0f4c81;
  text-decoration: none;
  font-weight: 500;
  padding: 0.9rem 0.35rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: normal;
  word-break: break-word;
  line-height: 1.45;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.nav-group__list a::after {
  content: '>';
  font-weight: 700;
  color: #0f4c81;
  padding-left: 0.35rem;
}

.nav-group__list li:last-child a {
  border-bottom: none;
}

.nav-sublist {
  list-style: none;
  margin: 0.35rem 0 0.35rem 0.6rem;
  padding: 0;
  border-left: 1px solid rgba(15, 76, 129, 0.25);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-sublist a {
  color: #0f4c81;
  text-decoration: none;
  font-weight: 500;
  padding-left: 0.35rem;
  display: block;
  line-height: 1.4;
}

.nav-overlay {
  position: fixed;
  top: var(--header-height, 80px);
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.35);
  backdrop-filter: blur(1px);
  z-index: 10;
}

.nav-mega {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  align-items: start;
}

.nav-mega__intro {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-right: 1.5rem;
  border-right: 1px solid #e5e7eb;
}

.nav-mega__eyebrow {
  margin: 0;
  color: #0f4c81;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nav-mega__columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem 2.5rem;
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
  padding: 1rem 1.5rem;
  background: #414d75;
  color: #fff;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.layout__footer a {
  color: #fff;
}

.layout__footer p {
  color: #fff;
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
  content: "";
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

@media (max-width: 1100px) {
  .layout__nav {
    position: fixed;
    top: var(--header-height, 80px);
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1rem 1.25rem 2rem;
    background: #fff;
    border: none;
    border-radius: 0;
    width: 100vw;
    height: auto;
    box-shadow: none;
    z-index: 30;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-8px);
    transition: 0.2s ease;
    max-height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 0;
  }

  .layout__nav--open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .nav-item {
    width: 100%;
    border: none;
    padding: 0.55rem 0 0.2rem;
    align-items: stretch;
    text-align: left;
    flex: none;
    border-bottom: 1px solid #e2e8f0;
    flex-direction: column;
  }

  .nav-item__label {
    width: 100%;
    justify-content: space-between;
    padding: 0.55rem 0 0.2rem;
    gap: 0.35rem;
    font-size: 1rem;
  }

  .nav-item__dropdown {
    position: static;
    opacity: 0;
    pointer-events: none;
    transform: none;
    padding: 0;
    border-radius: 0;
    margin-top: 0;
    display: none;
    background: transparent;
    color: #0f172a;
    border: none;
    box-shadow: none;
    width: 100%;
    max-height: none;
    overflow: visible;
  }

  .nav-item__dropdown--open {
    display: block;
    opacity: 1;
    pointer-events: auto;
  }

  .nav-group {
    min-width: 100%;
    max-width: 100%;
    padding: 0;
  }

  .nav-group__list {
    gap: 0;
  }

  .nav-group__list a {
    border-left: none;
    padding: 0.6rem 0;
    border-bottom: 1px solid #e2e8f0;
  }

  .nav-group__list a::after {
    content: '>';
    font-weight: 700;
    color: #0f4c81;
    padding-left: 0.35rem;
  }

  .nav-group__list li:last-child a {
    border-bottom: none;
  }

  .nav-sublist {
    margin: 0.25rem 0 0.35rem 0.4rem;
    border-left: 1px solid #e2e8f0;
  }

  .nav-sublist a {
    padding: 0.4rem 0 0.4rem 0.35rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .nav-mega {
    display: none;
  }

  .nav-mobile {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    width: 100%;
  }

  .nav-group--mobile {
    width: 100%;
  }

  .nav-group__list--mobile {
    width: 100%;
  }

  .layout__toggle {
    display: block;
    position: fixed;
    top: 12px;
    right: 12px;
    z-index: 40;
  }

  .layout__actions {
    display: none;
  }

  .logo__img {
    height: 32px;
  }
}
</style>

<style>
:root {
  --header-height: 80px;
  --header-padding-x: 2rem;
}

.layout__content {
  width: min(1200px, 100%);
  margin: 0 auto;
}

body {
  background: #e8f3fc;
}

html {
  scroll-padding-top: calc(var(--header-height, 80px) + 16px);
}

</style>
