<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getErrands, type Errand } from '@/api/errand'
import EmptyState from '@/components/EmptyState.vue'

const items = ref<Errand[]>([])
const showDetailModal = ref(false)
const selectedItem = ref<Errand | null>(null)
const loading = ref(false)

const takeTask = (item: Errand) => {
  selectedItem.value = item
  showDetailModal.value = true
}

const confirmTake = () => {
  if (selectedItem.value) {
    const item = items.value.find(i => i.id === selectedItem.value?.id)
    if (item && item.status === 'pending') {
      item.status = 'inProgress'
      item.takerId = 1
    }
    showDetailModal.value = false
    selectedItem.value = null
  }
}

const handleCloseModal = () => {
  showDetailModal.value = false
  selectedItem.value = null
}

const fetchErrands = async () => {
  loading.value = true
  try {
    const response = await getErrands()
    items.value = response.data
  } catch (error) {
    console.error('获取跑腿任务列表失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchErrands()
})
</script>

<template>
  <div class="errand-page">
    <div class="page-header">
      <h1>跑腿委托</h1>
      <p class="page-desc">校园跑腿，方便快捷</p>
    </div>

    <div v-if="loading" class="loading-state">
      <span>加载中...</span>
    </div>

    <div v-else-if="items.length > 0" class="items-list">
      <div
        v-for="item in items"
        :key="item.id"
        class="errand-card"
      >
        <div class="card-header">
          <div class="reward-section">
            <span class="reward-label">悬赏</span>
            <span class="reward-amount">¥{{ item.reward }}</span>
          </div>
          <span :class="['status-tag', item.status]">
            {{ item.status === 'pending' ? '待接单' : item.status === 'inProgress' ? '进行中' : '已完成' }}
          </span>
        </div>

        <h3 class="card-title">{{ item.title }}</h3>

        <div class="location-section">
          <div class="location-item">
            <span class="location-icon">📍</span>
            <span class="location-text">{{ item.location }}</span>
          </div>
          <span class="arrow">→</span>
          <div class="location-item">
            <span class="location-icon">🎯</span>
            <span class="location-text">{{ item.destination }}</span>
          </div>
        </div>

        <p class="card-desc">{{ item.description }}</p>

        <div class="card-meta">
          <span class="meta-item">⏰ {{ item.time }}</span>
          <div class="requester">
            <span class="avatar">👤</span>
            <span>{{ item.requesterName }}</span>
          </div>
        </div>

        <button
          v-if="item.status === 'pending'"
          class="take-btn"
          @click="takeTask(item)"
        >
          立即接单
        </button>
        <span v-else class="status-badge">
          {{ item.status === 'inProgress' ? '已接单' : '已完成' }}
        </span>
      </div>
    </div>

    <EmptyState v-else text="暂无跑腿任务" icon="🏃" />

    <Teleport to="body">
      <div v-if="showDetailModal" class="modal-overlay" @click="handleCloseModal">
        <div class="detail-modal" @click.stop>
          <div class="modal-header">
            <h3>确认接单</h3>
            <button class="close-btn" @click="handleCloseModal">✕</button>
          </div>

          <div v-if="selectedItem" class="modal-body">
            <div class="modal-info">
              <h4>{{ selectedItem.title }}</h4>
              <div class="reward-display">
                <span class="label">悬赏金额</span>
                <span class="reward">¥{{ selectedItem.reward }}</span>
              </div>
              <div class="location-detail">
                <p><strong>起点：</strong>{{ selectedItem.location }}</p>
                <p><strong>终点：</strong>{{ selectedItem.destination }}</p>
              </div>
              <div class="other-detail">
                <p><strong>要求时间：</strong>{{ selectedItem.time }}</p>
                <p><strong>发布者：</strong>{{ selectedItem.requesterName }}</p>
                <p><strong>联系电话：</strong>{{ selectedItem.phone }}</p>
                <p><strong>任务描述：</strong>{{ selectedItem.description }}</p>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn-cancel" @click="handleCloseModal">取消</button>
            <button class="btn-confirm" @click="confirmTake">确认接单</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.errand-page {
  padding: 24px 0;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 15px;
  color: #666;
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

.errand-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.reward-section {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.reward-label {
  font-size: 13px;
  color: #666;
}

.reward-amount {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-orange);
}

.status-tag {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-tag.pending {
  background: #ffeaa7;
  color: #d63031;
}

.status-tag.inProgress {
  background: #81ecec;
  color: #0984e3;
}

.status-tag.completed {
  background: #dfe6e9;
  color: #636e72;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.location-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 12px;
  background: #fafafa;
  border-radius: 10px;
}

.location-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.location-icon {
  font-size: 16px;
}

.location-text {
  font-size: 14px;
  color: #333;
}

.arrow {
  color: var(--primary-orange);
  font-size: 18px;
  font-weight: bold;
}

.card-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.meta-item {
  font-size: 14px;
  color: #666;
}

.requester {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
}

.avatar {
  font-size: 18px;
}

.take-btn {
  width: 100%;
  padding: 14px;
  background: var(--primary-orange);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.take-btn:hover {
  background: var(--dark-orange);
}

.status-badge {
  display: block;
  text-align: center;
  padding: 14px;
  background: #f5f5f5;
  color: #999;
  border-radius: 12px;
  font-size: 15px;
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

.detail-modal {
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 420px;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  width: 32px;
  height: 32px;
  background: #f5f5f5;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-info h4 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.reward-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--light-orange);
  border-radius: 10px;
  margin-bottom: 16px;
}

.reward-display .label {
  font-size: 14px;
  color: #666;
}

.reward-display .reward {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-orange);
}

.location-detail {
  background: #fafafa;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.location-detail p {
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
}

.location-detail p:last-child {
  margin-bottom: 0;
}

.other-detail p {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.other-detail p:last-child {
  margin-bottom: 0;
}

.modal-footer {
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
</style>
