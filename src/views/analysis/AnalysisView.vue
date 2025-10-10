<template>
    <AppLayout>
        <div class="analysis">
            <div class="analysis__header">
                <h1 class="analysis__title">Análisis</h1>
                <BaseButton variant="primary" size="lg" @click="startNewAnalysis">
                    + Nuevo Análisis
                </BaseButton>
            </div>

            <!-- Analysis Status Cards -->
            <div class="analysis__status-cards grid grid-cols-1 md:grid-cols-3 gap-lg">
                <BaseCard v-for="status in analysisStatus" :key="status.type" variant="elevated"
                    class="analysis__status-card">
                    <div class="analysis__status-content">
                        <div class="analysis__status-icon">{{ status.icon }}</div>
                        <div class="analysis__status-info">
                            <div class="analysis__status-count">{{ status.count }}</div>
                            <div class="analysis__status-label">{{ status.label }}</div>
                        </div>
                    </div>
                </BaseCard>
            </div>

            <!-- Analysis List -->
            <BaseCard title="Análisis Recientes" class="analysis__list-card">
                <div class="analysis__list">
                    <div v-for="analysis in recentAnalysis" :key="analysis.id" class="analysis__item">
                        <div class="analysis__item-content">
                            <div class="analysis__item-header">
                                <div class="analysis__item-title">
                                    {{ analysis.name }} - Muestra #{{ analysis.sampleId }}
                                </div>
                                <div class="analysis__item-status" :class="`analysis__item-status--${analysis.status}`">
                                    {{ getStatusText(analysis.status) }}
                                </div>
                            </div>

                            <div class="analysis__item-details">
                                <div class="analysis__item-field">
                                    <span class="analysis__field-label">Tipo:</span>
                                    <span class="analysis__field-value">{{ analysis.type }}</span>
                                </div>
                                <div class="analysis__item-field">
                                    <span class="analysis__field-label">Iniciado:</span>
                                    <span class="analysis__field-value">{{ formatDate(analysis.startDate) }}</span>
                                </div>
                                <div v-if="analysis.endDate" class="analysis__item-field">
                                    <span class="analysis__field-label">Completado:</span>
                                    <span class="analysis__field-value">{{ formatDate(analysis.endDate) }}</span>
                                </div>
                            </div>

                            <div class="analysis__item-actions">
                                <BaseButton variant="outline" size="sm" @click="viewAnalysis(analysis.id)">
                                    Ver Detalles
                                </BaseButton>
                                <BaseButton v-if="analysis.status === 'completed'" variant="primary" size="sm"
                                    @click="downloadResults(analysis.id)">
                                    Descargar
                                </BaseButton>
                            </div>
                        </div>
                    </div>
                </div>
            </BaseCard>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface AnalysisStatus {
    type: string
    label: string
    count: number
    icon: string
}

interface Analysis {
    id: string
    name: string
    sampleId: string
    type: string
    status: 'pending' | 'processing' | 'completed'
    startDate: string
    endDate?: string
}

const analysisStatus = ref<AnalysisStatus[]>([
    {
        type: 'pending',
        label: 'Pendientes',
        count: 12,
        icon: '⏳'
    },
    {
        type: 'processing',
        label: 'En Proceso',
        count: 8,
        icon: '🔬'
    },
    {
        type: 'completed',
        label: 'Completados',
        count: 45,
        icon: '✅'
    }
])

const recentAnalysis = ref<Analysis[]>([
    {
        id: '1',
        name: 'Análisis de Hemoglobina',
        sampleId: '001',
        type: 'Química Clínica',
        status: 'completed',
        startDate: '2024-01-15T08:00:00',
        endDate: '2024-01-15T10:30:00'
    },
    {
        id: '2',
        name: 'Cultivo Bacteriológico',
        sampleId: '002',
        type: 'Microbiología',
        status: 'processing',
        startDate: '2024-01-14T14:00:00'
    },
    {
        id: '3',
        name: 'Biopsia de Tejido',
        sampleId: '003',
        type: 'Anatomía Patológica',
        status: 'pending',
        startDate: '2024-01-13T09:00:00'
    }
])

const getStatusText = (status: string) => {
    const statusMap = {
        pending: 'Pendiente',
        processing: 'En proceso',
        completed: 'Completado'
    }
    return statusMap[status as keyof typeof statusMap] || status
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const startNewAnalysis = () => {
    console.log('Iniciar nuevo análisis')
    // Aquí iría la lógica para iniciar un nuevo análisis
}

const viewAnalysis = (id: string) => {
    console.log('Ver análisis:', id)
    // Aquí iría la navegación a los detalles del análisis
}

const downloadResults = (id: string) => {
    console.log('Descargar resultados:', id)
    // Aquí iría la lógica para descargar los resultados
}
</script>

<style scoped>
.analysis {
    @apply space-y-lg;
}

.analysis__header {
    @apply flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md;
}

.analysis__title {
    @apply text-3xl font-bold text-primary;
}

.analysis__status-cards {
    @apply mb-lg;
}

.analysis__status-card {
    @apply p-lg;
}

.analysis__status-content {
    @apply flex items-center gap-md;
}

.analysis__status-icon {
    @apply text-3xl;
}

.analysis__status-info {
    @apply flex flex-col;
}

.analysis__status-count {
    @apply text-2xl font-bold text-primary;
}

.analysis__status-label {
    @apply text-sm text-secondary;
}

.analysis__list-card {
    @apply p-0;
}

.analysis__list {
    @apply space-y-md p-lg;
}

.analysis__item {
    @apply border border-secondary-darker rounded-lg p-lg;
    @apply hover:shadow-md transition-shadow;
}

.analysis__item-content {
    @apply space-y-md;
}

.analysis__item-header {
    @apply flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm;
}

.analysis__item-title {
    @apply font-semibold text-primary;
}

.analysis__item-status {
    @apply px-sm py-xs rounded-full text-xs font-medium;
}

.analysis__item-status--pending {
    @apply bg-yellow-100 text-yellow-800;
}

.analysis__item-status--processing {
    @apply bg-blue-100 text-blue-800;
}

.analysis__item-status--completed {
    @apply bg-alternative bg-opacity-20 text-alternative;
}

.analysis__item-details {
    @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-sm;
}

.analysis__item-field {
    @apply flex flex-col sm:flex-row justify-between gap-xs;
}

.analysis__field-label {
    @apply text-xs text-secondary font-medium;
}

.analysis__field-value {
    @apply text-sm text-primary;
}

.analysis__item-actions {
    @apply flex flex-col sm:flex-row gap-sm justify-end;
}

/* Responsive */
@media (max-width: 767px) {
    .analysis__header {
        @apply flex-col;
    }

    .analysis__status-cards {
        @apply grid-cols-1;
    }

    .analysis__item-details {
        @apply grid-cols-1;
    }
}
</style>
