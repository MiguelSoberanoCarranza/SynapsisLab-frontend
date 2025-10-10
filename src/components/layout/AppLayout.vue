<template>
    <div class="app-layout">
        <!-- Sidebar -->
        <aside :class="sidebarClasses" class="app-layout__sidebar">
            <div class="app-layout__sidebar-header">
                <BaseLogo size="md" variant="dark" />
            </div>

            <nav class="app-layout__nav">
                <router-link v-for="item in navigationItems" :key="item.path" :to="item.path"
                    :class="getNavItemClasses(item.path)" class="app-layout__nav-item">
                    <component :is="item.icon" class="app-layout__nav-icon" />
                    <span class="app-layout__nav-text">{{ item.label }}</span>
                </router-link>
            </nav>

            <div class="app-layout__sidebar-footer">
                <!-- User Profile Section -->
                <div class="app-layout__user-section">
                    <div class="app-layout__user-info">
                        <div class="app-layout__user-avatar">
                            {{ userInitials }}
                        </div>
                        <div v-if="!sidebarCollapsed" class="app-layout__user-details">
                            <div class="app-layout__user-name">{{ userName }}</div>
                            <div class="app-layout__user-email">{{ userEmail }}</div>
                        </div>
                    </div>

                    <!-- User Actions -->
                    <div v-if="!sidebarCollapsed" class="app-layout__user-actions">
                        <button @click="toggleTheme" class="app-layout__action-btn"
                            :title="isDarkMode ? 'Modo Claro' : 'Modo Oscuro'">
                            {{ isDarkMode ? '☀️' : '🌙' }}
                        </button>
                        <button @click="showChangePassword = true" class="app-layout__action-btn"
                            title="Cambiar Contraseña">
                            🔑
                        </button>
                    </div>
                </div>

                <button @click="logout" class="app-layout__logout-btn">
                    <LogoutIcon />
                    <span class="app-layout__logout-text">Cerrar Sesión</span>
                </button>
            </div>
        </aside>

        <!-- Change Password Modal -->
        <div v-if="showChangePassword" class="app-layout__modal-overlay" @click="showChangePassword = false">
            <div class="app-layout__modal" @click.stop>
                <div class="app-layout__modal-header">
                    <h3 class="app-layout__modal-title">Cambiar Contraseña</h3>
                    <button @click="showChangePassword = false" class="app-layout__modal-close">×</button>
                </div>
                <div class="app-layout__modal-body">
                    <div class="app-layout__form-group">
                        <label class="app-layout__label">Contraseña Actual</label>
                        <input v-model="passwordForm.current" type="password" class="app-layout__input"
                            placeholder="Ingrese su contraseña actual" />
                    </div>
                    <div class="app-layout__form-group">
                        <label class="app-layout__label">Nueva Contraseña</label>
                        <input v-model="passwordForm.new" type="password" class="app-layout__input"
                            placeholder="Ingrese nueva contraseña" />
                    </div>
                    <div class="app-layout__form-group">
                        <label class="app-layout__label">Confirmar Contraseña</label>
                        <input v-model="passwordForm.confirm" type="password" class="app-layout__input"
                            placeholder="Confirme la nueva contraseña" />
                    </div>
                </div>
                <div class="app-layout__modal-footer">
                    <button @click="showChangePassword = false" class="app-layout__btn app-layout__btn--secondary">
                        Cancelar
                    </button>
                    <button @click="handleChangePassword" class="app-layout__btn app-layout__btn--primary">
                        Cambiar Contraseña
                    </button>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="app-layout__main">
            <!-- Mobile Menu Button (floating) -->
            <button @click="toggleSidebar" class="app-layout__mobile-menu-btn">
                ☰
            </button>

            <!-- Content -->
            <main class="app-layout__content">
                <slot />
            </main>
        </div>

        <!-- Mobile Overlay -->
        <div v-if="showMobileOverlay" @click="closeMobileSidebar" class="app-layout__mobile-overlay"></div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseLogo from '@/components/ui/BaseLogo.vue'

const route = useRoute()
const router = useRouter()

const sidebarCollapsed = ref(false)
const showMobileOverlay = ref(false)
const showChangePassword = ref(false)
const isDarkMode = ref(false)

// User info
const userEmail = ref(localStorage.getItem('user_email') || 'usuario@laboratorio.com')
const userName = computed(() => {
    const email = userEmail.value
    return email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
})
const userInitials = computed(() => {
    const name = userName.value
    return name.slice(0, 2).toUpperCase()
})

// Password form
const passwordForm = ref({
    current: '',
    new: '',
    confirm: ''
})

// Icons (en un proyecto real, usarías una librería de iconos)
const LogoutIcon = { template: '<div class="w-5 h-5">🚪</div>' }

const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: { template: '<div class="w-5 h-5">📊</div>' } },
    { path: '/samples', label: 'Muestras', icon: { template: '<div class="w-5 h-5">🧪</div>' } },
    { path: '/analysis', label: 'Análisis', icon: { template: '<div class="w-5 h-5">🔬</div>' } },
    { path: '/results', label: 'Resultados', icon: { template: '<div class="w-5 h-5">📋</div>' } }
]

const sidebarClasses = computed(() => {
    return {
        'app-layout__sidebar--collapsed': sidebarCollapsed.value,
        'app-layout__sidebar--mobile-open': showMobileOverlay.value
    }
})

const getNavItemClasses = (path: string) => {
    return {
        'app-layout__nav-item--active': route.path === path
    }
}

const toggleSidebar = () => {
    const isMobile = window.innerWidth < 768

    if (isMobile) {
        showMobileOverlay.value = !showMobileOverlay.value
    } else {
        sidebarCollapsed.value = !sidebarCollapsed.value
    }
}

const closeMobileSidebar = () => {
    showMobileOverlay.value = false
}

const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark-mode', isDarkMode.value)
    // Aquí podrías implementar el cambio de tema real
    alert(`Modo ${isDarkMode.value ? 'Oscuro' : 'Claro'} activado`)
}

const handleChangePassword = () => {
    if (!passwordForm.value.current || !passwordForm.value.new || !passwordForm.value.confirm) {
        alert('Por favor complete todos los campos')
        return
    }

    if (passwordForm.value.new !== passwordForm.value.confirm) {
        alert('Las contraseñas no coinciden')
        return
    }

    if (passwordForm.value.new.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres')
        return
    }

    // Simulación de cambio de contraseña exitoso
    alert('Contraseña cambiada exitosamente')
    showChangePassword.value = false
    passwordForm.value = { current: '', new: '', confirm: '' }
}

const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_email')
    router.push('/login')
}

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark-mode')
}

// Cerrar sidebar móvil al cambiar de ruta
watch(route, () => {
    showMobileOverlay.value = false
})

// Manejar resize de ventana
const handleResize = () => {
    if (window.innerWidth >= 768) {
        showMobileOverlay.value = false
    }
}

window.addEventListener('resize', handleResize)
</script>

<style scoped>
.app-layout {
    display: flex;
    min-height: 100vh;
    background-color: #f8f9fa;
}

/* Sidebar */
.app-layout__sidebar {
    width: 260px;
    background: linear-gradient(to bottom, #ffffff, #fafbfc);
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e8eaed;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
}

.app-layout__sidebar--collapsed {
    width: 70px;
}

.app-layout__sidebar--mobile-open {
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
}

.app-layout__sidebar-header {
    padding: var(--spacing-xl) var(--spacing-lg);
    border-bottom: 1px solid #e8eaed;
    background-color: #ffffff;
    flex-shrink: 0;
}

.app-layout__nav {
    flex: 1;
    padding: var(--spacing-md);
    overflow-y: auto;
    min-height: 0;
}

.app-layout__nav-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--border-radius-lg);
    color: var(--color-text-secondary);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    margin-bottom: var(--spacing-xs);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
}

.app-layout__nav-item:hover {
    color: var(--color-primary);
    background-color: rgba(37, 99, 235, 0.06);
    transform: translateX(4px);
}

.app-layout__nav-item--active {
    color: white;
    background-color: var(--color-primary);
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

.app-layout__sidebar--collapsed .app-layout__nav-text {
    display: none;
}

.app-layout__nav-icon {
    flex-shrink: 0;
    font-size: 1.25rem;
    width: 24px;
    text-align: center;
}

.app-layout__sidebar-footer {
    padding: var(--spacing-md);
    border-top: 1px solid #e8eaed;
    background-color: #fafbfc;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

/* User Section */
.app-layout__user-section {
    padding: var(--spacing-md);
    background-color: white;
    border-radius: var(--border-radius-lg);
    border: 1px solid #e8eaed;
}

.app-layout__user-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
}

.app-layout__user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-primary), var(--color-alternative));
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
    flex-shrink: 0;
}

.app-layout__user-details {
    flex: 1;
    min-width: 0;
}

.app-layout__user-name {
    font-weight: 600;
    color: var(--color-text-primary);
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.app-layout__user-email {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.app-layout__user-actions {
    display: flex;
    gap: var(--spacing-xs);
    justify-content: flex-end;
}

.app-layout__action-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius-md);
    border: 1px solid #e8eaed;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 1.125rem;
}

.app-layout__action-btn:hover {
    background-color: var(--color-secondary);
    border-color: var(--color-primary);
    transform: translateY(-1px);
}

.app-layout__toggle-btn {
    width: 100%;
    padding: var(--spacing-md);
    border-radius: var(--border-radius-md);
    color: var(--color-text-secondary);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    background: transparent;
    border: none;
    font-weight: 500;
}

.app-layout__toggle-btn:hover {
    color: var(--color-primary);
    background-color: rgba(37, 99, 235, 0.06);
}

/* Main Content */
.app-layout__main {
    flex: 1;
    margin-left: 260px;
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 100vh;
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-layout__mobile-menu-btn {
    position: fixed;
    top: var(--spacing-lg);
    left: var(--spacing-lg);
    padding: var(--spacing-md);
    border-radius: var(--border-radius-lg);
    color: white;
    background-color: var(--color-primary);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    border: none;
    display: none;
    font-size: 1.5rem;
    z-index: 60;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
}

.app-layout__mobile-menu-btn:hover {
    background-color: #1d4ed8;
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.5);
}

.app-layout__logout-btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--border-radius-md);
    color: #dc2626;
    background-color: transparent;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    border: 1px solid #e8eaed;
    font-weight: 500;
    font-size: 0.95rem;
    width: 100%;
    justify-content: center;
}

.app-layout__logout-btn:hover {
    background-color: #fee2e2;
    border-color: #dc2626;
    transform: translateY(-1px);
}

.app-layout__sidebar--collapsed .app-layout__logout-text {
    display: none;
}

.app-layout__content {
    flex: 1;
    padding: var(--spacing-2xl);
    overflow: auto;
}

/* Mobile Overlay */
.app-layout__mobile-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 40;
}

/* Modal */
.app-layout__modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: var(--spacing-lg);
}

.app-layout__modal {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
}

.app-layout__modal-header {
    padding: var(--spacing-xl);
    border-bottom: 1px solid #e8eaed;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.app-layout__modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-primary);
    margin: 0;
}

.app-layout__modal-close {
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius-md);
    transition: all 0.2s ease;
}

.app-layout__modal-close:hover {
    background-color: var(--color-secondary);
    color: var(--color-text-primary);
}

.app-layout__modal-body {
    padding: var(--spacing-xl);
}

.app-layout__modal-footer {
    padding: var(--spacing-xl);
    border-top: 1px solid #e8eaed;
    display: flex;
    gap: var(--spacing-md);
    justify-content: flex-end;
}

.app-layout__form-group {
    margin-bottom: var(--spacing-lg);
}

.app-layout__label {
    display: block;
    font-weight: 500;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
    font-size: 0.9rem;
}

.app-layout__input {
    width: 100%;
    padding: var(--spacing-md);
    border: 1px solid #e8eaed;
    border-radius: var(--border-radius-md);
    font-size: 1rem;
    transition: all 0.2s ease;
}

.app-layout__input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.app-layout__btn {
    padding: var(--spacing-sm) var(--spacing-xl);
    border-radius: var(--border-radius-md);
    font-weight: 500;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
}

.app-layout__btn--primary {
    background-color: var(--color-primary);
    color: white;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

.app-layout__btn--primary:hover {
    background-color: #1d4ed8;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

.app-layout__btn--secondary {
    background-color: var(--color-secondary);
    color: var(--color-text-primary);
    border: 1px solid #e8eaed;
}

.app-layout__btn--secondary:hover {
    background-color: #e8eaed;
}

/* Responsive */
@media (max-width: 767px) {
    .app-layout__sidebar {
        transform: translateX(-100%);
    }

    .app-layout__sidebar--mobile-open {
        transform: translateX(0);
    }

    .app-layout__main {
        margin-left: 0;
    }

    .app-layout__mobile-menu-btn {
        display: flex;
    }

    .app-layout__content {
        padding: var(--spacing-lg);
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .app-layout__content {
        padding: var(--spacing-xl);
    }
}

@media (min-width: 768px) {
    .app-layout__sidebar {
        display: flex;
    }
}
</style>
