# Estructura del Proyecto - Sistema de Laboratorio

## 📁 Organización de Carpetas

```
src/
├── components/          # Componentes Vue
│   ├── auth/           # Componentes de autenticación
│   ├── layout/         # Componentes de layout (AppLayout, AppSidebar, etc.)
│   ├── ui/             # Componentes base reutilizables (BaseButton, BaseInput, etc.)
│   └── forms/          # Formularios específicos
├── composables/        # Lógica reutilizable con Composition API
│   ├── useAuth.ts      # Manejo de autenticación
│   ├── useResponsive.ts # Manejo de responsividad
│   └── index.ts        # Exportaciones
├── config/             # Configuraciones del sistema
│   └── menuConfig.ts   # Configuración del menú del sidebar
├── types/              # Definiciones TypeScript
│   ├── menu.ts         # Tipos del sistema de menú
│   ├── components.ts   # Tipos de componentes base
│   ├── layout.ts       # Tipos de componentes de layout
│   └── index.ts        # Exportaciones
├── views/              # Páginas principales
│   ├── auth/           # Páginas de autenticación
│   ├── dashboard/      # Dashboard principal
│   ├── samples/        # Gestión de muestras
│   ├── analysis/       # Análisis
│   └── results/        # Resultados
├── router/             # Configuración de rutas
├── styles/             # CSS global y variables
├── utils/              # Utilidades generales
└── assets/             # Recursos estáticos
```

## 🧩 Componentes

### Componentes Base (ui/)
- **BaseButton**: Botón reutilizable con variantes
- **BaseInput**: Campo de entrada con validación
- **BaseCard**: Tarjeta contenedora
- **BaseIcon**: Sistema de iconos SVG
- **BaseLogo**: Logo del sistema

### Componentes de Layout
- **AppLayout**: Layout principal de la aplicación
- **AppSidebar**: Sidebar de navegación
- **SidebarMenu**: Menú de navegación del sidebar
- **AuthLayout**: Layout para páginas de autenticación

## 🔧 Composables

### useAuth
Manejo centralizado de autenticación:
```typescript
const { isAuthenticated, userEmail, userName, login, logout } = useAuth()
```

### useResponsive
Manejo de responsividad:
```typescript
const { isMobile, isTablet, isDesktop } = useResponsive()
```

## 📋 Tipos TypeScript

### Menu Types
```typescript
interface MenuItem {
  id: string
  label: string
  path: string
  icon: string
  children?: MenuItem[]
}
```

### Component Types
```typescript
interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}
```

## ⚙️ Configuración

### Menu Config
Configuración centralizada del menú en `config/menuConfig.ts`:
- Estructura jerárquica del menú
- Iconos asociados
- Rutas de navegación

## 🎯 Principios de Organización

1. **Separación de responsabilidades**: Cada carpeta tiene un propósito específico
2. **Reutilización**: Composables y tipos compartidos
3. **Mantenibilidad**: Estructura clara y documentada
4. **Escalabilidad**: Fácil agregar nuevas funcionalidades
5. **TypeScript**: Tipado fuerte en toda la aplicación

## 📝 Convenciones

- **Componentes**: PascalCase.vue
- **Composables**: camelCase.ts con prefijo 'use'
- **Tipos**: camelCase.ts
- **Config**: camelCase.ts
- **Imports**: Usar alias @/ para rutas absolutas
