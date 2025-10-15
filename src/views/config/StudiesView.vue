<template>
    <div class="studies-view">
        <!-- Header con título -->
        <div class="studies-header">
            <div class="header-title">
                <h1>Estudios de Laboratorio</h1>
                <p class="header-subtitle">Configuración y gestión de estudios</p>
            </div>
        </div>

        <!-- Tabla de estudios guardados -->
        <BaseCard class="studies-table-card">
            <div class="table-header">
                <h3 class="table-title">
                    <BaseIcon name="study" class="table-icon" />
                    Estudios Configurados
                </h3>
                <div class="table-actions">
                    <BaseButton variant="outline" @click="handleRefresh" class="refresh-btn">
                        <BaseIcon name="refresh" class="btn-icon" />
                        Actualizar
                    </BaseButton>
                </div>
            </div>

            <div class="table-container">
                <table class="studies-table">
                    <thead>
                        <tr>
                            <th>Clave</th>
                            <th>Descripción</th>
                            <th>Área</th>
                            <th>Tipo</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="study in studies" :key="study.id" class="table-row">
                            <td class="study-key">{{ study.key }}</td>
                            <td class="study-description">{{ study.description }}</td>
                            <td class="study-area">{{ study.area || 'No asignado' }}</td>
                            <td class="study-type">{{ study.studyType }}</td>
                            <td class="study-price">${{ study.price || '0.00' }}</td>
                            <td class="study-status">
                                <span :class="['status-badge', study.disabled ? 'status-disabled' : 'status-active']">
                                    {{ study.disabled ? 'Deshabilitado' : 'Activo' }}
                                </span>
                            </td>
                            <td class="study-actions">
                                <BaseButton variant="outline" size="sm" @click="handleEdit(study)"
                                    class="action-btn-small">
                                    <BaseIcon name="edit" class="btn-icon-small" />
                                    Editar
                                </BaseButton>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Mensaje cuando no hay datos -->
                <div v-if="studies.length === 0" class="empty-state">
                    <BaseIcon name="study" class="empty-icon" />
                    <h4>No hay estudios configurados</h4>
                    <p>Crea tu primer estudio usando el formulario de abajo</p>
                </div>
            </div>
        </BaseCard>

        <!-- Formulario principal -->
        <BaseCard class="studies-form">
            <div class="form-header">
                <h3 class="form-title">
                    <BaseIcon name="document-plus" class="form-icon" />
                    {{ isEditing ? 'Editar Estudio' : 'Nuevo Estudio' }}
                </h3>
            </div>
            <form @submit.prevent="handleSave" class="form-container">

                <!-- Sección 1: Identificación y Precios -->
                <div class="form-section">
                    <h3 class="section-title">
                        <BaseIcon name="info" class="section-icon" />
                        Identificación y Precios
                    </h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Clave <span class="required">*</span></label>
                            <BaseInput v-model="formData.key" placeholder="Ingrese la clave del estudio"
                                :error="errors.key" required />
                        </div>

                        <div class="form-group form-group--wide">
                            <label class="form-label">Descripción <span class="required">*</span></label>
                            <BaseInput v-model="formData.description" placeholder="Descripción detallada del estudio"
                                :error="errors.description" required />
                        </div>

                        <div class="form-group">
                            <label class="form-label">Precio (Informativo o maquila)</label>
                            <BaseInput v-model="formData.price" type="number" step="0.01" placeholder="0.00" />
                        </div>

                        <div class="form-group">
                            <label class="form-label">Alias</label>
                            <BaseInput v-model="formData.alias" placeholder="Alias del estudio" />
                        </div>

                        <div class="form-group form-group--checkbox">
                            <label class="checkbox-label">
                                <input type="checkbox" v-model="formData.referred" class="checkbox-input" />
                                <span class="checkbox-custom"></span>
                                Referido
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Sección 2: Categorización y Método -->
                <div class="form-section">
                    <h3 class="section-title">
                        <BaseIcon name="category" class="section-icon" />
                        Categorización y Método
                    </h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Área / Sección</label>
                            <select v-model="formData.area" class="form-select">
                                <option value="">NO ASIGNADO</option>
                                <option value="bioquimica">Bioquímica</option>
                                <option value="hematologia">Hematología</option>
                                <option value="microbiologia">Microbiología</option>
                                <option value="inmunologia">Inmunología</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Tipo Muestra</label>
                            <select v-model="formData.sampleType" class="form-select">
                                <option value="">NO ASIGNADO</option>
                                <option value="sangre">Sangre</option>
                                <option value="orina">Orina</option>
                                <option value="heces">Heces</option>
                                <option value="esputo">Esputo</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Tubo / Contenedor</label>
                            <select v-model="formData.container" class="form-select">
                                <option value="">No asignado</option>
                                <option value="tubo-rojo">Tubo Rojo</option>
                                <option value="tubo-azul">Tubo Azul</option>
                                <option value="tubo-verde">Tubo Verde</option>
                                <option value="frasco-orina">Frasco Orina</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Método</label>
                            <select v-model="formData.method" class="form-select">
                                <option value="">NO ASIGNADO</option>
                                <option value="quimica-clinica">Química Clínica</option>
                                <option value="inmunoensayo">Inmunoensayo</option>
                                <option value="microscopia">Microscopía</option>
                                <option value="cultivo">Cultivo</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Tipo de Estudio</label>
                            <select v-model="formData.studyType" class="form-select">
                                <option value="normal">ESTUDIO NORMAL</option>
                                <option value="urgente">ESTUDIO URGENTE</option>
                                <option value="estadistico">ESTUDIO ESTADÍSTICO</option>
                                <option value="control">ESTUDIO CONTROL</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Sección 3: Tiempos y Volúmenes -->
                <div class="form-section">
                    <h3 class="section-title">
                        <BaseIcon name="clock" class="section-icon" />
                        Tiempos y Volúmenes
                    </h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Días Proceso</label>
                            <BaseInput v-model.number="formData.processDays" type="number" min="0" placeholder="0" />
                        </div>

                        <div class="form-group">
                            <label class="form-label">Días Urgente</label>
                            <BaseInput v-model.number="formData.urgentDays" type="number" min="0" placeholder="0" />
                        </div>

                        <div class="form-group">
                            <label class="form-label">Tipo Estudio</label>
                            <select v-model="formData.studyCategory" class="form-select">
                                <option value="biologia-molecular">BIOLOGÍA MOLECULAR</option>
                                <option value="quimica-clinica">QUÍMICA CLÍNICA</option>
                                <option value="hematologia">HEMATOLOGÍA</option>
                                <option value="microbiologia">MICROBIOLOGÍA</option>
                                <option value="inmunologia">INMUNOLOGÍA</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Volumen</label>
                            <BaseInput v-model.number="formData.volume" type="number" min="1" placeholder="1" />
                        </div>

                        <div class="form-group">
                            <label class="form-label">Contabilizar</label>
                            <BaseInput v-model.number="formData.count" type="number" min="0" placeholder="0" />
                        </div>

                        <div class="form-group">
                            <BaseButton variant="outline" @click="handleWarehouseItems" class="warehouse-btn">
                                <BaseIcon name="warehouse" class="btn-icon" />
                                Artículos Almacén
                            </BaseButton>
                        </div>
                    </div>
                </div>

                <!-- Sección 4: Opciones Adicionales -->
                <div class="form-section">
                    <h3 class="section-title">
                        <BaseIcon name="settings" class="section-icon" />
                        Opciones Adicionales
                    </h3>
                    <div class="form-grid">
                        <div class="form-group form-group--wide">
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" v-model="formData.massiveUpload" class="checkbox-input" />
                                    <span class="checkbox-custom"></span>
                                    Carga Masiva
                                </label>

                                <label class="checkbox-label">
                                    <input type="checkbox" v-model="formData.disabled" class="checkbox-input" />
                                    <span class="checkbox-custom"></span>
                                    Deshabilitar Estudio
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sección 5: Información Adicional -->
                <div class="form-section">
                    <h3 class="section-title">
                        <BaseIcon name="document-text" class="section-icon" />
                        Información Adicional
                    </h3>
                    <div class="form-grid">
                        <div class="form-group form-group--full">
                            <label class="form-label">Condiciones Paciente</label>
                            <textarea v-model="formData.patientConditions" class="form-textarea"
                                placeholder="Ingrese las condiciones específicas del paciente..." rows="4"></textarea>
                        </div>

                        <div class="form-group form-group--full">
                            <label class="form-label">Aplicaciones/Información Adicional</label>
                            <textarea v-model="formData.additionalInfo" class="form-textarea"
                                placeholder="Información adicional y aplicaciones..." rows="4"></textarea>
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

// Estado del formulario
const formData = reactive({
    id: null as number | null,
    key: '',
    description: '',
    price: '',
    alias: '',
    referred: false,
    area: '',
    sampleType: '',
    container: '',
    method: '',
    studyType: 'normal',
    processDays: 0,
    urgentDays: 0,
    studyCategory: 'biologia-molecular',
    volume: 1,
    count: 0,
    massiveUpload: false,
    disabled: false,
    patientConditions: '',
    additionalInfo: ''
})

// Estado de la aplicación
const isEditing = ref(false)
const editingId = ref<number | null>(null)

// Lista de estudios (simulada)
const studies = ref([
    {
        id: 1,
        key: 'CBC001',
        description: 'Conteo Sanguíneo Completo',
        price: '150.00',
        area: 'bioquimica',
        sampleType: 'sangre',
        studyType: 'normal',
        disabled: false,
        alias: 'CSC',
        referred: false,
        container: 'tubo-rojo',
        method: 'quimica-clinica',
        processDays: 1,
        urgentDays: 0,
        studyCategory: 'hematologia',
        volume: 2,
        count: 1,
        massiveUpload: false,
        patientConditions: 'Ayuno de 8 horas',
        additionalInfo: 'Estudio de rutina'
    },
    {
        id: 2,
        key: 'URIA001',
        description: 'Análisis de Orina Completo',
        price: '80.00',
        area: 'microbiologia',
        sampleType: 'orina',
        studyType: 'normal',
        disabled: false,
        alias: 'UAC',
        referred: true,
        container: 'frasco-orina',
        method: 'microscopia',
        processDays: 1,
        urgentDays: 0,
        studyCategory: 'quimica-clinica',
        volume: 1,
        count: 1,
        massiveUpload: false,
        patientConditions: 'Primera orina de la mañana',
        additionalInfo: 'Estudio básico'
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
        } else if (typeof formData[key] === 'number') {
            formData[key] = key === 'volume' ? 1 : 0
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

    console.log('Nuevo estudio')
}

const handleSave = () => {
    // Validación básica
    errors.key = !formData.key ? 'La clave es requerida' : ''
    errors.description = !formData.description ? 'La descripción es requerida' : ''

    if (!formData.key || !formData.description) {
        return
    }

    if (isEditing.value) {
        // Actualizar estudio existente
        const index = studies.value.findIndex(s => s.id === editingId.value)
        if (index !== -1) {
            studies.value[index] = { ...formData, id: editingId.value }
        }
        console.log('Estudio actualizado:', formData)
    } else {
        // Crear nuevo estudio
        const newId = Math.max(...studies.value.map(s => s.id), 0) + 1
        const newStudy = { ...formData, id: newId }
        studies.value.push(newStudy)
        console.log('Nuevo estudio creado:', newStudy)
    }

    // Limpiar formulario después de guardar
    handleNew()
}

const handleCancel = () => {
    handleNew()
}


const handleEdit = (study: any) => {
    // Cargar datos para edición
    Object.keys(formData).forEach(key => {
        if (key in study) {
            formData[key] = study[key]
        }
    })

    isEditing.value = true
    editingId.value = study.id

    console.log('Editar estudio:', study)
}

const handleRefresh = () => {
    console.log('Actualizando lista de estudios')
    // Aquí iría la lógica para recargar desde el servidor
}

const handleWarehouseItems = () => {
    console.log('Abriendo artículos de almacén')
    // Aquí iría la lógica para abrir el modal de artículos
}
</script>

<style scoped>
.studies-view {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

/* Header */
.studies-header {
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
.studies-form {
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

/* Select personalizado */
.form-select {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-size: 1rem;
    transition: border-color 0.2s ease, background-color 0.2s ease;
}

.form-select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.form-select option {
    background-color: var(--color-background);
    color: var(--color-text-primary);
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

.warehouse-btn {
    align-self: flex-end;
    margin-top: 1.5rem;
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

/* Tabla de estudios */
.studies-table-card {
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

.studies-table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--color-surface);
}

.studies-table th {
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-weight: 600;
    text-align: left;
    padding: var(--spacing-sm);
    border-bottom: 2px solid var(--color-border);
    font-size: 0.875rem;
}

.studies-table td {
    padding: var(--spacing-sm);
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text-primary);
    font-size: 0.875rem;
}

.table-row:hover {
    background-color: var(--color-background);
}

.study-key {
    font-weight: 600;
    color: var(--color-primary);
}

.study-description {
    font-weight: 500;
}

.study-area {
    text-transform: capitalize;
}

.study-price {
    font-weight: 600;
    color: var(--color-alternative);
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

.study-actions {
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

    /* Prevenir overflow horizontal global */
    * {
        max-width: 100%;
        box-sizing: border-box;
    }

    .studies-view {
        padding: 4px;
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
        overflow-x: hidden;
        margin: 0;
    }

    .studies-header {
        flex-direction: column;
        align-items: stretch;
        margin-bottom: var(--spacing-sm);
        width: 100%;
    }

    .header-title h1 {
        font-size: 1.25rem;
        margin-bottom: var(--spacing-xs);
    }

    .header-subtitle {
        font-size: 0.875rem;
    }

    .studies-table-card {
        padding: 4px;
        margin-bottom: var(--spacing-sm);
        width: 100%;
        box-sizing: border-box;
    }

    .table-header {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-md);
    }

    .table-title {
        font-size: 1rem;
        margin-bottom: var(--spacing-sm);
    }

    .table-container {
        overflow-x: auto;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        border-radius: var(--border-radius-md);
        width: 100%;
        max-height: 400px;
    }

    .studies-table {
        min-width: 600px;
        width: 100%;
    }

    .studies-table th,
    .studies-table td {
        padding: var(--spacing-sm);
        font-size: 0.875rem;
        white-space: nowrap;
    }

    .study-description {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .action-btn-small {
        padding: var(--spacing-xs);
        font-size: 0.75rem;
        min-width: auto;
    }

    .action-btn-small .btn-icon-small {
        width: 14px;
        height: 14px;
    }

    .studies-form {
        padding: 4px;
        width: 100%;
        box-sizing: border-box;
    }

    .form-header {
        margin-bottom: var(--spacing-md);
    }

    .form-title {
        font-size: 1rem;
    }

    .form-section {
        padding: 4px;
        margin-bottom: var(--spacing-sm);
        width: 100%;
        box-sizing: border-box;
    }

    .section-title {
        font-size: 1rem;
        margin-bottom: var(--spacing-md);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .section-icon {
        width: 18px;
        height: 18px;
    }

    .form-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
        width: 100%;
    }

    .form-group--wide {
        grid-column: span 1;
        width: 100%;
    }

    .form-group--full {
        grid-column: span 1;
        width: 100%;
    }

    .form-group {
        width: 100%;
    }

    .form-label {
        font-size: 0.875rem;
        margin-bottom: var(--spacing-xs);
    }

    .form-textarea {
        min-height: 80px;
        font-size: 0.875rem;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        resize: vertical;
    }

    /* Asegurar que todos los inputs sean responsivos */
    .base-input,
    .base-input input,
    .base-input textarea,
    .base-input select {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
    }

    /* Asegurar que los botones sean responsivos */
    .base-button {
        max-width: 100%;
        box-sizing: border-box;
    }

    .form-checkbox {
        margin-bottom: var(--spacing-sm);
    }

    .checkbox-label {
        font-size: 0.875rem;
    }

    .form-actions {
        flex-direction: column;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-md);
        width: 100%;
    }

    .action-btn {
        width: 100%;
        justify-content: center;
        padding: var(--spacing-md);
        font-size: 0.875rem;
        box-sizing: border-box;
    }
}

@media (max-width: 480px) {

    /* Prevenir overflow horizontal global */
    * {
        max-width: 100%;
        box-sizing: border-box;
    }

    .studies-view {
        padding: 2px;
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
        overflow-x: hidden;
        margin: 0;
    }

    .studies-header {
        margin-bottom: var(--spacing-md);
        width: 100%;
    }

    .header-title h1 {
        font-size: 1.125rem;
    }

    .header-subtitle {
        font-size: 0.8rem;
    }

    .studies-table-card {
        padding: 2px;
        margin-bottom: var(--spacing-sm);
        width: 100%;
        box-sizing: border-box;
    }

    .table-header {
        margin-bottom: var(--spacing-sm);
    }

    .table-title {
        font-size: 0.9rem;
    }

    .table-container {
        max-height: 300px;
    }

    .studies-table {
        min-width: 500px;
    }

    .studies-table th,
    .studies-table td {
        padding: var(--spacing-xs);
        font-size: 0.8rem;
    }

    .study-description {
        max-width: 150px;
    }

    .action-btn-small {
        padding: var(--spacing-xs);
        font-size: 0.7rem;
    }

    .action-btn-small .btn-icon-small {
        width: 12px;
        height: 12px;
    }

    .studies-form {
        padding: 2px;
        width: 100%;
        box-sizing: border-box;
    }

    .form-header {
        margin-bottom: var(--spacing-sm);
    }

    .form-title {
        font-size: 0.9rem;
    }

    .form-section {
        padding: 2px;
        margin-bottom: var(--spacing-sm);
        width: 100%;
        box-sizing: border-box;
    }

    .section-title {
        font-size: 0.9rem;
        margin-bottom: var(--spacing-sm);
    }

    .section-icon {
        width: 16px;
        height: 16px;
    }

    .form-grid {
        gap: var(--spacing-sm);
        width: 100%;
    }

    .form-group {
        width: 100%;
    }

    .form-label {
        font-size: 0.8rem;
    }

    .form-textarea {
        min-height: 60px;
        font-size: 0.8rem;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        resize: vertical;
    }

    /* Asegurar que todos los inputs sean responsivos */
    .base-input,
    .base-input input,
    .base-input textarea,
    .base-input select {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
    }

    /* Asegurar que los botones sean responsivos */
    .base-button {
        max-width: 100%;
        box-sizing: border-box;
    }

    .checkbox-label {
        font-size: 0.8rem;
    }

    .form-actions {
        gap: var(--spacing-sm);
        margin-top: var(--spacing-sm);
        width: 100%;
    }

    .action-btn {
        padding: var(--spacing-sm);
        font-size: 0.8rem;
        width: 100%;
        box-sizing: border-box;
    }
}
</style>
