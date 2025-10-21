<template>
  <div class="space-y-4">
    <div
      v-for="request in requests"
      :key="request.id"
      class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
    >
      <div class="p-6">
        <!-- Status Badge -->
        <div class="flex justify-between items-start mb-4 pb-4 border-b border-gray-200">
          <div>
            <span class="text-xs text-gray-500">Request ID #{{ request.id }}</span>
          </div>
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

        <!-- Request Details -->
        <div class="space-y-3 mb-4">
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

          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-600">Created:</span>
            <span class="text-sm text-gray-500">
              {{ formatDate(request.created_at) }}
            </span>
          </div>

          <div v-if="request.reason" class="pt-2">
            <span class="text-sm font-medium text-gray-600">Reason:</span>
            <p class="text-sm text-gray-700 mt-1">{{ request.reason }}</p>
          </div>

          <div v-if="request.comments" class="pt-2">
            <span class="text-sm font-medium text-gray-600">Validator Comments:</span>
            <p class="text-sm text-gray-700 mt-1 italic">{{ request.comments }}</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="pt-4 border-t border-gray-200">
          <RouterLink
            :to="`/vacation/${request.id}`"
            class="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View Details
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Request {
  id: number
  startDate: string
  endDate: string
  status: string
  reason?: string
  comments?: string
  created_at: string
}

defineProps<{
  requests: Request[]
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
</script>