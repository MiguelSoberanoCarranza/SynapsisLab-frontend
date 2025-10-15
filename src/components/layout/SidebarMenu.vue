<template>
    <nav class="sidebar-menu" :class="{ 'sidebar-menu--collapsed': props.isCollapsed }">
        <div v-for="section in props.menuSections" :key="section.title" class="menu-section">
            <div v-if="!props.isCollapsed" class="section-title">{{ section.title }}</div>

            <div v-for="item in section.items" :key="item.id" class="menu-item-wrapper">
                <!-- Item simple -->
                <router-link v-if="!item.children" :to="item.path" class="menu-item"
                    :class="{ 'menu-item--active': isActive(item.path) }" :title="props.isCollapsed ? item.label : ''"
                    @mouseenter="props.isCollapsed ? showTooltip($event, item.label) : null"
                    @mouseleave="props.isCollapsed ? hideTooltip() : null">
                    <BaseIcon :name="item.icon" />
                    <span v-if="!props.isCollapsed" class="menu-text">{{ item.label }}</span>
                </router-link>

                <!-- Item con submódulos -->
                <div v-else>
                    <button @click="toggleSubmenu(item.id)" class="menu-item"
                        :class="{ 'menu-item--open': openMenus.includes(item.id) }"
                        :title="props.isCollapsed ? item.label : ''"
                        @mouseenter="props.isCollapsed ? showTooltip($event, item.label) : null"
                        @mouseleave="props.isCollapsed ? hideTooltip() : null">
                        <BaseIcon :name="item.icon" />
                        <span v-if="!props.isCollapsed" class="menu-text">{{ item.label }}</span>
                        <svg v-if="!props.isCollapsed" class="menu-arrow"
                            :class="{ 'menu-arrow--open': openMenus.includes(item.id) }" width="16" height="16"
                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>

                    <!-- Submódulos -->
                    <div v-show="openMenus.includes(item.id)" class="submenu">
                        <router-link v-for="child in item.children" :key="child.id" :to="child.path"
                            class="submenu-item" :class="{ 'submenu-item--active': isActive(child.path) }"
                            :title="props.isCollapsed ? child.label : ''"
                            @mouseenter="props.isCollapsed ? showTooltip($event, child.label) : null"
                            @mouseleave="props.isCollapsed ? hideTooltip() : null">
                            <BaseIcon :name="child.icon" :size="18" />
                            <span v-if="!props.isCollapsed">{{ child.label }}</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Tooltip dinámico -->
    <div v-if="tooltip.visible" class="tooltip-dynamic" :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
        {{ tooltip.text }}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { menuSections } from '@/config/menuConfig'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import type { MenuSection } from '@/types/menu'

interface Props {
    menuSections?: MenuSection[]
    isCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    menuSections: () => menuSections,
    isCollapsed: false
})

const route = useRoute()
// Cargar estado de menús desde localStorage
const savedMenus = localStorage.getItem('openMenus')
const openMenus = ref<string[]>(savedMenus ? JSON.parse(savedMenus) : ['samples'])

// Tooltip dinámico
const tooltip = ref({
    visible: false,
    x: 0,
    y: 0,
    text: ''
})

const isActive = (path: string) => route.path === path

const toggleSubmenu = (id: string) => {
    const index = openMenus.value.indexOf(id)
    if (index > -1) {
        openMenus.value.splice(index, 1)
    } else {
        openMenus.value = [id] // Solo un menú abierto
    }
    // Guardar estado en localStorage
    localStorage.setItem('openMenus', JSON.stringify(openMenus.value))
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
    tooltip.value.visible = false
}
</script>

<style scoped>
.sidebar-menu {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 0;
}

.menu-section {
    margin-bottom: 1.5rem;
}

.section-title {
    padding: 1rem 1.5rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 0.5rem 1.5rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    font-size: 0.9375rem;
    position: relative;
    text-align: left;
    justify-content: flex-start;
}

.menu-item:hover {
    background-color: var(--color-secondary);
    color: var(--color-text-primary);
}

.menu-item--active {
    color: var(--color-primary);
    background-color: var(--color-secondary);
    font-weight: 500;
}

.menu-item--active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: var(--color-primary);
}

.menu-text {
    margin-left: 1rem;
    flex: 1;
}

.menu-arrow {
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
}

.menu-arrow--open {
    transform: rotate(180deg);
}

.submenu {
    background-color: transparent;
}

.submenu-item {
    display: flex;
    align-items: center;
    padding: 0.25rem 1.5rem 0.25rem 3.75rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    text-align: left;
}

.submenu-item:hover {
    background-color: var(--color-secondary);
    color: var(--color-text-primary);
}

.submenu-item--active {
    color: var(--color-primary);
    background-color: var(--color-secondary);
    font-weight: 500;
}

.submenu-item span {
    margin-left: 0.5rem;
}


/* Collapsed state adjustments - solo cuando está colapsado */
.sidebar-menu--collapsed .menu-item {
    justify-content: center;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}

.sidebar-menu--collapsed .menu-text {
    display: none !important;
}

.sidebar-menu--collapsed .menu-arrow {
    display: none !important;
}

.sidebar-menu--collapsed .submenu-item {
    justify-content: center;
    padding: 0.25rem 1.5rem;
}

.sidebar-menu--collapsed .submenu-item span {
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
