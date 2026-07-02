import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Trade } from '@/api/trade'
import type { LostFound } from '@/api/lostFound'
import type { GroupBuy } from '@/api/groupBuy'
import type { Errand } from '@/api/errand'

export type FavoriteItem = Trade | LostFound | GroupBuy | Errand

export interface FavoriteRecord {
  id: string
  type: 'trade' | 'lostFound' | 'groupBuy' | 'errand'
  item: FavoriteItem
}

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref<FavoriteRecord[]>([])

  const addFavorite = (item: FavoriteItem, type: 'trade' | 'lostFound' | 'groupBuy' | 'errand') => {
    const existing = favorites.value.find(f => f.id === String(item.id) && f.type === type)
    if (!existing) {
      favorites.value.push({
        id: String(item.id),
        type,
        item,
      })
    }
  }

  const removeFavorite = (itemId: string | number, type: 'trade' | 'lostFound' | 'groupBuy' | 'errand') => {
    const index = favorites.value.findIndex(f => f.id === String(itemId) && f.type === type)
    if (index > -1) {
      favorites.value.splice(index, 1)
    }
  }

  const toggleFavorite = (item: FavoriteItem, type: 'trade' | 'lostFound' | 'groupBuy' | 'errand') => {
    const existing = favorites.value.find(f => f.id === String(item.id) && f.type === type)
    if (existing) {
      removeFavorite(item.id, type)
    } else {
      addFavorite(item, type)
    }
  }

  const isFavorite = (itemId: string | number, type: 'trade' | 'lostFound' | 'groupBuy' | 'errand') => {
    return favorites.value.some(f => f.id === String(itemId) && f.type === type)
  }

  const favoriteCount = computed(() => favorites.value.length)

  const tradeFavorites = computed(() => {
    return favorites.value.filter(f => f.type === 'trade').map(f => f.item) as Trade[]
  })

  const lostFoundFavorites = computed(() => {
    return favorites.value.filter(f => f.type === 'lostFound').map(f => f.item) as LostFound[]
  })

  const groupBuyFavorites = computed(() => {
    return favorites.value.filter(f => f.type === 'groupBuy').map(f => f.item) as GroupBuy[]
  })

  const errandFavorites = computed(() => {
    return favorites.value.filter(f => f.type === 'errand').map(f => f.item) as Errand[]
  })

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    favoriteCount,
    tradeFavorites,
    lostFoundFavorites,
    groupBuyFavorites,
    errandFavorites,
  }
})
