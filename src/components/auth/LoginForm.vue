<template>
    <div class="login-form">
        <form @submit.prevent="handleSubmit" class="login-form__content">
            <div class="login-form__header animate-slide-down">
                <h1 class="login-form__title">Bienvenido</h1>
                <p class="login-form__subtitle">Inicia sesión en tu cuenta para continuar</p>
            </div>

            <BaseInput v-model="form.email" type="email" label="Email" placeholder="tu@email.com"
                :error-message="errors.email" required autocomplete="email"
                class="login-form__input animate-slide-up animate-delay-1" />

            <BaseInput v-model="form.password" type="password" label="Contraseña" placeholder="••••••••"
                :error-message="errors.password" required autocomplete="current-password"
                class="login-form__input animate-slide-up animate-delay-2" />

            <div class="login-form__actions animate-slide-up animate-delay-3">
                <a href="#" class="login-form__forgot-link">
                    ¿Olvidaste tu contraseña?
                </a>
            </div>

            <BaseButton type="submit" variant="primary" size="lg" :loading="loading" full-width
                class="login-form__button animate-slide-up animate-delay-4">
                INICIAR SESIÓN
            </BaseButton>

            <!-- Mensaje de éxito -->
            <transition name="success">
                <div v-if="showSuccess" class="login-form__success">
                    <svg class="login-form__success-icon" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                        <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <p class="login-form__success-text">¡Inicio de sesión exitoso!</p>
                </div>
            </transition>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface FormData {
    email: string
    password: string
}

interface FormErrors {
    email?: string
    password?: string
}

interface Props {
    loading?: boolean
}

interface Emits {
    (e: 'submit', data: FormData): void
    (e: 'switch-to-signup'): void
}

const props = withDefaults(defineProps<Props>(), {
    loading: false
})

const emit = defineEmits<Emits>()

const form = reactive<FormData>({
    email: '',
    password: ''
})

const errors = reactive<FormErrors>({})
const showSuccess = ref(false)
const loading = computed(() => props.loading)

const validateForm = (): boolean => {
    // Limpiar errores previos
    Object.keys(errors).forEach(key => {
        errors[key as keyof FormErrors] = undefined
    })

    let isValid = true

    // Validar email
    if (!form.email) {
        errors.email = 'El email es requerido'
        isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Ingresa un email válido'
        isValid = false
    }

    // Validar contraseña
    if (!form.password) {
        errors.password = 'La contraseña es requerida'
        isValid = false
    } else if (form.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres'
        isValid = false
    }

    return isValid
}

const handleSubmit = async () => {
    if (!validateForm()) return

    try {
        await emit('submit', { ...form })
    } catch (error) {
        console.error('Error en submit:', error)
    }
}

// Limpiar errores cuando el usuario empiece a escribir
watch(form, () => {
    if (Object.values(errors).some(error => error)) {
        validateForm()
    }
}, { deep: true })
</script>

<style scoped>
.login-form {
    width: 100%;
    max-width: 28rem;
    margin: 0 auto;
    overflow: hidden;
}

.login-form__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    padding: var(--spacing-xl);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-xl);
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: visible;
}

.login-form__header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.login-form__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
    text-align: center;
    margin-bottom: 0;
}

.login-form__subtitle {
    color: var(--color-text-secondary);
    text-align: center;
    margin-bottom: 0;
}

.login-form__input {
    width: 100%;
}

.login-form__actions {
    display: flex;
    justify-content: flex-end;
}

.login-form__forgot-link {
    font-size: 0.875rem;
    color: var(--color-primary);
    transition: color 0.25s ease-in-out;
    text-decoration: none;
}

.login-form__forgot-link:hover {
    color: var(--color-primary-dark);
}

.login-form__button {
    width: 100%;
}

/* Mensaje de éxito */
.login-form__success {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-xl);
    padding: var(--spacing-2xl);
    box-shadow: var(--shadow-xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
    z-index: 100;
    width: 90%;
    max-width: 300px;
}

.login-form__success-icon {
    width: 80px;
    height: 80px;
    color: var(--color-alternative);
    animation: success-icon 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.login-form__success-text {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-primary);
    text-align: center;
    margin: 0;
}

/* Animaciones de entrada */
.animate-slide-down {
    animation: slideDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) backwards;
}

.animate-slide-up {
    animation: slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) backwards;
}

.animate-delay-1 {
    animation-delay: 0.1s;
}

.animate-delay-2 {
    animation-delay: 0.2s;
}

.animate-delay-3 {
    animation-delay: 0.3s;
}

.animate-delay-4 {
    animation-delay: 0.4s;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes success-icon {
    0% {
        opacity: 0;
        transform: scale(0.3) rotate(-180deg);
    }

    50% {
        transform: scale(1.1) rotate(10deg);
    }

    100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }
}

/* Transición del mensaje de éxito */
.success-enter-active {
    animation: successEnter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.success-leave-active {
    animation: successLeave 0.3s ease-in-out;
}

@keyframes successEnter {
    from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
    }

    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

@keyframes successLeave {
    from {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }

    to {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
    }
}

/* Asegurar que los labels no tengan fondo */
.login-form :deep(.base-input__label) {
    background-color: transparent !important;
    background: none !important;
}

/* Responsive */
@media (max-width: 767px) {
    .login-form__content {
        padding: var(--spacing-lg);
    }

    .login-form__title {
        font-size: 1.25rem;
    }
}
</style>
