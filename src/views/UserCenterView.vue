<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useFavoriteStore } from '@/stores/favorite'
import { useProductStore } from '@/stores/products'
import { getTrades, type Trade } from '@/api/trade'
import { getLostFounds, type LostFound } from '@/api/lostFound'
import { getGroupBuys, type GroupBuy } from '@/api/groupBuy'
import { getErrands, type Errand } from '@/api/errand'

const router = useRouter()
const userStore = useUserStore()
const favoriteStore = useFavoriteStore()
const productStore = useProductStore()

const activeTab = ref<'profile' | 'my-publish' | 'favorites' | 'cart'>('profile')
const showDetail = ref(false)
const selectedProduct = ref<Trade | LostFound | GroupBuy | Errand | null>(null)

const userStats = ref({
  publishCount: 0,
  tradeCount: 12,
  rating: 4.9,
})

const myTrades = ref<Trade[]>([])
const myLostFounds = ref<LostFound[]>([])
const myGroupBuys = ref<GroupBuy[]>([])
const myErrands = ref<Errand[]>([])

const fetchMyPublish = async () => {
  const userId = Number(userStore.currentUser.id)
  try {
    const [tradeRes, lostRes, groupRes, errandRes] = await Promise.all([
      getTrades(),
      getLostFounds(),
      getGroupBuys(),
      getErrands(),
    ])
    myTrades.value = tradeRes.data.filter(t => t.sellerId === userId)
    myLostFounds.value = lostRes.data.filter(l => l.publisherId === userId)
    myGroupBuys.value = groupRes.data.filter(g => g.organizerId === userId)
    myErrands.value = errandRes.data.filter(e => e.requesterId === userId)
    userStats.value.publishCount = myTrades.value.length + myLostFounds.value.length + myGroupBuys.value.length + myErrands.value.length
  } catch (error) {
    console.error('获取我的发布失败:', error)
  }
}

const handleProductView = (product: Trade | LostFound | GroupBuy | Errand) => {
  selectedProduct.value = product
  showDetail.value = true
}

const handleCloseDetail = () => {
  showDetail.value = false
}

const handleLike = (itemId: string | number, type: 'trade' | 'lostFound' | 'groupBuy' | 'errand') => {
  const item = favoriteStore.favorites.find(f => f.id === String(itemId) && f.type === type)?.item
  if (item) {
    favoriteStore.toggleFavorite(item, type)
  }
}

const removeFromCart = (productId: string) => {
  productStore.removeFromCart(productId)
}

const navigateTo = (path: string) => {
  router.push(path)
}

onMounted(() => {
  fetchMyPublish()
})
</script>

<template>
  <div class="user-center-page">
    <div class="user-profile-card">
      <div class="profile-avatar">
        <span class="avatar-icon">👤</span>
      </div>
      <div class="profile-info">
        <h2 class="profile-name">{{ userStore.currentUser.name }}</h2>
        <p class="profile-campus">{{ userStore.currentUser.campus }}</p>
        <p class="profile-phone">{{ userStore.currentUser.phone }}</p>
      </div>
      <button class="edit-btn" @click="navigateTo('/publish')">编辑资料</button>
    </div>

    <div class="stats-row">
      <div class="stat-item">
        <span class="stat-value">{{ userStats.publishCount }}</span>
        <span class="stat-label">发布</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ userStats.tradeCount }}</span>
        <span class="stat-label">交易</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ userStats.rating }}</span>
        <span class="stat-label">评分</span>
      </div>
    </div>

    <div class="tab-bar">
      <button
        :class="['tab-btn', { active: activeTab === 'profile' }]"
        @click="activeTab = 'profile'"
      >
        <span>👤</span>
        <span>我的主页</span>
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'my-publish' }]"
        @click="activeTab = 'my-publish'"
      >
        <span>📦</span>
        <span>我的发布</span>
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'favorites' }]"
        @click="activeTab = 'favorites'"
      >
        <span>❤️</span>
        <span>我的收藏</span>
        <span v-if="favoriteStore.favoriteCount > 0" class="badge">
          {{ favoriteStore.favoriteCount }}
        </span>
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'cart' }]"
        @click="activeTab = 'cart'"
      >
        <span>🛒</span>
        <span>购物车</span>
        <span v-if="productStore.cartCount > 0" class="badge">
          {{ productStore.cartCount }}
        </span>
      </button>
    </div>

    <div v-if="activeTab === 'profile'" class="profile-content">
      <div class="quick-actions">
        <div class="action-item" @click="navigateTo('/publish')">
          <span class="action-icon">📝</span>
          <span>发布信息</span>
        </div>
        <div class="action-item" @click="navigateTo('/trade')">
          <span class="action-icon">🔍</span>
          <span>浏览商品</span>
        </div>
        <div class="action-item" @click="navigateTo('/message')">
          <span class="action-icon">💬</span>
          <span>消息通知</span>
        </div>
        <div class="action-item" @click="navigateTo('/lost-found')">
          <span class="action-icon">🔔</span>
          <span>失物招领</span>
        </div>
      </div>

      <div class="recent-activity">
        <h3 class="section-title">最近发布</h3>
        <div v-if="myTrades.length > 0" class="products-grid">
          <div
            v-for="product in myTrades.slice(0, 6)"
            :key="product.id"
            class="mini-product-card"
            @click="handleProductView(product)"
          >
            <div class="mini-image">
              <img :src="product.image" :alt="product.title" />
              <span v-if="product.status === 'closed'" class="sold-tag">已售</span>
            </div>
            <div class="mini-info">
              <p class="mini-title">{{ product.title }}</p>
              <span class="mini-price">¥{{ product.price }}</span>
            </div>
          </div>
        </div>
        <div v-else class="empty-section">
          <span class="empty-icon">📦</span>
          <p>暂无发布内容</p>
          <button class="empty-btn" @click="navigateTo('/publish')">去发布</button>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'my-publish'" class="content-section">
      <div v-if="myTrades.length > 0" class="products-list">
        <div
          v-for="product in myTrades"
          :key="product.id"
          class="publish-item"
        >
          <div class="publish-image" @click="handleProductView(product)">
            <img :src="product.image" :alt="product.title" />
          </div>
          <div class="publish-info">
            <h4 class="publish-title">{{ product.title }}</h4>
            <p class="publish-desc">{{ product.description.slice(0, 30) }}...</p>
            <div class="publish-meta">
              <span class="publish-price">¥{{ product.price }}</span>
              <span class="publish-status">{{ product.status === 'closed' ? '已售出' : '在售' }}</span>
              <span class="publish-time">{{ product.publishTime }}</span>
            </div>
          </div>
          <div class="publish-actions">
            <button class="action-btn edit">编辑</button>
            <button class="action-btn delete">删除</button>
          </div>
        </div>
      </div>
      <div v-if="myLostFounds.length > 0" class="products-list">
        <div
          v-for="item in myLostFounds"
          :key="item.id"
          class="publish-item"
        >
          <div class="publish-image" @click="handleProductView(item)">
            <img :src="item.image" :alt="item.title" />
          </div>
          <div class="publish-info">
            <h4 class="publish-title">{{ item.title }}</h4>
            <p class="publish-desc">{{ item.description.slice(0, 30) }}...</p>
            <div class="publish-meta">
              <span class="publish-price">{{ item.type === 'lost' ? '寻物' : '招领' }}</span>
              <span class="publish-status">{{ item.status === 'closed' ? '已解决' : '进行中' }}</span>
              <span class="publish-time">{{ item.time }}</span>
            </div>
          </div>
          <div class="publish-actions">
            <button class="action-btn edit">编辑</button>
            <button class="action-btn delete">删除</button>
          </div>
        </div>
      </div>
      <div v-if="myGroupBuys.length > 0" class="products-list">
        <div
          v-for="item in myGroupBuys"
          :key="item.id"
          class="publish-item"
        >
          <div class="publish-image" @click="handleProductView(item)">
            <img :src="item.image" :alt="item.title" />
          </div>
          <div class="publish-info">
            <h4 class="publish-title">{{ item.title }}</h4>
            <p class="publish-desc">{{ item.description.slice(0, 30) }}...</p>
            <div class="publish-meta">
              <span class="publish-price">¥{{ item.price }}</span>
              <span class="publish-status">{{ item.status === 'completed' ? '已完成' : (item.status === 'failed' ? '已失败' : '进行中') }}</span>
              <span class="publish-time">{{ item.deadline }}</span>
            </div>
          </div>
          <div class="publish-actions">
            <button class="action-btn edit">编辑</button>
            <button class="action-btn delete">删除</button>
          </div>
        </div>
      </div>
      <div v-if="myErrands.length > 0" class="products-list">
        <div
          v-for="item in myErrands"
          :key="item.id"
          class="publish-item"
        >
          <div class="publish-image" @click="handleProductView(item)">
            <img :src="item.image" :alt="item.title" />
          </div>
          <div class="publish-info">
            <h4 class="publish-title">{{ item.title }}</h4>
            <p class="publish-desc">{{ item.description.slice(0, 30) }}...</p>
            <div class="publish-meta">
              <span class="publish-price">¥{{ item.reward }}</span>
              <span class="publish-status">{{ item.status === 'completed' ? '已完成' : (item.status === 'inProgress' ? '进行中' : '待接单') }}</span>
              <span class="publish-time">{{ item.time }}</span>
            </div>
          </div>
          <div class="publish-actions">
            <button class="action-btn edit">编辑</button>
            <button class="action-btn delete">删除</button>
          </div>
        </div>
      </div>
      <div v-if="myTrades.length === 0 && myLostFounds.length === 0 && myGroupBuys.length === 0 && myErrands.length === 0" class="empty-section">
        <span class="empty-icon">📦</span>
        <p>暂无发布内容</p>
        <button class="empty-btn" @click="navigateTo('/publish')">去发布</button>
      </div>
    </div>

    <div v-if="activeTab === 'favorites'" class="content-section">
      <div v-if="favoriteStore.tradeFavorites.length > 0" class="products-grid">
        <div
          v-for="item in favoriteStore.tradeFavorites"
          :key="item.id"
          class="favorite-card"
        >
          <div class="card-image" @click="handleProductView(item)">
            <img :src="item.image" :alt="item.title" />
          </div>
          <div class="card-info">
            <h4 class="card-title">{{ item.title }}</h4>
            <p class="card-price">¥{{ item.price }}</p>
            <p class="card-seller">{{ item.sellerName }}</p>
          </div>
          <button
            class="unlike-btn"
            @click="handleLike(item.id, 'trade')"
          >
            ❤️
          </button>
        </div>
      </div>
      <div v-else class="empty-section">
        <span class="empty-icon">❤️</span>
        <p>暂无收藏商品</p>
        <button class="empty-btn" @click="navigateTo('/trade')">去逛逛</button>
      </div>
    </div>

    <div v-if="activeTab === 'cart'" class="content-section">
      <div v-if="productStore.cartItems.length > 0" class="cart-list">
        <div
          v-for="item in productStore.cartItems"
          :key="item.id"
          class="cart-item"
        >
          <div class="cart-image" @click="handleProductView(item)">
            <img :src="item.image" :alt="item.title" />
          </div>
          <div class="cart-info">
            <h4 class="cart-title">{{ item.title }}</h4>
            <p class="cart-price">¥{{ item.price }}</p>
            <p class="cart-seller">{{ item.sellerName }}</p>
          </div>
          <div class="cart-actions">
            <button class="remove-btn" @click="removeFromCart(item.id)">删除</button>
          </div>
        </div>
        <div class="cart-footer">
          <div class="cart-total">
            <span>共 {{ productStore.cartCount }} 件商品</span>
          </div>
        </div>
      </div>
      <div v-else class="empty-section">
        <span class="empty-icon">🛒</span>
        <p>购物车是空的</p>
        <button class="empty-btn" @click="navigateTo('/trade')">去购物</button>
      </div>
    </div>

    <div class="logout-section">
      <button class="logout-btn" @click="userStore.logout()">退出登录</button>
    </div>

    <Teleport to="body">
      <div v-if="showDetail && selectedProduct" class="modal-overlay" @click="handleCloseDetail">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="handleCloseDetail">✕</button>

          <div class="detail-header">
            <div class="detail-image">
              <img :src="selectedProduct.image" :alt="selectedProduct.title" />
            </div>
            <div class="detail-info">
              <h2 class="detail-title">{{ selectedProduct.title }}</h2>
              <div class="detail-price">
                <span class="price">¥{{ selectedProduct.price }}</span>
                <span v-if="selectedProduct.originalPrice" class="original-price">¥{{ selectedProduct.originalPrice }}</span>
              </div>
              <div class="detail-meta">
                <span class="category">{{ selectedProduct.category }}</span>
                <span class="campus">{{ selectedProduct.campus }}</span>
              </div>
            </div>
          </div>

          <div class="detail-body">
            <h3>商品描述</h3>
            <p>{{ selectedProduct.description }}</p>
          </div>

          <div class="detail-footer">
            <button class="btn-secondary" @click="handleLike(selectedProduct.id)">
              {{ selectedProduct.isLiked ? '❤️ 已喜欢' : '🤍 喜欢' }}
            </button>
            <button class="btn-primary">联系卖家</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.user-center-page {
  padding: 24px 0;
  max-width: 800px;
  margin: 0 auto;
}

.user-profile-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, var(--primary-orange) 0%, #ff9a56 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  font-size: 40px;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 6px;
}

.profile-campus {
  font-size: 15px;
  opacity: 0.9;
  margin-bottom: 4px;
}

.profile-phone {
  font-size: 14px;
  opacity: 0.8;
}

.edit-btn {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.edit-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.stats-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.stat-item {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-orange);
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.tab-bar {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 6px;
  margin-bottom: 20px;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 14px;
  background: none;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.tab-btn.active {
  background: var(--primary-orange);
  color: white;
}

.badge {
  position: absolute;
  top: 8px;
  right: 20px;
  background: #e17055;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;
}

.tab-btn.active .badge {
  background: white;
  color: var(--primary-orange);
}

.profile-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #fafafa;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.action-item:hover {
  background: var(--light-orange);
}

.action-icon {
  font-size: 28px;
}

.action-item span:last-child {
  font-size: 13px;
  color: #666;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.recent-activity {
  margin-top: 24px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.mini-product-card {
  cursor: pointer;
}

.mini-image {
  position: relative;
  width: 100%;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 8px;
}

.mini-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sold-tag {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}

.mini-info {
  padding: 0 4px;
}

.mini-title {
  font-size: 13px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4px;
}

.mini-price {
  font-size: 15px;
  font-weight: 600;
  color: var(--primary-orange);
}

.empty-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: white;
  border-radius: 16px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-section p {
  font-size: 15px;
  color: #666;
  margin-bottom: 16px;
}

.empty-btn {
  padding: 10px 24px;
  background: var(--primary-orange);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
}

.content-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.publish-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #fafafa;
  border-radius: 12px;
}

.publish-image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
}

.publish-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.publish-info {
  flex: 1;
}

.publish-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.publish-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.publish-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.publish-price {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-orange);
}

.publish-status {
  font-size: 12px;
  color: #00b894;
  background: rgba(0, 184, 148, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.publish-time {
  font-size: 12px;
  color: #999;
}

.publish-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
}

.action-btn {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  border: none;
}

.action-btn.edit {
  background: #f0f0f0;
  color: #666;
}

.action-btn.delete {
  background: #ffeaa7;
  color: #d63031;
}

.favorite-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #fafafa;
  border-radius: 10px;
  margin-bottom: 12px;
}

.card-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-info {
  flex: 1;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.card-price {
  font-size: 15px;
  font-weight: 600;
  color: var(--primary-orange);
  margin-bottom: 4px;
}

.card-seller {
  font-size: 12px;
  color: #666;
}

.unlike-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #fafafa;
  border-radius: 10px;
}

.cart-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.cart-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-info {
  flex: 1;
}

.cart-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.cart-price {
  font-size: 15px;
  font-weight: 600;
  color: var(--primary-orange);
  margin-bottom: 4px;
}

.cart-seller {
  font-size: 12px;
  color: #666;
}

.cart-actions {
  display: flex;
  align-items: center;
}

.remove-btn {
  padding: 6px 14px;
  background: #ffeaa7;
  color: #d63031;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}

.cart-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
}

.cart-total {
  font-size: 15px;
  color: #666;
}

.logout-section {
  padding: 16px;
}

.logout-btn {
  width: 100%;
  padding: 14px;
  background: #f5f5f5;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  color: #666;
  cursor: pointer;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #eee;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
}

.detail-header {
  display: flex;
  gap: 20px;
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-image {
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-info {
  flex: 1;
}

.detail-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.detail-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
}

.price {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-orange);
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

.detail-meta {
  display: flex;
  gap: 12px;
}

.category {
  background: var(--light-orange);
  color: var(--primary-orange);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
}

.campus {
  background: #f5f5f5;
  color: #666;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
}

.detail-body {
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-body h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.detail-body p {
  font-size: 14px;
  line-height: 1.8;
  color: #666;
}

.detail-footer {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  background: #fafafa;
}

.btn-secondary {
  flex: 1;
  padding: 14px 24px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
}

.btn-primary {
  flex: 2;
  padding: 14px 24px;
  background: var(--primary-orange);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

@media (max-width: 600px) {
  .user-profile-card {
    flex-direction: column;
    text-align: center;
  }

  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .publish-item {
    flex-direction: column;
  }

  .publish-image {
    width: 100%;
    height: 180px;
  }

  .favorite-card,
  .cart-item {
    flex-direction: column;
  }

  .card-image,
  .cart-image {
    width: 100%;
    height: 150px;
  }

  .detail-header {
    flex-direction: column;
  }

  .detail-image {
    width: 100%;
    height: 200px;
  }

  .detail-footer {
    flex-direction: column;
  }
}
</style>
