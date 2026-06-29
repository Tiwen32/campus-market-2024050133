import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: string
  name: string
  avatar: string
  phone: string
  campus: string
  role: 'buyer' | 'seller' | 'both'
}

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User>({
    id: '1',
    name: '橙同学',
    avatar: '',
    phone: '138****8888',
    campus: '成龙校区',
    role: 'both',
  })

  const isLoggedIn = ref(true)

  const login = (user: Partial<User>) => {
    currentUser.value = { ...currentUser.value, ...user }
    isLoggedIn.value = true
  }

  const logout = () => {
    isLoggedIn.value = false
  }

  const updateProfile = (profile: Partial<User>) => {
    currentUser.value = { ...currentUser.value, ...profile }
  }

  return {
    currentUser,
    isLoggedIn,
    login,
    logout,
    updateProfile,
  }
})
