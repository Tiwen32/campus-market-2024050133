import http from './http'

export interface Conversation {
  id: number
  userId: number
  sellerId: number
  sellerName: string
  sellerAvatar: string
  tradeId: number
  tradeTitle: string
  lastMessage: string
  lastTime: string
  unreadCount: number
}

export interface ChatMessage {
  id: number
  conversationId: number
  senderId: number
  senderName: string
  content: string
  timestamp: string
  isRead: boolean
}

export const getConversations = (userId: number) => {
  return http.get<Conversation[]>(`/conversations?userId=${userId}`)
}

export const getMessages = (conversationId: number) => {
  return http.get<ChatMessage[]>(`/messages?conversationId=${conversationId}`)
}

export const sendMessage = (data: Omit<ChatMessage, 'id'>) => {
  return http.post<ChatMessage>('/messages', data)
}

export const createConversation = (data: Omit<Conversation, 'id'>) => {
  return http.post<Conversation>('/conversations', data)
}