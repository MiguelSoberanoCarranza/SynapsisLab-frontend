// Configuración del menú del sidebar
import type { MenuItem, MenuSection } from '@/types/menu'

export const menuSections: MenuSection[] = [
  {
    title: 'MENÚ PRINCIPAL',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard'
      }
    ]
  },
  {
    title: 'OPERACIONES',
    items: [
      {
        id: 'reception',
        label: 'Recepción',
        path: '/reception',
        icon: 'reception'
      },
      {
        id: 'capture',
        label: 'Captura de Resultados',
        path: '/capture',
        icon: 'capture'
      },
      {
        id: 'print',
        label: 'Impresión y Entrega',
        path: '/print',
        icon: 'print'
      }
    ]
  },
  {
    title: 'ADMINISTRACIÓN',
    items: [
      {
        id: 'config',
        label: 'Configuración',
        path: '/config',
        icon: 'config',
        children: [
          { id: 'studies', label: 'Estudios', path: '/config/studies', icon: 'study' },
          { id: 'areas', label: 'Áreas', path: '/config/areas', icon: 'area' },
          { id: 'methods', label: 'Métodos', path: '/config/methods', icon: 'method' },
          { id: 'containers', label: 'Contenedores', path: '/config/containers', icon: 'container' },
          { id: 'study-types', label: 'Tipos de Estudio', path: '/config/study-types', icon: 'type' }
        ]
      },
      {
        id: 'admin',
        label: 'Administración',
        path: '/admin',
        icon: 'admin'
      }
    ]
  },
  {
    title: 'LABORATORIO',
    items: [
      {
        id: 'samples',
        label: 'Muestras',
        path: '/samples',
        icon: 'samples',
        children: [
          { id: 'samples-received', label: 'Recibidas', path: '/samples/received', icon: 'inbox' },
          { id: 'samples-pending', label: 'Pendientes', path: '/samples/pending', icon: 'pending' },
          { id: 'samples-export', label: 'Exportar', path: '/samples/export', icon: 'export' }
        ]
      },
      {
        id: 'analysis',
        label: 'Análisis',
        path: '/analysis',
        icon: 'analysis'
      },
      {
        id: 'results',
        label: 'Resultados',
        path: '/results',
        icon: 'results'
      }
    ]
  }
]
