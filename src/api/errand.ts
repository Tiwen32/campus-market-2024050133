import http from './http'

export interface Errand {
  id: number
  title: string
  reward: number
  location: string
  destination: string
  description: string
  requesterId: number
  requesterName: string
  phone: string
  time: string
  image: string
  status: 'pending' | 'inProgress' | 'completed'
  takerId: number | null
}

export const getErrands = () => {
  return http.get<Errand[]>('/errands')
}

export const getErrandById = (id: number) => {
  return http.get<Errand>(`/errands/${id}`)
}

export const createErrand = (data: Omit<Errand, 'id'>) => {
  return http.post<Errand>('/errands', data)
}

export const updateErrand = (id: number, data: Partial<Errand>) => {
  return http.put<Errand>(`/errands/${id}`, data)
}

export const deleteErrand = (id: number) => {
  return http.delete(`/errands/${id}`)
}
