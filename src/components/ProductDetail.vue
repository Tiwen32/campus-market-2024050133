<script setup lang="ts">
import { useProductStore } from '@/stores/products'
import { useRouter } from 'vue-router'
import type { Product } from '@/stores/products'

const props = defineProps<{
  product: Product
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const productStore = useProductStore()
const router = useRouter()

const conditionText = {
  'new': '全新',
  'like-new': '几乎全新',
  'good': '成色良好',
  'fair': '有使用痕迹',
}

const conditionColor = {
  'new': '#00b894',
  'like-new': '#0984e3',
  'good': '#fdcb6e',
  'fair': '#e17055',
}

const handleLike = () => {
  productStore.toggleLike(props.product.id)
}

const handleAddToCart = () => {
  productStore.addToCart(props.product)
  alert('已加入购物车')
}

const handleContactSeller = () => {
  emit('close')
  router.push('/message')
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click="handleClose">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="handleClose">✕</button>

        <div class="detail-header">
          <div class="detail-image">
            <img :src="product.image" :alt="product.title" />
          </div>
          <div class="detail-info">
            <h2 class="detail-title">{{ product.title }}</h2>
            <div class="detail-price">
              <span class="price">¥{{ product.price }}</span>
              <span v-if="product.originalPrice" class="original-price">¥{{ product.originalPrice }}</span>
              <span v-if="product.originalPrice" class="discount">省¥{{ product.originalPrice - product.price }}</span>
            </div>
            <div class="detail-meta">
              <span class="condition" :style="{ color: conditionColor[product.condition] }">
                {{ conditionText[product.condition] }}
              </span>
              <span class="category">{{ product.category }}</span>
              <span class="campus">{{ product.campus }}</span>
            </div>
            <div class="stats">
              <span>👁️ {{ product.views }} 浏览</span>
              <span>❤️ {{ product.likes }} 喜欢</span>
            </div>
          </div>
        </div>

        <div class="detail-body">
          <h3>商品描述</h3>
          <p>{{ product.description }}</p>
        </div>

        <div class="detail-seller">
          <div class="seller-card">
            <span class="seller-avatar">👤</span>
            <div class="seller-info">
              <span class="seller-name">{{ product.sellerName }}</span>
              <span class="seller-campus">{{ product.campus }}</span>
            </div>
          </div>
        </div>

        <div class="detail-footer">
          <button class="btn-secondary" @click="handleLike">
            {{ product.isLiked ? '❤️ 已喜欢' : '🤍 喜欢' }}
          </button>
          <button class="btn-primary" @click="handleAddToCart">
            加入购物车
          </button>
          <button class="btn-primary btn-chat" @click="handleContactSeller">
            联系卖家
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
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
  max-width: 800px;
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

.close-btn:hover {
  background: rgba(0, 0, 0, 0.2);
}

.detail-header {
  display: flex;
  gap: 24px;
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-image {
  width: 320px;
  height: 320px;
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
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
}

.detail-price {
  display: flex;
  align-items: center;
  gap: 12px;
}

.price {
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
  font-size: 14px;
  color: #00b894;
  background: rgba(0, 184, 148, 0.1);
  padding: 4px 10px;
  border-radius: 4px;
}

.detail-meta {
  display: flex;
  gap: 12px;
}

.condition {
  font-size: 14px;
  font-weight: 500;
}

.category {
  background: var(--light-orange);
  color: var(--primary-orange);
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
}

.campus {
  background: #f5f5f5;
  color: #666;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
}

.stats {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
}

.detail-body {
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-body h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.detail-body p {
  font-size: 14px;
  line-height: 1.8;
  color: #666;
}

.detail-seller {
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.seller-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fafafa;
  padding: 16px;
  border-radius: 12px;
}

.seller-avatar {
  font-size: 40px;
}

.seller-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.seller-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.seller-campus {
  font-size: 14px;
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
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f0f0f0;
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
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--dark-orange);
}

.btn-chat {
  background: #0984e3;
}

.btn-chat:hover {
  background: #0652dd;
}

@media (max-width: 600px) {
  .detail-header {
    flex-direction: column;
  }

  .detail-image {
    width: 100%;
    height: 240px;
  }

  .detail-footer {
    flex-direction: column;
  }
}
</style>
