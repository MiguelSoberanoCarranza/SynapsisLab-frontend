# Sistema de Animaciones - SynapsisLab

Este documento describe las animaciones implementadas en el sistema de inicio de sesión.

## Transiciones de Router

### Tipos de Transiciones

1. **Fade (desvanecimiento)**
   - Usado en: Login View
   - Duración: 0.3s
   - Efecto suave de entrada/salida

2. **Zoom (acercamiento)**
   - Usado en: Dashboard
   - Duración: 0.5s entrada, 0.3s salida
   - Crea un efecto de "entrar" a la aplicación

3. **Slide Left (deslizar a la izquierda)**
   - Usado en: Samples, Analysis, Results
   - Duración: 0.4s
   - Navegación fluida entre páginas

## Animaciones del Formulario de Login

### Entrada Escalonada

Los elementos del formulario aparecen secuencialmente con los siguientes delays:

1. **Header (título y subtítulo)**: 0s - slide down
2. **Campo Email**: 0.1s - slide up
3. **Campo Contraseña**: 0.2s - slide up
4. **Link "Olvidaste tu contraseña"**: 0.3s - slide up
5. **Botón "Iniciar Sesión"**: 0.4s - slide up

### Mensaje de Éxito

Cuando el login es exitoso:
- Aparece un mensaje con icono de check animado
- Animación de escala y rotación del icono (0.6s)
- El mensaje persiste por 1.5s antes de redirigir
- Desaparece con animación suave

## Animaciones del AuthLayout

### Desktop/Tablet
- **Branding (lado izquierdo)**: Slide desde la izquierda (0.6s)
- **Logo y texto**: Fade in con escala (0.8s con delay de 0.3s)
- **Sección de formulario**: Slide desde la derecha (0.6s)

### Mobile
- **Welcome Screen**: Fade in general (0.5s)
- **Header con logo**: Slide down (0.6s)
- **Título**: Fade up (0.8s, delay 0.2s)
- **Subtítulo**: Fade up (0.8s, delay 0.3s)
- **Icono central**: Fade in con escala (1s, delay 0.4s)
- **Botón**: Fade up (0.8s, delay 0.6s)

### Formulario Mobile
- **Header**: Slide down (0.6s)
- **Contenido del formulario**: Fade up (0.6s, delay 0.2s)

## Efectos de Fondo

### Waves (Olas)
Las olas de fondo tienen animaciones continuas:
- Wave 1: 8s, movimiento vertical y rotación
- Wave 2: 10s, movimiento invertido
- Wave 3: 12s, movimiento suave

## Funciones de Temporización (Easing)

La mayoría de las animaciones utilizan:
```css
cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

Esta curva de Bézier proporciona:
- Inicio suave y acelerado
- Movimiento natural
- Final suave y desacelerado

## Personalización

Para modificar las animaciones:

1. **Duración**: Ajusta los valores en segundos (ej: `0.6s`)
2. **Delay**: Modifica las clases `animate-delay-X` en LoginForm
3. **Tipo de animación**: Cambia el valor de `transition` en el meta del router

## Optimizaciones Implementadas

✅ **Prevención de scrollbars:**
- `overflow: hidden` en contenedores principales
- `overflow-x: hidden` en html, body y #app
- Movimientos reducidos (10-15px en lugar de 20-30px)
- Animaciones más sutiles y contenidas

✅ **Mejores Prácticas:**
- Animaciones sutiles y profesionales
- No interfieren con la usabilidad
- Mejoran la percepción de calidad
- Son accesibles y no causan mareos
- No generan scrollbars innecesarios

❌ **Evitar:**
- Animaciones demasiado largas (> 1s)
- Movimientos bruscos o exagerados
- Múltiples animaciones simultáneas complejas
- Animaciones que bloqueen la interacción del usuario

