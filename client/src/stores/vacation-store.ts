import { defineStore } from 'pinia'
import { ref } from 'vue'
import { vacationService } from '../services/vacation-service'
import type { VacationRequest, VacationRequestForm, StatusUpdateForm } from '../types/types'

export const useVacationStore = defineStore('vacation', () => {
  const vacationRequests = ref<VacationRequest[]>([])
  const currentRequest = ref<VacationRequest | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchRequests = async (status?: string) => {
    loading.value = true
    error.value = null
    try {
      vacationRequests.value = await vacationService.getRequests(status)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch vacation requests'
    } finally {
      loading.value = false
    }
  }

  const fetchRequestById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      currentRequest.value = await vacationService.getRequestById(id)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch vacation request'
    } finally {
      loading.value = false
    }
  }

  const createRequest = async (request: VacationRequestForm) => {
    loading.value = true
    error.value = null
    try {
      const newRequest = await vacationService.createRequest(request)
      vacationRequests.value.unshift(newRequest)
      return newRequest
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to create vacation request'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const updateRequestStatus = async (id: number, data: StatusUpdateForm) => {
    loading.value = true
    error.value = null
    try {
      const updatedRequest = await vacationService.updateRequestStatus(id, data)
      
      // Update in the list
      const index = vacationRequests.value.findIndex(r => r.id === id)
      if (index !== -1) {
        vacationRequests.value[index] = updatedRequest
      }
      
      // Update current request if being viewed
      if (currentRequest.value && currentRequest.value.id === id) {
        currentRequest.value = updatedRequest
      }
      
      return updatedRequest
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update request status'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    vacationRequests,
    currentRequest,
    loading,
    error,
    fetchRequests,
    fetchRequestById,
    createRequest,
    updateRequestStatus
  }
})