<template>
  <main class=" max-w-screen-xl mx-auto">
  <Header/>
  </main>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth-store'
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  authStore.init()
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>