// import './assets/main.css'
import './index.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// adding tanstack query - https://tanstack.com/query/latest/docs/framework/vue/examples/basic?path=examples%2Fvue%2Fbasic%2Fsrc%2Fmain.ts
app.use(VueQueryPlugin)

app.mount('#app')
