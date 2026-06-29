<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits<{
  search: [query: string]
}>()

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <span class="search-icon">🔍</span>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索商品、失物、拼单..."
        class="search-input"
        @keydown="handleKeydown"
      />
      <button class="search-btn" @click="handleSearch">搜索</button>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  padding: 16px 0;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 4px 4px 4px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.search-icon {
  font-size: 16px;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  padding: 12px 0;
}

.search-input::placeholder {
  color: #999;
}

.search-btn {
  background: var(--primary-orange);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.search-btn:hover {
  background: var(--dark-orange);
}

@media (max-width: 768px) {
  .search-btn {
    padding: 10px 16px;
    font-size: 13px;
  }
}
</style>
