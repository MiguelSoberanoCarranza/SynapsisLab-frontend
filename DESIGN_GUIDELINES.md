# Guías de Diseño - Responsividad Móvil

## 📱 Principios de Responsividad Móvil

### Objetivo
Optimizar la experiencia móvil eliminando padding excesivo y maximizando el uso del ancho de pantalla disponible.

## 🎯 Reglas Generales

### 1. Contenedores Principales
```css
/* Para todos los views en móvil */
@media (max-width: 768px) {
    .view-container {
        padding: 4px;
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
        overflow-x: hidden;
        margin: 0;
    }
}

@media (max-width: 480px) {
    .view-container {
        padding: 2px;
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
        overflow-x: hidden;
        margin: 0;
    }
}
```

### 2. Tarjetas y Cards
```css
/* Padding mínimo en tarjetas */
@media (max-width: 768px) {
    .card {
        padding: 4px;
        width: 100%;
        box-sizing: border-box;
    }
}

@media (max-width: 480px) {
    .card {
        padding: 2px;
        width: 100%;
        box-sizing: border-box;
    }
}
```

### 3. Formularios
```css
/* Formularios responsivos */
@media (max-width: 768px) {
    .form-container {
        padding: 4px;
        width: 100%;
        box-sizing: border-box;
    }
    
    .form-section {
        padding: 4px;
        margin-bottom: var(--spacing-sm);
        width: 100%;
        box-sizing: border-box;
    }
    
    .form-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-sm);
        width: 100%;
    }
    
    .form-group {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .form-container {
        padding: 2px;
    }
    
    .form-section {
        padding: 2px;
    }
}
```

### 4. Tablas
```css
/* Tablas con scroll horizontal */
@media (max-width: 768px) {
    .table-container {
        overflow-x: auto;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        border-radius: var(--border-radius-md);
        width: 100%;
        max-height: 400px;
    }
    
    .table {
        min-width: 600px;
        width: 100%;
    }
    
    .table th,
    .table td {
        padding: var(--spacing-sm);
        font-size: 0.875rem;
        white-space: nowrap;
    }
}

@media (max-width: 480px) {
    .table-container {
        max-height: 300px;
    }
    
    .table {
        min-width: 500px;
    }
    
    .table th,
    .table td {
        padding: var(--spacing-xs);
        font-size: 0.8rem;
    }
}
```

### 5. Elementos de Formulario
```css
/* Inputs y elementos de formulario */
@media (max-width: 768px) {
    .base-input,
    .base-input input,
    .base-input textarea,
    .base-input select {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
    }
    
    .base-button {
        max-width: 100%;
        box-sizing: border-box;
    }
    
    .form-textarea {
        min-height: 80px;
        font-size: 0.875rem;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        resize: vertical;
    }
}

@media (max-width: 480px) {
    .form-textarea {
        min-height: 60px;
        font-size: 0.8rem;
    }
}
```

### 6. Botones de Acción
```css
/* Botones apilados en móvil */
@media (max-width: 768px) {
    .form-actions {
        flex-direction: column;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-md);
        width: 100%;
    }
    
    .action-btn {
        width: 100%;
        justify-content: center;
        padding: var(--spacing-md);
        font-size: 0.875rem;
        box-sizing: border-box;
    }
}

@media (max-width: 480px) {
    .action-btn {
        padding: var(--spacing-sm);
        font-size: 0.8rem;
    }
}
```

## 🔧 Estilos Globales para Prevenir Overflow

### Prevención de Overflow Horizontal
```css
@media (max-width: 768px) {
    /* Prevenir overflow horizontal global */
    * {
        max-width: 100%;
        box-sizing: border-box;
    }
}

@media (max-width: 480px) {
    /* Prevenir overflow horizontal global */
    * {
        max-width: 100%;
        box-sizing: border-box;
    }
}
```

## 📐 Breakpoints Estándar

### Breakpoints Principales
- **768px**: Tablet y móvil grande
- **480px**: Móvil pequeño

### Breakpoints Opcionales
- **1024px**: Desktop pequeño
- **320px**: Móvil muy pequeño (solo si es necesario)

## 🎨 Variables de Espaciado

### Espaciado Responsivo
```css
/* Usar estas variables para consistencia */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
```

## 📋 Checklist de Implementación

### Para cada nuevo View:
- [ ] Contenedor principal con `width: 100%` y `max-width: 100vw`
- [ ] Padding mínimo (4px en 768px, 2px en 480px)
- [ ] `box-sizing: border-box` en todos los elementos
- [ ] `overflow-x: hidden` en contenedores principales
- [ ] Formularios en columna única (`grid-template-columns: 1fr`)
- [ ] Botones de ancho completo apilados verticalmente
- [ ] Tablas con scroll horizontal y altura máxima
- [ ] Inputs con `width: 100%` y `max-width: 100%`

### Para Tablas:
- [ ] Scroll horizontal con `-webkit-overflow-scrolling: touch`
- [ ] Altura máxima para scroll vertical
- [ ] Ancho mínimo para mantener legibilidad
- [ ] Texto truncado con ellipsis para columnas largas

### Para Formularios:
- [ ] Grid de una columna en móvil
- [ ] Textareas con `resize: vertical`
- [ ] Labels con tamaño de fuente apropiado
- [ ] Checkboxes y radios optimizados para touch

## 🚀 Ejemplo de Implementación

### Estructura Base para Views
```vue
<template>
    <div class="view-container">
        <!-- Header -->
        <div class="view-header">
            <h1>Título</h1>
            <p>Subtítulo</p>
        </div>
        
        <!-- Contenido principal -->
        <BaseCard class="content-card">
            <!-- Tabla o formulario -->
        </BaseCard>
    </div>
</template>

<style scoped>
.view-container {
    padding: var(--spacing-lg);
}

.content-card {
    padding: var(--spacing-lg);
}

/* Responsive */
@media (max-width: 768px) {
    .view-container {
        padding: 4px;
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
        overflow-x: hidden;
        margin: 0;
    }
    
    .content-card {
        padding: 4px;
        width: 100%;
        box-sizing: border-box;
    }
}

@media (max-width: 480px) {
    .view-container {
        padding: 2px;
    }
    
    .content-card {
        padding: 2px;
    }
}
</style>
```

## 📝 Notas Importantes

1. **Siempre usar `box-sizing: border-box`** para incluir padding y border en el cálculo del ancho
2. **Prevenir overflow horizontal** con `overflow-x: hidden` en contenedores principales
3. **Mantener scroll vertical** solo donde sea necesario (tablas)
4. **Optimizar para touch** con botones y elementos de tamaño apropiado
5. **Usar variables CSS** para mantener consistencia en el espaciado
6. **Probar en dispositivos reales** para verificar la experiencia de usuario

## 🔄 Actualización de Views Existentes

### Views que necesitan actualización:
- [ ] DashboardView
- [ ] AnalysisView  
- [ ] ResultsView
- [ ] SamplesView
- [ ] Cualquier otro view que no siga estas guías

### Pasos para actualizar:
1. Revisar el view actual
2. Aplicar las reglas de padding mínimo
3. Asegurar que formularios sean responsivos
4. Verificar que tablas tengan scroll apropiado
5. Probar en dispositivos móviles
6. Documentar cualquier excepción necesaria
