<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th :class="styles.th">Start Date</th>
            <th :class="styles.th">End Date</th>
            <th :class="styles.th">Status</th>
            <th :class="styles.th">Reason</th>
            <th :class="styles.th">Destination</th>
            <th :class="styles.th">Comments</th>
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
            <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
              {{ request.destination || 'N/A' }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
              {{ request.comments || 'N/A' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(request.created_at) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <RouterLink
                :to="`/vacation/${request.id}`"
                class="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View
              </RouterLink>
              <button
                v-show="request.status === 'Pending'"
                @click="modalVisible = true; deleteSelector = request.id"
                class="cursor-pointer inline-flex items-center px-4 py-2 ml-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ARModal :onConfirm="() => handleDelete(deleteSelector)" v-model="modalVisible" title="Delete Request" content="Are you sure?" />
  </div>
</template>

<script setup lang="ts">
import { useTableStyles } from '@/composables/useTableStyles'
import type { RequesterView } from '@/types/types'
import { useVacationStore } from '@/stores/vacation-store'
import ARModal from '../ARModal.vue'
import { ref } from 'vue'

const modalVisible = ref(false)
const emit = defineEmits(['deleted'])
const styles = useTableStyles()
const vacationStore = useVacationStore()
const deleteSelector = ref<number | null>(null)
defineProps<{
  requests: RequesterView[]
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const handleDelete = async (id: number | null) => {
  if(id === null) return
  await vacationStore.deleteRequest(id)
  emit('deleted')
}
</script>
