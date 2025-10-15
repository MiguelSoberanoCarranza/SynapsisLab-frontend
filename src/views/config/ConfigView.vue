<template>
    <div class="config">
        <div class="config__header">
            <h1 class="config__title">Configuración del Sistema</h1>
        </div>

        <div class="config__content">
            <BaseCard title="Configuraciones Generales" class="config__card">
                <div class="config__sections">
                    <div class="config__section">
                        <h3>Configuración de Laboratorio</h3>
                        <div class="config__field">
                            <label>Nombre del Laboratorio</label>
                            <BaseInput v-model="labName" placeholder="Nombre del laboratorio" />
                        </div>
                        <div class="config__field">
                            <label>Dirección</label>
                            <BaseInput v-model="labAddress" placeholder="Dirección del laboratorio" />
                        </div>
                    </div>

                    <div class="config__section">
                        <h3>Configuración de Reportes</h3>
                        <div class="config__field">
                            <label>Formato por defecto</label>
                            <select v-model="defaultFormat" class="config__select">
                                <option value="pdf">PDF</option>
                                <option value="excel">Excel</option>
                                <option value="csv">CSV</option>
                            </select>
                        </div>
                    </div>
                </div>

                <BaseButton variant="primary" size="lg" @click="saveConfig">
                    Guardar Configuración
                </BaseButton>
            </BaseCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

const labName = ref('')
const labAddress = ref('')
const defaultFormat = ref('pdf')

const saveConfig = () => {
    console.log('Guardando configuración...')
}
</script>

<style scoped>
.config {
    max-width: 1400px;
    margin: 0 auto;
}

.config__header {
    margin-bottom: var(--spacing-2xl);
}

.config__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-primary);
}

.config__sections {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
}

.config__section {
    padding: var(--spacing-lg);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
}

.config__section h3 {
    margin-bottom: var(--spacing-lg);
    color: var(--color-text-primary);
}

.config__field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
}

.config__field label {
    font-weight: 500;
    color: var(--color-text-primary);
}

.config__select {
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    background-color: var(--color-background);
}
</style>
