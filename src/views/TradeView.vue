<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getTrades, type Trade } from '@/api/trade'
import ProductCard from '@/components/ProductCard.vue'
import ProductDetail from '@/components/ProductDetail.vue'
import SearchBar from '@/components/SearchBar.vue'
import EmptyState from '@/components/EmptyState.vue'

const trades = ref<Trade[]>([])
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('time')
const showDetail = ref(false)
const selectedProduct = ref<Trade | null>(null)
const loading = ref(false)

const categories = [
  { id: 'all', name: '全部' },
  { id: 'digital', name: '数码电子' },
  { id: 'sports', name: '运动户外' },
  { id: 'books', name: '图书教材' },
  { id: 'furniture', name: '家具家电' },
  { id: 'clothing', name: '服饰鞋包' },
  { id: 'other', name: '其他' },
]

const categoryMap: Record<string, string[]> = {
  digital: ['数码电子'],
  sports: ['运动户外'],
  books: ['图书教材'],
  furniture: ['家具家电'],
  clothing: ['服饰鞋包'],
  other: ['其他'],
}

const filteredProducts = computed(() => {
  let result = [...trades.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value !== 'all') {
    const targetCategories = categoryMap[selectedCategory.value] || []
    result = result.filter(p => targetCategories.includes(p.category))
  }

  if (sortBy.value === 'time') {
    result.sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())
  } else if (sortBy.value === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'views') {
    result.sort((a, b) => b.views - a.views)
  }

  return result
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleProductView = (product: Trade) => {
  selectedProduct.value = product
  showDetail.value = true
}

const handleCloseDetail = () => {
  showDetail.value = false
}

const fetchTrades = async () => {
  loading.value = true
  try {
    const response = await getTrades()
    trades.value = response.data
  } catch (error) {
    console.error('获取商品列表失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTrades()
})
</script>

<template>
  <div class="trade-page">
    <SearchBar @search="handleSearch" />

    <div class="filter-bar">
      <div class="filter-left">
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="['filter-btn', { active: selectedCategory === cat.id }]"
          @click="selectedCategory = cat.id"
        >
          {{ cat.name }}
        </button>
      </div>
      <div class="filter-right">
        <select v-model="sortBy" class="sort-select">
          <option value="time">最新发布</option>
          <option value="price-asc">价格从低到高</option>
          <option value="price-desc">价格从高到低</option>
          <option value="views">浏览最多</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <span>加载中...</span>
    </div>

    <div v-else-if="filteredProducts.length > 0" class="products-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @view="handleProductView"
      />
    </div>

    <EmptyState v-else text="暂无相关商品" icon="📦" />

    <ProductDetail
      v-if="selectedProduct"
      :product="selectedProduct"
      :visible="showDetail"
      @close="handleCloseDetail"
    />
  </div>
</template>

<style scoped>
.trade-page {
  padding: 24px 0;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-left {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  background: var(--light-orange);
  color: var(--primary-orange);
}

.filter-btn.active {
  background: var(--primary-orange);
  color: white;
}

.filter-right {
  flex-shrink: 0;
}

.sort-select {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.loading-state {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  font-size: 16px;
  color: #999;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
