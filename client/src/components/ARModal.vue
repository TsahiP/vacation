<template>
  <div v-if="modelValue" class="overlay" @click.self="close">
    <div class="dialog">
      <header class="dialog-header">
        <p name="title">{{ title }}</p>
      </header>

      <section class="dialog-body">
        <p>{{ content }}</p>
      </section>

      <footer class="dialog-footer">
        <slot name="actions">
          <div class="flex gap-3">
            <button 
              class="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors duration-200" 
              @click="close"
            >
              Cancel
            </button>
            <button 
              class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              @click="onConfirm"
            >
              Confirm
            </button>
          </div>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ARModalProps } from '@/types/types';

const {title, content, onConfirm} = defineProps<ARModalProps>()

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  min-width: 300px;
}
.dialog-header {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.dialog-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
</style>
