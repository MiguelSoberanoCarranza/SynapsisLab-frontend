<template>
    <div class="admin">
        <div class="admin__header">
            <h1 class="admin__title">Administración</h1>
        </div>

        <div class="admin__content">
            <div class="admin__grid">
                <BaseCard title="Usuarios" class="admin__card">
                    <div class="admin__card-content">
                        <p>Gestionar usuarios del sistema</p>
                        <BaseButton variant="primary" size="md" @click="manageUsers">
                            Gestionar Usuarios
                        </BaseButton>
                    </div>
                </BaseCard>

                <BaseCard title="Permisos" class="admin__card">
                    <div class="admin__card-content">
                        <p>Configurar permisos y roles</p>
                        <BaseButton variant="primary" size="md" @click="managePermissions">
                            Configurar Permisos
                        </BaseButton>
                    </div>
                </BaseCard>

                <BaseCard title="Respaldo" class="admin__card">
                    <div class="admin__card-content">
                        <p>Crear respaldo de datos</p>
                        <BaseButton variant="secondary" size="md" @click="createBackup">
                            Crear Respaldo
                        </BaseButton>
                    </div>
                </BaseCard>

                <BaseCard title="Logs" class="admin__card">
                    <div class="admin__card-content">
                        <p>Ver registros del sistema</p>
                        <BaseButton variant="alternative" size="md" @click="viewLogs">
                            Ver Logs
                        </BaseButton>
                    </div>
                </BaseCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const manageUsers = () => {
    console.log('Gestionando usuarios...')
}

const managePermissions = () => {
    console.log('Gestionando permisos...')
}

const createBackup = () => {
    console.log('Creando respaldo...')
}

const viewLogs = () => {
    console.log('Viendo logs...')
}
</script>

<style scoped>
.admin {
    max-width: 1400px;
    margin: 0 auto;
}

.admin__header {
    margin-bottom: var(--spacing-2xl);
}

.admin__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-primary);
}

.admin__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
}

.admin__card-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
}

.admin__card-content p {
    color: var(--color-text-secondary);
}
</style>
