# Guía de Diseño - Sistema de Laboratorio

## Principios de Diseño

### 1. Sistema de Colores Global
Utilizar únicamente **3 colores principales** para mantener consistencia:

- **Color Primario**: `#2563eb` (Azul principal)
- **Color Secundario**: `#f8fafc` (Gris claro/Blanco)
- **Color Alternativo**: `#10b981` (Verde esmeralda)

### 2. Componentes Responsivos

#### Breakpoints Estándar
```css
/* Móvil */
@media (max-width: 767px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

#### Principios de Responsividad
- **Mobile First**: Diseñar primero para móvil
- **Fluido**: Usar unidades relativas (%, vw, vh, rem)
- **Adaptativo**: Layout que se adapta al contenido
- **Touch Friendly**: Botones mínimo 44px de altura

### 3. Estructura de Componentes

#### Reglas para Componentes
1. **Máximo 100 líneas** por componente
2. **Una responsabilidad** por componente
3. **Props tipadas** (TypeScript)
4. **Composición** sobre herencia
5. **Reutilización** como prioridad

#### Estructura de Archivo
```vue
<template>
  <!-- HTML semántico -->
</template>

<script setup lang="ts">
// Lógica del componente
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
```

### 4. Naming Convention

#### Archivos
- **Componentes**: `PascalCase.vue` (ej: `LoginForm.vue`)
- **Vistas**: `kebab-case.vue` (ej: `user-dashboard.vue`)
- **Utilidades**: `camelCase.ts` (ej: `dateUtils.ts`)

#### Clases CSS
- **Componentes**: `.component-name`
- **Modificadores**: `.component-name--modifier`
- **Estados**: `.component-name.is-active`

### 5. Mejores Prácticas

#### HTML
- Usar elementos semánticos (`<header>`, `<main>`, `<section>`)
- Atributos `aria-*` para accesibilidad
- Alt text en imágenes
- Formularios con labels asociados

#### CSS
- **Variables CSS** para colores y espaciado
- **Flexbox/Grid** para layouts
- **Clamp()** para tipografía responsiva
- **CSS Custom Properties** para temas

#### JavaScript/Vue
- **Composables** para lógica reutilizable
- **Props validation** con TypeScript
- **Eventos** bien nombrados
- **Estado inmutable**

### 6. Sistema de Espaciado

```css
:root {
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  --spacing-2xl: 3rem;    /* 48px */
}
```

### 7. Tipografía Responsiva

```css
:root {
  --font-size-sm: clamp(0.875rem, 2vw, 1rem);
  --font-size-md: clamp(1rem, 2.5vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 3vw, 1.25rem);
  --font-size-xl: clamp(1.25rem, 3.5vw, 1.5rem);
}
```

### 8. Componentes Base Requeridos

#### Input Fields
- Estado normal, focus, error, disabled
- Labels flotantes o estáticos
- Iconos opcionales
- Validación visual

#### Botones
- Primary, secondary, outline variants
- Estados: normal, hover, active, disabled
- Tamaños: sm, md, lg
- Loading states

#### Cards
- Padding consistente
- Sombras sutiles
- Border radius uniforme
- Hover effects

#### Navigation
- Responsive menu
- Active states
- Breadcrumbs
- Mobile hamburger

### 9. Checklist para Nuevos Componentes

- [ ] ¿Usa solo los 3 colores principales?
- [ ] ¿Es responsivo en todos los breakpoints?
- [ ] ¿Tiene máximo 100 líneas?
- [ ] ¿Props están tipadas?
- [ ] ¿Sigue naming convention?
- [ ] ¿Usa variables CSS globales?
- [ ] ¿Es accesible (ARIA, contraste)?
- [ ] ¿Funciona sin JavaScript?
- [ ] ¿Tiene estados de loading/error?
- [ ] ¿Es reutilizable?

### 10. Estructura de Archivos

```
src/
├── components/
│   ├── ui/           # Componentes base reutilizables
│   ├── forms/        # Formularios específicos
│   └── layout/       # Componentes de layout
├── views/            # Páginas principales
├── styles/           # CSS global y variables
├── utils/            # Funciones auxiliares
└── types/            # Definiciones TypeScript
```

### 11. Performance

- **Lazy loading** para rutas
- **Code splitting** por feature
- **Image optimization** con lazy loading
- **Bundle size** monitoreado
- **Critical CSS** inline

### 12. Testing

- **Unit tests** para lógica
- **Component tests** para UI
- **E2E tests** para flujos críticos
- **Visual regression** tests
- **Accessibility** tests

---

**Recuerda**: Mantén la simplicidad, consistencia y reutilización como principios fundamentales.
