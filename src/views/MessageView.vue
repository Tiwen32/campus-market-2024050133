<script setup lang="ts">
import { ref } from 'vue'

// 消息列表数据
const messages = ref([
  {
    id: 1,
    type: 'system',
    avatar: '系统',
    title: '欢迎使用校园集市',
    content: '感谢您的注册，祝您交易愉快！',
    time: '今天',
    unread: true
  },
  {
    id: 2,
    type: 'order',
    avatar: '李',
    title: '有人购买了您的商品',
    content: '李同学购买了您发布的《高等数学》教材，请尽快联系买家确认交易时间。',
    time: '2小时前',
    unread: true
  },
  {
    id: 3,
    type: 'chat',
    avatar: '张',
    title: '张同学向您询价',
    content: '您好，请问 iPhone 14 Pro 还在吗？可以便宜一点吗？',
    time: '3小时前',
    unread: false
  },
  {
    id: 4,
    type: 'system',
    avatar: '系统',
    title: '交易提醒',
    content: '您的订单 #20241201 已完成，请及时评价。',
    time: '昨天',
    unread: false
  },
  {
    id: 5,
    type: 'chat',
    avatar: '王',
    title: '王同学发送了消息',
    content: '电动滑板车可以试骑一下吗？',
    time: '昨天',
    unread: false
  },
])

// 标记为已读
const markAsRead = (id: number) => {
  const msg = messages.value.find(m => m.id === id)
  if (msg) {
    msg.unread = false
  }
}

// 获取消息类型样式
const getTypeClass = (type: string) => {
  const classes: Record<string, string> = {
    system: 'msg-system',
    order: 'msg-order',
    chat: 'msg-chat'
  }
  return classes[type] || ''
}

// 获取未读数量
const unreadCount = ref(messages.value.filter(m => m.unread).length)

// 标记全部已读
const markAllRead = () => {
  messages.value.forEach(m => {
    m.unread = false
  })
  unreadCount.value = 0
}
</script>

<template>
  <div class="message-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="header-left">
        <h1>消息中心</h1>
        <span class="unread-badge" v-if="unreadCount > 0">{{ unreadCount }} 条未读</span>
      </div>
      <button v-if="unreadCount > 0" class="mark-all-btn" @click="markAllRead">
        全部已读
      </button>
    </div>

    <!-- 消息列表 -->
    <div class="message-list">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="['message-card', getTypeClass(msg.type), { unread: msg.unread }]"
        @click="markAsRead(msg.id)"
      >
        <div :class="['message-avatar', getTypeClass(msg.type)]">
          {{ msg.avatar }}
        </div>
        <div class="message-content">
          <div class="message-header">
            <span class="message-title">{{ msg.title }}</span>
            <span class="message-time">{{ msg.time }}</span>
          </div>
          <p class="message-text">{{ msg.content }}</p>
        </div>
        <div v-if="msg.unread" class="unread-dot"></div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="messages.length === 0" class="empty-state">
      <div class="empty-icon">✉️</div>
      <p>暂无消息</p>
    </div>
  </div>
</template>

<style scoped>
/* 页面标题 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-left h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 4px;
}

.unread-badge {
  background: #f5222d;
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 8px;
}

.mark-all-btn {
  background: var(--light-orange);
  color: var(--primary-orange);
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.mark-all-btn:hover {
  background: #ffe0cc;
}

/* 消息列表 */
.message-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 消息卡片 */
.message-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.message-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.message-card.unread {
  background: var(--light-orange);
}

/* 消息头像 */
.message-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
}

.msg-system {
  background: #999;
}

.msg-order {
  background: var(--primary-orange);
}

.msg-chat {
  background: #36cfc9;
}

/* 消息内容 */
.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.message-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.message-time {
  font-size: 12px;
  color: #999;
}

.message-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 未读标识 */
.unread-dot {
  width: 8px;
  height: 8px;
  background: #f5222d;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 18px;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state p {
  color: #999;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .message-card {
    padding: 14px;
  }
  
  .message-avatar {
    width: 40px;
    height: 40px;
    font-size: 14px;
  }
  
  .message-title {
    font-size: 14px;
  }
  
  .message-text {
    font-size: 13px;
  }
}
</style>
