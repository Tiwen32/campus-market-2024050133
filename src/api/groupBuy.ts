import http from './http'

export interface GroupBuy {
  id: number
  title: string
  price: number
  originalPrice: number
  minPeople: number
  currentPeople: number
  deadline: string
  description: string
  organizerId: number
  organizerName: string
  campus: string
  image: string
  status: 'active' | 'completed' | 'failed'
}

export const getGroupBuys = () => {
  return http.get<GroupBuy[]>('/groupBuys')
}

export const getGroupBuyById = (id: number) => {
  return http.get<GroupBuy>(`/groupBuys/${id}`)
}

export const createGroupBuy = (data: Omit<GroupBuy, 'id'>) => {
  return http.post<GroupBuy>('/groupBuys', data)
}

export const updateGroupBuy = (id: number, data: Partial<GroupBuy>) => {
  return http.put<GroupBuy>(`/groupBuys/${id}`, data)
}

export const deleteGroupBuy = (id: number) => {
  return http.delete(`/groupBuys/${id}`)
}
