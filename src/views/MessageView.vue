<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/messages'
import { mockMessages } from '@/api/mockData'

const router = useRouter()
const messageStore = useMessageStore()

const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const imageInput = ref<HTMLInputElement | null>(null)
const previewImage = ref<string>('')

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const handleSelectConversation = (conversationId: string) => {
  messageStore.selectConversation(conversationId)
  scrollToBottom()
}

const handleSendMessage = () => {
  if (newMessage.value.trim() && messageStore.currentConversationId) {
    messageStore.sendMessage(messageStore.currentConversationId, newMessage.value.trim())
    newMessage.value = ''
    scrollToBottom()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSendMessage()
  }
}

const handleBack = () => {
  router.push('/')
}

const handleImageClick = () => {
  imageInput.value?.click()
}

const handleImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      previewImage.value = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleSendImage = () => {
  if (previewImage.value && messageStore.currentConversationId) {
    messageStore.sendImage(messageStore.currentConversationId, previewImage.value)
    previewImage.value = ''
    scrollToBottom()
  }
}

const handleCancelImage = () => {
  previewImage.value = ''
  if (imageInput.value) {
    imageInput.value.value = ''
  }
}

const handleImagePreview = (imageUrl: string) => {
  previewImage.value = imageUrl
}

onMounted(() => {
  if (messageStore.conversations.length === 0) {
    mockMessages.forEach(msg => {
      messageStore.addConversation(msg)
    })
  }
  if (messageStore.conversations.length > 0 && !messageStore.currentConversationId) {
    const firstConv = messageStore.conversations[0]
    if (firstConv) {
      messageStore.selectConversation(firstConv.id)
    }
  }
})
</script>

<template>
  <div class="message-page">
    <div class="message-layout">
      <div class="conversation-list">
        <div class="list-header">
          <h2>消息</h2>
          <span class="unread-count" v-if="messageStore.totalUnread > 0">
            {{ messageStore.totalUnread }}
          </span>
        </div>

        <div class="conversation-items">
          <div
            v-for="conv in messageStore.conversations"
            :key="conv.id"
            :class="['conversation-item', { active: messageStore.currentConversationId === conv.id }]"
            @click="handleSelectConversation(conv.id)"
          >
            <div class="conv-avatar">
              {{ conv.userId === 'system' ? '🔔' : '👤' }}
            </div>
            <div class="conv-info">
              <div class="conv-header">
                <span class="conv-name">{{ conv.userName }}</span>
                <span class="conv-time">{{ conv.lastTime }}</span>
              </div>
              <p class="conv-message">{{ conv.lastMessage }}</p>
            </div>
            <span v-if="conv.unreadCount > 0" class="conv-unread">
              {{ conv.unreadCount }}
            </span>
          </div>
        </div>
      </div>

      <div class="chat-area">
        <div v-if="messageStore.currentConversation" class="chat-content">
          <div class="chat-header">
            <button class="back-btn" @click="handleBack">← 返回</button>
            <div class="chat-title">
              <span class="chat-avatar">
                {{ messageStore.currentConversation.userId === 'system' ? '🔔' : '👤' }}
              </span>
              <span>{{ messageStore.currentConversation.userName }}</span>
            </div>
          </div>

          <div ref="messagesContainer" class="messages-container">
            <div
              v-for="msg in messageStore.currentConversation.messages"
              :key="msg.id"
              :class="['message-item', { mine: msg.senderId === 'me' }]"
            >
              <span class="msg-avatar">{{ msg.senderId === 'me' ? '🙂' : (msg.senderId === 'system' ? '🔔' : '👤') }}</span>
              <div class="msg-content">
                <span class="msg-name">{{ msg.senderName }}</span>
                <div class="msg-bubble">
                  <span v-if="msg.type === 'text'">{{ msg.content }}</span>
                  <img v-else-if="msg.type === 'image' && msg.image" :src="msg.image" class="msg-image" @click="handleImagePreview(msg.image)" />
                </div>
                <span class="msg-time">{{ msg.timestamp }}</span>
              </div>
            </div>
          </div>

          <div v-if="previewImage && !previewImage.startsWith('data:')" class="image-preview-modal" @click="previewImage = ''">
            <img :src="previewImage" class="preview-full-image" @click.stop />
          </div>

          <div class="chat-input-area">
            <button class="image-btn" @click="handleImageClick" title="发送图片">📷</button>
            <input
              v-model="newMessage"
              type="text"
              class="chat-input"
              placeholder="输入消息..."
              @keydown="handleKeydown"
            />
            <button class="send-btn" @click="handleSendMessage">发送</button>
            <input ref="imageInput" type="file" accept="image/*" class="image-input" @change="handleImageChange" />
          </div>

          <div v-if="previewImage" class="image-preview-area">
            <img :src="previewImage" class="preview-image" />
            <div class="preview-actions">
              <button class="send-image-btn" @click="handleSendImage">发送图片</button>
              <button class="cancel-image-btn" @click="handleCancelImage">取消</button>
            </div>
          </div>
        </div>

        <div v-else class="empty-chat">
          <span class="empty-icon">💬</span>
          <p>选择一个会话开始聊天</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-page {
  min-height: calc(100vh - 56px);
  background: var(--bg-gray);
}

.message-layout {
  display: flex;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.conversation-list {
  width: 350px;
  background: white;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

.list-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.list-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.unread-count {
  background: #e17055;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.conversation-items {
  flex: 1;
  overflow-y: auto;
}

.conversation-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.conversation-item:hover {
  background: #f8f8f8;
}

.conversation-item.active {
  background: var(--light-orange);
}

.conv-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.conv-info {
  flex: 1;
  min-width: 0;
}

.conv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.conv-name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.conv-time {
  font-size: 12px;
  color: #999;
}

.conv-message {
  font-size: 14px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conv-unread {
  background: var(--primary-orange);
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}

.chat-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.back-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #666;
  padding: 4px 8px;
}

.back-btn:hover {
  color: var(--primary-orange);
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.chat-title span:last-child {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  gap: 10px;
}

.message-item.mine {
  flex-direction: row-reverse;
}

.msg-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.msg-content {
  max-width: 70%;
}

.message-item.mine .msg-content {
  text-align: right;
}

.msg-name {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.msg-bubble {
  display: inline-block;
  padding: 10px 16px;
  border-radius: 16px;
  font-size: 15px;
  line-height: 1.5;
  max-width: 100%;
  word-wrap: break-word;
}

.message-item:not(.mine) .msg-bubble {
  background: #f5f5f5;
  color: #333;
  border-bottom-left-radius: 4px;
}

.message-item.mine .msg-bubble {
  background: var(--primary-orange);
  color: white;
  border-bottom-right-radius: 4px;
}

.msg-time {
  font-size: 12px;
  color: #999;
}

.chat-input-area {
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.chat-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 15px;
  outline: none;
}

.chat-input:focus {
  border-color: var(--primary-orange);
}

.send-btn {
  padding: 12px 28px;
  background: var(--primary-orange);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.send-btn:hover {
  background: var(--dark-orange);
}

.msg-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.msg-image:hover {
  transform: scale(1.05);
}

.image-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.preview-full-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
}

.image-btn {
  width: 44px;
  height: 44px;
  border: none;
  background: white;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.image-btn:hover {
  background: #f0f0f0;
}

.image-input {
  display: none;
}

.image-preview-area {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: #fafafa;
  border-top: 1px solid #f0f0f0;
}

.preview-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.preview-actions {
  display: flex;
  gap: 12px;
}

.send-image-btn {
  padding: 8px 20px;
  background: var(--primary-orange);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.send-image-btn:hover {
  background: var(--dark-orange);
}

.cancel-image-btn {
  padding: 8px 20px;
  background: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.cancel-image-btn:hover {
  background: #d0d0d0;
}

.empty-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-chat p {
  font-size: 16px;
  color: #666;
}

@media (max-width: 768px) {
  .message-layout {
    flex-direction: column;
  }

  .conversation-list {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #eee;
    max-height: 300px;
  }

  .msg-content {
    max-width: 85%;
  }
}
</style>
