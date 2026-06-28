<script setup lang="ts">
import Layout from '@/components/Layout.vue'
</script>

<template>
  <Layout />
</template>

<style>
:root {
  --primary-orange: #ff7c3a;
  --light-orange: #fff4ed;
  --dark-orange: #e55a1c;
  --text-dark: #333;
  --text-light: #666;
  --bg-gray: #f5f5f5;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-gray);
}

a {
  color: inherit;
}
</style>