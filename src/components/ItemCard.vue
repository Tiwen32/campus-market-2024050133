<script setup lang="ts">
import type { Trade } from '@/api/trade'
import type { LostFound } from '@/api/lostFound'
import type { GroupBuy } from '@/api/groupBuy'
import type { Errand } from '@/api/errand'

type CardItem = Trade | LostFound | GroupBuy | Errand

defineProps<{
  item: CardItem
  type: 'trade' | 'lostFound' | 'groupBuy' | 'errand'
}>()

const emit = defineEmits<{
  click: [item: CardItem]
}>()

const handleClick = (item: CardItem) => {
  emit('click', item)
}
</script>

<template>
  <div class="item-card" @click="handleClick(item)">
    <div class="item-image">
      <img :src="item.image" :alt="item.title" />
    </div>
    <div class="item-content">
      <h3 class="item-title">{{ item.title }}</h3>
      <p class="item-desc">{{ item.description.slice(0, 60) }}...</p>
      <div class="item-footer">
        <div class="item-price" v-if="type === 'trade'">
          <span class="price">¥{{ (item as Trade).price }}</span>
          <span class="original" v-if="(item as Trade).originalPrice">¥{{ (item as Trade).originalPrice }}</span>
        </div>
        <div class="item-price" v-else-if="type === 'groupBuy'">
          <span class="price">¥{{ (item as GroupBuy).price }}</span>
          <span class="original">¥{{ (item as GroupBuy).originalPrice }}</span>
        </div>
        <div class="item-price" v-else-if="type === 'errand'">
          <span class="price reward">悬赏 ¥{{ (item as Errand).reward }}</span>
        </div>
        <div class="item-meta">
          <span v-if="type === 'trade'">{{ (item as Trade).sellerName }}</span>
          <span v-else-if="type === 'lostFound'">{{ (item as LostFound).publisherName }}</span>
          <span v-else-if="type === 'groupBuy'">{{ (item as GroupBuy).organizerName }}</span>
          <span v-else-if="type === 'errand'">{{ (item as Errand).requesterName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-card {
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;
}

.item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.item-image {
  width: 140px;
  height: 140px;
  flex-shrink: 0;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.item-title {
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

.item-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
  flex: 1;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-orange);
}

.price.reward {
  color: #e17055;
}

.original {
  font-size: 13px;
  color: #999;
  text-decoration: line-through;
}

.item-meta {
  font-size: 13px;
  color: #999;
}
</style>
