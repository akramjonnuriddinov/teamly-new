import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
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
      path: '/vacancy',
      name: 'vacancy',
      component: () => import('@/pages/VacancyView.vue')
    },
    {
      path: '/vacancyDetail',
      name: 'vacancyDetail',
      component: () => import('@/pages/VacancyDetailView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: import('@/pages/NotFound.vue')
    },
  ]
})

export default router
