<template>
    <div class="signup-form">
        <form @submit.prevent="handleSubmit" class="signup-form__content">
            <h1 class="signup-form__title">Registrarse</h1>

            <BaseInput v-model="form.email" type="email" label="Email" placeholder="tu@email.com"
                :error-message="errors.email" required autocomplete="email" class="signup-form__input" />

            <BaseInput v-model="form.password" type="password" label="Contraseña" placeholder="••••••••"
                :error-message="errors.password" required autocomplete="new-password" class="signup-form__input" />

            <BaseInput v-model="form.confirmPassword" type="password" label="Confirmar Contraseña"
                placeholder="••••••••" :error-message="errors.confirmPassword" required autocomplete="new-password"
                class="signup-form__input" />

            <div class="signup-form__terms">
                <label class="signup-form__checkbox-label">
                    <input v-model="form.acceptTerms" type="checkbox" class="signup-form__checkbox" required />
                    <span class="signup-form__checkbox-text">
                        Acepto los términos y políticas
                    </span>
                </label>
            </div>

            <BaseButton type="submit" variant="primary" size="lg" :loading="loading" full-width
                class="signup-form__button">
                REGISTRARSE
            </BaseButton>

            <div class="signup-form__login">
                <span class="signup-form__login-text">¿Ya tienes una cuenta?</span>
                <button type="button" @click="$emit('switch-to-login')" class="signup-form__login-link">
                    Iniciar Sesión
                </button>
            </div>
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
    confirmPassword: string
    acceptTerms: boolean
}

interface FormErrors {
    email?: string
    password?: string
    confirmPassword?: string
}

interface Emits {
    (e: 'submit', data: FormData): void
    (e: 'switch-to-login'): void
}

const emit = defineEmits<Emits>()

const form = reactive<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
})

const errors = reactive<FormErrors>({})
const loading = ref(false)

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

    // Validar confirmación de contraseña
    if (!form.confirmPassword) {
        errors.confirmPassword = 'Confirma tu contraseña'
        isValid = false
    } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden'
        isValid = false
    }

    return isValid
}

const handleSubmit = async () => {
    if (!validateForm() || !form.acceptTerms) return

    loading.value = true

    try {
        await emit('submit', { ...form })
    } finally {
        loading.value = false
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
.signup-form {
    @apply w-full max-w-md mx-auto;
}

.signup-form__content {
    @apply flex flex-col gap-lg p-xl bg-white rounded-xl shadow-lg;
}

.signup-form__title {
    @apply text-2xl font-bold text-alternative text-center;
    @apply mb-0;
}

.signup-form__input {
    @apply w-full;
}

.signup-form__terms {
    @apply flex items-start gap-sm;
}

.signup-form__checkbox-label {
    @apply flex items-start gap-sm cursor-pointer;
}

.signup-form__checkbox {
    @apply w-4 h-4 mt-1;
    @apply text-primary border-secondary-darker rounded;
    @apply focus:ring-primary focus:ring-2;
}

.signup-form__checkbox-text {
    @apply text-sm text-secondary;
}

.signup-form__button {
    @apply w-full;
}

.signup-form__login {
    @apply flex items-center justify-center gap-sm;
    @apply text-sm;
}

.signup-form__login-text {
    @apply text-secondary;
}

.signup-form__login-link {
    @apply text-primary hover:text-primary-dark font-medium;
    @apply transition-colors cursor-pointer;
    @apply bg-transparent border-none p-0;
}

/* Responsive */
@media (max-width: 767px) {
    .signup-form__content {
        @apply p-lg;
    }

    .signup-form__title {
        @apply text-xl;
    }
}
</style>
