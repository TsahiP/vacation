import type { LoginCredentials, RegisterData, User } from '@/types/types'
import api from './api-service'

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await api.post('/auth/login', credentials)
    localStorage.setItem('token', response.data.token)
    return response.data
  },

  async register(data: RegisterData): Promise<User> {
    const response = await api.post('/auth/register', data)
    localStorage.setItem('token', response.data.token)
    return response.data
  },

  logout(): void {
    localStorage.removeItem('token')
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  },

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user')
    return userJson ? JSON.parse(userJson) : null
  }
}