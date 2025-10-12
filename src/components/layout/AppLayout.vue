<template>
    <div class="app-layout">
        <!-- Sidebar (estático, sin animaciones) -->
        <AppSidebar v-model="showMobileSidebar" :is-mobile="isMobile" @logout="handleLogout" />

        <!-- Mobile Overlay -->
        <transition name="overlay">
            <div v-if="showMobileSidebar && isMobile" @click="showMobileSidebar = false" class="app-layout__overlay"></div>
        </transition>

        <!-- Main Content -->
        <div class="app-layout__main">
            <!-- Mobile Menu Button -->
            <button v-if="isMobile" @click="showMobileSidebar = true" class="app-layout__mobile-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>

            <!-- Content sin transiciones automáticas -->
            <main class="app-layout__content">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const showMobileSidebar = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
    if (!isMobile.value) {
        showMobileSidebar.value = false
    }
}

const handleLogout = () => {
    // La lógica de logout ya está en el sidebar
}

onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.app-layout {
    display: flex;
    min-height: 100vh;
    background-color: var(--color-secondary);
}

/* Overlay */
.app-layout__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.overlay-enter-from,
.overlay-leave-to {
    opacity: 0;
}

/* Main Content */
.app-layout__main {
    flex: 1;
    margin-left: 250px;
    min-height: 100vh;
    transition: margin-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
}

.app-layout__content {
    padding: var(--spacing-2xl);
}

/* Mobile Button */
.app-layout__mobile-btn {
    position: fixed;
    top: var(--spacing-lg);
    left: var(--spacing-lg);
    width: 48px;
    height: 48px;
    border-radius: var(--border-radius-lg);
    background-color: var(--color-primary);
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 50;
}

.app-layout__mobile-btn:hover {
    background-color: var(--color-primary-dark);
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.5);
}

.app-layout__mobile-btn:active {
    transform: scale(0.95);
}

/* Responsive */
@media (max-width: 767px) {
    .app-layout__main {
        margin-left: 0;
    }

    .app-layout__content {
        padding: var(--spacing-lg);
        padding-top: calc(var(--spacing-lg) + 64px);
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .app-layout__content {
        padding: var(--spacing-xl);
    }
}
</style>
