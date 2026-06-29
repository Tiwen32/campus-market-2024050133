<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTrades, type Trade } from '@/api/trade'
import CategoryEntry from '@/components/CategoryEntry.vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductDetail from '@/components/ProductDetail.vue'

const router = useRouter()

const currentSlide = ref(0)
const showDetail = ref(false)
const selectedProduct = ref<Trade | null>(null)
const products = ref<Trade[]>([])

const banners = [
  {
    id: 1,
    image: 'https://www.logosc.cn/uploads/output/2021/04/26/7577b047d9b3a8eb10b2d02713199eff.jpg?t=1622122296',
    title: '校园二手交易季',
    subtitle: '低价好物等你来淘',
    path: '/trade',
  },
  {
    id: 2,
    image: 'https://ts2.tc.mm.bing.net/th/id/OIP-C.8yCV6P5TP38Jt_5m0OOcfwHaEZ?rs=1&pid=ImgDetMain&o=7&rm=3',
    title: '毕业季清仓',
    subtitle: '学长学姐好物大放送',
    path: '/trade',
  },
  {
    id: 3,
    image: 'https://ts4.tc.mm.bing.net/th/id/OIP-C.9esNSkrA4lPHnUqr2Bl_LQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3',
    title: '拼单更优惠',
    subtitle: '组队省钱，快乐加倍',
    path: '/group-buy',
  },
]

const categories = [
  { icon: '📦', name: '二手交易', path: '/trade', color: 'linear-gradient(135deg, #ff7c3a 0%, #ff9a56 100%)' },
  { icon: '🔍', name: '失物招领', path: '/lost-found', color: 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)' },
  { icon: '🤝', name: '拼单搭子', path: '/group-buy', color: 'linear-gradient(135deg, #00b894 0%, #55efc4 100%)' },
  { icon: '🏃', name: '跑腿委托', path: '/errand', color: 'linear-gradient(135deg, #fdcb6e 0%, #ffeaa7 100%)' },
  { icon: '📝', name: '发布信息', path: '/publish', color: 'linear-gradient(135deg, #e17055 0%, #fab1a0 100%)' },
  { icon: '💬', name: '消息中心', path: '/message', color: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)' },
]

const handleBannerClick = (path: string) => {
  router.push(path)
}

const handleProductView = (product: Trade) => {
  selectedProduct.value = product
  showDetail.value = true
}

const handleCloseDetail = () => {
  showDetail.value = false
}

const fetchProducts = async () => {
  try {
    const response = await getTrades()
    products.value = response.data.slice(0, 6)
  } catch (error) {
    console.error('获取推荐商品失败:', error)
  }
}

onMounted(() => {
  fetchProducts()

  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % banners.length
  }, 4000)
})
</script>

<template>
  <div class="home-page">
    <div class="banner-section">
      <div class="banner-container">
        <div
          v-for="(banner, index) in banners"
          :key="banner.id"
          :class="['banner-slide', { active: currentSlide === index }]"
          @click="handleBannerClick(banner.path)"
        >
          <div class="banner-content">
            <h2>{{ banner.title }}</h2>
            <p>{{ banner.subtitle }}</p>
          </div>
          <img :src="banner.image" :alt="banner.title" />
        </div>
      </div>
      <div class="banner-indicators">
        <span
          v-for="(_, index) in banners"
          :key="index"
          :class="['indicator', { active: currentSlide === index }]"
        ></span>
      </div>
    </div>

    <div class="category-section">
      <h2 class="section-title">业务分类</h2>
      <div class="category-grid">
        <CategoryEntry
          v-for="cat in categories"
          :key="cat.path"
          :icon="cat.icon"
          :name="cat.name"
          :path="cat.path"
          :color="cat.color"
        />
      </div>
    </div>

    <div class="products-section">
      <div class="section-header">
        <h2 class="section-title">热门推荐</h2>
        <button class="view-all" @click="router.push('/trade')">查看全部 →</button>
      </div>
      <div class="products-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @view="handleProductView"
        />
      </div>
    </div>

    <div class="features-section">
      <div class="feature-card">
        <span class="feature-icon">✅</span>
        <h3>安全交易</h3>
        <p>实名认证，放心交易</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🚀</span>
        <h3>快速响应</h3>
        <p>同城配送，即时送达</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">💰</span>
        <h3>超值优惠</h3>
        <p>低价好物，省钱省心</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🎓</span>
        <h3>校园专属</h3>
        <p>师生认证，专属福利</p>
      </div>
    </div>

    <ProductDetail
      v-if="selectedProduct"
      :product="selectedProduct"
      :visible="showDetail"
      @close="handleCloseDetail"
    />
  </div>
</template>

<style scoped>
.home-page {
  padding: 24px 0;
}

.banner-section {
  position: relative;
  margin-bottom: 32px;
}

.banner-container {
  height: 280px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.banner-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
  display: flex;
  align-items: center;
}

.banner-slide.active {
  opacity: 1;
}

.banner-slide img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-content {
  position: relative;
  z-index: 1;
  padding: 0 60px;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.banner-content h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
}

.banner-content p {
  font-size: 18px;
  opacity: 0.9;
}

.banner-indicators {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.indicator {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transition: all 0.3s;
  cursor: pointer;
}

.indicator.active {
  width: 24px;
  border-radius: 5px;
  background: white;
}

.category-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.products-section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.view-all {
  background: none;
  border: none;
  color: var(--primary-orange);
  font-size: 14px;
  cursor: pointer;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.features-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 32px;
  padding: 24px;
  background: white;
  border-radius: 16px;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
}

.feature-icon {
  font-size: 32px;
}

.feature-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.feature-card p {
  font-size: 13px;
  color: #666;
}

@media (max-width: 900px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .features-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .banner-container {
    height: 200px;
  }

  .banner-content {
    padding: 0 24px;
  }

  .banner-content h2 {
    font-size: 24px;
  }

  .banner-content p {
    font-size: 14px;
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .features-section {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
