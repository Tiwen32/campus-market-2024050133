<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppNav from './AppNav.vue'

const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)

const showNav = computed(() => {
  return route.meta.showNav !== false
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const goHome = () => {
  router.push('/')
  isMenuOpen.value = false
}
</script>

<template>
  <header v-if="showNav" class="app-header">
    <div class="header-content">
      <div class="logo" @click="goHome">
        <span class="logo-icon">橙</span>
        <span class="logo-text">校园集市</span>
      </div>
      
      <AppNav />
      
      <button class="menu-btn" @click="toggleMenu">
        <span :class="['hamburger', { open: isMenuOpen }]"></span>
      </button>
    </div>
    
    <nav v-show="isMenuOpen" class="nav-mobile">
      <AppNav />
    </nav>
  </header>
</template>

<style scoped>
.app-header {
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

@media (max-width: 768px) {
  .app-nav {
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
}
</style>
