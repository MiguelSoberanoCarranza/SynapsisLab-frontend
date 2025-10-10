<template>
    <div :class="logoClasses">
        <div class="base-logo__icon">
            <svg viewBox="0 0 100 100" class="base-logo__svg">
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#34D399;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="url(#logoGradient)" opacity="0.2" />
                <circle cx="30" cy="35" r="4" fill="white" />
                <circle cx="50" cy="25" r="4" fill="white" />
                <circle cx="70" cy="35" r="4" fill="white" />
                <circle cx="30" cy="65" r="4" fill="white" />
                <circle cx="70" cy="65" r="4" fill="white" />
                <path d="M30 35 Q40 45 50 40 T70 35" stroke="white" stroke-width="2.5" fill="none" />
                <path d="M30 65 Q40 55 50 60 T70 65" stroke="white" stroke-width="2.5" fill="none" />
                <path d="M50 25 L50 75" stroke="white" stroke-width="2.5" />
            </svg>
        </div>
        <div v-if="showText" class="base-logo__text">
            <span class="base-logo__name">Synapsis</span><span class="base-logo__name--alt">Lab</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    showText?: boolean
    variant?: 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    showText: true,
    variant: 'light'
})

const logoClasses = computed(() => {
    return [
        'base-logo',
        `base-logo--${props.size}`,
        `base-logo--${props.variant}`
    ]
})
</script>

<style scoped>
.base-logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.base-logo__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-sm);
}

.base-logo__svg {
    width: 100%;
    height: 100%;
}

.base-logo__text {
    font-weight: 600;
    letter-spacing: 0.5px;
    display: flex;
}

.base-logo__name {
    color: inherit;
}

.base-logo__name--alt {
    color: var(--color-alternative);
    margin-left: 2px;
}

/* Tamaños */
.base-logo--sm .base-logo__icon {
    width: 2.5rem;
    height: 2.5rem;
}

.base-logo--sm .base-logo__text {
    font-size: 0.875rem;
}

.base-logo--md .base-logo__icon {
    width: 3.5rem;
    height: 3.5rem;
}

.base-logo--md .base-logo__text {
    font-size: 1rem;
}

.base-logo--lg .base-logo__icon {
    width: 5rem;
    height: 5rem;
}

.base-logo--lg .base-logo__text {
    font-size: 1.25rem;
}

.base-logo--xl .base-logo__icon {
    width: 6rem;
    height: 6rem;
}

.base-logo--xl .base-logo__text {
    font-size: 1.5rem;
}

/* Variantes de color */
.base-logo--light .base-logo__text {
    color: white;
}

.base-logo--light .base-logo__name--alt {
    color: #34d399;
}

.base-logo--dark .base-logo__text {
    color: var(--color-text-primary);
}

.base-logo--dark .base-logo__name--alt {
    color: var(--color-alternative);
}

/* Animación sutil */
.base-logo__icon {
    transition: transform 0.3s ease;
}

.base-logo:hover .base-logo__icon {
    transform: scale(1.05);
}
</style>
