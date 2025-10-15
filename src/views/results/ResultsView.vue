<template>
    <div class="results">
        <div class="results__header">
            <h1 class="results__title">Resultados</h1>
            <div class="results__header-actions">
                <BaseButton variant="outline" size="md" @click="exportResults">
                    📊 Exportar
                </BaseButton>
                <BaseButton variant="primary" size="md" @click="generateReport">
                    📄 Generar Reporte
                </BaseButton>
            </div>
        </div>

        <!-- Results Summary -->
        <div class="results__summary grid grid-cols-1 md:grid-cols-4 gap-lg">
            <BaseCard v-for="summary in resultsSummary" :key="summary.type" variant="elevated"
                class="results__summary-card">
                <div class="results__summary-content">
                    <div class="results__summary-icon">{{ summary.icon }}</div>
                    <div class="results__summary-info">
                        <div class="results__summary-value">{{ summary.value }}</div>
                        <div class="results__summary-label">{{ summary.label }}</div>
                    </div>
                </div>
            </BaseCard>
        </div>

        <!-- Results Table -->
        <BaseCard title="Resultados Recientes" class="results__table-card">
            <div class="results__table-wrapper">
                <table class="results__table">
                    <thead class="results__table-header">
                        <tr>
                            <th class="results__table-cell">ID</th>
                            <th class="results__table-cell">Muestra</th>
                            <th class="results__table-cell">Tipo</th>
                            <th class="results__table-cell">Resultado</th>
                            <th class="results__table-cell">Estado</th>
                            <th class="results__table-cell">Fecha</th>
                            <th class="results__table-cell">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="results__table-body">
                        <tr v-for="result in recentResults" :key="result.id" class="results__table-row">
                            <td class="results__table-cell">{{ result.id }}</td>
                            <td class="results__table-cell">#{{ result.sampleId }}</td>
                            <td class="results__table-cell">{{ result.type }}</td>
                            <td class="results__table-cell">
                                <span class="results__result-value" :class="getResultClass(result.result)">
                                    {{ result.result }}
                                </span>
                            </td>
                            <td class="results__table-cell">
                                <span class="results__status-badge" :class="`results__status-badge--${result.status}`">
                                    {{ getStatusText(result.status) }}
                                </span>
                            </td>
                            <td class="results__table-cell">{{ formatDate(result.date) }}</td>
                            <td class="results__table-cell">
                                <div class="results__actions">
                                    <BaseButton variant="outline" size="sm" @click="viewResult(result.id)">
                                        Ver
                                    </BaseButton>
                                    <BaseButton variant="primary" size="sm" @click="downloadResult(result.id)">
                                        📄
                                    </BaseButton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </BaseCard>

        <!-- Charts Section -->
        <div class="results__charts grid grid-cols-1 lg:grid-cols-2 gap-lg">
            <BaseCard title="Resultados por Tipo" class="results__chart-card">
                <div class="results__chart-placeholder">
                    <div class="results__chart-icon">📊</div>
                    <p class="results__chart-text">Gráfico de resultados por tipo</p>
                </div>
            </BaseCard>

            <BaseCard title="Tendencias Mensuales" class="results__chart-card">
                <div class="results__chart-placeholder">
                    <div class="results__chart-icon">📈</div>
                    <p class="results__chart-text">Gráfico de tendencias</p>
                </div>
            </BaseCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface ResultsSummary {
    type: string
    label: string
    value: string
    icon: string
}

interface Result {
    id: string
    sampleId: string
    type: string
    result: string
    status: 'normal' | 'abnormal' | 'critical'
    date: string
}

const resultsSummary = ref<ResultsSummary[]>([
    {
        type: 'total',
        label: 'Total Resultados',
        value: '1,247',
        icon: '📋'
    },
    {
        type: 'normal',
        label: 'Normales',
        value: '1,089',
        icon: '✅'
    },
    {
        type: 'abnormal',
        label: 'Anómalos',
        value: '145',
        icon: '⚠️'
    },
    {
        type: 'critical',
        label: 'Críticos',
        value: '13',
        icon: '🚨'
    }
])

const recentResults = ref<Result[]>([
    {
        id: 'R001',
        sampleId: '001',
        type: 'Hemoglobina',
        result: '14.2 g/dL',
        status: 'normal',
        date: '2024-01-15T10:30:00'
    },
    {
        id: 'R002',
        sampleId: '002',
        type: 'Glucosa',
        result: '180 mg/dL',
        status: 'abnormal',
        date: '2024-01-14T16:45:00'
    },
    {
        id: 'R003',
        sampleId: '003',
        type: 'Creatinina',
        result: '2.8 mg/dL',
        status: 'critical',
        date: '2024-01-13T11:20:00'
    },
    {
        id: 'R004',
        sampleId: '004',
        type: 'Colesterol',
        result: '185 mg/dL',
        status: 'normal',
        date: '2024-01-12T14:15:00'
    }
])

const getStatusText = (status: string) => {
    const statusMap = {
        normal: 'Normal',
        abnormal: 'Anómalo',
        critical: 'Crítico'
    }
    return statusMap[status as keyof typeof statusMap] || status
}

const getResultClass = (result: string) => {
    // Lógica simple para determinar el tipo de resultado
    if (result.includes('Crítico') || result.includes('Alto') || result.includes('Bajo')) {
        return 'results__result-value--critical'
    }
    if (result.includes('Anómalo') || result.includes('Elevado')) {
        return 'results__result-value--abnormal'
    }
    return 'results__result-value--normal'
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

const exportResults = () => {
    console.log('Exportar resultados')
    // Aquí iría la lógica para exportar resultados
}

const generateReport = () => {
    console.log('Generar reporte')
    // Aquí iría la lógica para generar reportes
}

const viewResult = (id: string) => {
    console.log('Ver resultado:', id)
    // Aquí iría la navegación a los detalles del resultado
}

const downloadResult = (id: string) => {
    console.log('Descargar resultado:', id)
    // Aquí iría la lógica para descargar el resultado
}
</script>

<style scoped>
.results {
    max-width: 1400px;
    margin: 0 auto;
    @apply space-y-lg;
}

.results__header {
    @apply flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md;
}

.results__title {
    @apply text-3xl font-bold text-primary;
}

.results__header-actions {
    @apply flex flex-col sm:flex-row gap-sm;
}

.results__summary-cards {
    @apply mb-lg;
}

.results__summary-card {
    @apply p-lg;
}

.results__summary-content {
    @apply flex items-center gap-md;
}

.results__summary-icon {
    @apply text-3xl;
}

.results__summary-info {
    @apply flex flex-col;
}

.results__summary-value {
    @apply text-2xl font-bold text-primary;
}

.results__summary-label {
    @apply text-sm text-secondary;
}

.results__table-card {
    @apply p-0;
}

.results__table-wrapper {
    @apply overflow-x-auto;
}

.results__table {
    @apply w-full;
}

.results__table-header {
    @apply bg-secondary;
}

.results__table-row {
    @apply border-b border-secondary-darker hover:bg-secondary;
}

.results__table-cell {
    @apply px-md py-sm text-left;
}

.results__table-header .results__table-cell {
    @apply font-semibold text-primary;
}

.results__result-value {
    @apply font-medium;
}

.results__result-value--normal {
    @apply text-alternative;
}

.results__result-value--abnormal {
    @apply text-warning;
}

.results__result-value--critical {
    @apply text-error;
}

.results__status-badge {
    @apply px-sm py-xs rounded-full text-xs font-medium;
}

.results__status-badge--normal {
    @apply bg-alternative bg-opacity-20 text-alternative;
}

.results__status-badge--abnormal {
    @apply bg-warning bg-opacity-20 text-warning;
}

.results__status-badge--critical {
    @apply bg-error bg-opacity-20 text-error;
}

.results__actions {
    @apply flex gap-sm;
}

.results__chart-card {
    @apply p-lg;
}

.results__chart-placeholder {
    @apply flex flex-col items-center justify-center h-64;
    @apply text-center text-secondary;
}

.results__chart-icon {
    @apply text-4xl mb-md;
}

.results__chart-text {
    @apply text-lg;
}

/* Responsive */
@media (max-width: 767px) {
    .results__header {
        @apply flex-col;
    }

    .results__header-actions {
        @apply flex-col;
    }

    .results__summary {
        @apply grid-cols-1;
    }

    .results__charts {
        @apply grid-cols-1;
    }

    .results__actions {
        @apply flex-col;
    }
}
</style>
