<template>
    <div class="areas-view">
        <!-- Header con título -->
        <div class="areas-header">
            <div class="header-title">
                <h1>Catálogo de Área</h1>
                <p class="header-subtitle">Configuración y gestión de áreas del laboratorio</p>
            </div>
        </div>

        <!-- Tabla de áreas guardadas -->
        <BaseCard class="areas-table-card">
            <div class="table-header">
                <h3 class="table-title">
                    <BaseIcon name="area" class="table-icon" />
                    Áreas Configuradas
                </h3>
                <div class="table-actions">
                    <BaseButton variant="outline" @click="handleRefresh" class="refresh-btn">
                        <BaseIcon name="refresh" class="btn-icon" />
                        Actualizar
                    </BaseButton>
                </div>
            </div>

            <div class="table-container">
                <table class="areas-table">
                    <thead>
                        <tr>
                            <th>Clave</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="area in areas" :key="area.id" class="table-row">
                            <td class="area-key">{{ area.key }}</td>
                            <td class="area-description">{{ area.description }}</td>
                            <td class="area-status">
                                <span :class="['status-badge', area.disabled ? 'status-disabled' : 'status-active']">
                                    {{ area.disabled ? 'Deshabilitado' : 'Activo' }}
                                </span>
                            </td>
                            <td class="area-actions">
                                <BaseButton variant="outline" size="sm" @click="handleEdit(area)"
                                    class="action-btn-small">
                                    <BaseIcon name="edit" class="btn-icon-small" />
                                    Editar
                                </BaseButton>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Mensaje cuando no hay datos -->
                <div v-if="areas.length === 0" class="empty-state">
                    <BaseIcon name="area" class="empty-icon" />
                    <h4>No hay áreas configuradas</h4>
                    <p>Crea tu primera área usando el formulario de abajo</p>
                </div>
            </div>
        </BaseCard>

        <!-- Formulario principal -->
        <BaseCard class="areas-form">
            <div class="form-header">
                <h3 class="form-title">
                    <BaseIcon name="document-plus" class="form-icon" />
                    {{ isEditing ? 'Editar Área' : 'Nueva Área' }}
                </h3>
            </div>
            <form @submit.prevent="handleSave" class="form-container">

                <!-- Sección 1: Identificación -->
                <div class="form-section">
                    <h3 class="section-title">
                        <BaseIcon name="info" class="section-icon" />
                        Identificación del Área
                    </h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Clave <span class="required">*</span></label>
                            <BaseInput v-model="formData.key" placeholder="Ingrese la clave del área"
                                :error="errors.key" required />
                        </div>

                        <div class="form-group form-group--wide">
                            <label class="form-label">Descripción <span class="required">*</span></label>
                            <BaseInput v-model="formData.description" placeholder="Descripción detallada del área"
                                :error="errors.description" required />
                        </div>

                        <div class="form-group form-group--full">
                            <label class="form-label">Observaciones</label>
                            <textarea v-model="formData.observations" class="form-textarea"
                                placeholder="Observaciones adicionales sobre el área..." rows="3"></textarea>
                        </div>
                    </div>
                </div>

                <!-- Sección 2: Estado -->
                <div class="form-section">
                    <h3 class="section-title">
                        <BaseIcon name="settings" class="section-icon" />
                        Estado del Área
                    </h3>
                    <div class="form-grid">
                        <div class="form-group form-group--wide">
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" v-model="formData.disabled" class="checkbox-input" />
                                    <span class="checkbox-custom"></span>
                                    Deshabilitar Área
                                </label>
                            </div>
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

interface Area {
    id: string
    key: number
    description: string
    observations?: string
    disabled: boolean
}

// Estado del formulario
const formData = reactive({
    id: null as string | null,
    key: '',
    description: '',
    observations: '',
    disabled: false
})

// Estado de la aplicación
const isEditing = ref(false)
const editingId = ref<string | null>(null)

// Lista de áreas (simulada)
const areas = ref<Area[]>([
    {
        id: '1',
        key: 43,
        description: 'INMUNOLOGÍA ESPECIAL Y QUIMICA CLINICA',
        disabled: false
    },
    {
        id: '2',
        key: 12,
        description: 'ALERGIAS',
        disabled: false
    },
    {
        id: '3',
        key: 29,
        description: 'ANTIDOPING',
        disabled: false
    },
    {
        id: '4',
        key: 37,
        description: 'AUDIOMETRIAS',
        disabled: true
    },
    {
        id: '5',
        key: 14,
        description: 'BIOLOGÍA MOLECULAR',
        disabled: false
    },
    {
        id: '6',
        key: 32,
        description: 'CHECK UP BÁSICO',
        disabled: false
    },
    {
        id: '7',
        key: 42,
        description: 'Check up metabólico y Nutricional',
        disabled: false
    },
    {
        id: '8',
        key: 38,
        description: 'COAGULACIÓN',
        disabled: false
    },
    {
        id: '9',
        key: 33,
        description: 'CONSULTAS',
        disabled: true
    },
    {
        id: '10',
        key: 4,
        description: 'CULTIVO',
        disabled: false
    },
    {
        id: '11',
        key: 35,
        description: 'DEPOSITOS',
        disabled: true
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
        } else if (typeof formData[key] === 'boolean') {
            formData[key] = false
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

    console.log('Nueva área')
}

const handleSave = () => {
    // Validación básica
    errors.key = !formData.key ? 'La clave es requerida' : ''
    errors.description = !formData.description ? 'La descripción es requerida' : ''

    if (!formData.key || !formData.description) {
        return
    }

    if (isEditing.value) {
        // Actualizar área existente
        const index = areas.value.findIndex(a => a.id === editingId.value)
        if (index !== -1) {
            areas.value[index] = { ...formData, id: editingId.value }
        }
        console.log('Área actualizada:', formData)
    } else {
        // Verificar si la clave ya existe
        if (areas.value.some(area => area.key === parseInt(formData.key))) {
            alert('Ya existe un área con esta clave')
            return
        }

        // Crear nueva área
        const newId = Date.now().toString()
        const newArea = { ...formData, id: newId }
        areas.value.push(newArea)
        console.log('Nueva área creada:', newArea)
    }

    // Limpiar formulario después de guardar
    handleNew()
}

const handleCancel = () => {
    handleNew()
}

const handleEdit = (area: Area) => {
    // Cargar datos para edición
    formData.id = area.id
    formData.key = area.key.toString()
    formData.description = area.description
    formData.observations = area.observations || ''
    formData.disabled = area.disabled

    isEditing.value = true
    editingId.value = area.id

    console.log('Editar área:', area)
}

const handleRefresh = () => {
    console.log('Actualizando lista de áreas')
    // Aquí iría la lógica para recargar desde el servidor
}
</script>

<style scoped>
.areas-view {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

/* Header */
.areas-header {
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
.areas-form {
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

.form-group--checkbox {
    justify-content: center;
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

/* Checkboxes */
.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    cursor: pointer;
    font-weight: 500;
    color: var(--color-text-primary);
}

.checkbox-input {
    display: none;
}

.checkbox-custom {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-background);
    position: relative;
    transition: all 0.2s ease;
}

.checkbox-input:checked+.checkbox-custom {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
}

.checkbox-input:checked+.checkbox-custom::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 0.875rem;
    font-weight: bold;
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

/* Tabla de áreas */
.areas-table-card {
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

.areas-table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--color-surface);
}

.areas-table th {
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-weight: 600;
    text-align: left;
    padding: var(--spacing-sm);
    border-bottom: 2px solid var(--color-border);
    font-size: 0.875rem;
}

.areas-table td {
    padding: var(--spacing-sm);
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text-primary);
    font-size: 0.875rem;
}

.table-row:hover {
    background-color: var(--color-background);
}

.area-key {
    font-weight: 600;
    color: var(--color-primary);
}

.area-description {
    font-weight: 500;
}

.status-badge {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius-sm);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
}

.status-active {
    background-color: rgba(16, 185, 129, 0.1);
    color: var(--color-alternative);
}

.status-disabled {
    background-color: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}

.area-actions {
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
    .areas-header {
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