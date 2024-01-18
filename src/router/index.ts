import { createRouter, createWebHistory } from 'vue-router'
import { constanteRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: constanteRoutes,
})

export default router
