import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Product {
  id: string
  title: string
  price: number
  originalPrice?: number
  image: string
  category: string
  condition: 'new' | 'like-new' | 'good' | 'fair'
  description: string
  sellerId: string
  sellerName: string
  sellerAvatar: string
  campus: string
  publishTime: string
  views: number
  likes: number
  isLiked: boolean
  isSold: boolean
}

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const cartItems = ref<Product[]>([])
  const favorites = ref<string[]>([])

  const addProduct = (product: Product) => {
    products.value.unshift(product)
  }

  const toggleLike = (productId: string) => {
    const index = favorites.value.indexOf(productId)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(productId)
    }
    const product = products.value.find(p => p.id === productId)
    if (product) {
      product.isLiked = !product.isLiked
      product.likes += product.isLiked ? 1 : -1
    }
  }

  const addToCart = (product: Product) => {
    if (!cartItems.value.find(item => item.id === product.id)) {
      cartItems.value.push(product)
    }
  }

  const removeFromCart = (productId: string) => {
    const index = cartItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const filteredProducts = computed(() => {
    return products.value.filter(p => !p.isSold)
  })

  const cartCount = computed(() => cartItems.value.length)

  const favoriteProducts = computed(() => {
    return products.value.filter(p => favorites.value.includes(p.id))
  })

  return {
    products,
    cartItems,
    favorites,
    addProduct,
    toggleLike,
    addToCart,
    removeFromCart,
    filteredProducts,
    cartCount,
    favoriteProducts,
  }
})
