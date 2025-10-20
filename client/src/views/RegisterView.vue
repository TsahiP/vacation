<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div
          class="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900">Create Account</h2>
        <p class="mt-2 text-sm text-gray-600">Join our vacation management system</p>
      </div>

      <!-- Register Form -->
      <div
        class="bg-white rounded-2xl shadow-2xl p-8 space-y-6 transform transition-all duration-300 hover:shadow-3xl"
      >
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name Input -->
          <FormInput
            id="name"
            v-model="form.name"
            type="text"
            label="Full Name"
            placeholder="John Doe"
            :icon="UserIcon"
            required
          />

          <!-- Email Input -->
          <FormInput
            id="email"
            v-model="form.email"
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            :icon="EmailIcon"
            required
          />

          <!-- Password Input -->
          <FormInput
            id="password"
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="••••••••"
            :icon="LockIcon"
            required
          />

          <!-- Role Select -->
          <FormInput
            id="role"
            v-model="form.role"
            type="select"
            label="Role"
            :icon="BriefcaseIcon"
            required
          >
            <template #options>
              <option value="Requester">Requester</option>
              <option value="Validator">Validator</option>
            </template>
          </FormInput>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
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
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>
          </div>

          <!-- Submit Button -->
          <BaseButton
            type="submit"
            :loading="authStore.loading"
            loading-text="Creating account..."
            full-width
          >
            Create Account
          </BaseButton>
          <!-- <span v-if="authStore.loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
            <span v-else>Create Account</span>
          </button> -->
        </form>

        <!-- Login Link -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Already have an account?</span>
          </div>
        </div>

        <div class="text-center">
          <RouterLink
            to="/login"
            class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
          >
            Sign in instead
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth-store'
import FormInput from '../components/base/FormInput.vue'
import BaseButton from '../components/base/BaseButton.vue'

import UserIcon from '../components/icons/UserIcon.vue'
import EmailIcon from '../components/icons/EmailIcon.vue'
import LockIcon from '../components/icons/LockIcon.vue'
import BriefcaseIcon from '../components/icons/BriefcaseIcon.vue'

const router = useRouter()
const authStore = useAuthStore()
const error = ref('')

const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'Requester' as 'Requester' | 'Validator',
})

const handleSubmit = async () => {
  try {
    await authStore.register(form.value)
    router.push(form.value.role === 'Validator' ? '/validator' : '/requester')
  } catch (err: any) {
    error.value = err.toString()
  }
}
</script>
