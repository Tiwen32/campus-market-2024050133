<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import product1 from '@/assets/images/products/product-1.svg'
import product2 from '@/assets/images/products/product-2.svg'
import product3 from '@/assets/images/products/product-3.svg'
import product4 from '@/assets/images/products/product-4.svg'
import product5 from '@/assets/images/products/product-5.svg'
import product6 from '@/assets/images/products/product-6.svg'

const route = useRoute()
const router = useRouter()

// 商品详情数据（静态示例）
const productDetail = ref({
  id: 0,
  title: '',
  price: 0,
  originalPrice: 0,
  description: '',
  images: [] as string[],
  location: '',
  seller: '',
  sellerAvatar: '',
  contact: '',
  time: '',
  condition: '',
  views: 0,
  likes: 0
})

// 所有商品数据（用于根据 id 查找）
const allProducts = [
  {
    id: 1,
    title: 'iPhone 14 Pro Max 256G 暗紫色',
    price: 5999,
    originalPrice: 7999,
    description: '2023年3月购入，一直贴膜戴壳使用，成色很好。电池健康度96%，无任何维修记录。配件齐全（充电器、数据线、说明书）。因换新机出售，价格可小刀。',
    images: [product1],
    location: '计算机学院',
    seller: '张同学',
    sellerAvatar: '张',
    contact: '手机/微信：138****8888',
    time: '2小时前发布',
    condition: '95新',
    views: 328,
    likes: 45
  },
  {
    id: 2,
    title: '《高等数学》同济第七版',
    price: 25,
    originalPrice: 49,
    description: '大二上学期用书，笔记较少，主要在第一章有少量标注。书角有轻微折痕但不影响使用。适合学弟学妹们捡漏。',
    images: [product2],
    location: '图书馆',
    seller: '李同学',
    sellerAvatar: '李',
    contact: 'QQ：123456789',
    time: '3小时前发布',
    condition: '8成新',
    views: 156,
    likes: 12
  },
  {
    id: 3,
    title: '小米电动滑板车 Pro',
    price: 1200,
    originalPrice: 1999,
    description: '2022年双十一购买，主要用于短途代步。续航约45公里，最高时速25km/h。车身有轻微划痕（见照片），不影响使用。附送原装充电器和车锁。',
    images: [product3],
    location: '学生宿舍区',
    seller: '王同学',
    sellerAvatar: '王',
    contact: '微信同号',
    time: '5小时前发布',
    condition: '9成新',
    views: 256,
    likes: 38
  },
  {
    id: 4,
    title: '联想ThinkPad T490笔记本',
    price: 3500,
    originalPrice: 5500,
    description: '研究生期间使用，配置：i5-8265U/8G/512G SSD。运行流畅，用于编程和文档处理完全足够。键盘手感好，接口丰富。因毕业低价出。',
    images: [product4],
    location: '工程学院',
    seller: '赵同学',
    sellerAvatar: '赵',
    contact: '手机：139****6666',
    time: '昨天发布',
    condition: '85新',
    views: 412,
    likes: 56
  },
  {
    id: 5,
    title: '索尼WH-1000XM4降噪耳机',
    price: 980,
    originalPrice: 1599,
    description: '考研期间用来隔音，效果很好。现在已上岸用不上了。降噪效果出色，续航给力。有原装收纳盒和耳机线。',
    images: [product5],
    location: '体育馆旁',
    seller: '刘同学',
    sellerAvatar: '刘',
    contact: '微信可私',
    time: '昨天发布',
    condition: '9成新',
    views: 289,
    likes: 42
  },
  {
    id: 6,
    title: '宿舍静音小风扇',
    price: 35,
    originalPrice: 89,
    description: '夏天神器，可充电款，续航持久。买了空调后就闲置了。功率小省电，睡觉时用很安静。',
    images: [product6],
    location: '宿舍楼',
    seller: '陈同学',
    sellerAvatar: '陈',
    contact: 'QQ：987654321',
    time: '3天前发布',
    condition: '全新',
    views: 98,
    likes: 8
  }
]

// 返回列表页
const goBack = () => {
  router.push('/list')
}

// 收藏功能
const isLiked = ref(false)
const toggleLike = () => {
  isLiked.value = !isLiked.value
  productDetail.value.likes += isLiked.value ? 1 : -1
}

onMounted(() => {
  // 获取路由参数中的 id
  const productId = parseInt(route.query.id as string) || 1

  // 查找对应的商品数据
  const product = allProducts.find(p => p.id === productId)
  if (product) {
    productDetail.value = product
  }
})
</script>

<template>
  <div class="detail-page">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">
      <span class="back-icon">←</span>
      返回列表
    </button>

    <!-- 商品详情主内容 -->
    <div class="detail-content">
      <!-- 左侧图片 -->
      <div class="detail-images">
        <div class="main-image">
          <img :src="productDetail.images[0]" :alt="productDetail.title">
        </div>
        <div class="thumbnail-list" v-if="productDetail.images.length > 1">
          <div
            v-for="(img, index) in productDetail.images"
            :key="index"
            class="thumbnail"
          >
            <img :src="img" :alt="'图片' + (index + 1)">
          </div>
        </div>
      </div>

      <!-- 右侧信息 -->
      <div class="detail-info">
        <div class="info-header">
          <span class="condition-tag">{{ productDetail.condition }}</span>
          <h1 class="product-title">{{ productDetail.title }}</h1>
        </div>

        <div class="price-section">
          <span class="current-price">¥{{ productDetail.price }}</span>
          <span class="original-price">原价 ¥{{ productDetail.originalPrice }}</span>
          <span class="discount">{{ Math.round(productDetail.price / productDetail.originalPrice * 10) }}折</span>
        </div>

        <div class="meta-section">
          <div class="meta-item">
            <span class="meta-label">发布时间</span>
            <span class="meta-value">{{ productDetail.time }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">交易地点</span>
            <span class="meta-value">{{ productDetail.location }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">浏览量</span>
            <span class="meta-value">{{ productDetail.views }}</span>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <button class="btn-primary" @click="toggleLike">
            <span :class="['heart-icon', { liked: isLiked }]">{{ isLiked ? '♥' : '♡' }}</span>
            {{ isLiked ? '已收藏' : '收藏' }} ({{ productDetail.likes }})
          </button>
          <button class="btn-secondary">联系卖家</button>
        </div>

        <!-- 卖家信息 -->
        <div class="seller-section">
          <div class="seller-avatar">{{ productDetail.sellerAvatar }}</div>
          <div class="seller-info">
            <span class="seller-name">{{ productDetail.seller }}</span>
            <span class="seller-contact">{{ productDetail.contact }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="description-section">
      <h2 class="section-title">商品描述</h2>
      <p class="description-text">{{ productDetail.description }}</p>
    </div>
  </div>
</template>

<style scoped>
/* 返回按钮 */
.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 20px;
  transition: color 0.2s;
}

.back-btn:hover {
  color: var(--primary-orange);
}

.back-icon {
  font-size: 18px;
}

/* 详情内容布局 */
.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* 图片区域 */
.detail-images {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.main-image {
  width: 100%;
  aspect-ratio: 1;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-list {
  display: flex;
  gap: 8px;
}

.thumbnail {
  width: 72px;
  height: 72px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.thumbnail:hover {
  border-color: var(--primary-orange);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 信息区域 */
.detail-info {
  display: flex;
  flex-direction: column;
}

.info-header {
  margin-bottom: 16px;
}

.condition-tag {
  display: inline-block;
  background: var(--light-orange);
  color: var(--primary-orange);
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.product-title {
  font-size: 22px;
  color: #333;
  line-height: 1.4;
}

/* 价格区域 */
.price-section {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 16px;
}

.current-price {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-orange);
}

.original-price {
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
}

.discount {
  background: #fff0e6;
  color: var(--dark-orange);
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

/* 元信息区域 */
.meta-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.meta-label {
  color: #999;
}

.meta-value {
  color: #333;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.btn-primary,
.btn-secondary {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary-orange);
  color: white;
  border: none;
}

.btn-primary:hover {
  background: var(--dark-orange);
}

.btn-secondary {
  background: white;
  color: var(--primary-orange);
  border: 1px solid var(--primary-orange);
}

.btn-secondary:hover {
  background: var(--light-orange);
}

.heart-icon {
  margin-right: 4px;
}

.heart-icon.liked {
  color: #f5222d;
}

/* 卖家信息 */
.seller-section {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
}

.seller-avatar {
  width: 44px;
  height: 44px;
  background: var(--primary-orange);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
}

.seller-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.seller-name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.seller-contact {
  font-size: 13px;
  color: #666;
}

/* 商品描述 */
.description-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.section-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.description-text {
  font-size: 15px;
  color: #666;
  line-height: 1.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .main-image {
    aspect-ratio: 4/3;
  }

  .current-price {
    font-size: 28px;
  }
}
</style>
