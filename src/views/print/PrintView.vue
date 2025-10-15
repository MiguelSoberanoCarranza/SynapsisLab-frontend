<template>
    <div class="print">
        <div class="print__header">
            <h1 class="print__title">Impresión y Entrega</h1>
        </div>

        <div class="print__content">
            <BaseCard title="Gestión de Impresiones" class="print__card">
                <div class="print__actions">
                    <BaseButton variant="primary" size="lg" @click="printResults">
                        Imprimir Resultados
                    </BaseButton>
                    <BaseButton variant="secondary" size="lg" @click="generateReport">
                        Generar Reporte
                    </BaseButton>
                </div>

                <div class="print__queue">
                    <h3>Cola de Impresión</h3>
                    <div class="print__queue-list">
                        <div v-for="item in printQueue" :key="item.id" class="print__queue-item">
                            <span>{{ item.name }}</span>
                            <span class="print__queue-status">{{ item.status }}</span>
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

interface PrintItem {
    id: string
    name: string
    status: string
}

const printQueue = ref<PrintItem[]>([
    { id: '1', name: 'Resultado M001', status: 'Pendiente' },
    { id: '2', name: 'Reporte Semanal', status: 'Imprimiendo' }
])

const printResults = () => {
    console.log('Imprimiendo resultados...')
}

const generateReport = () => {
    console.log('Generando reporte...')
}
</script>

<style scoped>
.print {
    max-width: 1400px;
    margin: 0 auto;
}

.print__header {
    margin-bottom: var(--spacing-2xl);
}

.print__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-primary);
}

.print__actions {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
}

.print__queue h3 {
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
}

.print__queue-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.print__queue-item {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
}

.print__queue-status {
    font-weight: 500;
    color: var(--color-primary);
}
</style>
