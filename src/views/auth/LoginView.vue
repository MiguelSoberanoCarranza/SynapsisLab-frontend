<template>
    <AuthLayout :is-welcome-screen="showWelcome" @show-login="showWelcome = false">
        <LoginForm :loading="loading" @submit="handleLogin" ref="loginFormRef" />
    </AuthLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'

const router = useRouter()
const loading = ref(false)
const showWelcome = ref(true)
const loginFormRef = ref<InstanceType<typeof LoginForm> | null>(null)

interface LoginData {
    email: string
    password: string
}

const handleLogin = async (data: LoginData) => {
    loading.value = true

    try {
        // Simular llamada a API
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Aquí iría la lógica real de autenticación
        console.log('Login exitoso:', data)

        // Guardar token simulado para permitir acceso
        localStorage.setItem('auth_token', 'demo-token-' + Date.now())
        localStorage.setItem('user_email', data.email)

        // Mostrar mensaje de éxito
        if (loginFormRef.value) {
            (loginFormRef.value as any).showSuccess = true
        }

        // Esperar un poco para mostrar el mensaje de éxito antes de redirigir
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Redirigir al dashboard después del login exitoso
        router.push('/dashboard')
    } catch (error) {
        console.error('Error en login:', error)
        alert('Error al iniciar sesión')
    } finally {
        loading.value = false
    }
}

// En móvil, mostrar welcome screen inicialmente
onMounted(() => {
    const isMobile = window.innerWidth < 768
    showWelcome.value = isMobile
})

// Actualizar showWelcome cuando cambie el tamaño de ventana
const handleResize = () => {
    const isMobile = window.innerWidth < 768
    if (!isMobile) {
        showWelcome.value = false
    }
}

if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
}
</script>
