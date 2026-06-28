<script setup lang="ts">
import { ref } from 'vue'

// 商品表单数据
const formData = ref({
  title: '',
  price: '',
  originalPrice: '',
  condition: '9成新',
  location: '',
  contact: '',
  description: '',
  images: [] as string[]
})

// 成色选项
const conditionOptions = ['全新', '95新', '9成新', '8成新', '7成新', '其他']

// 添加图片（模拟）
const addImage = () => {
  const colors = ['#ff7c3a', '#36cfc9', '#975a96', '#1890ff', '#fadb14']
  const color = colors[formData.value.images.length % colors.length]
  formData.value.images.push(
    `https://via.placeholder.com/200x200${color}/ffffff?text=Image+${formData.value.images.length + 1}`
  )
}

// 删除图片
const removeImage = (index: number) => {
  formData.value.images.splice(index, 1)
}

// 提交表单
const submitForm = () => {
  if (!formData.value.title || !formData.value.price) {
    alert('请填写商品标题和价格')
    return
  }
  alert('发布成功！')
  formData.value = {
    title: '',
    price: '',
    originalPrice: '',
    condition: '9成新',
    location: '',
    contact: '',
    description: '',
    images: []
  }
}
</script>

<template>
  <div class="publish-page">
    <div class="page-header">
      <h1>发布商品</h1>
      <p>填写商品信息，快速发布到校园集市</p>
    </div>

    <form class="publish-form" @submit.prevent="submitForm">
      <!-- 商品标题 -->
      <div class="form-group">
        <label class="form-label">商品标题 <span class="required">*</span></label>
        <input
          v-model="formData.title"
          type="text"
          class="form-input"
          placeholder="请输入商品标题，如：iPhone 14 Pro 256G"
        />
      </div>

      <!-- 价格信息 -->
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">售价 <span class="required">*</span></label>
          <div class="price-input">
            <span class="price-prefix">¥</span>
            <input
              v-model="formData.price"
              type="number"
              class="form-input price-field"
              placeholder="0.00"
            />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">原价</label>
          <div class="price-input">
            <span class="price-prefix">¥</span>
            <input
              v-model="formData.originalPrice"
              type="number"
              class="form-input price-field"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <!-- 成色和地点 -->
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">成色</label>
          <select v-model="formData.condition" class="form-select">
            <option v-for="opt in conditionOptions" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">交易地点</label>
          <input
            v-model="formData.location"
            type="text"
            class="form-input"
            placeholder="如：计算机学院"
          />
        </div>
      </div>

      <!-- 联系方式 -->
      <div class="form-group">
        <label class="form-label">联系方式</label>
        <input
          v-model="formData.contact"
          type="text"
          class="form-input"
          placeholder="请输入手机号或微信号"
        />
      </div>

      <!-- 商品图片 -->
      <div class="form-group">
        <label class="form-label">商品图片</label>
        <div class="image-upload-area">
          <div
            v-for="(img, index) in formData.images"
            :key="index"
            class="image-item"
          >
            <img :src="img" :alt="'图片' + (index + 1)" />
            <button type="button" class="image-delete" @click="removeImage(index)">×</button>
          </div>
          <button
            type="button"
            class="image-add"
            @click="addImage"
            :disabled="formData.images.length >= 6"
          >
            <span class="add-icon">+</span>
            <span>添加图片</span>
          </button>
        </div>
        <p class="form-hint">最多上传6张图片，建议清晰展示商品细节</p>
      </div>

      <!-- 商品描述 -->
      <div class="form-group">
        <label class="form-label">商品描述</label>
        <textarea
          v-model="formData.description"
          class="form-textarea"
          rows="5"
          placeholder="请详细描述商品的成色、使用情况、配件等信息..."
        ></textarea>
      </div>

      <!-- 提交按钮 -->
      <div class="form-actions">
        <button type="button" class="btn-cancel">取消</button>
        <button type="submit" class="btn-submit">发布商品</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* 页面标题 */
.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 4px;
}

.page-header p {
  color: #666;
  font-size: 14px;
}

/* 表单容器 */
.publish-form {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* 表单组 */
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.required {
  color: #f5222d;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-orange);
}

.form-textarea {
  resize: vertical;
}

/* 表单行 */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* 价格输入 */
.price-input {
  display: flex;
  align-items: center;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
}

.price-prefix {
  padding: 12px 8px 12px 14px;
  color: #999;
  font-size: 14px;
}

.price-field {
  border: none;
  padding: 12px 14px 12px 0;
}

.price-field:focus {
  border: none;
}

/* 图片上传区域 */
.image-upload-area {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.image-item {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-delete {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.image-delete:hover {
  background: rgba(0, 0, 0, 0.8);
}

.image-add {
  width: 120px;
  height: 120px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;
  color: #999;
}

.image-add:hover:not(:disabled) {
  border-color: var(--primary-orange);
  background: var(--light-orange);
  color: var(--primary-orange);
}

.image-add:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-icon {
  font-size: 24px;
  font-weight: 300;
}

/* 表单提示 */
.form-hint {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}

/* 表单操作 */
.form-actions {
  display: flex;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.btn-cancel,
.btn-submit {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-cancel {
  background: #f5f5f5;
  color: #666;
}

.btn-cancel:hover {
  background: #e8e8e8;
}

.btn-submit {
  background: var(--primary-orange);
  color: white;
}

.btn-submit:hover {
  background: var(--dark-orange);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .image-item,
  .image-add {
    width: calc(50% - 6px);
    aspect-ratio: 1;
  }
}
</style>
