import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import Signup from '@/views/Signup.vue'

const routes = [
  {path: "/", name: "Main", component: MainPage},
  {path: "/signup", name: "Signup", component: Signup}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
