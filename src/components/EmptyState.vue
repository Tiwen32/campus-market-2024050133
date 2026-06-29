<script setup lang="ts">
defineProps<{
  text?: string
  icon?: string
}>()
</script>

<template>
  <div class="empty-state">
    <span class="empty-icon">{{ icon || '📭' }}</span>
    <p class="empty-text">{{ text || '暂无数据' }}</p>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-text {
  font-size: 16px;
  color: #999;
}
</style>
