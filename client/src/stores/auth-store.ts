import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '../services/auth-service'
import type { User, LoginCredentials, RegisterData } from '@/types/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Initialize user from localStorage if available
  const init = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null
    try {
      const userData = await authService.login(credentials)
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const register = async (data: RegisterData) => {
    loading.value = true
    error.value = null
    try {
      const userData = await authService.register(data)
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    authService.logout()
    user.value = null
    localStorage.removeItem('user')
  }

  const isRequester = () => user.value?.role === 'Requester'
  const isValidator = () => user.value?.role === 'Validator'

  return {
    user,
    loading,
    error,
    init,
    login,
    register,
    logout,
    isRequester,
    isValidator
  }
})