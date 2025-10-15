<template>
    <div class="samples-received">
        <div class="samples-received__header">
            <h1 class="samples-received__title">Muestras Recibidas</h1>
            <BaseButton variant="primary" size="lg">
                + Nueva Recepción
            </BaseButton>
        </div>

        <div class="samples-received__content">
            <BaseCard title="Lista de Muestras Recibidas" class="samples-received__card">
                <div class="samples-received__list">
                    <div v-for="sample in receivedSamples" :key="sample.id" class="samples-received__item">
                        <div class="samples-received__info">
                            <div class="samples-received__id">{{ sample.id }}</div>
                            <div class="samples-received__type">{{ sample.type }}</div>
                            <div class="samples-received__date">{{ sample.receivedDate }}</div>
                        </div>
                        <div class="samples-received__status">
                            <span class="samples-received__status-badge" :class="sample.status">
                                {{ sample.statusText }}
                            </span>
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
import BaseButton from '@/components/ui/BaseButton.vue'

interface ReceivedSample {
    id: string
    type: string
    receivedDate: string
    status: 'pending' | 'processing' | 'completed'
    statusText: string
}

const receivedSamples = ref<ReceivedSample[]>([
    {
        id: 'M001',
        type: 'Sangre',
        receivedDate: '2024-01-15',
        status: 'pending',
        statusText: 'Pendiente'
    },
    {
        id: 'M002',
        type: 'Orina',
        receivedDate: '2024-01-15',
        status: 'processing',
        statusText: 'Procesando'
    }
])
</script>

<style scoped>
.samples-received {
    max-width: 1400px;
    margin: 0 auto;
}

.samples-received__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-2xl);
}

.samples-received__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-primary);
}

.samples-received__list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.samples-received__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    transition: all 0.2s ease;
}

.samples-received__item:hover {
    background-color: var(--color-secondary);
}

.samples-received__info {
    display: flex;
    gap: var(--spacing-lg);
}

.samples-received__id {
    font-weight: 600;
    color: var(--color-primary);
}

.samples-received__status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
}

.samples-received__status-badge.pending {
    background-color: var(--color-secondary);
    color: var(--color-primary);
}

.samples-received__status-badge.processing {
    background-color: var(--color-secondary);
    color: var(--color-primary);
}

.samples-received__status-badge.completed {
    background-color: var(--color-secondary);
    color: var(--color-alternative);
}
</style>
