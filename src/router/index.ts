import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@/store/auth"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase"

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/HomeView.vue')
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('@/pages/service/ServiceView.vue')
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('@/pages/portfolio/PortfolioView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/about/AboutView.vue')
    },
    {
      path: '/vacancy',
      name: 'vacancy',
      component: () => import('@/pages/vacancy/VacancyView.vue')
    },
    {
      path: '/vacancy/:id',
      name: 'vacancyDetail',
      component: () => import('@/pages/vacancy/VacancyDetail.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/pages/admin/AdminView.vue'),
      children: [
        {
          path: '/admin/resume',
          name: 'resume',
          component: () => import('@/pages/admin/Resume.vue')
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: import('@/pages/NotFound.vue')
    },
    {
      path: '/sign-in',
      name: 'sign in',
      component: () => import('@/pages/login/SignIn.vue'),
      meta: {
        authRequired: false,
        guest: true
      }
    },
    {
      path: '/sign-up',
      name: 'sign up',
      component: () => import('@/pages/login/SignUp.vue'),
      meta: {
        authRequired: false,
        guest: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/pages/profile/ProfileView.vue'),
      meta: {
        authRequired: true,
      }
    },
    {
      path: '/:id',
      name: 'blog',
      component: () => import('@/pages/blog/BlogView.vue')
    },
    {
      path: '/verify',
      component: () => import('@/pages/verify/VerifyEmail.vue'),
      props: (route) => ({ id: route.query.id })
    }
  ]
})

router.beforeEach(async (to, _, next) => {
  const store = useAuthStore()
  try {
    await new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        const emails = ['nn.akramjon@gmail.com', 'rustamidastan0414@gmail.com', 'rajabov.diyorbek.it@gmail.com', 'akramjonmohirdev@gmail.com']
        if ((to.name === 'admin' || to.name === 'resume') && !emails.includes(authUser?.email)) {
          console.info('User has logged out')
          next('/sign-in')
          unsubscribe()
        } else {
          resolve()
          next()
        }
      })
    })
  } catch (error) {
    console.error('Error checking authentication state:', error)
    next('/sign-in')
  }

  // Diyorbek
  if (to.matched.some((record) => record.meta.authRequired) && !store.token) {
    return {
      name: 'sign in'
    }
  }

  if (to.meta.guest && store.token) {
    return {
      name: 'home'
    }
  }
  if (store.token && !store.user) {
    try {
      store.fetchProfile()
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }
})

export default router
