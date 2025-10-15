<template>
    <div class="methods-view">
        <div class="page-header">
            <h1>Métodos de Análisis</h1>
            <p class="page-subtitle">Configuración de métodos y técnicas de análisis</p>
        </div>

        <BaseCard class="methods-content">
            <div class="placeholder-content">
                <BaseIcon name="method" class="placeholder-icon" />
                <h2>Métodos de Análisis</h2>
                <p>Aquí podrás configurar los diferentes métodos de análisis como Química Clínica, Inmunoensayo,
                    Microscopía, Cultivo, etc.</p>
                <BaseButton variant="primary" @click="handleNew">
                    <BaseIcon name="plus" class="btn-icon" />
                    Nuevo Método
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
    console.log('Nuevo método')
}
</script>

<style scoped>
.methods-view {
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

.methods-content {
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
