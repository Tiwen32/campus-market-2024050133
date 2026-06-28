<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 商品列表数据
const productList = ref([
  {
    id: 1,
    title: 'iPhone 14 Pro Max 256G',
    price: 5999,
    originalPrice: 7999,
    image: 'https://via.placeholder.com/200x200/ff7c3a/ffffff?text=iPhone',
    location: '计算机学院',
    seller: '张同学',
    time: '2小时前',
    condition: '95新'
  },
  {
    id: 2,
    title: '《高等数学》同济第七版',
    price: 25,
    originalPrice: 49,
    image: 'https://via.placeholder.com/200x200/36cfc9/ffffff?text=Math',
    location: '图书馆',
    seller: '李同学',
    time: '3小时前',
    condition: '8成新'
  },
  {
    id: 3,
    title: '小米电动滑板车',
    price: 1200,
    originalPrice: 1999,
    image: 'https://via.placeholder.com/200x200/975a96/ffffff?text=Scooter',
    location: '学生宿舍区',
    seller: '王同学',
    time: '5小时前',
    condition: '9成新'
  },
  {
    id: 4,
    title: '联想ThinkPad笔记本',
    price: 3500,
    originalPrice: 5500,
    image: 'https://via.placeholder.com/200x200/1890ff/ffffff?text=Laptop',
    location: '工程学院',
    seller: '赵同学',
    time: '昨天',
    condition: '85新'
  },
  {
    id: 5,
    title: '索尼WH-1000XM4耳机',
    price: 980,
    originalPrice: 1599,
    image: 'https://via.placeholder.com/200x200/fadb14/333333?text=Sony',
    location: '体育馆旁',
    seller: '刘同学',
    time: '昨天',
    condition: '9成新'
  },
  {
    id: 6,
    title: '宿舍小风扇',
    price: 35,
    originalPrice: 89,
    image: 'https://via.placeholder.com/200x200/52c41a/ffffff?text=Fan',
    location: '宿舍楼',
    seller: '陈同学',
    time: '3天前',
    condition: '全新'
  },
])

// 跳转详情页
const goToDetail = (id: number) => {
  router.push({
    path: '/detail',
    query: { id: id.toString() }
  })
}
</script>

<template>
  <div class="list-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>商品列表</h1>
      <p>发现校园里的好物</p>
    </div>

    <!-- 商品网格 -->
    <div class="product-grid">
      <div
        v-for="product in productList"
        :key="product.id"
        class="product-card"
        @click="goToDetail(product.id)"
      >
        <div class="product-image">
          <img :src="product.image" :alt="product.title">
          <span class="condition-tag">{{ product.condition }}</span>
        </div>
        <div class="product-info">
          <h3 class="product-title">{{ product.title }}</h3>
          <div class="product-price">
            <span class="current-price">¥{{ product.price }}</span>
            <span class="original-price">¥{{ product.originalPrice }}</span>
          </div>
          <div class="product-meta">
            <span class="location">{{ product.location }}</span>
            <span class="seller">{{ product.seller }}</span>
          </div>
          <span class="product-time">{{ product.time }}</span>
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

/* 商品网格 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* 商品卡片 */
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 124, 58, 0.15);
}

/* 商品图片 */
.product-image {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: #f5f5f5;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.condition-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--primary-orange);
  color: white;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 500;
}

/* 商品信息 */
.product-info {
  padding: 14px;
}

.product-title {
  font-size: 15px;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
}

.current-price {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-orange);
}

.original-price {
  font-size: 13px;
  color: #999;
  text-decoration: line-through;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
}

.product-time {
  font-size: 12px;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
