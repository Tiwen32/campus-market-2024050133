<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const navItems = [
  { path: '/home', label: '首页' },
  { path: '/trade', label: '二手交易' },
  { path: '/lostfound', label: '失物招领' },
  { path: '/groupbuy', label: '拼团' },
  { path: '/errand', label: '跑腿' },
  { path: '/publish', label: '发布' },
  { path: '/message', label: '消息' },
  { path: '/usercenter', label: '个人中心' },
]

const navigateTo = (path: string) => {
  router.push(path)
}

const isActive = (path: string) => {
  return route.path === path
}

defineEmits<{
  closeMenu: []
}>()
</script>

<template>
  <nav class="app-nav">
    <a
      v-for="item in navItems"
      :key="item.path"
      :class="['nav-link', { active: isActive(item.path) }]"
      @click="navigateTo(item.path)"
    >
      {{ item.label }}
    </a>
  </nav>
</template>

<style scoped>
.app-nav {
  display: flex;
  gap: 8px;
}

.nav-link {
  padding: 8px 16px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  font-weight: 500;
}
</style>
