import { createRouter, createWebHistory } from 'vue-router'
import offers from '../components/offers.vue'

const routes = [
  {
    path: '/',
    name: 'offers',
    component: offers
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
