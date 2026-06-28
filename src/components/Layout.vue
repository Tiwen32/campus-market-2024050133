<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)

// 导航菜单配置
const navItems = [
  { path: '/home', label: '首页' },
  { path: '/list', label: '商品列表' },
  { path: '/publish', label: '发布商品' },
  { path: '/message', label: '消息' },
  { path: '/board', label: '数据看板' },
  { path: '/profile', label: '个人中心' },
]

// 判断是否显示导航栏
const showNav = computed(() => {
  return route.meta.showNav !== false
})

// 切换菜单显示
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 导航跳转
const navigateTo = (path: string) => {
  router.push(path)
  isMenuOpen.value = false
}

// 判断当前路由
const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <div class="layout">
    <!-- 顶部导航栏 -->
    <header v-if="showNav" class="header">
      <div class="header-content">
        <div class="logo" @click="navigateTo('/home')">
          <span class="logo-icon">橙</span>
          <span class="logo-text">校园集市</span>
        </div>
        
        <!-- 桌面端导航 -->
        <nav class="nav-desktop">
          <a
            v-for="item in navItems"
            :key="item.path"
            :class="['nav-link', { active: isActive(item.path) }]"
            @click="navigateTo(item.path)"
          >
            {{ item.label }}
          </a>
        </nav>
        
        <!-- 移动端菜单按钮 -->
        <button class="menu-btn" @click="toggleMenu">
          <span :class="['hamburger', { open: isMenuOpen }]"></span>
        </button>
      </div>
      
      <!-- 移动端导航菜单 -->
      <nav v-show="isMenuOpen" class="nav-mobile">
        <a
          v-for="item in navItems"
          :key="item.path"
          :class="['nav-link', { active: isActive(item.path) }]"
          @click="navigateTo(item.path)"
        >
          {{ item.label }}
        </a>
      </nav>
    </header>
    
    <!-- 主内容区 -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* 橙色主题变量 */
:root {
  --primary-orange: #ff7c3a;
  --light-orange: #fff4ed;
  --dark-orange: #e55a1c;
  --text-dark: #333;
  --text-light: #666;
  --bg-gray: #f5f5f5;
}

/* 整体布局 */
.layout {
  min-height: 100vh;
  background: var(--bg-gray);
}

/* 顶部导航栏 */
.header {
  background: var(--primary-orange);
  box-shadow: 0 2px 8px rgba(255, 124, 58, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}

/* Logo 样式 */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-decoration: none;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: white;
  color: var(--primary-orange);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
}

.logo-text {
  color: white;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
}

/* 桌面端导航 */
.nav-desktop {
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

/* 移动端菜单按钮 */
.menu-btn {
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
}

.hamburger {
  display: block;
  width: 22px;
  height: 2px;
  background: white;
  position: relative;
  transition: all 0.3s;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 2px;
  background: white;
  transition: all 0.3s;
}

.hamburger::before {
  top: -7px;
}

.hamburger::after {
  top: 7px;
}

.hamburger.open {
  background: transparent;
}

.hamburger.open::before {
  top: 0;
  transform: rotate(45deg);
}

.hamburger.open::after {
  top: 0;
  transform: rotate(-45deg);
}

/* 移动端导航 */
.nav-mobile {
  display: flex;
  flex-direction: column;
  padding: 8px 16px 16px;
  gap: 4px;
}

.nav-mobile .nav-link {
  padding: 12px 16px;
  border-radius: 8px;
}

/* 主内容区 */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }
  
  .menu-btn {
    display: block;
  }
  
  .logo-text {
    font-size: 16px;
  }
  
  .header-content {
    padding: 0 16px;
  }
  
  .main-content {
    padding: 16px;
  }
}
</style>
