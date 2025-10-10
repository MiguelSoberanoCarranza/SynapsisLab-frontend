<template>
    <button :class="buttonClasses" :disabled="disabled || loading" :type="type" @click="handleClick">
        <span v-if="loading" class="loading-spinner" aria-hidden="true"></span>
        <slot v-if="!loading" />
        <span v-else class="sr-only">Cargando...</span>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    variant?: 'primary' | 'secondary' | 'outline' | 'alternative'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
    type?: 'button' | 'submit' | 'reset'
    fullWidth?: boolean
}

interface Emits {
    (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    type: 'button',
    fullWidth: false
})

const emit = defineEmits<Emits>()

const buttonClasses = computed(() => {
    const baseClasses = [
        'base-button',
        `base-button--${props.variant}`,
        `base-button--${props.size}`,
        {
            'base-button--disabled': props.disabled,
            'base-button--loading': props.loading,
            'base-button--full-width': props.fullWidth
        }
    ]
    return baseClasses
})

const handleClick = (event: MouseEvent) => {
    if (!props.disabled && !props.loading) {
        emit('click', event)
    }
}
</script>

<style scoped>
.base-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    transition: all 0.25s ease-in-out;
    border: 1px solid transparent;
    cursor: pointer;
    user-select: none;
}

.base-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.base-button:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

/* Variantes */
.base-button--primary {
    background-color: var(--color-primary);
    color: white;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

.base-button--primary:hover:not(.base-button--disabled) {
    background-color: #1d4ed8;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

.base-button--secondary {
    background-color: var(--color-secondary);
    color: var(--color-primary);
    border-color: #e8eaed;
}

.base-button--secondary:hover:not(.base-button--disabled) {
    background-color: #e8eaed;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.base-button--outline {
    background-color: transparent;
    color: var(--color-primary);
    border-color: var(--color-primary);
}

.base-button--outline:hover:not(.base-button--disabled) {
    background-color: var(--color-primary);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.base-button--alternative {
    background-color: var(--color-alternative);
    color: white;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.base-button--alternative:hover:not(.base-button--disabled) {
    background-color: #059669;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

/* Tamaños */
.base-button--sm {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.875rem;
    border-radius: var(--border-radius-sm);
    min-height: 2rem;
}

.base-button--md {
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: 1rem;
    border-radius: var(--border-radius-md);
    min-height: 2.75rem;
}

.base-button--lg {
    padding: var(--spacing-md) var(--spacing-xl);
    font-size: 1.125rem;
    border-radius: var(--border-radius-lg);
    min-height: 3.5rem;
}

/* Estados especiales */
.base-button--full-width {
    width: 100%;
}

.base-button--loading {
    cursor: wait;
}

/* Spinner de carga */
.loading-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Accesibilidad */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
</style>
