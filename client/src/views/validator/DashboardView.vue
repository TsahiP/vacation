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

      <!-- Requests Table -->
      <div v-else class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th :class="styles.th">Employee</th>
                <th :class="styles.th">Start Date</th>
                <th :class="styles.th">End Date</th>
                <th :class="styles.th">Status</th>
                <th :class="styles.th">Reason</th>
                <th :class="styles.th">Created</th>
                <th :class="styles.th">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="request in vacationStore.vacationRequests"
                :key="request.id"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <div
                        class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold"
                      >
                        {{ (request.User?.name || 'U')[0]?.toUpperCase() }}
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ request.User?.name || 'Unknown' }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(request.startDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(request.endDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="{
                      'bg-yellow-100 text-yellow-800': request.status === 'Pending',
                      'bg-green-100 text-green-800': request.status === 'Approved',
                      'bg-red-100 text-red-800': request.status === 'Rejected',
                    }"
                    class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ request.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                  {{ request.reason || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(request.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex flex-col gap-2">
                    <ViewBtn :to="`/vacation/${request.id}`" />

                    <div v-if="request.status === 'Pending'" class="flex gap-2">
                      <button
                        @click="updateStatus(request.id, 'Approved')"
                        class="flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Approve
                      </button>
                      <button
                        @click="showRejectModal(request.id)"
                        class="flex-1 inline-flex items-center justify-center px-3 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Reject
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Rejection Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0"
        >
          <!-- Background overlay -->
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity -z-10"
            aria-hidden="true"
            @click="closeModal"
          ></div>

          <!-- Modal panel -->
          <div
            class="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-10"
          >
            <div class="bg-white px-6 pt-6 pb-4">
              <div class="flex items-start">
                <div
                  class="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
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

            <form @submit.prevent="confirmReject" class="px-6 pb-6">
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
                  @click="closeModal"
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
import ViewBtn from '../../components/base/ViewBtn.vue'
import FilterBar from '@/components/FilterBar.vue'
import { useTableStyles } from '@/composables/useTableStyles'

const styles = useTableStyles()
const vacationStore = useVacationStore()
const statusFilter = ref('')
const showModal = ref(false)
const selectedRequestId = ref<number | null>(null)
const rejectForm = ref({
  comments: '',
})

onMounted(() => {
  fetchRequests()
})

watch(statusFilter, () => {
  fetchRequests()
})
const fetchRequests = () => {
  vacationStore.fetchRequests(statusFilter.value || undefined)
}


const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const updateStatus = async (id: number, status: 'Approved') => {
  try {
    await vacationStore.updateRequestStatus(id, { status })
  } catch (err) {
    console.error('Failed to update status:', err)
  }
}

const showRejectModal = (id: number) => {
  selectedRequestId.value = id
  rejectForm.value.comments = ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedRequestId.value = null
}

const confirmReject = async () => {
  if (!selectedRequestId.value) return

  try {
    await vacationStore.updateRequestStatus(selectedRequestId.value, {
      status: 'Rejected',
      comments: rejectForm.value.comments,
    })
    closeModal()
  } catch (err) {
    console.error('Failed to reject request:', err)
  }
}
</script>
