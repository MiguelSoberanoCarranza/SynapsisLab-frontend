<template>
    <AppLayout>
        <div class="dashboard">
            <div class="dashboard__header">
                <h1 class="dashboard__title">Dashboard</h1>
                <p class="dashboard__subtitle">Resumen del sistema de laboratorio</p>
            </div>

            <!-- Stats Cards -->
            <div class="dashboard__stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
                <BaseCard v-for="stat in stats" :key="stat.id" :title="stat.title" variant="elevated" padding="lg"
                    class="dashboard__stat-card">
                    <div class="dashboard__stat-content">
                        <div class="dashboard__stat-value">{{ stat.value }}</div>
                        <div class="dashboard__stat-change" :class="stat.changeType">
                            {{ stat.change }}
                        </div>
                    </div>
                </BaseCard>
            </div>

            <!-- Recent Activity -->
            <div class="dashboard__content grid grid-cols-1 lg:grid-cols-2 gap-lg">
                <BaseCard title="Actividad Reciente" class="dashboard__activity-card">
                    <div class="dashboard__activity-list">
                        <div v-for="activity in recentActivity" :key="activity.id" class="dashboard__activity-item">
                            <div class="dashboard__activity-icon">
                                {{ activity.icon }}
                            </div>
                            <div class="dashboard__activity-content">
                                <div class="dashboard__activity-title">{{ activity.title }}</div>
                                <div class="dashboard__activity-time">{{ activity.time }}</div>
                            </div>
                        </div>
                    </div>
                </BaseCard>

                <BaseCard title="Acciones Rápidas" class="dashboard__actions-card">
                    <div class="dashboard__actions-list">
                        <BaseButton v-for="action in quickActions" :key="action.id" :variant="action.variant" size="lg"
                            full-width class="dashboard__action-btn" @click="handleQuickAction(action)">
                            {{ action.icon }} {{ action.label }}
                        </BaseButton>
                    </div>
                </BaseCard>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()

interface Stat {
    id: string
    title: string
    value: string
    change: string
    changeType: 'positive' | 'negative' | 'neutral'
}

interface Activity {
    id: string
    title: string
    time: string
    icon: string
}

interface QuickAction {
    id: string
    label: string
    icon: string
    variant: 'primary' | 'secondary' | 'alternative'
    route: string
}

const stats = ref<Stat[]>([
    {
        id: '1',
        title: 'Muestras Totales',
        value: '1,247',
        change: '+12%',
        changeType: 'positive'
    },
    {
        id: '2',
        title: 'Análisis Completados',
        value: '892',
        change: '+8%',
        changeType: 'positive'
    },
    {
        id: '3',
        title: 'Pendientes',
        value: '45',
        change: '-5%',
        changeType: 'negative'
    },
    {
        id: '4',
        title: 'Tiempo Promedio',
        value: '2.3h',
        change: '0%',
        changeType: 'neutral'
    }
])

const recentActivity = ref<Activity[]>([
    {
        id: '1',
        title: 'Nueva muestra registrada',
        time: 'Hace 5 minutos',
        icon: '🧪'
    },
    {
        id: '2',
        title: 'Análisis completado - Muestra #1234',
        time: 'Hace 15 minutos',
        icon: '✅'
    },
    {
        id: '3',
        title: 'Resultado disponible - Muestra #1230',
        time: 'Hace 1 hora',
        icon: '📋'
    },
    {
        id: '4',
        title: 'Usuario agregado al sistema',
        time: 'Hace 2 horas',
        icon: '👤'
    }
])

const quickActions = ref<QuickAction[]>([
    {
        id: '1',
        label: 'Nueva Muestra',
        icon: '🧪',
        variant: 'primary',
        route: '/samples'
    },
    {
        id: '2',
        label: 'Ver Análisis',
        icon: '🔬',
        variant: 'alternative',
        route: '/analysis'
    },
    {
        id: '3',
        label: 'Reportes',
        icon: '📊',
        variant: 'secondary',
        route: '/results'
    }
])

const handleQuickAction = (action: QuickAction) => {
    router.push(action.route)
}
</script>

<style scoped>
.dashboard {
    max-width: 1400px;
    margin: 0 auto;
}

.dashboard__header {
    margin-bottom: var(--spacing-2xl);
}

.dashboard__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: var(--spacing-sm);
}

.dashboard__subtitle {
    font-size: 1rem;
    color: var(--color-text-secondary);
}

.dashboard__stats {
    margin-bottom: var(--spacing-2xl);
}

.dashboard__stat-card {
    text-align: center;
}

.dashboard__stat-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
}

.dashboard__stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-primary);
    line-height: 1;
}

.dashboard__stat-change {
    font-size: 0.875rem;
    font-weight: 500;
}

.dashboard__stat-change.positive {
    color: var(--color-alternative);
}

.dashboard__stat-change.negative {
    color: #ef4444;
}

.dashboard__stat-change.neutral {
    color: var(--color-text-secondary);
}

.dashboard__activity-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.dashboard__activity-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    border-radius: var(--border-radius-md);
    transition: background-color 0.2s ease;
}

.dashboard__activity-item:hover {
    background-color: var(--color-secondary);
}

.dashboard__activity-icon {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(37, 99, 235, 0.1);
    border-radius: 50%;
    font-size: 1.25rem;
    flex-shrink: 0;
}

.dashboard__activity-content {
    flex: 1;
}

.dashboard__activity-title {
    font-weight: 500;
    color: var(--color-text-primary);
    margin-bottom: 0.25rem;
}

.dashboard__activity-time {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}

.dashboard__actions-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.dashboard__action-btn {
    justify-content: flex-start;
    text-align: left;
}

/* Responsive */
@media (max-width: 767px) {
    .dashboard__stats {
        grid-template-columns: repeat(1, 1fr);
    }

    .dashboard__content {
        grid-template-columns: repeat(1, 1fr);
    }

    .dashboard__title {
        font-size: 1.5rem;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .dashboard__stats {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
