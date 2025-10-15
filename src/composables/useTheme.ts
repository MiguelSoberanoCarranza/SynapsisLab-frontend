import { ref, computed, watch, onMounted } from 'vue'

// Estado global del tema
const isDark = ref(false)

// Clave para localStorage
const THEME_KEY = 'synapsis-lab-theme'

// Aplicar tema al documento
const applyTheme = (dark: boolean) => {
    const html = document.documentElement
    if (dark) {
        html.classList.add('dark')
        html.classList.remove('light')
    } else {
        html.classList.add('light')
        html.classList.remove('dark')
    }
}

// Cargar tema desde localStorage
const loadTheme = () => {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved) {
        isDark.value = saved === 'dark'
    } else {
        // Detectar preferencia del sistema
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme(isDark.value)
}

// Guardar tema en localStorage
const saveTheme = (dark: boolean) => {
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
}

// Toggle del tema
const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
    saveTheme(isDark.value)
}

// Estado computado
const currentTheme = computed(() => isDark.value ? 'dark' : 'light')
const isLightTheme = computed(() => !isDark.value)

// Watcher para cambios del sistema
const watchSystemTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
        // Solo cambiar si no hay preferencia guardada
        if (!localStorage.getItem(THEME_KEY)) {
            isDark.value = e.matches
            applyTheme(isDark.value)
        }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    // Retornar función de limpieza
    return () => mediaQuery.removeEventListener('change', handleChange)
}

export function useTheme() {
    // Cargar tema al montar
    onMounted(() => {
        loadTheme()
        watchSystemTheme()
    })

    return {
        isDark: computed(() => isDark.value),
        isLight: isLightTheme,
        currentTheme,
        toggleTheme,
        applyTheme: (dark: boolean) => {
            isDark.value = dark
            applyTheme(dark)
            saveTheme(dark)
        }
    }
}
