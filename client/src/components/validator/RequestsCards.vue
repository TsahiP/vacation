<template>
  <div class="space-y-4">
    <div
      v-for="request in requests"
      :key="request.id"
      class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
    >
      <div class="p-6">
        <!-- Employee Info -->
        <div class="flex items-center mb-4 pb-4 border-b border-gray-200">
          <div class="h-12 w-12 flex-shrink-0">
            <div
              class="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold text-lg"
            >
              {{ (request.User?.name || 'U')[0]?.toUpperCase() }}
            </div>
          </div>
          <div class="ml-4">
            <div class="text-lg font-semibold text-gray-900">
              {{ request.User?.name || 'Unknown' }}
            </div>
            <div class="text-sm text-gray-500">
              Created: {{ formatDate(request.created_at) }}
            </div>
          </div>
        </div>

        <!-- Request Details -->
        <div class="space-y-3 mb-4">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-600">Status:</span>
            <span
              :class="{
                'bg-yellow-100 text-yellow-800': request.status === 'Pending',
                'bg-green-100 text-green-800': request.status === 'Approved',
                'bg-red-100 text-red-800': request.status === 'Rejected',
              }"
              class="px-3 py-1 text-xs font-semibold rounded-full"
            >
              {{ request.status }}
            </span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-600">Start Date:</span>
            <span class="text-sm text-gray-900 font-medium">
              {{ formatDate(request.startDate) }}
            </span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-600">End Date:</span>
            <span class="text-sm text-gray-900 font-medium">
              {{ formatDate(request.endDate) }}
            </span>
          </div>

          <div v-if="request.reason" class="pt-2">
            <span class="text-sm font-medium text-gray-600">Reason:</span>
            <p class="text-sm text-gray-700 mt-1">{{ request.reason }}</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="space-y-2 pt-4 border-t border-gray-200">
          <ViewBtn :to="`/vacation/${request.id}`" class="w-full" />

          <div v-if="request.status === 'Pending'" class="flex gap-2">
            <button
              @click="$emit('approve', request.id)"
              class="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
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
              class="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ViewBtn from '../base/ViewBtn.vue'

interface Request {
  id: number
  startDate: string
  endDate: string
  status: string
  reason?: string
  created_at: string
  User?: {
    name: string
  }
}

defineProps<{
  requests: Request[]
}>()

defineEmits<{
  approve: [id: number]
  reject: [id: number]
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
</script>