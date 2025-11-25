<template>
  <NuxtLayout>
    <div class="page-container">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<style>
:root {
  font-family: 'Noto Sans JP', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Hiragino Sans',
    sans-serif;
  color: #111827;
  background: #f9fafb;
}

body {
  margin: 0;
  background: #f9fafb;
}

a {
  color: inherit;
}

.page-container {
  width: min(1200px, 100%);
  margin: 0 auto;
}
</style>
