<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Vacation Request Details</h1>
        <p class="text-gray-600">View detailed information about this vacation request</p>
      </div>
      
      <!-- Loading State -->
      <div v-if="vacationStore.loading" class="bg-white rounded-xl shadow-lg p-12 text-center">
        <svg class="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600 font-medium">Loading request details...</p>
      </div>
      
      <!-- Not Found State -->
      <div v-else-if="!vacationStore.currentRequest" class="bg-white rounded-xl shadow-lg p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-red-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Request Not Found</h3>
        <p class="text-gray-600 mb-6">This request doesn't exist or you don't have permission to view it.</p>
        <RouterLink 
          :to="authStore.isValidator() ? '/validator' : '/requester'"
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02] shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </RouterLink>
      </div>
      
      <!-- Details Card -->
      <div v-else class="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Status Header -->
        <div class="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-900">Request Information</h2>
            <span 
              :class="{
                'bg-yellow-100 text-yellow-800 border-yellow-200': vacationStore.currentRequest.status === 'Pending',
                'bg-green-100 text-green-800 border-green-200': vacationStore.currentRequest.status === 'Approved',
                'bg-red-100 text-red-800 border-red-200': vacationStore.currentRequest.status === 'Rejected'
              }"
              class="px-4 py-2 text-sm font-bold rounded-full border-2"
            >
              {{ vacationStore.currentRequest.status }}
            </span>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="p-8 space-y-6">
          <!-- Employee Info -->
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div class="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                {{ (vacationStore.currentRequest.User?.name || 'U')[0]?.toUpperCase() }}
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Employee</p>
              <p class="text-lg font-bold text-gray-900">{{ vacationStore.currentRequest.User?.name || 'Unknown' }}</p>
            </div>
          </div>

          <!-- Date Range -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div class="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-xs font-semibold text-blue-700 uppercase tracking-wide">Start Date</p>
              </div>
              <p class="text-lg font-bold text-gray-900">{{ formatDate(vacationStore.currentRequest.startDate) }}</p>
            </div>

            <div class="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
              <div class="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-xs font-semibold text-indigo-700 uppercase tracking-wide">End Date</p>
              </div>
              <p class="text-lg font-bold text-gray-900">{{ formatDate(vacationStore.currentRequest.endDate) }}</p>
            </div>

            <div class="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <div class="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-xs font-semibold text-purple-700 uppercase tracking-wide">Duration</p>
              </div>
              <p class="text-lg font-bold text-gray-900">{{ calculateDuration() }} days</p>
            </div>
          </div>

          <!-- Reason -->
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Reason</p>
            <p class="text-gray-900 wrap-break-word">{{ vacationStore.currentRequest.reason || 'No reason provided' }}</p>
          </div>

          <!-- Rejection Comments (if rejected) -->
          <div v-if="vacationStore.currentRequest.status === 'Rejected'" class="bg-red-50 rounded-lg p-4 border border-red-200">
            <div class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="flex-1">
                <p class="text-sm font-semibold text-red-700 uppercase tracking-wide mb-2">Rejection Comments</p>
                <p class="text-gray-900">{{ vacationStore.currentRequest.comments || 'No comments provided' }}</p>
              </div>
            </div>
          </div>

          <!-- Submission Time -->
          <div class="flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Submitted on {{ formatDateTime(vacationStore.currentRequest.created_at) }}</span>
          </div>
        </div>

        <!-- Validator Actions -->
        <div v-if="isValidator && vacationStore.currentRequest.status === 'Pending'" class="px-8 py-6 bg-gray-50 border-t border-gray-200">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Validator Actions</h3>
          <div class="flex gap-4">
            <button 
              @click="updateStatus('Approved')"
              class="flex-1 inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Approve Request
            </button>
            <button 
              @click="showRejectModal = true"
              class="flex-1 inline-flex items-center justify-center px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Reject Request
            </button>
          </div>
        </div>

        <!-- Back Link -->
        <div class="px-8 py-6 bg-white border-t border-gray-200">
          <RouterLink 
            :to="authStore.isValidator() ? '/validator' : '/requester'"
            class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </RouterLink>
        </div>
      </div>
      
      <!-- Rejection Modal -->
      <div v-if="showRejectModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
          <!-- Background overlay -->
          <div class="fixed inset-0 bg-gray-100 opacity-50 transition-opacity -z-10" aria-hidden="true" @click="showRejectModal = false"></div>
          
          <!-- Modal panel -->
          <div class="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-10">
            <div class="bg-white px-6 pt-6 pb-4">
              <div class="flex items-start">
                <div class="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div class="mt-3 text-center">
                <h3 class="text-2xl leading-6 font-bold text-gray-900 mb-2" id="modal-title">
                  Reject Vacation Request
                </h3>
                <p class="text-sm text-gray-500 mb-4">
                  Please provide a reason for rejecting this request
                </p>
              </div>
            </div>
            
            <form @submit.prevent="rejectRequest" class="px-6 pb-6">
              <div class="mb-6">
                <label for="comments" class="block text-sm font-semibold text-gray-700 mb-2">
                  Rejection Reason <span class="text-red-500">*</span>
                </label>
                <textarea 
                  id="comments" 
                  v-model="rejectForm.comments" 
                  rows="4"
                  placeholder="Please provide a detailed reason for rejection..."
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                ></textarea>
              </div>
              
              <div class="flex gap-3">
                <button 
                  type="button" 
                  @click="showRejectModal = false"
                  class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  :disabled="!rejectForm.comments"
                  class="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <!-- Error Message -->
      <div v-if="error" class="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVacationStore } from '../stores/vacation-store'
import { useAuthStore } from '../stores/auth-store'

const route = useRoute()
const router = useRouter()
const vacationStore = useVacationStore()
const authStore = useAuthStore()
const error = ref('')
const showRejectModal = ref(false)
const rejectForm = ref({
  comments: ''
})

const isValidator = computed(() => {
  return authStore.isValidator()
})

onMounted(async () => {
  const id = Number(route.params.id)
  if (isNaN(id)) {
    error.value = 'Invalid request ID'
    return
  }
  
  try {
    await vacationStore.fetchRequestById(id)
  } catch (err: any) {
    error.value = err.toString()
  }
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const calculateDuration = () => {
  if (!vacationStore.currentRequest) return 0
  
  const start = new Date(vacationStore.currentRequest.startDate)
  const end = new Date(vacationStore.currentRequest.endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include both start and end days
  
  return diffDays
}

const updateStatus = async (status: 'Approved') => {
  if (!vacationStore.currentRequest) return
  
  try {
    await vacationStore.updateRequestStatus(vacationStore.currentRequest.id, { status })
    // Reload the request to get updated status
    await vacationStore.fetchRequestById(vacationStore.currentRequest.id)
  } catch (err: any) {
    error.value = err.toString()
  }
}

const rejectRequest = async () => {
  if (!vacationStore.currentRequest) return
  
  try {
    await vacationStore.updateRequestStatus(vacationStore.currentRequest.id, {
      status: 'Rejected',
      comments: rejectForm.value.comments
    })
    showRejectModal.value = false
    // Reload the request to get updated status
    await vacationStore.fetchRequestById(vacationStore.currentRequest.id)
  } catch (err: any) {
    error.value = err.toString()
  }
}
</script>