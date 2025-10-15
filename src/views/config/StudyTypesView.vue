<template>
    <div class="study-types-view">
        <div class="page-header">
            <h1>Tipos de Estudio</h1>
            <p class="page-subtitle">Configuración de categorías y tipos de estudios</p>
        </div>

        <BaseCard class="study-types-content">
            <div class="placeholder-content">
                <BaseIcon name="type" class="placeholder-icon" />
                <h2>Tipos de Estudio</h2>
                <p>Aquí podrás configurar los diferentes tipos de estudios como Normal, Urgente, Estadístico, Control,
                    Biología Molecular, etc.</p>
                <BaseButton variant="primary" @click="handleNew">
                    <BaseIcon name="plus" class="btn-icon" />
                    Nuevo Tipo
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
    console.log('Nuevo tipo de estudio')
}
</script>

<style scoped>
.study-types-view {
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

.study-types-content {
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
