<template>
    <div id="app">
        <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transition || 'fade'" mode="out-in">
                <component :is="Component" />
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

/* Transición fade para cambios de vista */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
