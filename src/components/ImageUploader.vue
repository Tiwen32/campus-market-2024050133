<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  update: [images: string[]]
}>()

const images = ref<string[]>([])
const inputRef = ref<HTMLInputElement | null>(null)

const handleClick = () => {
  inputRef.value?.click()
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result && images.value.length < 6) {
          images.value.push(event.target.result as string)
          emit('update', images.value)
        }
      }
      reader.readAsDataURL(file)
    })
  }
  target.value = ''
}

const removeImage = (index: number) => {
  images.value.splice(index, 1)
  emit('update', images.value)
}

const addMockImage = () => {
  const mockImages = [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  ]
  const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)] ?? ''
  if (images.value.length < 6 && randomImage) {
    images.value.push(randomImage)
    emit('update', images.value)
  }
}
</script>

<template>
  <div class="image-uploader">
    <div class="upload-grid">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="upload-item"
      >
        <img :src="image" :alt="`上传图片 ${index + 1}`" />
        <button class="remove-btn" @click="removeImage(index)">✕</button>
      </div>
      <div
        v-if="images.length < 6"
        class="upload-item upload-add"
        @click="handleClick"
      >
        <span class="add-icon">+</span>
        <span class="add-text">添加图片</span>
      </div>
      <button class="mock-btn" @click="addMockImage">添加示例图</button>
    </div>
    <input
      ref="inputRef"
      type="file"
      multiple
      accept="image/*"
      class="file-input"
      @change="handleFileChange"
    />
  </div>
</template>

<style scoped>
.image-uploader {
  width: 100%;
}

.upload-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.upload-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
}

.upload-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-add {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ddd;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-add:hover {
  border-color: var(--primary-orange);
  background: var(--light-orange);
}

.add-icon {
  font-size: 32px;
  color: #999;
  margin-bottom: 4px;
}

.add-text {
  font-size: 13px;
  color: #999;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
}

.mock-btn {
  grid-column: span 3;
  padding: 8px 16px;
  background: #f5f5f5;
  border: 1px dashed #ddd;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.mock-btn:hover {
  background: #eee;
  border-color: var(--primary-orange);
  color: var(--primary-orange);
}

.file-input {
  display: none;
}
</style>
