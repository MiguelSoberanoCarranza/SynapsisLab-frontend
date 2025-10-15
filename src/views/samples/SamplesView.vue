<template>
    <div class="samples">
        <div class="samples__header">
            <h1 class="samples__title">Muestras</h1>
            <BaseButton variant="primary" size="lg" @click="showNewSampleForm = true">
                + Nueva Muestra
            </BaseButton>
        </div>

        <!-- Filters -->
        <BaseCard class="samples__filters">
            <div class="samples__filter-content">
                <BaseInput v-model="filters.search" placeholder="Buscar muestras..." class="samples__search" />
                <select v-model="filters.status" class="samples__status-filter">
                    <option value="">Todos los estados</option>
                    <option value="pending">Pendiente</option>
                    <option value="processing">En proceso</option>
                    <option value="completed">Completado</option>
                </select>
            </div>
        </BaseCard>

        <!-- Samples Grid -->
        <div class="samples__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            <BaseCard v-for="sample in filteredSamples" :key="sample.id" :title="`Muestra #${sample.id}`"
                variant="elevated" hoverable class="samples__sample-card">
                <div class="samples__sample-content">
                    <div class="samples__sample-info">
                        <div class="samples__sample-field">
                            <span class="samples__field-label">Tipo:</span>
                            <span class="samples__field-value">{{ sample.type }}</span>
                        </div>
                        <div class="samples__sample-field">
                            <span class="samples__field-label">Estado:</span>
                            <span class="samples__field-value samples__status"
                                :class="`samples__status--${sample.status}`">
                                {{ getStatusText(sample.status) }}
                            </span>
                        </div>
                        <div class="samples__sample-field">
                            <span class="samples__field-label">Fecha:</span>
                            <span class="samples__field-value">{{ formatDate(sample.date) }}</span>
                        </div>
                    </div>

                    <div class="samples__sample-actions">
                        <BaseButton variant="outline" size="sm" @click="viewSample(sample.id)">
                            Ver Detalles
                        </BaseButton>
                    </div>
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
    status: ''
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
            sample.type.toLowerCase().includes(filters.search.toLowerCase())

        const matchesStatus = !filters.status || sample.status === filters.status

        return matchesSearch && matchesStatus
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
</script>

<style scoped>
.samples {
    @apply space-y-lg;
}

.samples__header {
    @apply flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md;
}

.samples__title {
    @apply text-3xl font-bold text-primary;
}

.samples__filters {
    @apply p-md;
}

.samples__filter-content {
    @apply flex flex-col sm:flex-row gap-md;
}

.samples__search {
    @apply flex-1;
}

.samples__status-filter {
    @apply px-md py-sm border border-secondary-darker rounded-md;
    @apply bg-white focus:ring-primary focus:border-primary;
}

.samples__grid {
    @apply mt-lg;
}

.samples__sample-card {
    @apply cursor-pointer;
}

.samples__sample-content {
    @apply space-y-md;
}

.samples__sample-info {
    @apply space-y-sm;
}

.samples__sample-field {
    @apply flex justify-between items-center;
}

.samples__field-label {
    @apply text-sm font-medium text-secondary;
}

.samples__field-value {
    @apply text-sm text-primary;
}

.samples__status {
    @apply px-sm py-xs rounded-full text-xs font-medium;
}

.samples__status--pending {
    @apply bg-yellow-100 text-yellow-800;
}

.samples__status--processing {
    @apply bg-blue-100 text-blue-800;
}

.samples__status--completed {
    @apply bg-alternative bg-opacity-20 text-alternative;
}

.samples__sample-actions {
    @apply flex justify-end;
}

/* Responsive */
@media (max-width: 767px) {
    .samples__header {
        @apply flex-col;
    }

    .samples__filter-content {
        @apply flex-col;
    }
}
</style>
