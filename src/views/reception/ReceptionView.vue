<template>
    <div class="reception-view">
        <RequestForm :initial-data="initialData" @save="handleSave" @cancel="handleCancel" @print="handlePrint" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RequestForm from '@/components/forms/RequestForm.vue'

const initialData = ref({})

const handleSave = (data: any) => {
    console.log('Guardando solicitud:', data)
    // Aquí iría la lógica para guardar en la base de datos
}

const handleCancel = () => {
    console.log('Cancelando solicitud')
    // Aquí iría la lógica para cancelar
}

const handlePrint = () => {
    console.log('Imprimiendo solicitud')
    // Aquí iría la lógica para imprimir
}
</script>

<style scoped>
.reception-view {
    width: 100%;
    min-height: 100vh;
    background-color: var(--color-background);
}

/* Responsive */
@media (max-width: 768px) {
    .reception-view {
        padding: 0;
        margin: 0;
    }
}
</style>