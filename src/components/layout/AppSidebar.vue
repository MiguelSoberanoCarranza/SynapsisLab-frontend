<template>
    <aside :class="sidebarClasses">
        <!-- Header -->
        <div class="sidebar__header">
            <!-- Logo clickeable para expandir/contraer -->
            <div v-if="!isMobile" @click="toggleCollapse" class="sidebar__logo-container"
                :title="isCollapsed ? 'Expandir menú' : 'Contraer menú'"
                @mouseenter="isCollapsed ? showTooltip($event, 'Expandir menú') : null" @mouseleave="hideTooltip()">
                <BaseLogo size="md" variant="light" :show-text="!isCollapsed" />
            </div>
            <!-- Logo normal en móvil -->
            <BaseLogo v-else size="md" variant="light" :show-text="!isCollapsed" />
            <!-- Botón de cerrar (solo en móvil) -->
            <button v-if="isMobile" @click="closeSidebar" class="sidebar__close" title="Cerrar menú"
                @mouseenter="showTooltip($event, 'Cerrar menú')" @mouseleave="hideTooltip()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>
        </div>

        <!-- Search -->
        <div v-if="!isCollapsed" class="sidebar__search">
            <div class="sidebar__search-input">
                <svg class="sidebar__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" />
                    <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
                <input v-model="searchQuery" type="text" placeholder="Buscar..." class="sidebar__search-field"
                    @input="handleSearch" />
            </div>
        </div>

        <!-- Navigation -->
        <SidebarMenu :menu-sections="filteredMenuSections" :is-collapsed="isCollapsed" />

        <!-- Footer -->
        <div class="sidebar__footer">
            <!-- Theme Toggle -->
            <button class="sidebar__theme-toggle" @click="toggleTheme" :title="isDark ? 'Modo claro' : 'Modo oscuro'"
                @mouseenter="isCollapsed ? showTooltip($event, isDark ? 'Modo claro' : 'Modo oscuro') : null"
                @mouseleave="isCollapsed ? hideTooltip() : null">
                <svg v-if="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                    <path
                        d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
                </svg>
            </button>

            <!-- User Profile -->
            <div class="sidebar__user">
                <div class="sidebar__user-avatar" @click="toggleUserMenu">
                    <img :src="userAvatar" alt="Usuario" />
                </div>
                <div v-if="!isCollapsed" class="sidebar__user-info" @click="toggleUserMenu">
                    <div class="sidebar__user-name">{{ userName }}</div>
                    <div class="sidebar__user-email">{{ userEmail }}</div>
                </div>
                <button v-if="!isCollapsed" class="sidebar__user-menu-button" @click.stop="toggleUserMenu">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="5" r="2" fill="currentColor" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                        <circle cx="12" cy="19" r="2" fill="currentColor" />
                    </svg>
                </button>
            </div>

            <!-- User Menu Dropdown -->
            <transition name="user-menu">
                <div v-if="showUserMenu && !isCollapsed" class="sidebar__user-dropdown">
                    <a href="#" class="sidebar__user-dropdown-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" />
                            <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                        <span>Perfil</span>
                    </a>
                    <a href="#" class="sidebar__user-dropdown-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                            <path
                                d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                        <span>Configuración</span>
                    </a>
                    <hr class="sidebar__user-dropdown-divider" />
                    <button @click="handleLogout"
                        class="sidebar__user-dropdown-item sidebar__user-dropdown-item--logout">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            <path d="M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </transition>
        </div>
    </aside>

    <!-- Tooltip dinámico -->
    <div v-if="tooltip.visible" class="tooltip-dynamic" :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
        {{ tooltip.text }}
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BaseLogo from '@/components/ui/BaseLogo.vue'
import SidebarMenu from '@/components/layout/SidebarMenu.vue'
import { useAuth } from '@/composables/useAuth'
import { useSearch } from '@/composables/useSearch'
import { useTheme } from '@/composables/useTheme'
import type { AppSidebarProps, AppSidebarEmits } from '@/types/layout'

const props = withDefaults(defineProps<AppSidebarProps>(), {
    modelValue: false,
    isMobile: false
})

const emit = defineEmits<AppSidebarEmits>()

const { logout, userEmail, userName } = useAuth()
const { searchQuery, filteredMenuSections } = useSearch()
const { isDark, toggleTheme } = useTheme()

const isCollapsed = ref(false)
const showUserMenu = ref(false)

// Tooltip dinámico
const tooltip = ref({
    visible: false,
    x: 0,
    y: 0,
    text: ''
})

const userAvatar = computed(() =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName.value)}&background=2563eb&color=fff`
)

const sidebarClasses = computed(() => [
    'sidebar',
    {
        'sidebar--collapsed': isCollapsed.value,
        'sidebar--mobile': props.isMobile,
        'sidebar--open': props.modelValue && props.isMobile
    }
])

const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
    // Ocultar tooltip cuando se cambia el estado
    hideTooltip()
}

const closeSidebar = () => {
    emit('update:modelValue', false)
    // Ocultar tooltip cuando se cierra el sidebar
    hideTooltip()
}

const handleSearch = () => {
    // La búsqueda se maneja automáticamente por el composable
}


const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
}

const handleLogout = () => {
    logout()
    emit('logout')
}

const showTooltip = (event: MouseEvent, text: string) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    tooltip.value = {
        visible: true,
        x: rect.right + 8,
        y: rect.top + rect.height / 2,
        text
    }
}

const hideTooltip = () => {
    if (tooltip.value.visible) {
        tooltip.value.visible = false
        tooltip.value.text = ''
        tooltip.value.x = 0
        tooltip.value.y = 0
    }
}

// Click outside para cerrar menús y tooltips
const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.sidebar__user') && !target.closest('.sidebar__user-dropdown')) {
        showUserMenu.value = false
    }
    // Ocultar tooltip al hacer clic en cualquier parte
    hideTooltip()
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
    background-color: var(--color-surface);
    border-right: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease, transform 0.3s ease;
    z-index: 1000;
    overflow: visible;
}

.sidebar--collapsed {
    width: 72px;
}

.sidebar--mobile {
    transform: translateX(-100%);
}

.sidebar--mobile.sidebar--open {
    transform: translateX(0);
}

.sidebar__header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    border-bottom: none;
    min-height: 72px;
    position: relative;
}

.sidebar__logo-container {
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 0.5rem;
    padding: 0.25rem;
}

.sidebar__logo-container:hover {
    background-color: var(--color-secondary);
    opacity: 0.1;
    transform: scale(1.02);
}

.sidebar__close {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: var(--color-text-secondary);
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    opacity: 0.7;
}

.sidebar__close:hover {
    background-color: var(--color-secondary);
    color: var(--color-primary);
}

.sidebar__search {
    padding: 1rem 1.5rem;
}

.sidebar__search-input {
    position: relative;
    display: flex;
    align-items: center;
}

.sidebar__search-icon {
    position: absolute;
    left: 0.75rem;
    color: var(--color-text-secondary);
    pointer-events: none;
}

.sidebar__search-field {
    width: 100%;
    padding: 0.75rem 0.75rem 0.75rem 2.5rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text-primary);
    background-color: var(--color-secondary);
    transition: all 0.2s ease;
}

.sidebar__search-field:focus {
    outline: none;
    background-color: var(--color-border);
}

.sidebar__search-field::placeholder {
    color: var(--color-text-secondary);
}

.sidebar__footer {
    border-top: none;
    padding: 1rem;
    margin-top: auto;
    position: relative;
}

.sidebar__theme-toggle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    background: none;
    border: none;
    border-radius: 0.5rem;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 0.5rem;
}

.sidebar__theme-toggle:hover {
    background-color: var(--color-secondary);
    color: var(--color-text-primary);
}

.sidebar__user {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
}

.sidebar__user:hover {
    background-color: var(--color-secondary);
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
}

.sidebar__user-email {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.sidebar__user-menu-button {
    flex-shrink: 0;
    background: none;
    border: none;
    padding: 0.25rem;
    color: var(--color-text-secondary);
    cursor: pointer;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
}

.sidebar__user-menu-button:hover {
    background-color: var(--color-surface);
    color: var(--color-primary);
}

.sidebar__user-dropdown {
    position: absolute;
    bottom: 100%;
    left: 1rem;
    right: 1rem;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    z-index: 1001;
}

.sidebar__user-dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
}

.sidebar__user-dropdown-item:hover {
    background-color: var(--color-secondary);
    color: var(--color-text-primary);
}

.sidebar__user-dropdown-item--logout {
    color: var(--color-alternative);
}

.sidebar__user-dropdown-item--logout:hover {
    background-color: var(--color-secondary);
    color: var(--color-alternative);
}

.sidebar__user-dropdown-divider {
    margin: 0.5rem 0;
    border: none;
    border-top: 1px solid var(--color-border);
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

}

/* Collapsed state adjustments */
.sidebar--collapsed .sidebar__search {
    display: none;
}

.sidebar--collapsed .sidebar__header {
    justify-content: center;
}



.sidebar--collapsed .sidebar__theme-toggle {
    justify-content: center;
    padding: 0.75rem;
}

.sidebar--collapsed .sidebar__user {
    justify-content: center;
}

.sidebar--collapsed .sidebar__user-info {
    display: none;
}

.sidebar--collapsed .sidebar__user-menu-button {
    display: none;
}

/* Tooltip dinámico */
.tooltip-dynamic {
    position: fixed;
    background-color: var(--color-text-primary);
    color: var(--color-secondary);
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    white-space: nowrap;
    z-index: 9999;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    pointer-events: none;
    transform: translateY(-50%);
    animation: tooltipFadeIn 0.2s ease-in-out;
}

@keyframes tooltipFadeIn {
    from {
        opacity: 0;
        transform: translateY(-50%) scale(0.9);
    }

    to {
        opacity: 1;
        transform: translateY(-50%) scale(1);
    }
}
</style>