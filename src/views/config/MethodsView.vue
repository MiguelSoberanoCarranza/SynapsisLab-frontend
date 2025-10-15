<template>
    <div class="methods-view">
        <!-- Header con título -->
        <div class="methods-header">
            <div class="header-title">
                <h1>Catálogo de Métodos</h1>
                <p class="header-subtitle">Configuración y gestión de métodos de análisis</p>
            </div>
        </div>

        <!-- Tabla de métodos guardados -->
        <BaseCard class="methods-table-card">
            <div class="table-header">
                <h3 class="table-title">
                    <BaseIcon name="method" class="table-icon" />
                    Métodos Configurados
                </h3>
                <div class="table-actions">
                    <BaseButton variant="outline" @click="handleRefresh" class="refresh-btn">
                        <BaseIcon name="refresh" class="btn-icon" />
                        Actualizar
                    </BaseButton>
                </div>
            </div>

            <div class="table-container">
                <table class="methods-table">
                    <thead>
                        <tr>
                            <th>Clave</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="method in methods" :key="method.id" class="table-row">
                            <td class="method-key">{{ method.key }}</td>
                            <td class="method-description">{{ method.description }}</td>
                            <td class="method-actions">
                                <BaseButton variant="outline" size="sm" @click="handleEdit(method)"
                                    class="action-btn-small">
                                    <BaseIcon name="edit" class="btn-icon-small" />
                                    Editar
                                </BaseButton>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Mensaje cuando no hay datos -->
                <div v-if="methods.length === 0" class="empty-state">
                    <BaseIcon name="method" class="empty-icon" />
                    <h4>No hay métodos configurados</h4>
                    <p>Crea tu primer método usando el formulario de abajo</p>
                </div>
            </div>
        </BaseCard>

        <!-- Formulario principal -->
        <BaseCard class="methods-form">
            <div class="form-header">
                <h3 class="form-title">
                    <BaseIcon name="document-plus" class="form-icon" />
                    {{ isEditing ? 'Editar Método' : 'Nuevo Método' }}
                </h3>
            </div>
            <form @submit.prevent="handleSave" class="form-container">

                <!-- Sección 1: Identificación -->
                <div class="form-section">
                    <h3 class="section-title">
                        <BaseIcon name="info" class="section-icon" />
                        Identificación del Método
                    </h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Clave <span class="required">*</span></label>
                            <BaseInput v-model="formData.key" placeholder="Ingrese la clave del método"
                                :error="errors.key" required />
                        </div>

                        <div class="form-group form-group--wide">
                            <label class="form-label">Descripción <span class="required">*</span></label>
                            <BaseInput v-model="formData.description" placeholder="Descripción detallada del método"
                                :error="errors.description" required />
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

interface Method {
    id: string
    key: number
    description: string
}

// Estado del formulario
const formData = reactive({
    id: null as string | null,
    key: '',
    description: ''
})

// Estado de la aplicación
const isEditing = ref(false)
const editingId = ref<string | null>(null)

// Lista de métodos (simulada)
const methods = ref<Method[]>([
    {
        id: '1',
        key: 145,
        description: 'Epifluorescencia'
    },
    {
        id: '2',
        key: 135,
        description: 'Espectrofotometría automatizada y microscopía'
    },
    {
        id: '3',
        key: 82,
        description: 'Espectrometría de masas en tandem (MS/MS), fluorometría e...'
    },
    {
        id: '4',
        key: 121,
        description: 'Inmunoelectroforesis.'
    },
    {
        id: '5',
        key: 91,
        description: 'ABSORCIÓN ATOMICA'
    },
    {
        id: '6',
        key: 7,
        description: 'Aglutinación'
    },
    {
        id: '7',
        key: 140,
        description: 'AGLUTINACIÓN DE PLAQUETAS'
    },
    {
        id: '8',
        key: 109,
        description: 'AGLUTINACIÓN EN LATEX (LA)'
    },
    {
        id: '9',
        key: 43,
        description: 'Aislamiento en medios bacterianos selectivos'
    },
    {
        id: '10',
        key: 30,
        description: 'Automatizado urisys 1100'
    },
    {
        id: '11',
        key: 84,
        description: 'BIOSENSORES.'
    },
    {
        id: '12',
        key: 80,
        description: 'Birrefrigencia'
    },
    {
        id: '13',
        key: 73,
        description: 'Calculada'
    },
    {
        id: '14',
        key: 41,
        description: 'cdc DTT'
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

    console.log('Nuevo método')
}

const handleSave = () => {
    // Validación básica
    errors.key = !formData.key ? 'La clave es requerida' : ''
    errors.description = !formData.description ? 'La descripción es requerida' : ''

    if (!formData.key || !formData.description) {
        return
    }

    if (isEditing.value) {
        // Actualizar método existente
        const index = methods.value.findIndex(m => m.id === editingId.value)
        if (index !== -1) {
            methods.value[index] = { ...formData, id: editingId.value }
        }
        console.log('Método actualizado:', formData)
    } else {
        // Verificar si la clave ya existe
        if (methods.value.some(method => method.key === parseInt(formData.key))) {
            alert('Ya existe un método con esta clave')
            return
        }

        // Crear nuevo método
        const newId = Date.now().toString()
        const newMethod = { ...formData, id: newId }
        methods.value.push(newMethod)
        console.log('Nuevo método creado:', newMethod)
    }

    // Limpiar formulario después de guardar
    handleNew()
}

const handleCancel = () => {
    handleNew()
}

const handleEdit = (method: Method) => {
    // Cargar datos para edición
    formData.id = method.id
    formData.key = method.key.toString()
    formData.description = method.description

    isEditing.value = true
    editingId.value = method.id

    console.log('Editar método:', method)
}

const handleRefresh = () => {
    console.log('Actualizando lista de métodos')
    // Aquí iría la lógica para recargar desde el servidor
}
</script>

<style scoped>
.methods-view {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

/* Header */
.methods-header {
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
.methods-form {
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

.form-label {
    font-weight: 500;
    color: var(--color-text-primary);
    font-size: 0.875rem;
}

.required {
    color: var(--color-alternative);
    font-weight: 600;
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

/* Tabla de métodos */
.methods-table-card {
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

.methods-table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--color-surface);
}

.methods-table th {
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-weight: 600;
    text-align: left;
    padding: var(--spacing-sm);
    border-bottom: 2px solid var(--color-border);
    font-size: 0.875rem;
}

.methods-table td {
    padding: var(--spacing-sm);
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text-primary);
    font-size: 0.875rem;
}

.table-row:hover {
    background-color: var(--color-background);
}

.method-key {
    font-weight: 600;
    color: var(--color-primary);
}

.method-description {
    font-weight: 500;
}

.method-actions {
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
    .methods-header {
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