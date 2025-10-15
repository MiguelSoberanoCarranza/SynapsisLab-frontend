<template>
    <div class="reception">
        <div class="reception__header">
            <h1 class="reception__title">Recepción de Muestras</h1>
        </div>

        <div class="reception__content">
            <BaseCard title="Registro de Muestras" class="reception__card">
                <div class="reception__form">
                    <div class="reception__field">
                        <label class="reception__label">ID de Muestra</label>
                        <BaseInput v-model="sampleId" placeholder="Ingrese ID de muestra" />
                    </div>

                    <div class="reception__field">
                        <label class="reception__label">Tipo de Muestra</label>
                        <select v-model="sampleType" class="reception__select">
                            <option value="">Seleccionar tipo</option>
                            <option value="sangre">Sangre</option>
                            <option value="orina">Orina</option>
                            <option value="heces">Heces</option>
                            <option value="saliva">Saliva</option>
                        </select>
                    </div>

                    <BaseButton variant="primary" size="lg" @click="registerSample">
                        Registrar Muestra
                    </BaseButton>
                </div>
            </BaseCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

const sampleId = ref('')
const sampleType = ref('')

const registerSample = () => {
    console.log('Registrando muestra:', { sampleId: sampleId.value, sampleType: sampleType.value })
}
</script>

<style scoped>
.reception {
    max-width: 1400px;
    margin: 0 auto;
}

.reception__header {
    margin-bottom: var(--spacing-2xl);
}

.reception__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-primary);
}

.reception__form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.reception__field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.reception__label {
    font-weight: 500;
    color: var(--color-text-primary);
}

.reception__select {
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    background-color: var(--color-background);
}
</style>
