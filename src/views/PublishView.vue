<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import ImageUploader from '@/components/ImageUploader.vue'
import { createTrade } from '@/api/trade'
import { createLostFound } from '@/api/lostFound'
import { createGroupBuy } from '@/api/groupBuy'
import { createErrand } from '@/api/errand'

const router = useRouter()
const userStore = useUserStore()

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
const lostType = ref<'lost' | 'found'>('lost')
const itemName = ref('')

const tradeCategories = ['数码电子', '运动户外', '图书教材', '家具家电', '服饰鞋包', '其他']

const conditions = [
  { value: 'new', label: '全新' },
  { value: 'like-new', label: '几乎全新' },
  { value: 'good', label: '成色良好' },
  { value: 'fair', label: '有使用痕迹' },
]

const errors = ref<Record<string, string>>({})

const handleImageUpdate = (newImages: string[]) => {
  images.value = newImages
}

const validateForm = (): boolean => {
  errors.value = {}

  if (!title.value.trim()) {
    errors.value.title = '请输入标题'
  }

  if (!description.value.trim()) {
    errors.value.description = '请输入描述'
  }

  if (publishType.value === 'trade') {
    if (!price.value.trim()) {
      errors.value.price = '请输入价格'
    } else if (Number(price.value) <= 0) {
      errors.value.price = '价格必须大于0'
    }
    if (!category.value) {
      errors.value.category = '请选择分类'
    }
  } else if (publishType.value === 'errand') {
    if (!reward.value.trim()) {
      errors.value.reward = '请输入悬赏金额'
    } else if (Number(reward.value) <= 0) {
      errors.value.reward = '悬赏金额必须大于0'
    }
    if (!location.value.trim()) {
      errors.value.location = '请输入起点位置'
    }
    if (!destination.value.trim()) {
      errors.value.destination = '请输入终点位置'
    }
  } else if (publishType.value === 'group-buy') {
    if (!price.value.trim()) {
      errors.value.price = '请输入拼单价'
    } else if (Number(price.value) <= 0) {
      errors.value.price = '拼单价必须大于0'
    }
    if (!minPeople.value.trim()) {
      errors.value.minPeople = '请输入成团人数'
    } else if (Number(minPeople.value) <= 0) {
      errors.value.minPeople = '成团人数必须大于0'
    }
    if (!deadline.value) {
      errors.value.deadline = '请选择截止时间'
    }
  } else if (publishType.value === 'lost') {
    if (!itemName.value.trim()) {
      errors.value.itemName = '请输入物品名称'
    }
    if (!location.value.trim()) {
      errors.value.location = '请输入位置'
    }
    if (!deadline.value) {
      errors.value.time = '请选择时间'
    }
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  const currentTime = new Date().toLocaleString('zh-CN')
  const defaultImage = 'https://images.unsplash.com/photo-1544717302-de293b95efc6?w=400&h=400&fit=crop'

  try {
    const userId = Number(userStore.currentUser.id)
    const userName = userStore.currentUser.name
    const userPhone = userStore.currentUser.phone
    const userCampus = userStore.currentUser.campus

    if (publishType.value === 'trade') {
      await createTrade({
        title: title.value.trim(),
        price: Number(price.value),
        originalPrice: originalPrice.value ? Number(originalPrice.value) : 0,
        category: category.value || '其他',
        condition: condition.value,
        description: description.value.trim(),
        sellerId: userId,
        sellerName: userName,
        campus: userCampus,
        publishTime: currentTime,
        views: 0,
        likes: 0,
        image: images.value[0] || defaultImage,
        status: 'open',
      })
      router.push('/trade')
    } else if (publishType.value === 'errand') {
      await createErrand({
        title: title.value.trim(),
        reward: Number(reward.value),
        location: location.value.trim(),
        destination: destination.value.trim(),
        description: description.value.trim(),
        requesterId: userId,
        requesterName: userName,
        phone: userPhone,
        time: deadline.value || currentTime,
        image: images.value[0] || defaultImage,
        status: 'pending',
        takerId: null,
      })
      router.push('/errand')
    } else if (publishType.value === 'group-buy') {
      await createGroupBuy({
        title: title.value.trim(),
        price: Number(price.value),
        originalPrice: originalPrice.value ? Number(originalPrice.value) : 0,
        minPeople: Number(minPeople.value),
        currentPeople: 1,
        deadline: deadline.value || currentTime,
        description: description.value.trim(),
        organizerId: userId,
        organizerName: userName,
        campus: userCampus,
        image: images.value[0] || defaultImage,
        status: 'active',
      })
      router.push('/group-buy')
    } else if (publishType.value === 'lost') {
      await createLostFound({
        title: title.value.trim(),
        type: lostType.value,
        itemName: itemName.value.trim(),
        location: location.value.trim(),
        time: deadline.value || currentTime,
        description: description.value.trim(),
        publisherId: userId,
        publisherName: userName,
        phone: userPhone,
        image: images.value[0] || defaultImage,
        status: 'open',
      })
      router.push('/lost-found')
    }
  } catch (error) {
    console.error('发布失败:', error)
    alert('发布失败，请检查Mock服务是否启动')
  }
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
            :class="{ error: errors.title }"
            placeholder="请输入标题"
          />
          <span v-if="errors.title" class="form-error">{{ errors.title }}</span>
        </div>

        <div class="form-item">
          <label class="form-label">描述 <span class="required">*</span></label>
          <textarea
            v-model="description"
            class="form-textarea"
            :class="{ error: errors.description }"
            rows="4"
            placeholder="请详细描述信息"
          ></textarea>
          <span v-if="errors.description" class="form-error">{{ errors.description }}</span>
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
            <div class="input-group" :class="{ error: errors.price }">
              <span class="input-prefix">¥</span>
              <input
                v-model="price"
                type="number"
                class="form-input"
                placeholder="0.00"
              />
            </div>
            <span v-if="errors.price" class="form-error">{{ errors.price }}</span>
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
            <label class="form-label">分类 <span class="required">*</span></label>
            <select v-model="category" class="form-select" :class="{ error: errors.category }">
              <option value="">请选择分类</option>
              <option v-for="cat in tradeCategories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
            <span v-if="errors.category" class="form-error">{{ errors.category }}</span>
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
            <div class="input-group" :class="{ error: errors.price }">
              <span class="input-prefix">¥</span>
              <input
                v-model="price"
                type="number"
                class="form-input"
                placeholder="0.00"
              />
            </div>
            <span v-if="errors.price" class="form-error">{{ errors.price }}</span>
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
            <label class="form-label">成团人数 <span class="required">*</span></label>
            <input
              v-model="minPeople"
              type="number"
              class="form-input"
              :class="{ error: errors.minPeople }"
              placeholder="最少几人成团"
            />
            <span v-if="errors.minPeople" class="form-error">{{ errors.minPeople }}</span>
          </div>
          <div class="form-item">
            <label class="form-label">截止时间 <span class="required">*</span></label>
            <input
              v-model="deadline"
              type="datetime-local"
              class="form-input"
              :class="{ error: errors.deadline }"
            />
            <span v-if="errors.deadline" class="form-error">{{ errors.deadline }}</span>
          </div>
        </div>
      </div>

      <div v-if="publishType === 'errand'" class="form-section">
        <h3>任务信息</h3>

        <div class="form-item">
          <label class="form-label">悬赏金额 <span class="required">*</span></label>
          <div class="input-group" :class="{ error: errors.reward }">
            <span class="input-prefix">¥</span>
            <input
              v-model="reward"
              type="number"
              class="form-input"
              placeholder="0.00"
            />
          </div>
          <span v-if="errors.reward" class="form-error">{{ errors.reward }}</span>
        </div>

        <div class="form-item">
          <label class="form-label">起点位置 <span class="required">*</span></label>
          <input
            v-model="location"
            type="text"
            class="form-input"
            :class="{ error: errors.location }"
            placeholder="任务起点"
          />
          <span v-if="errors.location" class="form-error">{{ errors.location }}</span>
        </div>

        <div class="form-item">
          <label class="form-label">终点位置 <span class="required">*</span></label>
          <input
            v-model="destination"
            type="text"
            class="form-input"
            :class="{ error: errors.destination }"
            placeholder="任务终点"
          />
          <span v-if="errors.destination" class="form-error">{{ errors.destination }}</span>
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
          <label class="form-label">类型 <span class="required">*</span></label>
          <div class="type-options">
            <button
              :class="['type-option', { active: lostType === 'lost' }]"
              @click="lostType = 'lost'"
            >
              我丢了
            </button>
            <button
              :class="['type-option', { active: lostType === 'found' }]"
              @click="lostType = 'found'"
            >
              我捡到
            </button>
          </div>
        </div>

        <div class="form-item">
          <label class="form-label">物品名称 <span class="required">*</span></label>
          <input
            v-model="itemName"
            type="text"
            class="form-input"
            :class="{ error: errors.itemName }"
            placeholder="请输入物品名称"
          />
          <span v-if="errors.itemName" class="form-error">{{ errors.itemName }}</span>
        </div>

        <div class="form-item">
          <label class="form-label">位置 <span class="required">*</span></label>
          <input
            v-model="location"
            type="text"
            class="form-input"
            :class="{ error: errors.location }"
            placeholder="丢失或捡拾位置"
          />
          <span v-if="errors.location" class="form-error">{{ errors.location }}</span>
        </div>

        <div class="form-item">
          <label class="form-label">时间 <span class="required">*</span></label>
          <input
            v-model="deadline"
            type="datetime-local"
            class="form-input"
            :class="{ error: errors.time }"
          />
          <span v-if="errors.time" class="form-error">{{ errors.time }}</span>
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

.form-input.error,
.form-textarea.error,
.form-select.error {
  border-color: #e17055;
}

.input-group.error {
  border-color: #e17055;
}

.form-error {
  display: block;
  font-size: 12px;
  color: #e17055;
  margin-top: 4px;
}

.type-options {
  display: flex;
  gap: 12px;
}

.type-option {
  flex: 1;
  padding: 12px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
}

.type-option.active {
  background: var(--primary-orange);
  border-color: var(--primary-orange);
  color: white;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
