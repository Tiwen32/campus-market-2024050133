<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/trade', label: '交易', icon: '📦' },
  { path: '/publish', label: '发布', icon: '📝', isPublish: true },
  { path: '/message', label: '消息', icon: '💬' },
  { path: '/user', label: '我的', icon: '👤' },
]

const navigateTo = (path: string) => {
  router.push(path)
}

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <footer class="app-footer">
    <div class="footer-nav">
      <a
        v-for="item in navItems"
        :key="item.path"
        :class="['nav-item', { active: isActive(item.path), publish: item.isPublish }]"
        @click="navigateTo(item.path)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </a>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #f0f0f0;
  z-index: 100;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.footer-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-icon {
  font-size: 22px;
}

.nav-label {
  font-size: 11px;
  color: #666;
}

.nav-item.active .nav-label {
  color: var(--primary-orange);
}

.nav-item.publish {
  position: relative;
  top: -10px;
}

.nav-item.publish .nav-icon {
  background: var(--primary-orange);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(255, 124, 58, 0.4);
}

.nav-item.publish .nav-label {
  display: none;
}

@media (max-width: 768px) {
  .app-footer {
    display: block;
  }
}
</style>