<!-- filepath: d:\Tp\travel-sky\exam\vecation\client\src\views\validator\DashboardView.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Vacation Request Dashboard</h1>
        <p class="text-gray-600">Review and manage vacation requests from employees</p>
      </div>

      <FilterBar v-model="statusFilter" />

      <!-- Loading State -->
      <div v-if="vacationStore.loading" class="bg-white rounded-xl shadow-lg p-12 text-center">
        <svg
          class="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="text-gray-600 font-medium">Loading requests...</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="vacationStore.vacationRequests.length === 0"
        class="bg-white rounded-xl shadow-lg p-12 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-24 w-24 text-gray-300 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No Requests Found</h3>
        <p class="text-gray-600">There are no vacation requests matching your filter criteria.</p>
      </div>

      <!-- Desktop Table View -->
      <RequestsTable
        v-else
        :requests="vacationStore.vacationRequests"
        @approve="handleApprove"
        @reject="handleReject"
        class="hidden lg:block"
      />

      <!-- Mobile/Tablet Card View -->
      <RequestsCards
        v-if="vacationStore.vacationRequests.length > 0"
        :requests="vacationStore.vacationRequests"
        @approve="handleApprove"
        @reject="handleReject"
        class="lg:hidden"
      />

      <!-- Rejection Modal -->
      <RejectModal v-model="showModal" @confirm="confirmReject" />

      <!-- Error Message -->
      <div
        v-if="vacationStore.error"
        class="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"
      >
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-red-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
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
import RejectModal from '@/components/RejectModal.vue'
import RequestsTable from '@/components/validator/RequestsTable.vue'
import RequestsCards from '@/components/validator/RequestsCards.vue'

const vacationStore = useVacationStore()
const statusFilter = ref('')
const showModal = ref(false)
const selectedRequestId = ref<number | null>(null)

onMounted(() => {
  fetchRequests()
})

watch(statusFilter, () => {
  fetchRequests()
})

const fetchRequests = () => {
  vacationStore.fetchRequests(statusFilter.value || undefined)
}

const handleApprove = async (id: number) => {
  try {
    await vacationStore.updateRequestStatus(id, { status: 'Approved' })
  } catch (err) {
    console.error('Failed to approve request:', err)
  }
}

const handleReject = (id: number) => {
  selectedRequestId.value = id
  showModal.value = true
}

const confirmReject = async (comments: string) => {
  if (!selectedRequestId.value) return

  try {
    await vacationStore.updateRequestStatus(selectedRequestId.value, {
      status: 'Rejected',
      comments,
    })
    showModal.value = false
    selectedRequestId.value = null
  } catch (err) {
    console.error('Failed to reject request:', err)
  }
}
</script>
