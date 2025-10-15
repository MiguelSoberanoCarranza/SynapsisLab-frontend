# Sistema de Laboratorio

Un sistema de gestión de laboratorio moderno y responsivo construido con Vue 3 y TypeScript.

## 🎨 Características de Diseño

### Sistema de Colores
- **Primario**: `#2563eb` (Azul)
- **Secundario**: `#f8fafc` (Gris claro)
- **Alternativo**: `#10b981` (Verde esmeralda)

### Responsividad
- **Mobile First**: Diseñado primero para móviles
- **Breakpoints**: 768px (tablet), 1024px (desktop)
- **Layouts adaptativos** para todas las pantallas

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Verificar tipos TypeScript
npm run type-check
```

## 🌐 Deployment en Vercel

### Configuración Automática
El proyecto está configurado para deployment automático en Vercel con:

- **Node.js**: 18.20.4 (especificado en `.nvmrc`)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite

### Archivos de Configuración
- `vercel.json` - Configuración de Vercel
- `.nvmrc` - Versión de Node.js
- `package.json` - Scripts y dependencias optimizadas

### Solución de Problemas de Build
Si encuentras errores de build en Vercel:

1. **Error de vue-tsc**: Ya solucionado con versiones compatibles
2. **Error de TypeScript**: Verifica que `tsconfig.json` esté correcto
3. **Error de dependencias**: Ejecuta `npm install` localmente primero

### Build Local
```bash
# Verificar que el build funciona localmente
npm run build

# El build debe generar la carpeta 'dist' sin errores
```

## 📱 Sistema de Login

### Características
- **Diseño responsivo** que se adapta a móvil, tablet y desktop
- **Pantalla de bienvenida** en móviles
- **Formularios de login y registro** con validación
- **Animaciones suaves** y transiciones
- **Ondas animadas** en el fondo
- **Componentes reutilizables** siguiendo las mejores prácticas

### Navegación
- `/login` - Pantalla de inicio de sesión
- `/signup` - Pantalla de registro
- `/dashboard` - Panel principal (requiere autenticación)

## 🧩 Componentes Base

### BaseButton
```vue
<BaseButton 
  variant="primary" 
  size="lg" 
  :loading="false"
  @click="handleClick"
>
  Botón
</BaseButton>
```

### BaseInput
```vue
<BaseInput
  v-model="email"
  type="email"
  label="Email"
  placeholder="tu@email.com"
  :error-message="errors.email"
  required
/>
```

### BaseCard
```vue
<BaseCard 
  title="Título" 
  variant="elevated"
  padding="md"
  hoverable
>
  Contenido de la tarjeta
</BaseCard>
```

### BaseLogo
```vue
<BaseLogo 
  size="md" 
  variant="light"
  :show-text="true"
/>
```

## 📋 Páginas del Sistema

### Dashboard (`/dashboard`)
- Resumen estadístico del laboratorio
- Acciones rápidas
- Actividad reciente

### Muestras (`/samples`)
- Gestión de muestras del laboratorio
- Filtros de búsqueda
- Estados de las muestras

### Análisis (`/analysis`)
- Control de análisis en proceso
- Estados de análisis
- Historial de análisis

### Resultados (`/results`)
- Visualización de resultados
- Exportación de datos
- Reportes y gráficos

## 🎯 Mejores Prácticas Implementadas

### CSS
- **Variables CSS** para colores y espaciado
- **Utility classes** reutilizables
- **Mobile-first** responsive design
- **Consistent spacing** system

### Vue.js
- **Composition API** con TypeScript
- **Props tipadas** para todos los componentes
- **Eventos bien definidos**
- **Componentes reutilizables**

### Accesibilidad
- **ARIA labels** en elementos interactivos
- **Contraste adecuado** en colores
- **Navegación por teclado**
- **Screen reader** friendly

## 🔧 Estructura del Proyecto

```
src/
├── components/
│   ├── auth/          # Componentes de autenticación
│   ├── layout/        # Componentes de layout
│   └── ui/            # Componentes base reutilizables
├── views/             # Páginas principales
├── router/            # Configuración de rutas
├── styles/            # CSS global
└── utils/             # Utilidades
```

## 📱 Responsive Breakpoints

```css
/* Móvil */
@media (max-width: 767px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

## 🎨 Guía de Diseño

Consulta el archivo `DESIGN_GUIDE.md` para:
- Principios de diseño
- Convenciones de nomenclatura
- Mejores prácticas
- Checklist para nuevos componentes

## 🔐 Autenticación

El sistema incluye:
- Login con email y contraseña
- Registro de nuevos usuarios
- Validación de formularios
- Protección de rutas
- Simulación de API calls

## 📊 Estado del Proyecto

✅ Sistema de colores global implementado  
✅ Componentes base responsivos creados  
✅ Sistema de login responsivo funcional  
✅ Layout principal con sidebar  
✅ Páginas principales del laboratorio  
✅ Router configurado  
✅ Guía de diseño documentada  

## 🚀 Próximos Pasos

- [ ] Integración con API real
- [ ] Sistema de notificaciones
- [ ] Gráficos y visualizaciones
- [ ] Exportación de reportes
- [ ] Sistema de permisos
- [ ] Testing automatizado

---

**Nota**: Este es un sistema de demostración. Para producción, asegúrate de implementar autenticación real, validación de datos y medidas de seguridad apropiadas.
