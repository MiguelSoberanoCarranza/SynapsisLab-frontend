<template>
    <div class="dashboard">
        <div class="dashboard__header">
            <div class="dashboard__title-section">
                <h1 class="dashboard__title">Dashboard</h1>
                <p class="dashboard__subtitle">Resumen del sistema de laboratorio</p>
            </div>
            <div class="dashboard__header-actions">
                <BaseButton variant="primary" size="md" @click="refreshData">
                    <BaseIcon name="refresh" :size="16" />
                    Actualizar
                </BaseButton>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="dashboard__stats">
            <BaseCard v-for="stat in stats" :key="stat.id" class="dashboard__stat-card" variant="elevated">
                <div class="dashboard__stat-content">
                    <div class="dashboard__stat-icon">
                        <BaseIcon :name="stat.icon" :size="24" />
                    </div>
                    <div class="dashboard__stat-info">
                        <div class="dashboard__stat-value">{{ stat.value }}</div>
                        <div class="dashboard__stat-title">{{ stat.title }}</div>
                        <div class="dashboard__stat-change" :class="stat.changeType">
                            {{ stat.change }}
                        </div>
                    </div>
                </div>
            </BaseCard>
        </div>

        <!-- Main Content -->
        <div class="dashboard__content">
            <BaseCard title="Actividad Reciente" class="dashboard__activity-card">
                <div class="dashboard__activity-list">
                    <div v-for="activity in recentActivity" :key="activity.id" class="dashboard__activity-item">
                        <div class="dashboard__activity-icon">
                            <BaseIcon :name="activity.icon" :size="20" />
                        </div>
                        <div class="dashboard__activity-content">
                            <div class="dashboard__activity-title">{{ activity.title }}</div>
                            <div class="dashboard__activity-time">{{ activity.time }}</div>
                        </div>
                        <div class="dashboard__activity-action">
                            <BaseButton variant="outline" size="sm" @click="viewActivity(activity)">
                                Ver
                            </BaseButton>
                        </div>
                    </div>
                </div>
            </BaseCard>

            <BaseCard title="Acciones Rápidas" class="dashboard__actions-card">
                <div class="dashboard__actions-list">
                    <div v-for="action in quickActions" :key="action.id" class="dashboard__action-item">
                        <BaseButton :variant="action.variant" size="lg" full-width class="dashboard__action-btn"
                            @click="handleQuickAction(action)">
                            <BaseIcon :name="action.icon" :size="20" />
                            {{ action.label }}
                        </BaseButton>
                    </div>
                </div>
            </BaseCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const router = useRouter()

interface Stat {
    id: string
    title: string
    value: string
    change: string
    changeType: 'positive' | 'negative' | 'neutral'
    icon: string
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
        title: 'Muestras Pendientes',
        value: '24',
        change: '+12%',
        changeType: 'positive',
        icon: 'flask'
    },
    {
        id: '2',
        title: 'Análisis Completados',
        value: '156',
        change: '+8%',
        changeType: 'positive',
        icon: 'check-circle'
    },
    {
        id: '3',
        title: 'Resultados Entregados',
        value: '89',
        change: '-3%',
        changeType: 'negative',
        icon: 'file-text'
    },
    {
        id: '4',
        title: 'Usuarios Activos',
        value: '12',
        change: '0%',
        changeType: 'neutral',
        icon: 'users'
    }
])

const recentActivity = ref<Activity[]>([
    {
        id: '1',
        title: 'Nueva muestra registrada',
        time: 'Hace 5 minutos',
        icon: 'flask'
    },
    {
        id: '2',
        title: 'Análisis completado - Muestra #1234',
        time: 'Hace 15 minutos',
        icon: 'check-circle'
    },
    {
        id: '3',
        title: 'Resultado disponible - Muestra #1230',
        time: 'Hace 1 hora',
        icon: 'file-text'
    },
    {
        id: '4',
        title: 'Usuario agregado al sistema',
        time: 'Hace 2 horas',
        icon: 'user-plus'
    }
])

const quickActions = ref<QuickAction[]>([
    {
        id: '1',
        label: 'Nueva Muestra',
        icon: 'flask',
        variant: 'primary',
        route: '/samples'
    },
    {
        id: '2',
        label: 'Ver Análisis',
        icon: 'microscope',
        variant: 'alternative',
        route: '/analysis'
    },
    {
        id: '3',
        label: 'Reportes',
        icon: 'bar-chart',
        variant: 'secondary',
        route: '/results'
    }
])

const refreshData = () => {
    console.log('Actualizando datos del dashboard')
    // Aquí iría la lógica para refrescar los datos
}

const viewActivity = (activity: Activity) => {
    console.log('Viendo actividad:', activity)
    // Aquí iría la lógica para ver la actividad
}

const handleQuickAction = (action: QuickAction) => {
    router.push(action.route)
}
</script>

<style scoped>
.dashboard {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

/* Header */
.dashboard__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-2xl);
    gap: var(--spacing-lg);
}

.dashboard__title-section {
    flex: 1;
}

.dashboard__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: var(--spacing-xs);
}

.dashboard__subtitle {
    font-size: 1rem;
    color: var(--color-text-secondary);
}

.dashboard__header-actions {
    display: flex;
    gap: var(--spacing-sm);
}

/* Stats */
.dashboard__stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-2xl);
}

.dashboard__stat-card {
    padding: var(--spacing-lg);
}

.dashboard__stat-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.dashboard__stat-icon {
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

.dashboard__stat-info {
    flex: 1;
}

.dashboard__stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-primary);
    line-height: 1;
    margin-bottom: var(--spacing-xs);
}

.dashboard__stat-title {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);
}

.dashboard__stat-change {
    font-size: 0.75rem;
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

/* Content */
.dashboard__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
}

/* Activity */
.dashboard__activity-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
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
    color: var(--color-primary);
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

.dashboard__activity-action {
    flex-shrink: 0;
}

/* Actions */
.dashboard__actions-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.dashboard__action-item {
    width: 100%;
}

.dashboard__action-btn {
    justify-content: flex-start;
    text-align: left;
    padding: var(--spacing-md);
}

/* Animaciones */
.dashboard__header {
    animation: slideDown 0.6s ease-out;
}

.dashboard__stats {
    animation: fadeInUp 0.8s ease-out 0.2s both;
}

.dashboard__stat-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dashboard__stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.dashboard__content {
    animation: fadeInUp 0.8s ease-out 0.4s both;
}

.dashboard__activity-item {
    animation: slideInLeft 0.5s ease-out;
    animation-fill-mode: both;
}

.dashboard__activity-item:nth-child(1) {
    animation-delay: 0.1s;
}

.dashboard__activity-item:nth-child(2) {
    animation-delay: 0.2s;
}

.dashboard__activity-item:nth-child(3) {
    animation-delay: 0.3s;
}

.dashboard__activity-item:nth-child(4) {
    animation-delay: 0.4s;
}

.dashboard__action-btn {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard__action-btn:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .dashboard {
        padding: 4px;
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
        overflow-x: hidden;
        margin: 0;
    }

    .dashboard__header {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
    }

    .dashboard__title {
        font-size: 1.25rem;
    }

    .dashboard__subtitle {
        font-size: 0.875rem;
    }

    .dashboard__header-actions {
        justify-content: stretch;
    }

    .dashboard__header-actions .base-button {
        flex: 1;
    }

    .dashboard__stats {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
    }

    .dashboard__stat-card {
        padding: 4px;
        width: 100%;
        box-sizing: border-box;
    }

    .dashboard__stat-content {
        gap: var(--spacing-sm);
    }

    .dashboard__stat-icon {
        width: 2.5rem;
        height: 2.5rem;
    }

    .dashboard__stat-value {
        font-size: 1.5rem;
    }

    .dashboard__content {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }

    .dashboard__activity-card,
    .dashboard__actions-card {
        padding: 4px;
        width: 100%;
        box-sizing: border-box;
    }

    .dashboard__activity-item {
        padding: var(--spacing-sm);
        gap: var(--spacing-sm);
    }

    .dashboard__activity-icon {
        width: 2rem;
        height: 2rem;
    }

    .dashboard__activity-title {
        font-size: 0.875rem;
    }

    .dashboard__activity-time {
        font-size: 0.8rem;
    }

    .dashboard__action-btn {
        padding: var(--spacing-sm);
        font-size: 0.875rem;
    }

    /* Asegurar que todos los elementos sean responsivos */
    .base-button {
        max-width: 100%;
        box-sizing: border-box;
    }
}

@media (max-width: 480px) {
    .dashboard {
        padding: 2px;
    }

    .dashboard__stat-card,
    .dashboard__activity-card,
    .dashboard__actions-card {
        padding: 2px;
    }

    .dashboard__title {
        font-size: 1.125rem;
    }

    .dashboard__subtitle {
        font-size: 0.8rem;
    }

    .dashboard__stat-value {
        font-size: 1.25rem;
    }

    .dashboard__stat-title {
        font-size: 0.8rem;
    }

    .dashboard__activity-title {
        font-size: 0.8rem;
    }

    .dashboard__activity-time {
        font-size: 0.75rem;
    }

    .dashboard__action-btn {
        padding: var(--spacing-xs);
        font-size: 0.8rem;
    }
}
</style>
