import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '../services/auth-service'
// use requiresAuth and requiresGuest meta fields to manage access to routes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/requester',
      name: 'requester-dashboard',
      component: () => import('../views/requester/DashboardView.vue'),
      meta: { requiresAuth: true, role: 'Requester' }
    },
    {
      path: '/requester/request',
      name: 'create-request',
      component: () => import('../views/requester/CreateRequestView.vue'),
      meta: { requiresAuth: true, role: 'Requester' }
    },
    {
      path: '/validator',
      name: 'validator-dashboard',
      component: () => import('../views/validator/DashboardView.vue'),
      meta: { requiresAuth: true, role: 'Validator' }
    },
    {
      path: '/vacation/:id',
      name: 'request-details',
      component: () => import('../views/RequestDetailsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated()
  const currentUser = authService.getCurrentUser()
  
  // Routes that require authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }
  
  // Routes that require guest status
  if (to.meta.requiresGuest && isAuthenticated) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = currentUser?.role === 'Validator' ? '/validator' : '/requester'
    return next(redirectPath)
  }
  
  // Role-based access
  if (to.meta.role && currentUser?.role !== to.meta.role) {
    return next('/')
  }
  
  next()
})

export default router