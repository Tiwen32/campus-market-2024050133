<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import ImageUploader from '@/components/ImageUploader.vue'

const router = useRouter()
const productStore = useProductStore()

const publishType = ref<'trade' | 'lost' | 'group-buy' | 'errand'>('trade')
const images = ref<string[]>([])
const title = ref('')
const price = ref('')
const originalPrice = ref('')
const category = ref('')
const condition = ref<'new' | 'like-new' | 'good' | 'fair'>('good')
const description = ref('')
const location = ref('')
const deadline = ref('')
const minPeople = ref('')
const reward = ref('')
const destination = ref('')

const tradeCategories = ['数码电子', '运动户外', '图书教材', '家具家电', '服饰鞋包', '其他']

const conditions = [
  { value: 'new', label: '全新' },
  { value: 'like-new', label: '几乎全新' },
  { value: 'good', label: '成色良好' },
  { value: 'fair', label: '有使用痕迹' },
]

const handleImageUpdate = (newImages: string[]) => {
  images.value = newImages
}

const handleSubmit = () => {
  if (!title.value || !description.value) {
    alert('请填写标题和描述')
    return
  }

  if (publishType.value === 'trade') {
    if (!price.value) {
      alert('请填写价格')
      return
    }

    const product = {
      id: Date.now().toString(),
      title: title.value,
      price: Number(price.value),
      originalPrice: originalPrice.value ? Number(originalPrice.value) : undefined,
      image: images.value[0] || 'https://images.unsplash.com/photo-1544717302-de293b95efc6?w=400&h=400&fit=crop',
      category: category.value || '其他',
      condition: condition.value,
      description: description.value,
      sellerId: '1',
      sellerName: '橙同学',
      sellerAvatar: '',
      campus: '成龙校区',
      publishTime: '刚刚',
      views: 0,
      likes: 0,
      isLiked: false,
      isSold: false,
    }

    productStore.addProduct(product)
  } else if (publishType.value === 'errand') {
    if (!reward.value) {
      alert('请填写悬赏金额')
      return
    }
  } else if (publishType.value === 'group-buy') {
    if (!price.value) {
      alert('请填写拼单价')
      return
    }
  }

  alert('发布成功！')
  router.push('/')
}
</script>

<template>
  <div class="publish-page">
    <div class="page-header">
      <h1>发布信息</h1>
      <p class="page-desc">选择发布类型，填写详细信息</p>
    </div>

    <div class="type-selector">
      <button
        :class="['type-btn', { active: publishType === 'trade' }]"
        @click="publishType = 'trade'"
      >
        <span>📦</span>
        <span>二手交易</span>
      </button>
      <button
        :class="['type-btn', { active: publishType === 'lost' }]"
        @click="publishType = 'lost'"
      >
        <span>🔍</span>
        <span>失物招领</span>
      </button>
      <button
        :class="['type-btn', { active: publishType === 'group-buy' }]"
        @click="publishType = 'group-buy'"
      >
        <span>🤝</span>
        <span>拼单搭子</span>
      </button>
      <button
        :class="['type-btn', { active: publishType === 'errand' }]"
        @click="publishType = 'errand'"
      >
        <span>🏃</span>
        <span>跑腿委托</span>
      </button>
    </div>

    <form class="publish-form" @submit.prevent="handleSubmit">
      <div class="form-section">
        <h3>基本信息</h3>

        <div class="form-item">
          <label class="form-label">标题 <span class="required">*</span></label>
          <input
            v-model="title"
            type="text"
            class="form-input"
            placeholder="请输入标题"
          />
        </div>

        <div class="form-item">
          <label class="form-label">描述 <span class="required">*</span></label>
          <textarea
            v-model="description"
            class="form-textarea"
            rows="4"
            placeholder="请详细描述信息"
          ></textarea>
        </div>

        <div class="form-item">
          <label class="form-label">图片</label>
          <ImageUploader @update="handleImageUpdate" />
        </div>
      </div>

      <div v-if="publishType === 'trade'" class="form-section">
        <h3>商品信息</h3>

        <div class="form-row">
          <div class="form-item">
            <label class="form-label">价格 <span class="required">*</span></label>
            <div class="input-group">
              <span class="input-prefix">¥</span>
              <input
                v-model="price"
                type="number"
                class="form-input"
                placeholder="0.00"
              />
            </div>
          </div>
          <div class="form-item">
            <label class="form-label">原价</label>
            <div class="input-group">
              <span class="input-prefix">¥</span>
              <input
                v-model="originalPrice"
                type="number"
                class="form-input"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-item">
            <label class="form-label">分类</label>
            <select v-model="category" class="form-select">
              <option value="">请选择分类</option>
              <option v-for="cat in tradeCategories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>
          <div class="form-item">
            <label class="form-label">成色</label>
            <select v-model="condition" class="form-select">
              <option v-for="c in conditions" :key="c.value" :value="c.value">
                {{ c.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="publishType === 'group-buy'" class="form-section">
        <h3>拼单信息</h3>

        <div class="form-row">
          <div class="form-item">
            <label class="form-label">拼单价 <span class="required">*</span></label>
            <div class="input-group">
              <span class="input-prefix">¥</span>
              <input
                v-model="price"
                type="number"
                class="form-input"
                placeholder="0.00"
              />
            </div>
          </div>
          <div class="form-item">
            <label class="form-label">原价</label>
            <div class="input-group">
              <span class="input-prefix">¥</span>
              <input
                v-model="originalPrice"
                type="number"
                class="form-input"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-item">
            <label class="form-label">成团人数</label>
            <input
              v-model="minPeople"
              type="number"
              class="form-input"
              placeholder="最少几人成团"
            />
          </div>
          <div class="form-item">
            <label class="form-label">截止时间</label>
            <input
              v-model="deadline"
              type="datetime-local"
              class="form-input"
            />
          </div>
        </div>
      </div>

      <div v-if="publishType === 'errand'" class="form-section">
        <h3>任务信息</h3>

        <div class="form-item">
          <label class="form-label">悬赏金额 <span class="required">*</span></label>
          <div class="input-group">
            <span class="input-prefix">¥</span>
            <input
              v-model="reward"
              type="number"
              class="form-input"
              placeholder="0.00"
            />
          </div>
        </div>

        <div class="form-item">
          <label class="form-label">起点位置</label>
          <input
            v-model="location"
            type="text"
            class="form-input"
            placeholder="任务起点"
          />
        </div>

        <div class="form-item">
          <label class="form-label">终点位置</label>
          <input
            v-model="destination"
            type="text"
            class="form-input"
            placeholder="任务终点"
          />
        </div>

        <div class="form-item">
          <label class="form-label">要求时间</label>
          <input
            v-model="deadline"
            type="datetime-local"
            class="form-input"
          />
        </div>
      </div>

      <div v-if="publishType === 'lost'" class="form-section">
        <h3>失物信息</h3>

        <div class="form-item">
          <label class="form-label">位置</label>
          <input
            v-model="location"
            type="text"
            class="form-input"
            placeholder="丢失或捡拾位置"
          />
        </div>

        <div class="form-item">
          <label class="form-label">时间</label>
          <input
            v-model="deadline"
            type="datetime-local"
            class="form-input"
          />
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-cancel" @click="router.push('/')">取消</button>
        <button type="submit" class="btn-submit">发布</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.publish-page {
  padding: 24px 0;
  max-width: 600px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
  text-align: center;
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

.type-selector {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 6px;
  margin-bottom: 24px;
}

.type-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 8px;
  background: none;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.type-btn span:first-child {
  font-size: 24px;
}

.type-btn.active {
  background: var(--primary-orange);
  color: white;
}

.publish-form {
  background: white;
  border-radius: 16px;
  padding: 24px;
}

.form-section {
  margin-bottom: 24px;
}

.form-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.form-item {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.required {
  color: #e17055;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: var(--primary-orange);
}

.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s;
}

.form-textarea:focus {
  border-color: var(--primary-orange);
}

.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  background: white;
  cursor: pointer;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.input-group {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.input-prefix {
  padding: 0 12px;
  color: #666;
  font-size: 15px;
}

.input-group .form-input {
  border: none;
  padding: 12px 16px;
  flex: 1;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

.btn-cancel {
  flex: 1;
  padding: 14px;
  background: #f5f5f5;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  cursor: pointer;
}

.btn-submit {
  flex: 2;
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

.btn-submit:hover {
  background: var(--dark-orange);
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
