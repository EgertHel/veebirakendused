import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import Signup from '@/views/Signup.vue'
import Contacts from '@/views/Contacts.vue'

const routes = [
  {path: "/", name: "Main", component: MainPage},
  {path: "/signup", name: "Signup", component: Signup},
  {path: "/contacts", name: "Contacts", component: Contacts}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
