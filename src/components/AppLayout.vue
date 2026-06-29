<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    <main class="main-content">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: var(--bg-gray);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  padding-bottom: 100px;
}

@media (max-width: 768px) {
  .main-content {
    padding: 16px;
    padding-bottom: 80px;
  }
}
</style>
