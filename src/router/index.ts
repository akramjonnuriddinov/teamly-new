import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomeView.vue')
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('@/pages/ServiceView.vue')
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('@/pages/PortfolioView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: import('@/pages/NotFound.vue')
    },
  ]
})

export default router
