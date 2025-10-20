

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">My Vacation Requests</h1>
        <p class="text-gray-600">Manage and track your vacation requests</p>
      </div>

      <!-- Actions Bar -->
      <FilterBar v-model="statusFilter" role="requester" />

      <!-- Loading State -->
      <div v-if="vacationStore.loading" class="bg-white rounded-xl shadow-lg p-12 text-center">
        <svg class="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600 font-medium">Loading your requests...</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="vacationStore.vacationRequests.length === 0" class="bg-white rounded-xl shadow-lg p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No Requests Found</h3>
        <p class="text-gray-600 mb-6">You haven't created any vacation requests yet. Start by creating your first one!</p>
        <RouterLink 
          to="/requester/request" 
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02] shadow-lg"
        >
          Create First Request
        </RouterLink>
      </div>
      
      <!-- Requests Table -->
      <div v-else class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th :class="styles.th">Start Date</th>
                <th :class="styles.th">End Date</th>
                <th :class="styles.th">Status</th>
                <th :class="styles.th">Reason</th>
                <th :class="styles.th">Comments</th>
                <th :class="styles.th">Created</th>
                <th :class="styles.th">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="request in vacationStore.vacationRequests" :key="request.id" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatDate(request.startDate) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatDate(request.endDate) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="{
                      'bg-yellow-100 text-yellow-800': request.status === 'Pending',
                      'bg-green-100 text-green-800': request.status === 'Approved',
                      'bg-red-100 text-red-800': request.status === 'Rejected'
                    }"
                    class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ request.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{{ request.reason || 'N/A' }}</td>
                <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{{ request.comments || 'N/A' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(request.created_at) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <RouterLink 
                    :to="`/vacation/${request.id}`" 
                    class="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Error Message -->
      <div v-if="vacationStore.error" class="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm text-red-700">{{ vacationStore.error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useVacationStore } from '../../stores/vacation-store'
import FilterBar from '@/components/FilterBar.vue'
import { useTableStyles } from '@/composables/useTableStyles'

const styles = useTableStyles()
const vacationStore = useVacationStore()
const statusFilter = ref('')

onMounted(() => {
  fetchRequests()
})

const fetchRequests = () => {
  vacationStore.fetchRequests(statusFilter.value || undefined)
}

watch(statusFilter, ()=> {
  fetchRequests()
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
</script>