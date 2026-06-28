<script setup lang="ts">
import { ref } from 'vue'

// 统计数据
const stats = ref([
  { label: '商品总数', value: 1289, icon: '商品', trend: '+12%' },
  { label: '今日新增', value: 45, icon: '新', trend: '+8%' },
  { label: '成交订单', value: 367, icon: '单', trend: '+23%' },
  { label: '活跃用户', value: 2341, icon: '人', trend: '+5%' },
])

// 热门分类
const categories = ref([
  { name: '数码电子', count: 342, color: '#ff7c3a' },
  { name: '书籍教材', count: 289, color: '#36cfc9' },
  { name: '生活用品', count: 256, color: '#975a96' },
  { name: '服饰鞋包', count: 198, color: '#fadb14' },
  { name: '运动户外', count: 124, color: '#1890ff' },
])

// 最新动态
const recentActivity = ref([
  { user: '张同学', action: '发布了', item: 'iPhone 14 Pro', time: '5分钟前' },
  { user: '李同学', action: '购买', item: '《高等数学》教材', time: '15分钟前' },
  { user: '王同学', action: '收藏了', item: '二手自行车', time: '30分钟前' },
  { user: '赵同学', action: '发布了', item: '小米充电器', time: '1小时前' },
  { user: '刘同学', action: '购买', item: '台灯', time: '2小时前' },
])
</script>

<template>
  <div class="board-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>数据看板</h1>
      <p>实时了解校园集市动态</p>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-info">
          <div class="stat-value">{{ stat.value.toLocaleString() }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
        <div class="stat-trend">{{ stat.trend }}</div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-grid">
      <!-- 热门分类 -->
      <div class="card category-card">
        <h2 class="card-title">热门分类</h2>
        <div class="category-list">
          <div v-for="cat in categories" :key="cat.name" class="category-item">
            <div class="category-bar">
              <div class="category-fill" :style="{ width: (cat.count / 342 * 100) + '%', background: cat.color }"></div>
            </div>
            <div class="category-info">
              <span class="category-name">{{ cat.name }}</span>
              <span class="category-count">{{ cat.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 最新动态 -->
      <div class="card activity-card">
        <h2 class="card-title">最新动态</h2>
        <div class="activity-list">
          <div v-for="(item, index) in recentActivity" :key="index" class="activity-item">
            <div class="activity-avatar">{{ item.user.charAt(0) }}</div>
            <div class="activity-content">
              <p class="activity-text">
                <span class="activity-user">{{ item.user }}</span>
                {{ item.action }}
                <span class="activity-item-name">{{ item.item }}</span>
              </p>
              <span class="activity-time">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面标题 */
.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 4px;
}

.page-header p {
  color: #666;
  font-size: 14px;
}

/* 统计卡片网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 124, 58, 0.15);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: var(--light-orange);
  color: var(--primary-orange);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  line-height: 1.2;
}

.stat-label {
  font-size: 13px;
  color: #999;
  margin-top: 2px;
}

.stat-trend {
  background: #f0fdf4;
  color: #16a34a;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

/* 内容网格 */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

/* 卡片样式 */
.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.card-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

/* 分类列表 */
.category-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.category-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.category-bar {
  height: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}

.category-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.category-info {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.category-name {
  color: #666;
}

.category-count {
  color: #333;
  font-weight: 500;
}

/* 动态列表 */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.activity-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.activity-avatar {
  width: 36px;
  height: 36px;
  background: var(--primary-orange);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
  padding-top: 4px;
}

.activity-text {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 2px;
}

.activity-user {
  color: #333;
  font-weight: 500;
}

.activity-item-name {
  color: var(--primary-orange);
}

.activity-time {
  font-size: 12px;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 16px;
  }
  
  .stat-value {
    font-size: 24px;
  }
}
</style>
