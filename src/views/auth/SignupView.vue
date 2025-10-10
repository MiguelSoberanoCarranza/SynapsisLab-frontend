<template>
    <AuthLayout :is-signup="true" @show-login="$router.push('/login')" @show-signup="$router.push('/signup')">
        <SignupForm :loading="loading" @submit="handleSignup" @switch-to-login="$router.push('/login')" />
    </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import SignupForm from '@/components/auth/SignupForm.vue'

const router = useRouter()
const loading = ref(false)

interface SignupData {
    email: string
    password: string
    confirmPassword: string
    acceptTerms: boolean
}

const handleSignup = async (data: SignupData) => {
    loading.value = true

    try {
        // Simular llamada a API
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Aquí iría la lógica real de registro
        console.log('Registro exitoso:', data)

        // Mostrar mensaje de éxito
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.')

        // Redirigir al login después del registro exitoso
        router.push('/login')
    } catch (error) {
        console.error('Error en registro:', error)
        alert('Error al registrarse')
    } finally {
        loading.value = false
    }
}
</script>
