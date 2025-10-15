<template>
    <div class="request-form">
        <!-- Header -->
        <div class="request-form__header">
            <div class="request-form__title-section">
                <h1 class="request-form__title">Ingreso de Solicitud</h1>
                <p class="request-form__subtitle">Registro de solicitudes de laboratorio</p>
            </div>
        </div>

        <!-- Información de fecha y hora -->
        <div class="request-form__datetime-section">
            <BaseCard class="request-form__datetime-card">
                <div class="request-form__datetime-grid">
                    <div class="request-form__datetime-item">
                        <label class="request-form__label">Fecha / Hora</label>
                        <BaseInput v-model="formData.currentDateTime" readonly class="request-form__datetime-input" />
                    </div>

                    <div class="request-form__datetime-item">
                        <label class="request-form__label">Fecha de entrega</label>
                        <div class="request-form__datetime-group">
                            <BaseInput v-model="formData.deliveryDate" readonly class="request-form__datetime-input" />
                            <BaseButton variant="outline" size="sm" @click="editDeliveryDate">
                                Editar Fecha
                            </BaseButton>
                        </div>
                    </div>

                    <div class="request-form__datetime-item">
                        <label class="request-form__label">Fecha Muestra</label>
                        <BaseInput v-model="formData.sampleDate" readonly class="request-form__datetime-input" />
                    </div>

                    <div class="request-form__datetime-item">
                        <label class="request-form__label">Hora</label>
                        <div class="request-form__time-group">
                            <BaseInput v-model="formData.time.hour" type="number" min="0" max="23"
                                class="request-form__time-input" />
                            <span class="request-form__time-separator">:</span>
                            <BaseInput v-model="formData.time.minute" type="number" min="0" max="59"
                                class="request-form__time-input" />
                        </div>
                    </div>

                    <div class="request-form__datetime-item">
                        <label class="request-form__label">Sucursal</label>
                        <BaseInput v-model="formData.branch" readonly class="request-form__datetime-input" />
                    </div>
                </div>
            </BaseCard>
        </div>

        <!-- Información de solicitud -->
        <div class="request-form__request-section">
            <BaseCard class="request-form__request-card">
                <div class="request-form__request-grid">
                    <div class="request-form__request-item request-form__request-item--folio">
                        <label class="request-form__label">Folio (Consecutivo)</label>
                        <div class="request-form__folio-group">
                            <BaseInput v-model="formData.folio" readonly class="request-form__folio-input" />
                            <BaseButton variant="outline" size="sm" @click="searchFolio">
                                <BaseIcon name="search" size="sm" />
                            </BaseButton>
                        </div>
                    </div>

                    <div class="request-form__request-item">
                        <label class="request-form__label">Tipo</label>
                        <div class="request-form__radio-group">
                            <label class="request-form__radio-item">
                                <input type="radio" v-model="formData.requestType" value="solicitud"
                                    class="request-form__radio" />
                                <span>Solicitud</span>
                            </label>
                            <label class="request-form__radio-item">
                                <input type="radio" v-model="formData.requestType" value="cotizacion"
                                    class="request-form__radio" />
                                <span>Cotización</span>
                            </label>
                            <label class="request-form__radio-item">
                                <input type="radio" v-model="formData.requestType" value="busqueda"
                                    class="request-form__radio" />
                                <span>Búsqueda</span>
                            </label>
                        </div>
                    </div>

                    <div class="request-form__request-item">
                        <label class="request-form__label">Tipo Entrega</label>
                        <div class="request-form__checkbox-group">
                            <label class="request-form__checkbox-item">
                                <input type="checkbox" v-model="formData.deliveryTypes.impreso"
                                    class="request-form__checkbox" />
                                <span>Impreso</span>
                            </label>
                            <label class="request-form__checkbox-item">
                                <input type="checkbox" v-model="formData.deliveryTypes.correo"
                                    class="request-form__checkbox" />
                                <span>Correo</span>
                            </label>
                            <label class="request-form__checkbox-item">
                                <input type="checkbox" v-model="formData.deliveryTypes.online"
                                    class="request-form__checkbox" />
                                <span>En línea</span>
                            </label>
                        </div>
                    </div>
                </div>
            </BaseCard>
        </div>

        <!-- Información del paciente -->
        <div class="request-form__patient-section">
            <BaseCard class="request-form__patient-card">
                <div class="request-form__patient-header">
                    <h3 class="request-form__section-title">
                        <BaseIcon name="user" size="sm" />
                        Información del Paciente
                    </h3>
                    <div class="request-form__patient-actions">
                        <BaseButton variant="outline" size="sm" @click="editPatient">
                            Editar Paciente
                        </BaseButton>
                        <BaseButton variant="outline" size="sm" @click="showAdditionalInfo">
                            Info Adicional
                        </BaseButton>
                    </div>
                </div>

                <div class="request-form__patient-grid">
                    <div class="request-form__patient-item">
                        <label class="request-form__label">Exp.</label>
                        <BaseInput v-model="formData.patient.exp" />
                    </div>

                    <div class="request-form__patient-item">
                        <label class="request-form__label">Celular</label>
                        <div class="request-form__patient-group">
                            <BaseInput v-model="formData.patient.cellphone" />
                            <BaseButton variant="outline" size="sm" @click="searchPatient">
                                <BaseIcon name="search" size="sm" />
                            </BaseButton>
                        </div>
                    </div>

                    <div class="request-form__patient-item">
                        <label class="request-form__label">Nombre</label>
                        <BaseInput v-model="formData.patient.name" />
                    </div>

                    <div class="request-form__patient-item">
                        <label class="request-form__label">Paterno</label>
                        <BaseInput v-model="formData.patient.lastName1" />
                    </div>

                    <div class="request-form__patient-item">
                        <label class="request-form__label">Materno</label>
                        <BaseInput v-model="formData.patient.lastName2" />
                    </div>

                    <div class="request-form__patient-item">
                        <label class="request-form__label">Sexo</label>
                        <div class="request-form__radio-group">
                            <label class="request-form__radio-item">
                                <input type="radio" v-model="formData.patient.gender" value="masculino"
                                    class="request-form__radio" />
                                <span>Masculino</span>
                            </label>
                            <label class="request-form__radio-item">
                                <input type="radio" v-model="formData.patient.gender" value="femenino"
                                    class="request-form__radio" />
                                <span>Femenino</span>
                            </label>
                        </div>
                    </div>

                    <div class="request-form__patient-item">
                        <label class="request-form__label">Fecha de Nacimiento</label>
                        <div class="request-form__birth-date-group">
                            <BaseInput v-model="formData.patient.birthDate.day" type="number" min="1" max="31"
                                placeholder="Día" class="request-form__birth-input" />
                            <BaseInput v-model="formData.patient.birthDate.month" type="number" min="1" max="12"
                                placeholder="Mes" class="request-form__birth-input" />
                            <BaseInput v-model="formData.patient.birthDate.year" type="number" min="1900" max="2025"
                                placeholder="Año" class="request-form__birth-input" />
                        </div>
                    </div>

                    <div class="request-form__patient-item">
                        <label class="request-form__label">Edad</label>
                        <div class="request-form__age-group">
                            <BaseInput v-model="formData.patient.age.years" readonly class="request-form__age-input" />
                            <span class="request-form__age-label">Años</span>
                            <BaseInput v-model="formData.patient.age.months" readonly class="request-form__age-input" />
                            <span class="request-form__age-label">Meses</span>
                            <BaseInput v-model="formData.patient.age.days" readonly class="request-form__age-input" />
                            <span class="request-form__age-label">Días</span>
                        </div>
                    </div>

                    <div class="request-form__patient-item">
                        <label class="request-form__checkbox-item">
                            <input type="checkbox" v-model="formData.patient.rn" class="request-form__checkbox" />
                            <span>RN</span>
                        </label>
                    </div>
                </div>
            </BaseCard>
        </div>

        <!-- Información médica -->
        <div class="request-form__medical-section">
            <BaseCard class="request-form__medical-card">
                <div class="request-form__medical-header">
                    <h3 class="request-form__section-title">
                        <BaseIcon name="stethoscope" size="sm" />
                        Información Médica
                    </h3>
                </div>

                <div class="request-form__medical-grid">
                    <div class="request-form__medical-item">
                        <label class="request-form__label">Médico</label>
                        <div class="request-form__medical-group">
                            <BaseInput v-model="formData.medical.doctor" readonly />
                            <BaseButton variant="outline" size="sm" @click="clearDoctor">
                                <BaseIcon name="x" size="sm" />
                            </BaseButton>
                        </div>
                    </div>

                    <div class="request-form__medical-item">
                        <label class="request-form__label">Empresa</label>
                        <div class="request-form__medical-group">
                            <BaseInput v-model="formData.medical.company" readonly />
                            <BaseButton variant="outline" size="sm" @click="clearCompany">
                                <BaseIcon name="x" size="sm" />
                            </BaseButton>
                        </div>
                    </div>

                    <div class="request-form__medical-item">
                        <label class="request-form__label">Lista de</label>
                        <div class="request-form__medical-group">
                            <BaseInput v-model="formData.medical.discountList" readonly />
                            <BaseButton variant="outline" size="sm" @click="clearDiscountList">
                                <BaseIcon name="x" size="sm" />
                            </BaseButton>
                        </div>
                    </div>

                    <div class="request-form__medical-item request-form__medical-item--observation">
                        <label class="request-form__label">
                            Observación
                            <BaseButton variant="outline" size="sm" @click="addObservation">
                                <BaseIcon name="plus" size="sm" />
                            </BaseButton>
                        </label>
                        <BaseInput v-model="formData.medical.observation" type="textarea" rows="3"
                            class="request-form__observation-input" />
                    </div>

                    <div class="request-form__medical-item">
                        <label class="request-form__label">No. Cuarto</label>
                        <BaseInput v-model="formData.medical.roomNumber" />
                    </div>

                    <div class="request-form__medical-item">
                        <label class="request-form__label">Carácter Urgente</label>
                        <label class="request-form__checkbox-item">
                            <input type="checkbox" v-model="formData.medical.urgent" class="request-form__checkbox" />
                            <span>Urgente</span>
                        </label>
                    </div>

                    <div class="request-form__medical-item">
                        <label class="request-form__label">Procedencia</label>
                        <div class="request-form__medical-group">
                            <BaseInput v-model="formData.medical.origin" readonly />
                            <BaseButton variant="outline" size="sm" @click="clearOrigin">
                                <BaseIcon name="x" size="sm" />
                            </BaseButton>
                        </div>
                    </div>

                    <div class="request-form__medical-item">
                        <label class="request-form__label">Dx</label>
                        <div class="request-form__medical-group">
                            <BaseInput v-model="formData.medical.diagnosis" readonly />
                            <BaseButton variant="outline" size="sm" @click="clearDiagnosis">
                                <BaseIcon name="x" size="sm" />
                            </BaseButton>
                        </div>
                    </div>
                </div>
            </BaseCard>
        </div>

        <!-- Tabla de estudios -->
        <div class="request-form__studies-section">
            <BaseCard class="request-form__studies-card">
                <div class="request-form__studies-header">
                    <h3 class="request-form__section-title">
                        <BaseIcon name="flask" size="sm" />
                        Estudios Solicitados
                    </h3>
                    <div class="request-form__studies-actions">
                        <BaseButton variant="primary" size="sm" @click="addStudy">
                            <BaseIcon name="plus" size="sm" />
                            Agregar Estudio
                        </BaseButton>
                    </div>
                </div>

                <div class="request-form__studies-tabs">
                    <button class="request-form__tab" :class="{ 'request-form__tab--active': activeTab === 'studies' }"
                        @click="activeTab = 'studies'">
                        Estudio
                    </button>
                    <button class="request-form__tab" :class="{ 'request-form__tab--active': activeTab === 'text' }"
                        @click="activeTab = 'text'">
                        Ingrese Texto...
                    </button>
                </div>

                <div class="request-form__table-container">
                    <table class="request-form__studies-table">
                        <thead>
                            <tr>
                                <th>Elimina</th>
                                <th>Inf.Genera</th>
                                <th>Cve. Estudio</th>
                                <th>Estudio</th>
                                <th>Agrupación</th>
                                <th>Clave Agrupación</th>
                                <th>Tipo</th>
                                <th>Precio al Público</th>
                                <th>Descuento</th>
                                <th>Precio a Pagar</th>
                                <th>F. Recepción</th>
                                <th>F. Entrega</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="study in formData.studies" :key="study.id">
                                <td>
                                    <BaseButton variant="danger" size="sm" @click="removeStudy(study.id)">
                                        <BaseIcon name="trash" size="sm" />
                                    </BaseButton>
                                </td>
                                <td>
                                    <BaseButton variant="outline" size="sm" @click="showGeneralInfo(study.id)">
                                        Más
                                    </BaseButton>
                                </td>
                                <td>{{ study.code }}</td>
                                <td>{{ study.name }}</td>
                                <td>{{ study.grouping }}</td>
                                <td>{{ study.groupingKey }}</td>
                                <td>{{ study.type }}</td>
                                <td>${{ study.publicPrice.toFixed(2) }}</td>
                                <td>${{ study.discount.toFixed(2) }}</td>
                                <td>${{ study.priceToPay.toFixed(2) }}</td>
                                <td>{{ study.receptionDate }}</td>
                                <td>{{ study.deliveryDate }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="request-form__pagination">
                    <span class="request-form__pagination-info">
                        {{ currentPage }} de {{ totalPages }} Estudios
                    </span>
                    <div class="request-form__pagination-controls">
                        <BaseButton variant="outline" size="sm" @click="previousPage" :disabled="currentPage === 1">
                            <BaseIcon name="chevron-left" size="sm" />
                        </BaseButton>
                        <BaseButton variant="outline" size="sm" @click="nextPage"
                            :disabled="currentPage === totalPages">
                            <BaseIcon name="chevron-right" size="sm" />
                        </BaseButton>
                    </div>
                </div>
            </BaseCard>
        </div>

        <!-- Resumen financiero -->
        <div class="request-form__financial-section">
            <div class="request-form__financial-grid">
                <BaseCard class="request-form__financial-card">
                    <h3 class="request-form__section-title">
                        <BaseIcon name="calculator" size="sm" />
                        Resumen Financiero
                    </h3>

                    <div class="request-form__financial-grid-inner">
                        <div class="request-form__financial-item">
                            <label class="request-form__label">Descuento %</label>
                            <BaseInput v-model="formData.financial.discountPercent" type="number" step="0.01" />
                        </div>

                        <div class="request-form__financial-item">
                            <label class="request-form__label">Descuento $</label>
                            <BaseInput v-model="formData.financial.discountAmount" type="number" step="0.01" />
                        </div>

                        <div class="request-form__financial-item">
                            <label class="request-form__label">Subtotal $</label>
                            <BaseInput v-model="formData.financial.subtotal" readonly />
                        </div>

                        <div class="request-form__financial-item">
                            <label class="request-form__label">Importe Total $</label>
                            <BaseInput v-model="formData.financial.total" readonly />
                        </div>
                    </div>
                </BaseCard>

                <BaseCard class="request-form__observations-card">
                    <h3 class="request-form__section-title">
                        <BaseIcon name="message-square" size="sm" />
                        Observaciones de Cobranza
                    </h3>

                    <BaseInput v-model="formData.financial.collectionObservations" type="textarea" rows="4"
                        class="request-form__observations-input" />
                </BaseCard>
            </div>
        </div>

        <!-- Botones de acción principales -->
        <div class="request-form__actions-section">
            <BaseCard class="request-form__actions-card">
                <div class="request-form__actions">
                    <BaseButton variant="primary" size="lg" @click="handleNew">
                        <BaseIcon name="plus" size="sm" />
                        Nuevo
                    </BaseButton>
                    <BaseButton variant="secondary" size="lg" @click="handleSave">
                        <BaseIcon name="save" size="sm" />
                        Guardar
                    </BaseButton>
                    <BaseButton variant="outline" size="lg" @click="handlePrint">
                        <BaseIcon name="printer" size="sm" />
                        Imprimir
                    </BaseButton>
                    <BaseButton variant="outline" size="lg" @click="handleCancel">
                        <BaseIcon name="x" size="sm" />
                        Cancelar
                    </BaseButton>
                </div>
            </BaseCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

// Props y emits
interface Props {
    initialData?: any
}

const props = withDefaults(defineProps<Props>(), {
    initialData: () => ({})
})

const emit = defineEmits<{
    save: [data: any]
    cancel: []
    print: []
}>()

// Estado reactivo
const activeTab = ref('studies')
const currentPage = ref(1)
const totalPages = ref(2)

const formData = ref({
    currentDateTime: '',
    deliveryDate: '',
    sampleDate: '',
    time: {
        hour: 9,
        minute: 10
    },
    branch: 'BIOGENICA MATRIZ',
    folio: '012581463',
    requestType: 'solicitud',
    deliveryTypes: {
        impreso: true,
        correo: true,
        online: true
    },
    patient: {
        exp: '009343',
        cellphone: '',
        name: 'JENNIFER',
        lastName1: 'RODRIGUEZ',
        lastName2: 'RODRIGUEZ',
        gender: 'femenino',
        birthDate: {
            day: 9,
            month: 11,
            year: 1999
        },
        age: {
            years: 25,
            months: 11,
            days: 4
        },
        rn: false
    },
    medical: {
        doctor: 'AQC - A QUIEN CORRESPONDA Porcentaje = 0',
        company: 'P PARTICULAR Biogenica',
        discountList: 'LISTA DE DESCUENTOS',
        observation: 'RESULTADO POR WHATSAPP/ ESTUDIOS DE RUTINA/ULTIMA COMIDA 8PM',
        roomNumber: '',
        urgent: false,
        origin: 'NINGUNO',
        diagnosis: 'NINGUNO'
    },
    studies: [
        {
            id: 1,
            code: 'BH',
            name: 'Citometría Hemática',
            grouping: '',
            groupingKey: '',
            type: 'ESTUDIO',
            publicPrice: 160.00,
            discount: 32.00,
            priceToPay: 128.00,
            receptionDate: '13/10/2025 09:11 a. m.',
            deliveryDate: '13/10/2025'
        },
        {
            id: 2,
            code: 'PTI4',
            name: 'Perfil Tiroideo',
            grouping: '',
            groupingKey: '',
            type: 'PERFIL',
            publicPrice: 600.00,
            discount: 120.00,
            priceToPay: 480.00,
            receptionDate: '13/10/2025 09:11 a. m.',
            deliveryDate: '13/10/2025'
        }
    ],
    financial: {
        discountPercent: 0.00,
        discountAmount: 0.00,
        subtotal: 608.00,
        total: 608.00,
        collectionObservations: 'SIN FACTURA'
    }
})

// Computed
const totalAmount = computed(() => {
    return formData.value.studies.reduce((sum, study) => sum + study.priceToPay, 0)
})

// Métodos
const updateCurrentDateTime = () => {
    const now = new Date()
    formData.value.currentDateTime = now.toLocaleString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    })

    formData.value.sampleDate = now.toLocaleDateString('es-MX')
    formData.value.deliveryDate = now.toLocaleDateString('es-MX', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}

const handleNew = () => {
    // Resetear formulario
    formData.value = {
        ...formData.value,
        folio: '',
        patient: {
            exp: '',
            cellphone: '',
            name: '',
            lastName1: '',
            lastName2: '',
            gender: '',
            birthDate: { day: '', month: '', year: '' },
            age: { years: '', months: '', days: '' },
            rn: false
        },
        studies: [],
        financial: {
            discountPercent: 0.00,
            discountAmount: 0.00,
            subtotal: 0.00,
            total: 0.00,
            collectionObservations: ''
        }
    }
    updateCurrentDateTime()
}

const handleSave = () => {
    emit('save', formData.value)
}

const handlePrint = () => {
    emit('print')
}

const handleCancel = () => {
    emit('cancel')
}

const editDeliveryDate = () => {
    // Implementar modal de fecha
    console.log('Editar fecha de entrega')
}

const searchFolio = () => {
    console.log('Buscar folio')
}

const editPatient = () => {
    console.log('Editar paciente')
}

const showAdditionalInfo = () => {
    console.log('Mostrar información adicional')
}

const searchPatient = () => {
    console.log('Buscar paciente')
}

const clearDoctor = () => {
    formData.value.medical.doctor = ''
}

const clearCompany = () => {
    formData.value.medical.company = ''
}

const clearDiscountList = () => {
    formData.value.medical.discountList = ''
}

const addObservation = () => {
    console.log('Agregar observación')
}

const clearOrigin = () => {
    formData.value.medical.origin = ''
}

const clearDiagnosis = () => {
    formData.value.medical.diagnosis = ''
}

const addStudy = () => {
    console.log('Agregar estudio')
}

const removeStudy = (id: number) => {
    formData.value.studies = formData.value.studies.filter(study => study.id !== id)
}

const showGeneralInfo = (id: number) => {
    console.log('Mostrar información general del estudio:', id)
}

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

// Lifecycle
onMounted(() => {
    updateCurrentDateTime()
})
</script>

<style scoped>
.request-form {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

/* Header */
.request-form__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-xl);
    gap: var(--spacing-lg);
}

.request-form__title-section {
    flex: 1;
}

.request-form__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: var(--spacing-xs);
}

.request-form__subtitle {
    font-size: 1rem;
    color: var(--color-text-secondary);
}

.request-form__actions {
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
    flex-wrap: wrap;
}

.request-form__actions-card {
    padding: var(--spacing-lg);
    background-color: var(--color-surface);
    border: 2px solid var(--color-border);
}

.request-form__actions .base-button {
    min-width: 140px;
    font-weight: 600;
}

/* Secciones */
.request-form__datetime-section,
.request-form__request-section,
.request-form__patient-section,
.request-form__medical-section,
.request-form__studies-section,
.request-form__financial-section {
    margin-bottom: var(--spacing-xl);
}

.request-form__actions-section {
    margin-bottom: var(--spacing-lg);
}

/* Cards */
.request-form__datetime-card,
.request-form__request-card,
.request-form__patient-card,
.request-form__medical-card,
.request-form__studies-card,
.request-form__financial-card,
.request-form__observations-card {
    padding: var(--spacing-lg);
}

/* Grids */
.request-form__datetime-grid,
.request-form__request-grid,
.request-form__patient-grid,
.request-form__medical-grid {
    display: grid;
    gap: var(--spacing-lg);
}

.request-form__datetime-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.request-form__request-grid {
    grid-template-columns: 1fr 1fr 1fr;
}

.request-form__patient-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.request-form__medical-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.request-form__financial-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
}

.request-form__financial-grid-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
}

/* Items */
.request-form__datetime-item,
.request-form__request-item,
.request-form__patient-item,
.request-form__medical-item,
.request-form__financial-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.request-form__request-item--folio {
    grid-column: span 1;
}

.request-form__medical-item--observation {
    grid-column: span 2;
}

/* Labels */
.request-form__label {
    font-weight: 500;
    color: var(--color-text-primary);
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

/* Grupos de elementos */
.request-form__datetime-group,
.request-form__folio-group,
.request-form__patient-group,
.request-form__medical-group {
    display: flex;
    gap: var(--spacing-sm);
    align-items: flex-end;
}

.request-form__time-group {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.request-form__time-separator {
    font-weight: 600;
    color: var(--color-text-primary);
}

.request-form__birth-date-group {
    display: flex;
    gap: var(--spacing-xs);
}

.request-form__age-group {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    flex-wrap: wrap;
}

.request-form__age-label {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    min-width: 30px;
}

/* Radio y checkbox groups */
.request-form__radio-group,
.request-form__checkbox-group {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
}

.request-form__radio-item,
.request-form__checkbox-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    cursor: pointer;
    font-size: 0.875rem;
}

.request-form__radio,
.request-form__checkbox {
    accent-color: var(--color-primary);
}

/* Inputs especiales */
.request-form__datetime-input,
.request-form__folio-input,
.request-form__time-input,
.request-form__birth-input,
.request-form__age-input,
.request-form__observation-input,
.request-form__observations-input {
    flex: 1;
}

.request-form__folio-input {
    background-color: #fef3c7;
    font-weight: 600;
}

/* Headers de sección */
.request-form__patient-header,
.request-form__medical-header,
.request-form__studies-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
}

.request-form__section-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.request-form__patient-actions,
.request-form__studies-actions {
    display: flex;
    gap: var(--spacing-sm);
}

/* Tabs */
.request-form__studies-tabs {
    display: flex;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: var(--spacing-lg);
}

.request-form__tab {
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    background: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
}

.request-form__tab:hover {
    color: var(--color-text-primary);
}

.request-form__tab--active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
}

/* Tabla */
.request-form__table-container {
    overflow-x: auto;
    overflow-y: auto;
    max-height: 400px;
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-border);
}

.request-form__studies-table {
    width: 100%;
    min-width: 1200px;
    border-collapse: collapse;
}

.request-form__studies-table th,
.request-form__studies-table td {
    padding: var(--spacing-sm);
    text-align: left;
    border-bottom: 1px solid var(--color-border);
    font-size: 0.875rem;
}

.request-form__studies-table th {
    background-color: var(--color-secondary);
    font-weight: 600;
    color: var(--color-text-primary);
    position: sticky;
    top: 0;
    z-index: 1;
}

.request-form__studies-table tbody tr:hover {
    background-color: var(--color-secondary);
}

/* Paginación */
.request-form__pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-lg);
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--color-border);
}

.request-form__pagination-info {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}

.request-form__pagination-controls {
    display: flex;
    gap: var(--spacing-sm);
}

/* Animaciones */
.request-form__header {
    animation: slideDown 0.6s ease-out;
}

.request-form__datetime-section {
    animation: fadeInUp 0.8s ease-out 0.1s both;
}

.request-form__request-section {
    animation: fadeInUp 0.8s ease-out 0.2s both;
}

.request-form__patient-section {
    animation: fadeInUp 0.8s ease-out 0.3s both;
}

.request-form__medical-section {
    animation: fadeInUp 0.8s ease-out 0.4s both;
}

.request-form__studies-section {
    animation: fadeInUp 0.8s ease-out 0.5s both;
}

.request-form__financial-section {
    animation: fadeInUp 0.8s ease-out 0.6s both;
}

.request-form__stat-card,
.request-form__datetime-card,
.request-form__request-card,
.request-form__patient-card,
.request-form__medical-card,
.request-form__studies-card,
.request-form__financial-card,
.request-form__observations-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.request-form__stat-card:hover,
.request-form__datetime-card:hover,
.request-form__request-card:hover,
.request-form__patient-card:hover,
.request-form__medical-card:hover,
.request-form__studies-card:hover,
.request-form__financial-card:hover,
.request-form__observations-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.request-form__action-btn {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.request-form__action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.request-form__studies-table tbody tr {
    transition: background-color 0.2s ease;
}

.request-form__studies-table tbody tr:hover {
    background-color: var(--color-secondary);
    transform: scale(1.01);
}

/* Keyframes */
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .request-form {
        padding: 4px;
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
        overflow-x: hidden;
        margin: 0;
    }

    .request-form__header {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
    }

    .request-form__title {
        font-size: 1.25rem;
    }

    .request-form__subtitle {
        font-size: 0.875rem;
    }

    .request-form__actions {
        justify-content: stretch;
        gap: var(--spacing-sm);
    }

    .request-form__actions .base-button {
        flex: 1;
        min-width: 0;
        font-size: 0.875rem;
    }

    .request-form__actions-card {
        padding: var(--spacing-md);
    }

    .request-form__datetime-card,
    .request-form__request-card,
    .request-form__patient-card,
    .request-form__medical-card,
    .request-form__studies-card,
    .request-form__financial-card,
    .request-form__observations-card {
        padding: 4px;
        width: 100%;
        box-sizing: border-box;
    }

    .request-form__datetime-grid,
    .request-form__request-grid,
    .request-form__patient-grid,
    .request-form__medical-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }

    .request-form__financial-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }

    .request-form__financial-grid-inner {
        grid-template-columns: 1fr;
        gap: var(--spacing-sm);
    }

    .request-form__patient-header,
    .request-form__medical-header,
    .request-form__studies-header {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-sm);
    }

    .request-form__patient-actions,
    .request-form__studies-actions {
        justify-content: stretch;
    }

    .request-form__patient-actions .base-button,
    .request-form__studies-actions .base-button {
        flex: 1;
    }

    .request-form__table-container {
        max-height: 300px;
    }

    .request-form__studies-table {
        min-width: 1000px;
    }

    .request-form__studies-table th,
    .request-form__studies-table td {
        padding: var(--spacing-xs);
        font-size: 0.8rem;
    }

    .request-form__pagination {
        flex-direction: column;
        gap: var(--spacing-sm);
        align-items: stretch;
    }

    .request-form__pagination-controls {
        justify-content: center;
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
}

@media (max-width: 480px) {
    .request-form {
        padding: 2px;
    }

    .request-form__datetime-card,
    .request-form__request-card,
    .request-form__patient-card,
    .request-form__medical-card,
    .request-form__studies-card,
    .request-form__financial-card,
    .request-form__observations-card {
        padding: 2px;
    }

    .request-form__title {
        font-size: 1.125rem;
    }

    .request-form__subtitle {
        font-size: 0.8rem;
    }

    .request-form__section-title {
        font-size: 1rem;
    }

    .request-form__table-container {
        max-height: 250px;
    }

    .request-form__studies-table {
        min-width: 800px;
    }

    .request-form__studies-table th,
    .request-form__studies-table td {
        padding: 2px;
        font-size: 0.75rem;
    }

    .request-form__radio-group,
    .request-form__checkbox-group {
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .request-form__age-group {
        flex-direction: column;
        align-items: stretch;
    }

    .request-form__age-label {
        min-width: auto;
        text-align: center;
    }

    .request-form__actions {
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .request-form__actions .base-button {
        width: 100%;
        font-size: 0.8rem;
    }

    .request-form__actions-card {
        padding: var(--spacing-sm);
    }
}
</style>
