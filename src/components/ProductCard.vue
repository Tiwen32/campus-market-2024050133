<script setup lang="ts">
import { useProductStore } from '@/stores/products'
import type { Product } from '@/stores/products'

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  view: [product: Product]
}>()

const productStore = useProductStore()

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

const handleLike = (e: Event, productId: string) => {
  e.stopPropagation()
  productStore.toggleLike(productId)
}

const handleView = (product: Product) => {
  emit('view', product)
}
</script>

<template>
  <div class="product-card" @click="handleView(product)">
    <div class="product-image">
      <img :src="product.image" :alt="product.title" />
      <span v-if="product.isSold" class="sold-badge">已售出</span>
    </div>
    <div class="product-info">
      <h3 class="product-title">{{ product.title }}</h3>
      <div class="product-meta">
        <span class="category">{{ product.category }}</span>
        <span class="condition" :style="{ color: conditionColor[product.condition] }">
          {{ conditionText[product.condition] }}
        </span>
      </div>
      <p class="product-desc">{{ product.description.slice(0, 50) }}...</p>
      <div class="product-footer">
        <div class="price-section">
          <span class="price">¥{{ product.price }}</span>
          <span v-if="product.originalPrice" class="original-price">¥{{ product.originalPrice }}</span>
        </div>
        <div class="actions">
          <button class="like-btn" :class="{ liked: product.isLiked }" @click="handleLike($event, product.id)">
            <span>{{ product.isLiked ? '❤️' : '🤍' }}</span>
            <span>{{ product.likes }}</span>
          </button>
        </div>
      </div>
      <div class="seller-info">
        <span class="avatar">👤</span>
        <span class="seller-name">{{ product.sellerName }}</span>
        <span class="campus">{{ product.campus }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.product-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.sold-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
}

.product-info {
  padding: 16px;
}

.product-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.category {
  background: var(--light-orange);
  color: var(--primary-orange);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.condition {
  font-size: 12px;
  font-weight: 500;
}

.product-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.price-section {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.price {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-orange);
}

.original-price {
  font-size: 13px;
  color: #999;
  text-decoration: line-through;
}

.actions {
  display: flex;
  gap: 8px;
}

.like-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 6px 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  color: #666;
  transition: all 0.2s;
}

.like-btn:hover {
  background: rgba(255, 124, 58, 0.1);
}

.like-btn.liked {
  color: var(--primary-orange);
}

.seller-info {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.avatar {
  font-size: 16px;
}

.seller-name {
  font-size: 13px;
  color: #666;
}

.campus {
  font-size: 12px;
  color: #999;
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
