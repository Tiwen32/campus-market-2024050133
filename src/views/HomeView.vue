<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 快捷入口
const quickActions = ref([
  { path: '/publish', icon: '发布', title: '发布商品', desc: '快速发布闲置物品' },
  { path: '/list', icon: '列表', title: '商品列表', desc: '浏览全部商品' },
  { path: '/board', icon: '看板', title: '数据看板', desc: '查看市场统计' },
  { path: '/message', icon: '消息', title: '消息中心', desc: '查看我的消息' },
])

// 跳转功能
const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="home-page">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <div class="welcome-content">
        <h1 class="welcome-title">欢迎来到校园集市</h1>
        <p class="welcome-desc">一个安全、便捷的校园二手交易平台</p>
      </div>
      <div class="welcome-decoration">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="quick-actions">
      <div
        v-for="action in quickActions"
        :key="action.path"
        class="action-card"
        @click="navigateTo(action.path)"
      >
        <div class="action-icon">{{ action.icon }}</div>
        <div class="action-info">
          <h3>{{ action.title }}</h3>
          <p>{{ action.desc }}</p>
        </div>
        <span class="action-arrow">→</span>
      </div>
    </div>

    <!-- 提示信息 -->
    <div class="tips-section">
      <h2 class="tips-title">使用提示</h2>
      <div class="tips-grid">
        <div class="tip-card">
          <span class="tip-icon">1</span>
          <p>浏览商品列表，发现心仪好物</p>
        </div>
        <div class="tip-card">
          <span class="tip-icon">2</span>
          <p>点击商品卡片，查看详细信息</p>
        </div>
        <div class="tip-card">
          <span class="tip-icon">3</span>
          <p>联系卖家，线下交易更安全</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 欢迎区域 */
.welcome-section {
  background: linear-gradient(135deg, var(--primary-orange) 0%, var(--dark-orange) 100%);
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
}

.welcome-content {
  position: relative;
  z-index: 1;
}

.welcome-title {
  font-size: 28px;
  color: white;
  margin-bottom: 8px;
  font-weight: 600;
}

.welcome-desc {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.welcome-decoration {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 200px;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 120px;
  height: 120px;
  top: -20px;
  right: 20px;
}

.circle-2 {
  width: 80px;
  height: 80px;
  bottom: -10px;
  right: 100px;
}

/* 快捷入口 */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.action-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 124, 58, 0.15);
}

.action-icon {
  width: 56px;
  height: 56px;
  background: var(--light-orange);
  color: var(--primary-orange);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
}

.action-info h3 {
  font-size: 15px;
  color: #333;
  margin-bottom: 4px;
}

.action-info p {
  font-size: 12px;
  color: #999;
}

.action-arrow {
  font-size: 18px;
  color: #ddd;
  transition: color 0.2s;
}

.action-card:hover .action-arrow {
  color: var(--primary-orange);
}

/* 提示信息 */
.tips-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.tips-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 16px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.tip-card {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tip-icon {
  width: 32px;
  height: 32px;
  background: var(--light-orange);
  color: var(--primary-orange);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.tip-card p {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .tips-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .welcome-section {
    padding: 24px;
  }
  
  .welcome-title {
    font-size: 22px;
  }
  
  .quick-actions {
    grid-template-columns: 1fr;
  }
}
</style>
