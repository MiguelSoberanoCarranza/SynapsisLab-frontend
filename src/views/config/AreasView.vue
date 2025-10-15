<template>
    <div class="areas-view">
        <div class="page-header">
            <h1>Áreas de Laboratorio</h1>
            <p class="page-subtitle">Configuración de áreas y secciones del laboratorio</p>
        </div>

        <BaseCard class="areas-content">
            <div class="placeholder-content">
                <BaseIcon name="area" class="placeholder-icon" />
                <h2>Áreas de Laboratorio</h2>
                <p>Aquí podrás configurar las diferentes áreas y secciones del laboratorio como Bioquímica, Hematología,
                    Microbiología, etc.</p>
                <BaseButton variant="primary" @click="handleNew">
                    <BaseIcon name="plus" class="btn-icon" />
                    Nueva Área
                </BaseButton>
            </div>
        </BaseCard>
    </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const handleNew = () => {
    console.log('Nueva área')
}
</script>

<style scoped>
.areas-view {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

.page-header {
    margin-bottom: var(--spacing-xl);
}

.page-header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-xs) 0;
}

.page-subtitle {
    color: var(--color-text-secondary);
    margin: 0;
    font-size: 1rem;
}

.areas-content {
    padding: var(--spacing-xl);
}

.placeholder-content {
    text-align: center;
    padding: var(--spacing-2xl) 0;
}

.placeholder-icon {
    width: 4rem;
    height: 4rem;
    color: var(--color-primary);
    margin-bottom: var(--spacing-lg);
}

.placeholder-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-md) 0;
}

.placeholder-content p {
    color: var(--color-text-secondary);
    font-size: 1rem;
    margin: 0 0 var(--spacing-xl) 0;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}

.btn-icon {
    width: 1.25rem;
    height: 1.25rem;
}
</style>
