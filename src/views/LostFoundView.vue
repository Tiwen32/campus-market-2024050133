<script setup lang="ts">
import { ref } from 'vue'

const lostFoundList = ref([
  {
    id: 1,
    type: 'lost',
    title: '校园卡丢失',
    location: '图书馆三楼',
    time: '1小时前',
    description: '今天下午在图书馆三楼自习时丢失了校园卡，卡号为2022001001，姓名张同学。',
    contact: '138****8888'
  },
  {
    id: 2,
    type: 'found',
    title: '捡到钱包',
    location: '食堂二楼',
    time: '2小时前',
    description: '在食堂二楼捡到一个黑色钱包，里面有身份证和一些现金，请失主联系我。',
    contact: '139****6666'
  },
  {
    id: 3,
    type: 'lost',
    title: '蓝牙耳机丢失',
    location: '教学楼A栋',
    time: '3小时前',
    description: 'AirPods Pro，白色充电盒，在教学楼A栋302教室丢失。',
    contact: 'QQ：123456789'
  },
  {
    id: 4,
    type: 'found',
    title: '捡到雨伞',
    location: '体育馆门口',
    time: '5小时前',
    description: '蓝色折叠伞，在体育馆门口捡到。',
    contact: '137****9999'
  },
])

const getTypeLabel = (type: string) => {
  return type === 'lost' ? '寻物启事' : '失物招领'
}

const getTypeColor = (type: string) => {
  return type === 'lost' ? 'var(--primary-orange)' : '#52c41a'
}
</script>

<template>
  <div class="lost-found-page">
    <div class="page-header">
      <h1>失物招领</h1>
      <p>帮助他人，温暖校园</p>
    </div>

    <div class="lost-found-list">
      <div
        v-for="item in lostFoundList"
        :key="item.id"
        class="lost-found-card"
      >
        <div class="card-header">
          <span class="type-tag" :style="{ background: getTypeColor(item.type) }">
            {{ getTypeLabel(item.type) }}
          </span>
          <span class="card-time">{{ item.time }}</span>
        </div>
        <h3 class="card-title">{{ item.title }}</h3>
        <p class="card-desc">{{ item.description }}</p>
        <div class="card-meta">
          <span class="location">📍 {{ item.location }}</span>
          <span class="contact">📱 {{ item.contact }}</span>
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

.lost-found-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.lost-found-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.type-tag {
  color: white;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 500;
}

.card-time {
  font-size: 12px;
  color: #999;
}

.card-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 12px;
}

.card-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #666;
}

@media (max-width: 640px) {
  .lost-found-card {
    padding: 16px;
  }
  
  .card-meta {
    flex-direction: column;
    gap: 6px;
  }
}
</style>
