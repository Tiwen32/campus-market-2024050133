<script setup lang="ts">
import { ref } from 'vue'

const userInfo = ref({
  name: '张同学',
  avatar: '张',
  studentId: '2022001001',
  college: '计算机学院',
  phone: '138****8888',
  email: 'zhang@example.com',
  joinDate: '2022-09-01'
})

const stats = ref([
  { label: '发布商品', value: 12 },
  { label: '已售出', value: 8 },
  { label: '收藏', value: 24 },
  { label: '浏览量', value: 567 },
])

const menuItems = ref([
  { icon: '📦', label: '我的发布', path: '/trade' },
  { icon: '❤️', label: '我的收藏', path: '/trade' },
  { icon: '💰', label: '我的订单', path: '/trade' },
  { icon: '⭐', label: '我的评价', path: '/trade' },
  { icon: '⚙️', label: '账号设置', path: '/trade' },
])
</script>

<template>
  <div class="user-center-page">
    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar-wrapper">
          <div class="profile-avatar">{{ userInfo.avatar }}</div>
          <button class="avatar-edit">编辑</button>
        </div>
        <div class="profile-info">
          <h2 class="profile-name">{{ userInfo.name }}</h2>
          <p class="profile-student-id">{{ userInfo.studentId }} | {{ userInfo.college }}</p>
        </div>
      </div>
      
      <div class="stats-row">
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <div class="menu-card">
      <div
        v-for="item in menuItems"
        :key="item.label"
        class="menu-item"
      >
        <span class="menu-icon">{{ item.icon }}</span>
        <span class="menu-label">{{ item.label }}</span>
        <span class="menu-arrow">→</span>
      </div>
    </div>

    <div class="contact-card">
      <h3 class="card-title">联系方式</h3>
      <div class="contact-list">
        <div class="contact-item">
          <span class="contact-icon">📱</span>
          <div class="contact-info">
            <span class="contact-label">手机号</span>
            <span class="contact-value">{{ userInfo.phone }}</span>
          </div>
        </div>
        <div class="contact-item">
          <span class="contact-icon">📧</span>
          <div class="contact-info">
            <span class="contact-label">邮箱</span>
            <span class="contact-value">{{ userInfo.email }}</span>
          </div>
        </div>
        <div class="contact-item">
          <span class="contact-icon">📅</span>
          <div class="contact-info">
            <span class="contact-label">注册时间</span>
            <span class="contact-value">{{ userInfo.joinDate }}</span>
          </div>
        </div>
      </div>
    </div>

    <button class="logout-btn">退出登录</button>
  </div>
</template>

<style scoped>
.profile-card {
  background: linear-gradient(135deg, var(--primary-orange) 0%, var(--dark-orange) 100%);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  color: white;
}

.profile-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}

.avatar-wrapper {
  position: relative;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
}

.avatar-edit {
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: var(--primary-orange);
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
}

.profile-student-id {
  font-size: 14px;
  opacity: 0.9;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
}

.stat-label {
  font-size: 12px;
  opacity: 0.9;
}

.menu-card {
  background: white;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid #f5f5f5;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: #fafafa;
}

.menu-icon {
  font-size: 18px;
}

.menu-label {
  flex: 1;
  font-size: 15px;
  color: #333;
}

.menu-arrow {
  color: #ccc;
  font-size: 16px;
}

.contact-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.card-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 16px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-icon {
  font-size: 18px;
}

.contact-info {
  flex: 1;
}

.contact-label {
  display: block;
  font-size: 12px;
  color: #999;
  margin-bottom: 2px;
}

.contact-value {
  font-size: 14px;
  color: #333;
}

.logout-btn {
  width: 100%;
  background: white;
  color: #f5222d;
  border: 1px solid #f5222d;
  padding: 14px;
  border-radius: 12px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.logout-btn:hover {
  background: #fff2f0;
}

@media (max-width: 640px) {
  .profile-card {
    padding: 20px;
  }
  
  .profile-avatar {
    width: 70px;
    height: 70px;
    font-size: 28px;
  }
  
  .profile-name {
    font-size: 20px;
  }
  
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .stat-value {
    font-size: 20px;
  }
  
  .menu-item {
    padding: 14px 16px;
  }
}
</style>
