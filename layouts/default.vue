<script setup lang="ts">
const navLinks = [
  { label: 'お知らせ', to: '/news' },
  { label: '会社概要', to: '/company' },
]

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <div class="layout">
    <header class="layout__header">
      <NuxtLink class="logo" to="/">Demo Company</NuxtLink>
      <nav class="layout__nav" :class="{ 'layout__nav--open': isMenuOpen }">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" @click="closeMenu">{{ link.label }}</NuxtLink>
        <a href="/admin" rel="noopener" @click="closeMenu">管理画面</a>
      </nav>
      <button class="layout__toggle" type="button" aria-label="メニューを開閉" @click="toggleMenu">
        <span :class="{ open: isMenuOpen }"></span>
      </button>
    </header>
    <slot />
    <footer class="layout__footer">
      <p>© {{ new Date().getFullYear() }} Company inc.</p>
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
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
}

.layout__nav {
  display: flex;
  gap: 1rem;
}

.layout__nav a {
  text-decoration: none;
  color: #1f2937;
  font-weight: 600;
}

.layout__nav a.router-link-active {
  color: #059669;
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
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: 0.2s ease;
  }

  .layout__nav--open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .layout__toggle {
    display: block;
  }
}
</style>
