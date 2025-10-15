<template>
    <div class="containers-view">
        <!-- Header con título -->
        <div class="containers-header">
            <div class="header-title">
                <h1>Catálogo de Recipientes</h1>
                <p class="header-subtitle">Configuración y gestión de recipientes y contenedores</p>
            </div>
        </div>

        <!-- Tabla de recipientes guardados -->
        <BaseCard class="containers-table-card">
            <div class="table-header">
                <h3 class="table-title">
                    <BaseIcon name="container" class="table-icon" />
                    Recipientes Configurados
                </h3>
                <div class="table-actions">
                    <BaseButton variant="outline" @click="handleRefresh" class="refresh-btn">
                        <BaseIcon name="refresh" class="btn-icon" />
                        Actualizar
                    </BaseButton>
                </div>
            </div>

            <div class="table-container">
                <table class="containers-table">
                    <thead>
                        <tr>
                            <th>Clave</th>
                            <th>Descripción</th>
                            <th>Marca</th>
                            <th>Capacidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="container in containers" :key="container.id" class="table-row">
                            <td class="container-key">{{ container.key }}</td>
                            <td class="container-description">{{ container.description }}</td>
                            <td class="container-brand">{{ container.brand || '-' }}</td>
                            <td class="container-capacity">{{ container.capacity || '-' }}</td>
                            <td class="container-actions">
                                <BaseButton variant="outline" size="sm" @click="handleEdit(container)"
                                    class="action-btn-small">
                                    <BaseIcon name="edit" class="btn-icon-small" />
                                    Editar
                                </BaseButton>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Mensaje cuando no hay datos -->
                <div v-if="containers.length === 0" class="empty-state">
                    <BaseIcon name="container" class="empty-icon" />
                    <h4>No hay recipientes configurados</h4>
                    <p>Crea tu primer recipiente usando el formulario de abajo</p>
                </div>
            </div>
        </BaseCard>

        <!-- Formulario principal -->
        <BaseCard class="containers-form">
            <div class="form-header">
                <h3 class="form-title">
                    <BaseIcon name="document-plus" class="form-icon" />
                    {{ isEditing ? 'Editar Recipiente' : 'Nuevo Recipiente' }}
                </h3>
            </div>
            <form @submit.prevent="handleSave" class="form-container">

                <!-- Sección 1: Identificación Básica -->
                <div class="form-section">
                    <h3 class="section-title">
                        <BaseIcon name="info" class="section-icon" />
                        Identificación Básica
                    </h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Clave <span class="required">*</span></label>
                            <BaseInput v-model="formData.key" placeholder="Ingrese la clave del recipiente"
                                :error="errors.key" required />
                        </div>

                        <div class="form-group form-group--wide">
                            <label class="form-label">Descripción <span class="required">*</span></label>
                            <BaseInput v-model="formData.description" placeholder="Descripción detallada del recipiente"
                                :error="errors.description" required />
                        </div>

                        <div class="form-group">
                            <label class="form-label">Marca</label>
                            <BaseInput v-model="formData.brand" placeholder="Marca del recipiente" />
                        </div>

                        <div class="form-group">
                            <label class="form-label">Alias</label>
                            <BaseInput v-model="formData.alias" placeholder="Alias del recipiente" />
                        </div>
                    </div>
                </div>

                <!-- Sección 2: Especificaciones -->
                <div class="form-section">
                    <h3 class="section-title">
                        <BaseIcon name="settings" class="section-icon" />
                        Especificaciones del Recipiente
                    </h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Unidad Empaque</label>
                            <BaseInput v-model="formData.packagingUnit" placeholder="Unidad de empaque" />
                        </div>

                        <div class="form-group">
                            <label class="form-label">Presentación</label>
                            <BaseInput v-model="formData.presentation" placeholder="Presentación" />
                        </div>

                        <div class="form-group">
                            <label class="form-label">Capacidad</label>
                            <BaseInput v-model="formData.capacity" placeholder="Capacidad" />
                        </div>

                        <div class="form-group">
                            <label class="form-label">Unidad Medida</label>
                            <BaseInput v-model="formData.measurementUnit" placeholder="Unidad de medida" />
                        </div>

                        <div class="form-group">
                            <label class="form-label">No de copias</label>
                            <BaseInput v-model="formData.copies" placeholder="Número de copias" type="number" />
                        </div>
                    </div>
                </div>

                <!-- Sección 3: Información Adicional -->
                <div class="form-section">
                    <h3 class="section-title">
                        <BaseIcon name="document-text" class="section-icon" />
                        Información Adicional
                    </h3>
                    <div class="form-grid">
                        <div class="form-group form-group--full">
                            <label class="form-label">Observaciones</label>
                            <textarea v-model="formData.observations" class="form-textarea"
                                placeholder="Observaciones adicionales sobre el recipiente..." rows="3"></textarea>
                        </div>
                    </div>
                </div>

                <!-- Botones de acción al final del formulario -->
                <div class="form-actions">
                    <BaseButton variant="secondary" @click="handleNew" class="action-btn">
                        <BaseIcon name="document-plus" class="btn-icon" />
                        Nuevo
                    </BaseButton>
                    <BaseButton variant="primary" @click="handleSave" class="action-btn">
                        <BaseIcon name="save" class="btn-icon" />
                        {{ isEditing ? 'Actualizar' : 'Guardar' }}
                    </BaseButton>
                    <BaseButton variant="outline" @click="handleCancel" class="action-btn" v-if="isEditing">
                        <BaseIcon name="x" class="btn-icon" />
                        Cancelar
                    </BaseButton>
                </div>

            </form>
        </BaseCard>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

interface Container {
    id: string
    key: number
    description: string
    brand?: string
    packagingUnit?: string
    presentation?: string
    capacity?: string
    measurementUnit?: string
    observations?: string
    copies?: number
    alias?: string
}

// Estado del formulario
const formData = reactive({
    id: null as string | null,
    key: '',
    description: '',
    brand: '',
    packagingUnit: '',
    presentation: '',
    capacity: '',
    measurementUnit: '',
    observations: '',
    copies: '',
    alias: ''
})

// Estado de la aplicación
const isEditing = ref(false)
const editingId = ref<string | null>(null)

// Lista de recipientes (simulada)
const containers = ref<Container[]>([
    {
        id: '1',
        key: 10,
        description: 'FRASCO OBSCURO CON 5 G DE BICARBONATODE SODIO'
    },
    {
        id: '2',
        key: 64,
        description: 'Agua potable'
    },
    {
        id: '3',
        key: 80,
        description: 'Base Liquida'
    },
    {
        id: '4',
        key: 18,
        description: 'Bolsa estéril'
    },
    {
        id: '5',
        key: 17,
        description: 'Contenedor'
    },
    {
        id: '6',
        key: 33,
        description: 'CONTENEDOR OBSCURO'
    },
    {
        id: '7',
        key: 4,
        description: 'FRASCO'
    },
    {
        id: '8',
        key: 75,
        description: 'FRASCO 2DA MUESTRA'
    },
    {
        id: '9',
        key: 76,
        description: 'FRASCO 3ERA MUESTRA'
    },
    {
        id: '10',
        key: 22,
        description: 'Frasco estéril'
    },
    {
        id: '11',
        key: 27,
        description: 'Frasco o laminilla'
    },
    {
        id: '12',
        key: 6,
        description: 'Hisopo'
    },
    {
        id: '13',
        key: 38,
        description: 'Jeringa'
    },
    {
        id: '14',
        key: 71,
        description: 'KIT ESPECIAL'
    },
    {
        id: '15',
        key: 28,
        description: 'Laminilla'
    },
    {
        id: '16',
        key: 40,
        description: 'MEDIO'
    },
    {
        id: '17',
        key: 19,
        description: 'Medio de cultivo'
    },
    {
        id: '18',
        key: 1,
        description: 'NINGUNO'
    }
])

// Errores de validación
const errors = reactive({
    key: '',
    description: ''
})

// Métodos de manejo
const handleNew = () => {
    // Limpiar formulario
    Object.keys(formData).forEach(key => {
        if (key === 'id') {
            formData[key] = null
        } else {
            formData[key] = ''
        }
    })

    // Limpiar errores
    Object.keys(errors).forEach(key => {
        errors[key] = ''
    })

    // Resetear estado
    isEditing.value = false
    editingId.value = null

    console.log('Nuevo recipiente')
}

const handleSave = () => {
    // Validación básica
    errors.key = !formData.key ? 'La clave es requerida' : ''
    errors.description = !formData.description ? 'La descripción es requerida' : ''

    if (!formData.key || !formData.description) {
        return
    }

    if (isEditing.value) {
        // Actualizar recipiente existente
        const index = containers.value.findIndex(c => c.id === editingId.value)
        if (index !== -1) {
            containers.value[index] = { ...formData, id: editingId.value }
        }
        console.log('Recipiente actualizado:', formData)
    } else {
        // Verificar si la clave ya existe
        if (containers.value.some(container => container.key === parseInt(formData.key))) {
            alert('Ya existe un recipiente con esta clave')
            return
        }

        // Crear nuevo recipiente
        const newId = Date.now().toString()
        const newContainer = { ...formData, id: newId }
        containers.value.push(newContainer)
        console.log('Nuevo recipiente creado:', newContainer)
    }

    // Limpiar formulario después de guardar
    handleNew()
}

const handleCancel = () => {
    handleNew()
}

const handleEdit = (container: Container) => {
    // Cargar datos para edición
    formData.id = container.id
    formData.key = container.key.toString()
    formData.description = container.description
    formData.brand = container.brand || ''
    formData.packagingUnit = container.packagingUnit || ''
    formData.presentation = container.presentation || ''
    formData.capacity = container.capacity || ''
    formData.measurementUnit = container.measurementUnit || ''
    formData.observations = container.observations || ''
    formData.copies = container.copies?.toString() || ''
    formData.alias = container.alias || ''

    isEditing.value = true
    editingId.value = container.id

    console.log('Editar recipiente:', container)
}

const handleRefresh = () => {
    console.log('Actualizando lista de recipientes')
    // Aquí iría la lógica para recargar desde el servidor
}
</script>

<style scoped>
.containers-view {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

/* Header */
.containers-header {
    margin-bottom: var(--spacing-xl);
}

.header-title h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-xs) 0;
}

.header-subtitle {
    color: var(--color-text-secondary);
    margin: 0;
    font-size: 1rem;
}

/* Formulario */
.containers-form {
    margin-top: var(--spacing-xl);
    padding: var(--spacing-xl);
}

.form-header {
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--color-border);
}

.form-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
}

.form-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--color-primary);
}

.form-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}

.form-section {
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-lg);
    background-color: var(--color-surface);
}

.section-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-lg) 0;
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--color-border);
}

.section-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--color-primary);
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.form-group--wide {
    grid-column: span 2;
}

.form-group--full {
    grid-column: 1 / -1;
}

.form-label {
    font-weight: 500;
    color: var(--color-text-primary);
    font-size: 0.875rem;
}

.required {
    color: var(--color-alternative);
    font-weight: 600;
}

/* Textarea */
.form-textarea {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
    min-height: 100px;
    transition: border-color 0.2s ease, background-color 0.2s ease;
}

.form-textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.form-textarea::placeholder {
    color: var(--color-text-secondary);
}

/* Botones de acción del formulario */
.form-actions {
    display: flex;
    gap: var(--spacing-sm);
    justify-content: flex-end;
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--color-border);
    margin-top: var(--spacing-xl);
}

.action-btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    min-width: 120px;
}

.btn-icon {
    width: 1.25rem;
    height: 1.25rem;
}

/* Tabla de recipientes */
.containers-table-card {
    padding: var(--spacing-xl);
}

.table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--color-border);
}

.table-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
}

.table-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--color-primary);
}

.table-actions {
    display: flex;
    gap: var(--spacing-sm);
}

.refresh-btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.table-container {
    overflow-x: auto;
}

.containers-table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--color-surface);
}

.containers-table th {
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-weight: 600;
    text-align: left;
    padding: var(--spacing-sm);
    border-bottom: 2px solid var(--color-border);
    font-size: 0.875rem;
}

.containers-table td {
    padding: var(--spacing-sm);
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text-primary);
    font-size: 0.875rem;
}

.table-row:hover {
    background-color: var(--color-background);
}

.container-key {
    font-weight: 600;
    color: var(--color-primary);
}

.container-description {
    font-weight: 500;
}

.container-brand {
    color: var(--color-text-secondary);
}

.container-capacity {
    color: var(--color-text-secondary);
}

.container-actions {
    display: flex;
    gap: var(--spacing-xs);
}

.action-btn-small {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.75rem;
}

.btn-icon-small {
    width: 1rem;
    height: 1rem;
}

/* Estado vacío */
.empty-state {
    text-align: center;
    padding: var(--spacing-2xl) 0;
    color: var(--color-text-secondary);
}

.empty-icon {
    width: 3rem;
    height: 3rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
}

.empty-state h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-sm) 0;
}

.empty-state p {
    margin: 0;
    font-size: 0.875rem;
}

/* Responsive */
@media (max-width: 768px) {
    .containers-header {
        flex-direction: column;
        align-items: stretch;
    }

    .header-actions {
        justify-content: stretch;
    }

    .action-btn {
        flex: 1;
        justify-content: center;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }

    .form-group--wide {
        grid-column: span 1;
    }
}
</style>