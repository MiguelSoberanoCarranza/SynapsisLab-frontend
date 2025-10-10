<template>
    <div id="app">
        <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transition || 'fade'" mode="out-in">
                <component :is="Component" :key="route.path" />
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
// App principal del sistema de laboratorio
</script>

<style>
#app {
    min-height: 100vh;
}

/* Transiciones de página */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Transición de slide (para navegación hacia adelante) */
.slide-left-enter-active,
.slide-left-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-left-enter-from {
    opacity: 0;
    transform: translateX(15px);
}

.slide-left-leave-to {
    opacity: 0;
    transform: translateX(-15px);
}

/* Transición de zoom (para dashboard) */
.zoom-enter-active {
    animation: zoom-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.zoom-leave-active {
    animation: zoom-out 0.3s ease-in-out;
}

@keyframes zoom-in {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes zoom-out {
    from {
        opacity: 1;
        transform: scale(1);
    }

    to {
        opacity: 0;
        transform: scale(0.98);
    }
}
</style>
