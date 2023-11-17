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
      component: () => import('@/pages/service/index.vue')
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('@/pages/portfolio/index.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/about/index.vue')
    },
    {
      path: '/vacancy',
      name: 'vacancy',
      component: () => import('@/pages/vacancy/index.vue')
    },
    {
      path: '/vacancy/:id',
      name: 'vacancyDetail',
      component: () => import('@/pages/vacancy/Detail.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/pages/admin/index.vue'),
      children: [

      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: import('@/pages/NotFound.vue')
    },
  ]
})

export default router
