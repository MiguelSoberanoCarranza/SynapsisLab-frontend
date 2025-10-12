<template>
    <aside :class="sidebarClasses" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <!-- Header -->
        <div class="sidebar__header">
            <div class="sidebar__logo">
                <BaseLogo :size="isCollapsed ? 'sm' : 'md'" variant="primary" :show-text="!isCollapsed" />
            </div>
            <button v-if="!isMobile" @click="toggleCollapse" class="sidebar__toggle" :title="isCollapsed ? 'Expandir' : 'Colapsar'">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button v-else @click="closeSidebar" class="sidebar__close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>

        <!-- Search -->
        <div v-if="!isCollapsed || isHovering" class="sidebar__search">
            <div class="sidebar__search-input">
                <svg class="sidebar__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="Buscar..."
                    class="sidebar__search-field"
                />
            </div>
        </div>

        <!-- Navigation -->
        <nav class="sidebar__nav">
            <div v-for="section in menuSections" :key="section.title" class="sidebar__section">
                <div v-if="!isCollapsed || isHovering" class="sidebar__section-title">{{ section.title }}</div>
                
                <div v-for="item in section.items" :key="item.id" class="sidebar__menu-item-wrapper">
                    <!-- Item sin submódulos -->
                    <router-link 
                        v-if="!item.children" 
                        :to="item.path"
                        class="sidebar__menu-item"
                        :class="{ 'sidebar__menu-item--active': isActive(item.path) }"
                    >
                        <component :is="item.icon" class="sidebar__menu-icon" />
                        <span v-if="!isCollapsed || isHovering" class="sidebar__menu-text">{{ item.label }}</span>
                        <span v-if="item.badge && (!isCollapsed || isHovering)" class="sidebar__menu-badge">{{ item.badge }}</span>
                    </router-link>

                    <!-- Item con submódulos -->
                    <div v-else>
                        <button 
                            @click="toggleSubmenu(item.id)"
                            class="sidebar__menu-item"
                            :class="{ 
                                'sidebar__menu-item--active': isActive(item.path),
                                'sidebar__menu-item--open': openMenus.includes(item.id)
                            }"
                        >
                            <component :is="item.icon" class="sidebar__menu-icon" />
                            <span v-if="!isCollapsed || isHovering" class="sidebar__menu-text">{{ item.label }}</span>
                            <svg 
                                v-if="!isCollapsed || isHovering" 
                                class="sidebar__menu-arrow"
                                :class="{ 'sidebar__menu-arrow--open': openMenus.includes(item.id) }"
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>

                        <!-- Submódulos -->
                        <transition name="submenu">
                            <div v-show="openMenus.includes(item.id) && (!isCollapsed || isHovering)" class="sidebar__submenu">
                                <router-link
                                    v-for="child in item.children"
                                    :key="child.id"
                                    :to="child.path"
                                    class="sidebar__submenu-item"
                                    :class="{ 'sidebar__submenu-item--active': isActive(child.path) }"
                                >
                                    <component :is="child.icon" class="sidebar__submenu-icon" />
                                    <span class="sidebar__submenu-text">{{ child.label }}</span>
                                </router-link>
                            </div>
                        </transition>

                        <!-- Submódulos en hover (modo colapsado) -->
                        <transition name="hover-menu">
                            <div 
                                v-if="isCollapsed && isHovering && hoverItem === item.id" 
                                class="sidebar__hover-submenu"
                            >
                                <div class="sidebar__hover-submenu-title">{{ item.label }}</div>
                                <router-link
                                    v-for="child in item.children"
                                    :key="child.id"
                                    :to="child.path"
                                    class="sidebar__hover-submenu-item"
                                    :class="{ 'sidebar__hover-submenu-item--active': isActive(child.path) }"
                                >
                                    <component :is="child.icon" class="sidebar__hover-submenu-icon" />
                                    <span>{{ child.label }}</span>
                                </router-link>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Footer -->
        <div class="sidebar__footer">
            <!-- Theme Toggle -->
            <button class="sidebar__theme-toggle" @click="toggleTheme" :title="isDark ? 'Modo claro' : 'Modo oscuro'">
                <svg v-if="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" fill="currentColor"/>
                    <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
                </svg>
            </button>

            <!-- User Profile -->
            <div class="sidebar__user">
                <div class="sidebar__user-avatar" @click="toggleUserMenu">
                    <img src="https://ui-avatars.com/api/?name=Usuario&background=2563eb&color=fff" alt="Usuario" />
                </div>
                <div v-if="!isCollapsed || isHovering" class="sidebar__user-info" @click="toggleUserMenu">
                    <div class="sidebar__user-name">{{ userName }}</div>
                    <div class="sidebar__user-email">{{ userEmail }}</div>
                </div>
                <button v-if="!isCollapsed || isHovering" class="sidebar__user-menu-button" @click.stop="toggleUserMenu">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="5" r="2" fill="currentColor"/>
                        <circle cx="12" cy="12" r="2" fill="currentColor"/>
                        <circle cx="12" cy="19" r="2" fill="currentColor"/>
                    </svg>
                </button>
            </div>

            <!-- User Menu Dropdown -->
            <transition name="user-menu">
                <div v-if="showUserMenu && (!isCollapsed || isHovering)" class="sidebar__user-dropdown">
                    <a href="#" class="sidebar__user-dropdown-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
                            <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        <span>Perfil</span>
                    </a>
                    <a href="#" class="sidebar__user-dropdown-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                            <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        <span>Configuración</span>
                    </a>
                    <hr class="sidebar__user-dropdown-divider" />
                    <button @click="handleLogout" class="sidebar__user-dropdown-item sidebar__user-dropdown-item--logout">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </transition>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseLogo from '@/components/ui/BaseLogo.vue'

// Icons como componentes inline
const DashboardIcon = { template: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/></svg>' }
const SamplesIcon = { template: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 3H16.5C15.5 3 15 3.5 15 4.5V5.5C15 6.5 15.5 7 16.5 7H19.5C20.5 7 21 6.5 21 5.5V4.5C21 3.5 20.5 3 19.5 3Z" stroke="currentColor" stroke-width="2"/><path d="M7.5 3H4.5C3.5 3 3 3.5 3 4.5V5.5C3 6.5 3.5 7 4.5 7H7.5C8.5 7 9 6.5 9 5.5V4.5C9 3.5 8.5 3 7.5 3Z" stroke="currentColor" stroke-width="2"/><path d="M19.5 10H16.5C15.5 10 15 10.5 15 11.5V12.5C15 13.5 15.5 14 16.5 14H19.5C20.5 14 21 13.5 21 12.5V11.5C21 10.5 20.5 10 19.5 10Z" stroke="currentColor" stroke-width="2"/><path d="M7.5 10H4.5C3.5 10 3 10.5 3 11.5V12.5C3 13.5 3.5 14 4.5 14H7.5C8.5 14 9 13.5 9 12.5V11.5C9 10.5 8.5 10 7.5 10Z" stroke="currentColor" stroke-width="2"/><path d="M7.5 17H4.5C3.5 17 3 17.5 3 18.5V19.5C3 20.5 3.5 21 4.5 21H7.5C8.5 21 9 20.5 9 19.5V18.5C9 17.5 8.5 17 7.5 17Z" stroke="currentColor" stroke-width="2"/><path d="M19.5 17H16.5C15.5 17 15 17.5 15 18.5V19.5C15 20.5 15.5 21 16.5 21H19.5C20.5 21 21 20.5 21 19.5V18.5C21 17.5 20.5 17 19.5 17Z" stroke="currentColor" stroke-width="2"/></svg>' }
const AnalysisIcon = { template: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3V21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 14L11 10L15 14L21 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="14" r="2" fill="currentColor"/><circle cx="11" cy="10" r="2" fill="currentColor"/><circle cx="15" cy="14" r="2" fill="currentColor"/><circle cx="21" cy="8" r="2" fill="currentColor"/></svg>' }
const ResultsIcon = { template: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' }
const InboxIcon = { template: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2"/><path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2"/></svg>' }
const ExportIcon = { template: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' }
const StatsIcon = { template: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3V21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 16V11M12 16V8M17 16V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' }

interface Props {
    modelValue?: boolean
    isMobile?: boolean
}

interface Emits {
    (e: 'update:modelValue', value: boolean): void
    (e: 'logout'): void
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    isMobile: false
})

const emit = defineEmits<Emits>()

const router = useRouter()
const route = useRoute()

// Estado
const isCollapsed = ref(false)
const isHovering = ref(false)
const searchQuery = ref('')
// Cargar estado de menús desde localStorage
const savedMenus = localStorage.getItem('openMenus')
const openMenus = ref<string[]>(savedMenus ? JSON.parse(savedMenus) : ['samples'])
const hoverItem = ref<string | null>(null)
const isDark = ref(false)
const showUserMenu = ref(false)
const userName = ref('Usuario')
const userEmail = ref('usuario@laboratorio.com')

// Cargar datos del usuario
onMounted(() => {
    const email = localStorage.getItem('user_email')
    if (email) {
        userEmail.value = email
        userName.value = email.split('@')[0]
    }
})

// Menú de navegación
const menuSections = [
    {
        title: 'Menú',
        items: [
            {
                id: 'dashboard',
                label: 'Dashboard',
                path: '/dashboard',
                icon: DashboardIcon
            },
            {
                id: 'samples',
                label: 'Muestras',
                path: '/samples',
                icon: SamplesIcon,
                children: [
                    { id: 'samples-inbox', label: 'Recibidas', path: '/samples', icon: InboxIcon },
                    { id: 'samples-incoming', label: 'Pendientes', path: '/samples', icon: InboxIcon },
                    { id: 'samples-export', label: 'Exportar', path: '/samples', icon: ExportIcon }
                ]
            },
            {
                id: 'analysis',
                label: 'Análisis',
                path: '/analysis',
                icon: AnalysisIcon
            },
            {
                id: 'results',
                label: 'Resultados',
                path: '/results',
                icon: ResultsIcon
            }
        ]
    },
    {
        title: 'Otros',
        items: [
            {
                id: 'statistics',
                label: 'Estadísticas',
                path: '/dashboard',
                icon: StatsIcon
            }
        ]
    }
]

// Computed
const sidebarClasses = computed(() => [
    'sidebar',
    {
        'sidebar--collapsed': isCollapsed.value && !isHovering.value,
        'sidebar--hovering': isHovering.value,
        'sidebar--mobile': props.isMobile,
        'sidebar--open': props.modelValue && props.isMobile
    }
])

// Methods
const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
}

const handleMouseEnter = () => {
    if (isCollapsed.value && !props.isMobile) {
        isHovering.value = true
    }
}

const handleMouseLeave = () => {
    isHovering.value = false
    hoverItem.value = null
}

const toggleSubmenu = (id: string) => {
    const index = openMenus.value.indexOf(id)
    if (index > -1) {
        // Si ya está abierto, cerrarlo
        openMenus.value.splice(index, 1)
    } else {
        // Solo permite un menú abierto a la vez
        openMenus.value = [id]
    }
    // Guardar estado en localStorage
    localStorage.setItem('openMenus', JSON.stringify(openMenus.value))
}

const isActive = (path: string) => {
    return route.path === path
}

const toggleTheme = () => {
    isDark.value = !isDark.value
    // Aquí puedes implementar la lógica de cambio de tema
}

const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
    console.log('Toggle User Menu:', showUserMenu.value)
}

const closeSidebar = () => {
    emit('update:modelValue', false)
}

const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_email')
    router.push('/login')
    emit('logout')
}

// Click outside para cerrar menús
const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.sidebar__user') && !target.closest('.sidebar__user-dropdown')) {
        showUserMenu.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 250px;
    background-color: white;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 1000;
    overflow: visible;
    box-shadow: none;
}

.sidebar--collapsed {
    width: 72px;
}

.sidebar--hovering {
    width: 250px;
}

.sidebar--mobile {
    transform: translateX(-100%);
}

.sidebar--mobile.sidebar--open {
    transform: translateX(0);
}

/* Header */
.sidebar__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-lg);
    border-bottom: none;
    min-height: 72px;
}

.sidebar__logo {
    flex: 1;
    display: flex;
    align-items: center;
}

.sidebar__toggle,
.sidebar__close {
    background: none;
    border: none;
    padding: var(--spacing-xs);
    cursor: pointer;
    color: var(--color-text-secondary);
    border-radius: var(--border-radius-sm);
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sidebar__toggle:hover,
.sidebar__close:hover {
    background-color: var(--color-secondary);
    color: var(--color-primary);
}

.sidebar--collapsed .sidebar__toggle svg {
    transform: rotate(180deg);
}

/* Search */
.sidebar__search {
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: none;
}

.sidebar__search-input {
    position: relative;
    display: flex;
    align-items: center;
}

.sidebar__search-icon {
    position: absolute;
    left: var(--spacing-sm);
    color: var(--color-text-secondary);
    pointer-events: none;
}

.sidebar__search-field {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) 36px;
    border: none;
    border-radius: var(--border-radius-md);
    font-size: 0.875rem;
    color: var(--color-text-primary);
    background-color: #f5f5f5;
    transition: all 0.2s ease-in-out;
}

.sidebar__search-field:focus {
    outline: none;
    background-color: #e8e8e8;
}

.sidebar__search-field::placeholder {
    color: var(--color-text-muted);
}

/* Navigation */
.sidebar__nav {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: var(--spacing-md) 0;
}

.sidebar__nav::-webkit-scrollbar {
    width: 4px;
}

.sidebar__nav::-webkit-scrollbar-thumb {
    background-color: var(--color-secondary-darker);
    border-radius: 2px;
}

.sidebar__section {
    margin-bottom: var(--spacing-lg);
}

.sidebar__section-title {
    padding: var(--spacing-md) var(--spacing-lg) var(--spacing-sm);
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: left;
}

.sidebar__menu-item-wrapper {
    position: relative;
}

.sidebar__menu-item {
    display: flex;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-lg);
    color: #6b7280;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    font-size: 0.9375rem;
    position: relative;
    border-radius: 0;
    text-align: left;
}

.sidebar__menu-item:hover {
    background-color: #f3f4f6;
    color: var(--color-text-primary);
}

.sidebar__menu-item--active {
    color: var(--color-primary);
    background-color: #e0e7ff;
    font-weight: 500;
}

.sidebar__menu-item--active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: var(--color-primary);
}

.sidebar__menu-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: currentColor;
}

.sidebar__menu-text {
    flex: 1;
    margin-left: var(--spacing-md);
    white-space: nowrap;
    text-align: left;
}

.sidebar__menu-arrow {
    flex-shrink: 0;
    margin-left: var(--spacing-sm);
    transition: transform 0.2s ease-in-out;
}

.sidebar__menu-arrow--open {
    transform: rotate(180deg);
}

.sidebar__menu-badge {
    flex-shrink: 0;
    margin-left: var(--spacing-sm);
    padding: 2px 8px;
    background-color: var(--color-alternative);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 10px;
}

/* Submenu */
.sidebar__submenu {
    overflow: hidden;
    background-color: transparent;
}

.sidebar__submenu-item {
    display: flex;
    align-items: center;
    padding: var(--spacing-xs) var(--spacing-lg) var(--spacing-xs) calc(var(--spacing-lg) + 36px);
    color: #6b7280;
    text-decoration: none;
    font-size: 0.875rem;
    transition: all 0.2s ease-in-out;
    text-align: left;
}

.sidebar__submenu-item:hover {
    background-color: #f3f4f6;
    color: var(--color-text-primary);
}

.sidebar__submenu-item--active {
    color: var(--color-primary);
    background-color: #e0e7ff;
    font-weight: 500;
}

.sidebar__submenu-icon {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-right: var(--spacing-sm);
}

.sidebar__submenu-text {
    flex: 1;
    white-space: nowrap;
    text-align: left;
}

/* Hover Submenu (collapsed mode) */
.sidebar__hover-submenu {
    position: absolute;
    left: 100%;
    top: 0;
    min-width: 200px;
    background-color: white;
    border: none;
    border-radius: var(--border-radius-md);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: var(--spacing-sm);
    margin-left: var(--spacing-sm);
    z-index: 1001;
}

.sidebar__hover-submenu-title {
    padding: var(--spacing-sm);
    font-weight: 600;
    color: var(--color-text-primary);
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: var(--spacing-xs);
    text-align: left;
}

.sidebar__hover-submenu-item {
    display: flex;
    align-items: center;
    padding: var(--spacing-sm);
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
    border-radius: var(--border-radius-sm);
    transition: all 0.2s ease-in-out;
    text-align: left;
}

.sidebar__hover-submenu-item:hover {
    background-color: #f3f4f6;
    color: var(--color-text-primary);
}

.sidebar__hover-submenu-item--active {
    color: var(--color-primary);
    background-color: #e0e7ff;
    font-weight: 500;
}

.sidebar__hover-submenu-icon {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-right: var(--spacing-sm);
}

/* Footer */
.sidebar__footer {
    border-top: none;
    padding: var(--spacing-md);
    margin-top: auto;
    position: relative;
}

.sidebar__theme-toggle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-sm);
    background: none;
    border: none;
    border-radius: var(--border-radius-md);
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin-bottom: var(--spacing-sm);
}

.sidebar__theme-toggle:hover {
    background-color: #f3f4f6;
    color: var(--color-text-primary);
}

.sidebar__user {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    border-radius: var(--border-radius-md);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;
}

.sidebar__user:hover {
    background-color: #f3f4f6;
}

.sidebar__user-avatar {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
}

.sidebar__user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.sidebar__user-info {
    flex: 1;
    min-width: 0;
}

.sidebar__user-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}

.sidebar__user-email {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}

.sidebar__user-menu-button {
    flex-shrink: 0;
    background: none;
    border: none;
    padding: var(--spacing-xs);
    color: var(--color-text-secondary);
    cursor: pointer;
    border-radius: var(--border-radius-sm);
    transition: all 0.2s ease-in-out;
}

.sidebar__user-menu-button:hover {
    background-color: white;
    color: var(--color-primary);
}

.sidebar__user-dropdown {
    position: absolute;
    bottom: 100%;
    left: var(--spacing-md);
    right: var(--spacing-md);
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: var(--border-radius-md);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    padding: var(--spacing-xs);
    margin-bottom: var(--spacing-sm);
    z-index: 1001;
}

.sidebar__user-dropdown-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
    border-radius: var(--border-radius-sm);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
}

.sidebar__user-dropdown-item:hover {
    background-color: #f3f4f6;
    color: var(--color-text-primary);
}

.sidebar__user-dropdown-item--logout {
    color: #dc2626;
}

.sidebar__user-dropdown-item--logout:hover {
    background-color: #fee2e2;
    color: #dc2626;
}

.sidebar__user-dropdown-divider {
    margin: var(--spacing-xs) 0;
    border: none;
    border-top: 1px solid #e5e7eb;
}

/* Transiciones */
.submenu-enter-active {
    transition: max-height 0.3s ease-out, opacity 0.2s ease-out;
    overflow: hidden;
}

.submenu-leave-active {
    transition: max-height 0.3s ease-in, opacity 0.2s ease-in;
    overflow: hidden;
}

.submenu-enter-from {
    max-height: 0;
    opacity: 0;
}

.submenu-enter-to {
    max-height: 300px;
    opacity: 1;
}

.submenu-leave-from {
    max-height: 300px;
    opacity: 1;
}

.submenu-leave-to {
    max-height: 0;
    opacity: 0;
}

.hover-menu-enter-active,
.hover-menu-leave-active {
    transition: all 0.2s ease-in-out;
}

.hover-menu-enter-from,
.hover-menu-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}

.user-menu-enter-active,
.user-menu-leave-active {
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.user-menu-enter-from,
.user-menu-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

/* Responsive */
@media (max-width: 767px) {
    .sidebar {
        width: 280px;
    }

    .sidebar__header {
        justify-content: space-between;
    }

    .sidebar__toggle {
        display: none;
    }
}

/* Collapsed state adjustments */
.sidebar--collapsed .sidebar__menu-item {
    justify-content: center;
    padding-left: var(--spacing-lg);
    padding-right: var(--spacing-lg);
}

.sidebar--collapsed .sidebar__user {
    justify-content: center;
}

.sidebar--collapsed .sidebar__theme-toggle {
    padding: var(--spacing-sm) var(--spacing-md);
}
</style>

