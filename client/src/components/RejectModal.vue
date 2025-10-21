<template>
  <div
    v-if="modelValue"
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
        class="bg-gray-100 opacity-50 transition-opacity fixed inset-0 transition-opacity -z-10"
        aria-hidden="true"
        @click="close"
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

        <form @submit.prevent="handleSubmit" class="px-6 pb-6">
          <div class="mb-6">
            <label for="comments" class="block text-sm font-semibold text-gray-700 mb-2">
              Rejection Reason <span class="text-red-500">*</span>
            </label>
            <textarea
              id="comments"
              v-model="comments"
              rows="4"
              placeholder="Please provide a detailed reason for rejection..."
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
            ></textarea>
          </div>

          <div class="flex gap-3">
            <button
              type="button"
              @click="close"
              class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!comments"
              class="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Confirm Rejection
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'confirm': [comments: string]
}>()

const comments = ref('')

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    comments.value = ''
  }
})

const close = () => {
  emit('update:modelValue', false)
}

const handleSubmit = () => {
  if (comments.value) {
    emit('confirm', comments.value)
    close()
  }
}
</script>