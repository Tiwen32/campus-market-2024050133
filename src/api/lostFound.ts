import http from './http'

export interface LostFound {
  id: number
  title: string
  type: 'lost' | 'found'
  itemName: string
  location: string
  time: string
  description: string
  publisherId: number
  publisherName: string
  phone: string
  image: string
  status: 'open' | 'closed'
}

export const getLostFounds = () => {
  return http.get<LostFound[]>('/lostFounds')
}

export const getLostFoundById = (id: number) => {
  return http.get<LostFound>(`/lostFounds/${id}`)
}

export const createLostFound = (data: Omit<LostFound, 'id'>) => {
  return http.post<LostFound>('/lostFounds', data)
}

export const updateLostFound = (id: number, data: Partial<LostFound>) => {
  return http.put<LostFound>(`/lostFounds/${id}`, data)
}

export const deleteLostFound = (id: number) => {
  return http.delete(`/lostFounds/${id}`)
}
