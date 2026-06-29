import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  image?: string
  type: 'text' | 'image'
  timestamp: string
  isRead: boolean
}

export interface Conversation {
  id: string
  userId: string
  userName: string
  userAvatar: string
  lastMessage: string
  lastTime: string
  unreadCount: number
  messages: Message[]
}

export const useMessageStore = defineStore('messages', () => {
  const conversations = ref<Conversation[]>([])
  const currentConversationId = ref<string | null>(null)

  const currentConversation = computed(() => {
    return conversations.value.find(c => c.id === currentConversationId.value)
  })

  const totalUnread = computed(() => {
    return conversations.value.reduce((sum, c) => sum + c.unreadCount, 0)
  })

  const selectConversation = (conversationId: string) => {
    currentConversationId.value = conversationId
    const conversation = conversations.value.find(c => c.id === conversationId)
    if (conversation) {
      conversation.unreadCount = 0
      conversation.messages.forEach(m => m.isRead = true)
    }
  }

  const sendMessage = (conversationId: string, content: string) => {
    const conversation = conversations.value.find(c => c.id === conversationId)
    if (conversation) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'me',
        senderName: '我',
        senderAvatar: '',
        content,
        type: 'text',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
      }
      conversation.messages.push(newMessage)
      conversation.lastMessage = content
      conversation.lastTime = newMessage.timestamp
    }
  }

  const sendImage = (conversationId: string, imageUrl: string) => {
    const conversation = conversations.value.find(c => c.id === conversationId)
    if (conversation) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'me',
        senderName: '我',
        senderAvatar: '',
        content: '[图片]',
        image: imageUrl,
        type: 'image',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
      }
      conversation.messages.push(newMessage)
      conversation.lastMessage = '[图片]'
      conversation.lastTime = newMessage.timestamp
    }
  }

  const addConversation = (conversation: Conversation) => {
    conversations.value.push(conversation)
  }

  return {
    conversations,
    currentConversationId,
    currentConversation,
    totalUnread,
    selectConversation,
    sendMessage,
    sendImage,
    addConversation,
  }
})
