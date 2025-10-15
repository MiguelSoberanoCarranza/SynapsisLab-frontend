<template>
    <div class="samples-export">
        <div class="samples-export__header">
            <h1 class="samples-export__title">Exportar Muestras</h1>
        </div>

        <div class="samples-export__content">
            <BaseCard title="Configuración de Exportación" class="samples-export__card">
                <div class="samples-export__form">
                    <div class="samples-export__field">
                        <label class="samples-export__label">Formato de exportación</label>
                        <select class="samples-export__select">
                            <option value="excel">Excel (.xlsx)</option>
                            <option value="csv">CSV (.csv)</option>
                            <option value="pdf">PDF (.pdf)</option>
                        </select>
                    </div>

                    <div class="samples-export__field">
                        <label class="samples-export__label">Rango de fechas</label>
                        <div class="samples-export__date-range">
                            <input type="date" class="samples-export__date-input" />
                            <span>hasta</span>
                            <input type="date" class="samples-export__date-input" />
                        </div>
                    </div>

                    <BaseButton variant="primary" size="lg" @click="exportSamples">
                        Exportar Muestras
                    </BaseButton>
                </div>
            </BaseCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const exportSamples = () => {
    // Lógica de exportación
    console.log('Exportando muestras...')
}
</script>

<style scoped>
.samples-export {
    max-width: 1400px;
    margin: 0 auto;
}

.samples-export__header {
    margin-bottom: var(--spacing-2xl);
}

.samples-export__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-primary);
}

.samples-export__form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.samples-export__field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.samples-export__label {
    font-weight: 500;
    color: var(--color-text-primary);
}

.samples-export__select {
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    background-color: var(--color-background);
}

.samples-export__date-range {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.samples-export__date-input {
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    background-color: var(--color-background);
}
</style>
