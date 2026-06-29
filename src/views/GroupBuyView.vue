<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getGroupBuys, type GroupBuy } from '@/api/groupBuy'
import EmptyState from '@/components/EmptyState.vue'

const items = ref<GroupBuy[]>([])
const showDetailModal = ref(false)
const selectedItem = ref<GroupBuy | null>(null)
const loading = ref(false)

const joinGroup = (item: GroupBuy) => {
  selectedItem.value = item
  showDetailModal.value = true
}

const confirmJoin = () => {
  if (selectedItem.value) {
    const item = items.value.find(i => i.id === selectedItem.value?.id)
    if (item && item.currentPeople < item.minPeople) {
      item.currentPeople++
      if (item.currentPeople >= item.minPeople) {
        item.status = 'completed'
      }
    }
    showDetailModal.value = false
    selectedItem.value = null
  }
}

const handleCloseModal = () => {
  showDetailModal.value = false
  selectedItem.value = null
}

const fetchGroupBuys = async () => {
  loading.value = true
  try {
    const response = await getGroupBuys()
    items.value = response.data
  } catch (error) {
    console.error('获取拼单列表失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchGroupBuys()
})
</script>

<template>
  <div class="group-buy-page">
    <div class="page-header">
      <h1>拼单搭子</h1>
      <p class="page-desc">组队省钱，快乐加倍</p>
    </div>

    <div v-if="loading" class="loading-state">
      <span>加载中...</span>
    </div>

    <div v-else-if="items.length > 0" class="items-grid">
      <div
        v-for="item in items"
        :key="item.id"
        class="group-card"
      >
        <div class="card-image">
          <img :src="item.image" :alt="item.title" />
          <span v-if="item.status === 'completed'" class="status-badge success">拼单成功</span>
          <span v-else-if="item.status === 'failed'" class="status-badge failed">拼单失败</span>
          <span v-else class="status-badge active">招募中</span>
        </div>

        <div class="card-info">
          <h3 class="card-title">{{ item.title }}</h3>

          <div class="price-section">
            <span class="price">¥{{ item.price }}</span>
            <span class="original-price">¥{{ item.originalPrice }}</span>
            <span class="discount">省{{ item.originalPrice - item.price }}元</span>
          </div>

          <div class="progress-section">
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: `${(item.currentPeople / item.minPeople) * 100}%` }"
              ></div>
            </div>
            <span class="progress-text">
              {{ item.currentPeople }}/{{ item.minPeople }}人
              <span v-if="item.status === 'active'" class="need">
                还差{{ item.minPeople - item.currentPeople }}人
              </span>
            </span>
          </div>

          <div class="card-meta">
            <span class="meta-item">📍 {{ item.campus }}</span>
            <span class="meta-item">⏰ {{ item.deadline }}</span>
          </div>

          <p class="card-desc">{{ item.description }}</p>

          <div class="card-footer">
            <div class="organizer">
              <span class="avatar">👤</span>
              <span>{{ item.organizerName }}</span>
            </div>
            <button
              v-if="item.status === 'active'"
              class="join-btn"
              @click="joinGroup(item)"
            >
              立即参团
            </button>
            <span v-else class="status-text">
              {{ item.status === 'completed' ? '已成功' : '已结束' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <EmptyState v-else text="暂无拼单信息" icon="🤝" />

    <Teleport to="body">
      <div v-if="showDetailModal" class="modal-overlay" @click="handleCloseModal">
        <div class="detail-modal" @click.stop>
          <div class="modal-header">
            <h3>确认参团</h3>
            <button class="close-btn" @click="handleCloseModal">✕</button>
          </div>

          <div v-if="selectedItem" class="modal-body">
            <div class="modal-image">
              <img :src="selectedItem.image" :alt="selectedItem.title" />
            </div>
            <div class="modal-info">
              <h4>{{ selectedItem.title }}</h4>
              <div class="modal-price">
                <span class="price">¥{{ selectedItem.price }}</span>
                <span class="original">¥{{ selectedItem.originalPrice }}</span>
              </div>
              <div class="modal-detail">
                <p><strong>参团人数：</strong>{{ selectedItem.currentPeople }}/{{ selectedItem.minPeople }}人</p>
                <p><strong>截止时间：</strong>{{ selectedItem.deadline }}</p>
                <p><strong>发起者：</strong>{{ selectedItem.organizerName }}</p>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn-cancel" @click="handleCloseModal">取消</button>
            <button class="btn-confirm" @click="confirmJoin">确认参团</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.group-buy-page {
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

.items-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.group-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.group-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.card-image {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.active {
  background: rgba(255, 124, 58, 0.9);
  color: white;
}

.status-badge.success {
  background: rgba(0, 184, 148, 0.9);
  color: white;
}

.status-badge.failed {
  background: rgba(238, 238, 238, 0.9);
  color: #999;
}

.card-info {
  padding: 16px;
}

.card-title {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.price-section {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
}

.price {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-orange);
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

.discount {
  font-size: 12px;
  color: #00b894;
  background: rgba(0, 184, 148, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.progress-section {
  margin-bottom: 12px;
}

.progress-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 6px;
}

.progress-fill {
  height: 100%;
  background: var(--primary-orange);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 13px;
  color: #666;
}

.need {
  color: var(--primary-orange);
  font-weight: 500;
}

.card-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.meta-item {
  font-size: 13px;
  color: #666;
}

.card-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.organizer {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
}

.avatar {
  font-size: 16px;
}

.join-btn {
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

.join-btn:hover {
  background: var(--dark-orange);
}

.status-text {
  font-size: 14px;
  color: #999;
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
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.modal-image {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-info {
  flex: 1;
}

.modal-info h4 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.modal-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
}

.modal-price .price {
  font-size: 22px;
}

.modal-price .original {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

.modal-detail p {
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
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

@media (max-width: 600px) {
  .items-grid {
    grid-template-columns: 1fr;
  }

  .modal-body {
    flex-direction: column;
  }

  .modal-image {
    width: 100%;
    height: 180px;
  }
}
</style>
