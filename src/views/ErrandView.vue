<script setup lang="ts">
import { ref } from 'vue'

const errandList = ref([
  {
    id: 1,
    title: '帮忙取快递',
    location: '菜鸟驿站',
    reward: 5,
    distance: '0.5km',
    time: '10分钟前发布',
    status: 'pending'
  },
  {
    id: 2,
    title: '帮忙打印资料',
    location: '打印店',
    reward: 3,
    distance: '0.8km',
    time: '20分钟前发布',
    status: 'pending'
  },
  {
    id: 3,
    title: '帮忙带饭',
    location: '食堂',
    reward: 4,
    distance: '0.3km',
    time: '30分钟前发布',
    status: 'doing'
  },
  {
    id: 4,
    title: '帮忙取外卖',
    location: '西门外卖柜',
    reward: 3,
    distance: '1.2km',
    time: '1小时前发布',
    status: 'pending'
  },
  {
    id: 5,
    title: '帮忙寄快递',
    location: '顺丰快递点',
    reward: 8,
    distance: '1.5km',
    time: '2小时前发布',
    status: 'pending'
  },
])

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: '待接单',
    doing: '进行中',
    done: '已完成'
  }
  return labels[status] || status
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: '#1890ff',
    doing: 'var(--primary-orange)',
    done: '#52c41a'
  }
  return colors[status] || '#999'
}
</script>

<template>
  <div class="errand-page">
    <div class="page-header">
      <h1>跑腿服务</h1>
      <p>有需求，找人帮你办</p>
    </div>

    <div class="errand-list">
      <div
        v-for="item in errandList"
        :key="item.id"
        class="errand-card"
      >
        <div class="card-left">
          <div class="reward">¥{{ item.reward }}</div>
        </div>
        <div class="card-right">
          <div class="card-header">
            <h3 class="card-title">{{ item.title }}</h3>
            <span class="status-tag" :style="{ background: getStatusColor(item.status) }">
              {{ getStatusLabel(item.status) }}
            </span>
          </div>
          <div class="card-info">
            <span class="location">📍 {{ item.location }}</span>
            <span class="distance">🚶 {{ item.distance }}</span>
          </div>
          <span class="card-time">{{ item.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.errand-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.errand-card {
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.card-left {
  width: 80px;
  background: linear-gradient(180deg, var(--primary-orange) 0%, var(--dark-orange) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.reward {
  font-size: 24px;
  font-weight: 700;
  color: white;
}

.card-right {
  flex: 1;
  padding: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.card-title {
  font-size: 16px;
  color: #333;
  flex: 1;
  margin-right: 12px;
}

.status-tag {
  color: white;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.card-info {
  display: flex;
  gap: 16px;
  margin-bottom: 6px;
}

.location,
.distance {
  font-size: 13px;
  color: #666;
}

.card-time {
  font-size: 12px;
  color: #999;
}

@media (max-width: 640px) {
  .card-left {
    width: 70px;
  }
  
  .reward {
    font-size: 20px;
  }
  
  .card-right {
    padding: 14px;
  }
  
  .card-title {
    font-size: 15px;
  }
  
  .card-info {
    gap: 12px;
  }
}
</style>
