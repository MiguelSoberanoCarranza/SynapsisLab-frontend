<template>
    <AppLayout>
        <router-view v-slot="{ Component }">
            <transition name="content" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from './AppLayout.vue'
</script>

<style scoped>
/* Transición suave para el contenido */
.content-enter-active,
.content-leave-active {
    transition: all 0.3s ease-in-out;
}

.content-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.content-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>
