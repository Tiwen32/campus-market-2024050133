<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  icon: string
  name: string
  path: string
  color: string
}>()

const router = useRouter()

const navigate = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="category-entry" @click="navigate(path)">
    <div class="entry-icon" :style="{ background: color }">
      {{ icon }}
    </div>
    <span class="entry-name">{{ name }}</span>
  </div>
</template>

<style scoped>
.category-entry {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-entry:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.entry-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.entry-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
</style>
