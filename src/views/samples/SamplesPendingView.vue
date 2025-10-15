<template>
    <div class="samples-pending">
        <div class="samples-pending__header">
            <h1 class="samples-pending__title">Muestras Pendientes</h1>
        </div>

        <div class="samples-pending__content">
            <BaseCard title="Muestras en Proceso" class="samples-pending__card">
                <div class="samples-pending__list">
                    <div v-for="sample in pendingSamples" :key="sample.id" class="samples-pending__item">
                        <div class="samples-pending__info">
                            <div class="samples-pending__id">{{ sample.id }}</div>
                            <div class="samples-pending__type">{{ sample.type }}</div>
                            <div class="samples-pending__priority">{{ sample.priority }}</div>
                        </div>
                        <div class="samples-pending__progress">
                            <div class="samples-pending__progress-bar">
                                <div class="samples-pending__progress-fill" :style="{ width: sample.progress + '%' }">
                                </div>
                            </div>
                            <span class="samples-pending__progress-text">{{ sample.progress }}%</span>
                        </div>
                    </div>
                </div>
            </BaseCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'

interface PendingSample {
    id: string
    type: string
    priority: string
    progress: number
}

const pendingSamples = ref<PendingSample[]>([
    {
        id: 'M003',
        type: 'Sangre',
        priority: 'Alta',
        progress: 75
    },
    {
        id: 'M004',
        type: 'Orina',
        priority: 'Media',
        progress: 45
    }
])
</script>

<style scoped>
.samples-pending {
    max-width: 1400px;
    margin: 0 auto;
}

.samples-pending__header {
    margin-bottom: var(--spacing-2xl);
}

.samples-pending__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-primary);
}

.samples-pending__list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.samples-pending__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
}

.samples-pending__info {
    display: flex;
    gap: var(--spacing-lg);
}

.samples-pending__id {
    font-weight: 600;
    color: var(--color-primary);
}

.samples-pending__progress {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    min-width: 200px;
}

.samples-pending__progress-bar {
    flex: 1;
    height: 8px;
    background-color: var(--color-border);
    border-radius: 4px;
    overflow: hidden;
}

.samples-pending__progress-fill {
    height: 100%;
    background-color: var(--color-primary);
    transition: width 0.3s ease;
}

.samples-pending__progress-text {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    min-width: 35px;
}
</style>
