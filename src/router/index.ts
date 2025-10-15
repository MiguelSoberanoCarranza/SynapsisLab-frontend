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
    path: '/',
    component: () => import('@/components/layout/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: {
          title: 'Dashboard',
          transition: 'content'
        }
      },
      {
        path: 'samples',
        name: 'Samples',
        component: () => import('@/views/samples/SamplesView.vue'),
        meta: {
          title: 'Muestras',
          transition: 'content'
        }
      },
      {
        path: 'samples/received',
        name: 'SamplesReceived',
        component: () => import('@/views/samples/SamplesReceivedView.vue'),
        meta: {
          title: 'Muestras Recibidas',
          transition: 'content'
        }
      },
      {
        path: 'samples/pending',
        name: 'SamplesPending',
        component: () => import('@/views/samples/SamplesPendingView.vue'),
        meta: {
          title: 'Muestras Pendientes',
          transition: 'content'
        }
      },
      {
        path: 'samples/export',
        name: 'SamplesExport',
        component: () => import('@/views/samples/SamplesExportView.vue'),
        meta: {
          title: 'Exportar Muestras',
          transition: 'content'
        }
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/analysis/AnalysisView.vue'),
        meta: {
          title: 'Análisis',
          transition: 'content'
        }
      },
      {
        path: 'results',
        name: 'Results',
        component: () => import('@/views/results/ResultsView.vue'),
        meta: {
          title: 'Resultados',
          transition: 'content'
        }
      },
      {
        path: 'reception',
        name: 'Reception',
        component: () => import('@/views/reception/ReceptionView.vue'),
        meta: {
          title: 'Recepción',
          transition: 'content'
        }
      },
      {
        path: 'capture',
        name: 'Capture',
        component: () => import('@/views/capture/CaptureView.vue'),
        meta: {
          title: 'Captura de Resultados',
          transition: 'content'
        }
      },
      {
        path: 'print',
        name: 'Print',
        component: () => import('@/views/print/PrintView.vue'),
        meta: {
          title: 'Impresión y Entrega',
          transition: 'content'
        }
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('@/views/config/ConfigView.vue'),
        meta: {
          title: 'Configuración',
          transition: 'content'
        }
      },
      {
        path: 'config/studies',
        name: 'Studies',
        component: () => import('@/views/config/StudiesView.vue'),
        meta: {
          title: 'Estudios',
          transition: 'content'
        }
      },
      {
        path: 'config/areas',
        name: 'Areas',
        component: () => import('@/views/config/AreasView.vue'),
        meta: {
          title: 'Áreas',
          transition: 'content'
        }
      },
      {
        path: 'config/methods',
        name: 'Methods',
        component: () => import('@/views/config/MethodsView.vue'),
        meta: {
          title: 'Métodos',
          transition: 'content'
        }
      },
      {
        path: 'config/containers',
        name: 'Containers',
        component: () => import('@/views/config/ContainersView.vue'),
        meta: {
          title: 'Contenedores',
          transition: 'content'
        }
      },
      {
        path: 'config/study-types',
        name: 'StudyTypes',
        component: () => import('@/views/config/StudyTypesView.vue'),
        meta: {
          title: 'Tipos de Estudio',
          transition: 'content'
        }
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/admin/AdminView.vue'),
        meta: {
          title: 'Administración',
          transition: 'content'
        }
      }
    ]
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
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Guard de navegación para autenticación
router.beforeEach((to, _from, next) => {
  // Simular verificación de autenticación
  const isAuthenticated = localStorage.getItem('auth_token')
  
  // Verificar si la ruta requiere autenticación (incluyendo rutas padre)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/dashboard')
  } else if (to.path === '/' && isAuthenticated) {
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
