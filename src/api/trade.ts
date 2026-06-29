import http from './http'

export interface Trade {
  id: number
  title: string
  price: number
  originalPrice: number
  category: string
  condition: 'new' | 'like-new' | 'good' | 'fair'
  description: string
  sellerId: number
  sellerName: string
  campus: string
  publishTime: string
  views: number
  likes: number
  image: string
  status: 'open' | 'closed'
}

export const getTrades = () => {
  return http.get<Trade[]>('/trades')
}

export const getTradeById = (id: number) => {
  return http.get<Trade>(`/trades/${id}`)
}

export const createTrade = (data: Omit<Trade, 'id'>) => {
  return http.post<Trade>('/trades', data)
}

export const updateTrade = (id: number, data: Partial<Trade>) => {
  return http.put<Trade>(`/trades/${id}`, data)
}

export const deleteTrade = (id: number) => {
  return http.delete(`/trades/${id}`)
}
