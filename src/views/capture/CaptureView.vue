<template>
    <div class="capture">
        <div class="capture__header">
            <h1 class="capture__title">Captura de Resultados</h1>
        </div>

        <div class="capture__content">
            <BaseCard title="Ingreso de Resultados" class="capture__card">
                <div class="capture__form">
                    <div class="capture__field">
                        <label class="reception__label">ID de Muestra</label>
                        <BaseInput v-model="sampleId" placeholder="Buscar muestra..." />
                    </div>

                    <div class="capture__field">
                        <label class="capture__label">Resultado</label>
                        <textarea v-model="result" class="capture__textarea"
                            placeholder="Ingrese los resultados..."></textarea>
                    </div>

                    <BaseButton variant="primary" size="lg" @click="saveResult">
                        Guardar Resultado
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
const result = ref('')

const saveResult = () => {
    console.log('Guardando resultado:', { sampleId: sampleId.value, result: result.value })
}
</script>

<style scoped>
.capture {
    max-width: 1400px;
    margin: 0 auto;
}

.capture__header {
    margin-bottom: var(--spacing-2xl);
}

.capture__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-primary);
}

.capture__form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.capture__field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.capture__label {
    font-weight: 500;
    color: var(--color-text-primary);
}

.capture__textarea {
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    background-color: var(--color-background);
    min-height: 120px;
    resize: vertical;
}
</style>
