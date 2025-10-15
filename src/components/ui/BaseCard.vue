<template>
    <div :class="cardClasses">
        <div v-if="$slots.header || title" class="base-card__header">
            <slot name="header">
                <h3 v-if="title" class="base-card__title">{{ title }}</h3>
            </slot>
        </div>

        <div class="base-card__content">
            <slot />
        </div>

        <div v-if="$slots.footer" class="base-card__footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    title?: string
    variant?: 'default' | 'outlined' | 'elevated'
    padding?: 'none' | 'sm' | 'md' | 'lg'
    hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    padding: 'md',
    hoverable: false
})

const cardClasses = computed(() => {
    return [
        'base-card',
        `base-card--${props.variant}`,
        `base-card--padding-${props.padding}`,
        {
            'base-card--hoverable': props.hoverable
        }
    ]
})
</script>

<style scoped>
.base-card {
    background-color: var(--color-surface);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--color-border);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.base-card--outlined {
    border-color: var(--color-primary);
    border-width: 2px;
}

.base-card--elevated {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: transparent;
}

.base-card--hoverable {
    cursor: pointer;
}

.base-card--hoverable:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
}

.base-card__header {
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-secondary);
}

.base-card__title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 0;
}

.base-card__content {
    flex: 1;
}

.base-card__footer {
    border-top: 1px solid var(--color-border);
    background-color: var(--color-secondary);
}

/* Padding variants */
.base-card--padding-none .base-card__content {
    padding: 0;
}

.base-card--padding-sm .base-card__content {
    padding: var(--spacing-sm);
}

.base-card--padding-md .base-card__content {
    padding: var(--spacing-lg);
}

.base-card--padding-lg .base-card__content {
    padding: var(--spacing-xl);
}

/* Header y footer padding */
.base-card__header,
.base-card__footer {
    padding: var(--spacing-lg);
}

.base-card--padding-none .base-card__header,
.base-card--padding-none .base-card__footer {
    padding: 0;
}

.base-card--padding-sm .base-card__header,
.base-card--padding-sm .base-card__footer {
    padding: var(--spacing-sm);
}

.base-card--padding-lg .base-card__header,
.base-card--padding-lg .base-card__footer {
    padding: var(--spacing-xl);
}
</style>
