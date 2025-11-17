<template>
  <div class="layout">
    <header class="layout__header">
      <NuxtLink class="logo" to="/">Nuxt Content Demo</NuxtLink>
      <nav>
        <NuxtLink to="/news">お知らせ</NuxtLink>
        <NuxtLink to="/company">会社概要</NuxtLink>
        <a href="/admin" rel="noopener">管理画面</a>
      </nav>
    </header>
    <slot />
    <footer class="layout__footer">
      <p>© {{ new Date().getFullYear() }} Company inc.</p>
      <p>Decap CMS + Nuxt で静的サイトを運用</p>
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

.layout__header nav {
  display: flex;
  gap: 1rem;
}

.layout__header a {
  text-decoration: none;
  color: #1f2937;
  font-weight: 600;
}

.layout__header a.router-link-active {
  color: #059669;
}

.logo {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
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
</style>
