<template>
  <div>
    <label 
      v-if="label" 
      :for="id" 
      class="block text-sm font-semibold text-gray-700 mb-2"
    >
      {{ label }}
    </label>
    <div class="relative">
      <div 
        v-if="icon" 
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <component :is="icon" class="h-5 w-5 text-gray-400" />
      </div>
      <input 
        v-if="type !== 'select'"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="[
          'w-full pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400',
          icon ? 'pl-10' : 'pl-4',
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        ]"
      >
      <select
        v-else
        :id="id"
        :required="required"
        :disabled="disabled"
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        :class="[
          'w-full pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 appearance-none bg-white',
          icon ? 'pl-10' : 'pl-4',
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        ]"
      >
        <slot name="options"></slot>
      </select>
      <div 
        v-if="type === 'select'" 
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  id: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  modelValue: string
  icon?: Component
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>