<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getLostFounds, type LostFound } from '@/api/lostFound'
import EmptyState from '@/components/EmptyState.vue'

const activeTab = ref<'lost' | 'found'>('lost')
const items = ref<LostFound[]>([])
const showContactModal = ref(false)
const selectedItem = ref<LostFound | null>(null)
const loading = ref(false)

const filteredItems = computed(() => {
  return items.value.filter(item => item.type === activeTab.value)
})

const handleTabChange = (tab: 'lost' | 'found') => {
  activeTab.value = tab
}

const handleClaim = (item: LostFound) => {
  selectedItem.value = item
  showContactModal.value = true
}

const handleCloseModal = () => {
  showContactModal.value = false
  selectedItem.value = null
}

const markAsFound = () => {
  if (selectedItem.value) {
    const item = items.value.find(i => i.id === selectedItem.value?.id)
    if (item) {
      item.status = 'closed'
    }
    handleCloseModal()
  }
}

const fetchLostFounds = async () => {
  loading.value = true
  try {
    const response = await getLostFounds()
    items.value = response.data
  } catch (error) {
    console.error('获取失物招领列表失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchLostFounds()
})
</script>

<template>
  <div class="lost-found-page">
    <div class="tab-bar">
      <button
        :class="['tab-btn', { active: activeTab === 'lost' }]"
        @click="handleTabChange('lost')"
      >
        <span>🔍</span>
        <span>我丢了</span>
        <span class="count">{{ items.filter(i => i.type === 'lost').length }}</span>
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'found' }]"
        @click="handleTabChange('found')"
      >
        <span>✨</span>
        <span>我捡到</span>
        <span class="count">{{ items.filter(i => i.type === 'found').length }}</span>
      </button>
    </div>

    <div v-if="loading" class="loading-state">
      <span>加载中...</span>
    </div>

    <div v-else-if="filteredItems.length > 0" class="items-list">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="item-card"
      >
        <div class="item-image">
          <img :src="item.image" :alt="item.title" />
          <span :class="['type-badge', item.type]">{{ item.type === 'lost' ? '寻找中' : '待认领' }}</span>
        </div>
        <div class="item-info">
          <h3 class="item-title">{{ item.title }}</h3>
          <div class="item-meta">
            <span class="meta-item">📍 {{ item.location }}</span>
            <span class="meta-item">🕐 {{ item.time }}</span>
          </div>
          <p class="item-desc">{{ item.description }}</p>
          <div class="item-footer">
            <div class="publisher">
              <span class="avatar">👤</span>
              <span>{{ item.publisherName }}</span>
            </div>
            <button
              v-if="item.status === 'open'"
              class="claim-btn"
              @click="handleClaim(item)"
            >
              {{ activeTab === 'lost' ? '联系捡拾者' : '我来认领' }}
            </button>
            <span v-else class="claimed-badge">✅ 已找回</span>
          </div>
        </div>
      </div>
    </div>

    <EmptyState v-else :text="activeTab === 'lost' ? '暂无寻物信息' : '暂无拾物信息'" :icon="activeTab === 'lost' ? '🔍' : '✨'" />

    <Teleport to="body">
      <div v-if="showContactModal" class="modal-overlay" @click="handleCloseModal">
        <div class="contact-modal" @click.stop>
          <h3>{{ activeTab === 'lost' ? '联系捡拾者' : '认领物品' }}</h3>
          <div class="contact-info">
            <div class="info-row">
              <span class="label">物品名称</span>
              <span class="value">{{ selectedItem?.title }}</span>
            </div>
            <div class="info-row">
              <span class="label">联系人</span>
              <span class="value">{{ selectedItem?.publisherName }}</span>
            </div>
            <div class="info-row">
              <span class="label">联系电话</span>
              <span class="value">{{ selectedItem?.phone }}</span>
            </div>
            <div class="info-row">
              <span class="label">详细描述</span>
              <span class="value">{{ selectedItem?.description }}</span>
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn-cancel" @click="handleCloseModal">取消</button>
            <button class="btn-confirm" @click="markAsFound">
              {{ activeTab === 'lost' ? '联系对方' : '确认认领' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.lost-found-page {
  padding: 24px 0;
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
  gap: 8px;
  padding: 14px;
  background: none;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--primary-orange);
  color: white;
}

.count {
  background: rgba(0, 0, 0, 0.15);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.tab-btn.active .count {
  background: rgba(255, 255, 255, 0.25);
}

.loading-state {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  font-size: 16px;
  color: #999;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item-card {
  display: flex;
  gap: 16px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.item-image {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.type-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.type-badge.lost {
  background: #ffeaa7;
  color: #d63031;
}

.type-badge.found {
  background: #81ecec;
  color: #0984e3;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-title {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.item-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
}

.meta-item {
  font-size: 13px;
  color: #666;
}

.item-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.publisher {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
}

.avatar {
  font-size: 18px;
}

.claim-btn {
  padding: 8px 20px;
  background: var(--primary-orange);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.claim-btn:hover {
  background: var(--dark-orange);
}

.claimed-badge {
  font-size: 14px;
  color: #00b894;
  font-weight: 500;
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

.contact-modal {
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
}

.contact-modal h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #fafafa;
  border-radius: 8px;
}

.label {
  font-size: 14px;
  color: #666;
}

.value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.btn-cancel {
  flex: 1;
  padding: 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
}

.btn-confirm {
  flex: 2;
  padding: 12px;
  background: var(--primary-orange);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

@media (max-width: 600px) {
  .item-card {
    flex-direction: column;
  }

  .item-image {
    width: 100%;
    height: 200px;
  }
}
</style>
