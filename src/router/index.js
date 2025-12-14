import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import Signup from '@/views/Signup.vue'
import Login from '@/views/Login.vue'
import Contacts from '@/views/Contacts.vue'
import AddPost from '@/views/AddPost.vue'
import PostDetail from '@/views/PostDetail.vue'
import store from '@/store'

const routes = [
  {path: "/", name: "Main", component: MainPage, meta: { requiresAuth: true }},
  {path: "/signup", name: "Signup", component: Signup},
  {path: "/login", name: "Login", component: Login},
  {path: "/contacts", name: "Contacts", component: Contacts},
  {path: "/addPost", name: "AddPost", component: AddPost, meta: { requiresAuth: true }},
  {path: "/post/:id", name: "PostDetail", component: PostDetail, meta: { requiresAuth: true }}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Route guard to redirect to login if not authenticated
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if (to.path === '/login' && isLoggedIn) {
    next('/');
  } else {
    next();
  }
})

export default router
