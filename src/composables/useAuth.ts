// Composable para manejo de autenticación
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export function useAuth() {
  const router = useRouter()
  const isAuthenticated = ref(!!localStorage.getItem('auth_token'))
  const userEmail = ref(localStorage.getItem('user_email') || '')

  const userName = computed(() => {
    return userEmail.value.split('@')[0] || 'Usuario'
  })

  const login = (email: string, token: string) => {
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user_email', email)
    userEmail.value = email
    isAuthenticated.value = true
    router.push('/dashboard')
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_email')
    userEmail.value = ''
    isAuthenticated.value = false
    router.push('/login')
  }

  return {
    isAuthenticated,
    userEmail,
    userName,
    login,
    logout
  }
}
