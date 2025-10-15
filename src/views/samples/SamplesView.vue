<template>
    <div class="samples">
        <div class="samples__header">
            <div class="samples__title-section">
                <h1 class="samples__title">Muestras</h1>
                <p class="samples__subtitle">Gestión de muestras de laboratorio</p>
            </div>
            <div class="samples__header-actions">
                <BaseButton variant="primary" size="md" @click="showNewSampleForm = true">
                    <BaseIcon name="plus" :size="16" />
                    Nueva Muestra
                </BaseButton>
                <BaseButton variant="outline" size="md" @click="refreshSamples">
                    <BaseIcon name="refresh" :size="16" />
                    Actualizar
                </BaseButton>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="samples__stats">
            <BaseCard v-for="stat in sampleStats" :key="stat.id" class="samples__stat-card" variant="elevated">
                <div class="samples__stat-content">
                    <div class="samples__stat-icon">
                        <BaseIcon :name="stat.icon" :size="24" />
                    </div>
                    <div class="samples__stat-info">
                        <div class="samples__stat-value">{{ stat.value }}</div>
                        <div class="samples__stat-title">{{ stat.title }}</div>
                        <div class="samples__stat-change" :class="stat.changeType">
                            {{ stat.change }}
                        </div>
                    </div>
                </div>
            </BaseCard>
        </div>

        <!-- Filters -->
        <BaseCard class="samples__filters">
            <div class="samples__filter-content">
                <div class="samples__search-group">
                    <BaseInput v-model="filters.search" placeholder="Buscar muestras..." class="samples__search">
                        <template #prefix>
                            <BaseIcon name="search" :size="16" />
                        </template>
                    </BaseInput>
                </div>
                <div class="samples__filter-group">
                    <select v-model="filters.status" class="samples__status-filter">
                        <option value="">Todos los estados</option>
                        <option value="pending">Pendiente</option>
                        <option value="processing">En proceso</option>
                        <option value="completed">Completado</option>
                    </select>
                    <select v-model="filters.type" class="samples__type-filter">
                        <option value="">Todos los tipos</option>
                        <option value="sangre">Sangre</option>
                        <option value="orina">Orina</option>
                        <option value="tejido">Tejido</option>
                        <option value="saliva">Saliva</option>
                    </select>
                </div>
            </div>
        </BaseCard>

        <!-- Samples Grid -->
        <div class="samples__grid">
            <BaseCard v-for="sample in filteredSamples" :key="sample.id" class="samples__sample-card"
                variant="elevated">
                <div class="samples__sample-content">
                    <div class="samples__sample-header">
                        <div class="samples__sample-id">
                            <BaseIcon name="flask" :size="16" />
                            Muestra #{{ sample.id }}
                        </div>
                        <div class="samples__sample-status" :class="`samples__sample-status--${sample.status}`">
                            {{ getStatusText(sample.status) }}
                        </div>
                    </div>

                    <div class="samples__sample-info">
                        <div class="samples__sample-field">
                            <span class="samples__field-label">Tipo:</span>
                            <span class="samples__field-value">{{ sample.type }}</span>
                        </div>
                        <div class="samples__sample-field">
                            <span class="samples__field-label">Fecha:</span>
                            <span class="samples__field-value">{{ formatDate(sample.date) }}</span>
                        </div>
                        <div class="samples__sample-field">
                            <span class="samples__field-label">Descripción:</span>
                            <span class="samples__field-value">{{ sample.description }}</span>
                        </div>
                    </div>

                    <div class="samples__sample-actions">
                        <BaseButton variant="outline" size="sm" @click="viewSample(sample.id)">
                            <BaseIcon name="eye" :size="14" />
                            Ver
                        </BaseButton>
                        <BaseButton variant="outline" size="sm" @click="editSample(sample.id)">
                            <BaseIcon name="edit" :size="14" />
                            Editar
                        </BaseButton>
                        <BaseButton variant="danger" size="sm" @click="deleteSample(sample.id)">
                            <BaseIcon name="x" :size="14" />
                            Eliminar
                        </BaseButton>
                    </div>
                </div>
            </BaseCard>
        </div>

        <!-- Empty State -->
        <div v-if="filteredSamples.length === 0" class="samples__empty">
            <BaseCard class="samples__empty-card">
                <div class="samples__empty-content">
                    <BaseIcon name="flask" :size="48" />
                    <h3 class="samples__empty-title">No hay muestras</h3>
                    <p class="samples__empty-subtitle">No se encontraron muestras con los filtros aplicados</p>
                    <BaseButton variant="primary" @click="clearFilters">
                        Limpiar Filtros
                    </BaseButton>
                </div>
            </BaseCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

interface Sample {
    id: string
    type: string
    status: 'pending' | 'processing' | 'completed'
    date: string
    description: string
}

const showNewSampleForm = ref(false)

const filters = reactive({
    search: '',
    status: '',
    type: ''
})

const samples = ref<Sample[]>([
    {
        id: '001',
        type: 'Sangre',
        status: 'completed',
        date: '2024-01-15',
        description: 'Análisis de hemoglobina'
    },
    {
        id: '002',
        type: 'Orina',
        status: 'processing',
        date: '2024-01-14',
        description: 'Cultivo bacteriológico'
    },
    {
        id: '003',
        type: 'Tejido',
        status: 'pending',
        date: '2024-01-13',
        description: 'Biopsia de piel'
    }
])

const filteredSamples = computed(() => {
    return samples.value.filter(sample => {
        const matchesSearch = !filters.search ||
            sample.id.toLowerCase().includes(filters.search.toLowerCase()) ||
            sample.type.toLowerCase().includes(filters.search.toLowerCase()) ||
            sample.description.toLowerCase().includes(filters.search.toLowerCase())

        const matchesStatus = !filters.status || sample.status === filters.status
        const matchesType = !filters.type || sample.type.toLowerCase() === filters.type.toLowerCase()

        return matchesSearch && matchesStatus && matchesType
    })
})

const getStatusText = (status: string) => {
    const statusMap = {
        pending: 'Pendiente',
        processing: 'En proceso',
        completed: 'Completado'
    }
    return statusMap[status as keyof typeof statusMap] || status
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES')
}

const viewSample = (id: string) => {
    console.log('Ver muestra:', id)
    // Aquí iría la navegación a los detalles de la muestra
}

const editSample = (id: string) => {
    console.log('Editando muestra:', id)
    // Aquí iría la lógica para editar la muestra
}

const deleteSample = (id: string) => {
    console.log('Eliminando muestra:', id)
    // Aquí iría la lógica para eliminar la muestra
}

const refreshSamples = () => {
    console.log('Actualizando muestras')
    // Aquí iría la lógica para refrescar las muestras
}

const clearFilters = () => {
    filters.search = ''
    filters.status = ''
    filters.type = ''
}
</script>

<style scoped>
.samples {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

/* Header */
.samples__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-xl);
    gap: var(--spacing-lg);
}

.samples__title-section {
    flex: 1;
}

.samples__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: var(--spacing-xs);
}

.samples__subtitle {
    font-size: 1rem;
    color: var(--color-text-secondary);
}

.samples__header-actions {
    display: flex;
    gap: var(--spacing-sm);
}

/* Stats */
.samples__stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
}

.samples__stat-card {
    padding: var(--spacing-lg);
}

.samples__stat-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.samples__stat-icon {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(37, 99, 235, 0.1);
    border-radius: var(--border-radius-lg);
    color: var(--color-primary);
    flex-shrink: 0;
}

.samples__stat-info {
    flex: 1;
}

.samples__stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
    line-height: 1;
    margin-bottom: var(--spacing-xs);
}

.samples__stat-title {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);
}

.samples__stat-change {
    font-size: 0.75rem;
    font-weight: 500;
}

.samples__stat-change.positive {
    color: var(--color-alternative);
}

.samples__stat-change.negative {
    color: #ef4444;
}

.samples__stat-change.neutral {
    color: var(--color-text-secondary);
}

/* Filters */
.samples__filters {
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
}

.samples__filter-content {
    display: flex;
    gap: var(--spacing-lg);
    align-items: flex-end;
}

.samples__search-group {
    flex: 1;
}

.samples__search {
    width: 100%;
}

.samples__filter-group {
    display: flex;
    gap: var(--spacing-md);
}

.samples__status-filter,
.samples__type-filter {
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    background-color: var(--color-background);
    color: var(--color-text-primary);
    min-width: 150px;
}

/* Grid */
.samples__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: var(--spacing-lg);
}

.samples__sample-card {
    padding: var(--spacing-lg);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.samples__sample-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.samples__sample-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.samples__sample-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);
}

.samples__sample-id {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-weight: 600;
    color: var(--color-primary);
}

.samples__sample-status {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius-full);
    font-size: 0.75rem;
    font-weight: 500;
}

.samples__sample-status--pending {
    background-color: #fef3c7;
    color: #92400e;
}

.samples__sample-status--processing {
    background-color: #dbeafe;
    color: #1e40af;
}

.samples__sample-status--completed {
    background-color: rgba(16, 185, 129, 0.1);
    color: var(--color-alternative);
}

.samples__sample-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.samples__sample-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.samples__field-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
}

.samples__field-value {
    font-size: 0.875rem;
    color: var(--color-text-primary);
    text-align: right;
    max-width: 60%;
    word-wrap: break-word;
}

.samples__sample-actions {
    display: flex;
    gap: var(--spacing-sm);
    justify-content: flex-end;
    margin-top: var(--spacing-sm);
}

/* Empty State */
.samples__empty {
    margin-top: var(--spacing-2xl);
}

.samples__empty-card {
    padding: var(--spacing-2xl);
    text-align: center;
}

.samples__empty-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
}

.samples__empty-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-primary);
}

.samples__empty-subtitle {
    font-size: 1rem;
    color: var(--color-text-secondary);
}

/* Animaciones */
.samples__header {
    animation: slideDown 0.6s ease-out;
}

.samples__stats {
    animation: fadeInUp 0.8s ease-out 0.1s both;
}

.samples__filters {
    animation: fadeInUp 0.8s ease-out 0.2s both;
}

.samples__grid {
    animation: fadeInUp 0.8s ease-out 0.3s both;
}

.samples__sample-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.samples__sample-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Keyframes */
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .samples {
        padding: 4px;
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
        overflow-x: hidden;
        margin: 0;
    }

    .samples__header {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
    }

    .samples__title {
        font-size: 1.25rem;
    }

    .samples__subtitle {
        font-size: 0.875rem;
    }

    .samples__header-actions {
        justify-content: stretch;
    }

    .samples__header-actions .base-button {
        flex: 1;
    }

    .samples__stats {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
    }

    .samples__stat-card {
        padding: 4px;
        width: 100%;
        box-sizing: border-box;
    }

    .samples__stat-content {
        gap: var(--spacing-sm);
    }

    .samples__stat-icon {
        width: 2.5rem;
        height: 2.5rem;
    }

    .samples__stat-value {
        font-size: 1.25rem;
    }

    .samples__filters {
        padding: 4px;
        margin-bottom: var(--spacing-lg);
        width: 100%;
        box-sizing: border-box;
    }

    .samples__filter-content {
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .samples__filter-group {
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .samples__status-filter,
    .samples__type-filter {
        width: 100%;
        min-width: auto;
    }

    .samples__grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }

    .samples__sample-card {
        padding: 4px;
        width: 100%;
        box-sizing: border-box;
    }

    .samples__sample-header {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-sm);
    }

    .samples__sample-actions {
        justify-content: stretch;
    }

    .samples__sample-actions .base-button {
        flex: 1;
    }

    .samples__empty-card {
        padding: var(--spacing-lg);
    }

    /* Asegurar que todos los elementos sean responsivos */
    .base-button {
        max-width: 100%;
        box-sizing: border-box;
    }
}

@media (max-width: 480px) {
    .samples {
        padding: 2px;
    }

    .samples__stat-card,
    .samples__filters,
    .samples__sample-card {
        padding: 2px;
    }

    .samples__title {
        font-size: 1.125rem;
    }

    .samples__subtitle {
        font-size: 0.8rem;
    }

    .samples__stat-value {
        font-size: 1rem;
    }

    .samples__stat-title {
        font-size: 0.8rem;
    }

    .samples__empty-title {
        font-size: 1.125rem;
    }

    .samples__empty-subtitle {
        font-size: 0.875rem;
    }
}
</style>
