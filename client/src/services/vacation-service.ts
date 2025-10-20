import type { StatusUpdateForm, VacationRequest, VacationRequestForm } from '@/types/types'
import api from './api-service'

export const vacationService = {
  async getRequests(status?: string): Promise<VacationRequest[]> {
    const params = status ? { status } : {}
    const response = await api.get('/vacation', { params })
    return response.data
  },

  async getRequestById(id: number): Promise<VacationRequest> {
    const response = await api.get(`/vacation/${id}`)
    return response.data
  },

  async createRequest(request: VacationRequestForm): Promise<VacationRequest> {
    const response = await api.post('/vacation', request)
    return response.data
  },

  async updateRequestStatus(id: number, data: StatusUpdateForm): Promise<VacationRequest> {
    const response = await api.put(`/vacation/${id}`, data)
    return response.data
  }
}