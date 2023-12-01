import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@/store/auth";


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
        {
          path: '/admin/resume',
          name: 'resume',
          component: () => import('@/pages/admin/Resume.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: import('@/pages/NotFound.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/index.vue'),
      meta: {
        authRequired: false,
        guest: true
      }
    },
  ]
})


router.beforeEach(async (to) => {
  const store = useAuthStore()
  if (to.matched.some((record) => record.meta.authRequired) && !store.token) {
    return {
      name: 'login'
    }
  }

  if (to.meta.guest && store.token) {
    return {
      name: 'home'
    }
  }
  if (store.token && !store.user) {
    try {
      store.fetchProfile();
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

})

export default router
