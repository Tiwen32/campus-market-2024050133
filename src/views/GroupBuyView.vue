<script setup lang="ts">
import { ref } from 'vue'

const groupBuyList = ref([
  {
    id: 1,
    title: '零食大礼包拼团',
    image: 'https://via.placeholder.com/200x200/ff7c3a/ffffff?text=Snacks',
    originalPrice: 89,
    groupPrice: 59,
    participants: 3,
    total: 5,
    endTime: '2小时后结束',
    seller: '零食小店'
  },
  {
    id: 2,
    title: '奶茶拼单',
    image: 'https://via.placeholder.com/200x200/36cfc9/ffffff?text=MilkTea',
    originalPrice: 25,
    groupPrice: 18,
    participants: 4,
    total: 5,
    endTime: '1小时后结束',
    seller: '益禾堂'
  },
  {
    id: 3,
    title: '水果拼盘',
    image: 'https://via.placeholder.com/200x200/52c41a/ffffff?text=Fruit',
    originalPrice: 45,
    groupPrice: 32,
    participants: 2,
    total: 4,
    endTime: '3小时后结束',
    seller: '水果店'
  },
  {
    id: 4,
    title: '文具套装',
    image: 'https://via.placeholder.com/200x200/975a96/ffffff?text=Stationery',
    originalPrice: 68,
    groupPrice: 45,
    participants: 1,
    total: 3,
    endTime: '5小时后结束',
    seller: '晨光文具'
  },
])

const getProgress = (participants: number, total: number) => {
  return Math.round((participants / total) * 100)
}
</script>

<template>
  <div class="group-buy-page">
    <div class="page-header">
      <h1>拼团</h1>
      <p>人多力量大，一起省钱</p>
    </div>

    <div class="group-buy-grid">
      <div
        v-for="item in groupBuyList"
        :key="item.id"
        class="group-buy-card"
      >
        <div class="card-image">
          <img :src="item.image" :alt="item.title">
          <span class="end-time">{{ item.endTime }}</span>
        </div>
        <div class="card-content">
          <h3 class="card-title">{{ item.title }}</h3>
          <div class="price-row">
            <span class="group-price">¥{{ item.groupPrice }}</span>
            <span class="original-price">¥{{ item.originalPrice }}</span>
          </div>
          <div class="progress-section">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: getProgress(item.participants, item.total) + '%' }"></div>
            </div>
            <span class="progress-text">{{ item.participants }}/{{ item.total }}人</span>
          </div>
          <span class="seller">{{ item.seller }}</span>
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

.group-buy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.group-buy-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.card-image {
  position: relative;
  width: 100%;
  padding-top: 70%;
  background: #f5f5f5;
}

.card-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.end-time {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
}

.card-content {
  padding: 14px;
}

.card-title {
  font-size: 15px;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
}

.group-price {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-orange);
}

.original-price {
  font-size: 13px;
  color: #999;
  text-decoration: line-through;
}

.progress-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-orange);
  border-radius: 3px;
  transition: width 0.3s;
}

.progress-text {
  font-size: 12px;
  color: #666;
}

.seller {
  font-size: 12px;
  color: #999;
}

@media (max-width: 640px) {
  .group-buy-grid {
    grid-template-columns: 1fr;
  }
}
</style>
