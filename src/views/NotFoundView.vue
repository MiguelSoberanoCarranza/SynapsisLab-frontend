<template>
    <div class="not-found">
        <div class="not-found__content">
            <div class="not-found__icon">🔍</div>
            <h1 class="not-found__title">Página no encontrada</h1>
            <p class="not-found__message">
                La página que buscas no existe o ha sido movida.
            </p>
            <div class="not-found__actions">
                <BaseButton variant="primary" size="lg" @click="$router.push('/dashboard')">
                    Ir al Dashboard
                </BaseButton>
                <BaseButton variant="outline" size="lg" @click="$router.go(-1)">
                    Volver
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<style scoped>
.not-found {
    @apply min-h-screen flex items-center justify-center;
    @apply bg-secondary p-lg;
}

.not-found__content {
    @apply text-center max-w-md mx-auto;
}

.not-found__icon {
    @apply text-6xl mb-lg;
}

.not-found__title {
    @apply text-3xl font-bold text-primary mb-md;
}

.not-found__message {
    @apply text-lg text-secondary mb-xl;
}

.not-found__actions {
    @apply flex flex-col sm:flex-row gap-md justify-center;
}
</style>
