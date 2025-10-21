<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden">
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
            v-for="request in requests"
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
                    @click="$emit('approve', request.id)"
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
                    @click="$emit('reject', request.id)"
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
</template>

<script setup lang="ts">
import type { VacationRequest } from '@/types/types'
import ViewBtn from '../base/ViewBtn.vue'

defineProps<{
  requests: VacationRequest[]
}>()

defineEmits<{
  approve: [id: number]
  reject: [id: number]
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
</script>