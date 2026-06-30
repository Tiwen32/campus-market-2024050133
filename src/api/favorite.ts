import http from './http'

export interface Favorite {
  id: number
  userId: number
  tradeId: number
  createdAt: string
}

export const getFavorites = (userId: number) => {
  return http.get<Favorite[]>(`/favorites?userId=${userId}`)
}

export const addFavorite = (data: Omit<Favorite, 'id'>) => {
  return http.post<Favorite>('/favorites', data)
}

export const removeFavorite = (id: number) => {
  return http.delete(`/favorites/${id}`)
}

export const getFavoriteByTradeId = (userId: number, tradeId: number) => {
  return http.get<Favorite[]>(`/favorites?userId=${userId}&tradeId=${tradeId}`)
}