import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      requiresAuth: false,
      title: 'Iniciar Sesión',
      transition: 'fade'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue'),
    meta: {
      requiresAuth: true,
      title: 'Dashboard',
      transition: 'zoom'
    }
  },
  {
    path: '/samples',
    name: 'Samples',
    component: () => import('@/views/samples/SamplesView.vue'),
    meta: {
      requiresAuth: true,
      title: 'Muestras',
      transition: 'slide-left'
    }
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('@/views/analysis/AnalysisView.vue'),
    meta: {
      requiresAuth: true,
      title: 'Análisis',
      transition: 'slide-left'
    }
  },
  {
    path: '/results',
    name: 'Results',
    component: () => import('@/views/results/ResultsView.vue'),
    meta: {
      requiresAuth: true,
      title: 'Resultados',
      transition: 'slide-left'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'Página no encontrada'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Guard de navegación para autenticación
router.beforeEach((to, from, next) => {
  // Simular verificación de autenticación
  const isAuthenticated = localStorage.getItem('auth_token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

// Actualizar título de la página
router.afterEach((to) => {
  const title = to.meta.title as string
  if (title) {
    document.title = `${title} - SynapsisLab`
  }
})

export default router
