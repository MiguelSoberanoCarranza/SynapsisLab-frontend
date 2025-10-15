<template>
    <div class="base-input" :class="{ 'base-input--error': hasError }">
        <label v-if="label" :for="inputId" class="base-input__label">
            {{ label }}
            <span v-if="required" class="base-input__required" aria-label="requerido">*</span>
        </label>

        <div class="base-input__wrapper">
            <input :id="inputId" ref="inputRef" v-model="inputValue" :type="type" :placeholder="placeholder"
                :disabled="disabled" :readonly="readonly" :required="required" :autocomplete="autocomplete"
                class="base-input__field" @blur="handleBlur" @focus="handleFocus" @input="handleInput" />

            <div v-if="icon || $slots.icon" class="base-input__icon">
                <slot name="icon">
                    <component :is="icon" v-if="icon" />
                </slot>
            </div>
        </div>

        <div v-if="helpText || hasError" class="base-input__message">
            <span v-if="hasError" class="base-input__error-text">
                {{ errorMessage }}
            </span>
            <span v-else-if="helpText" class="base-input__help-text">
                {{ helpText }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
    modelValue?: string | number
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
    label?: string
    placeholder?: string
    helpText?: string
    errorMessage?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    autocomplete?: string
    icon?: any
}

interface Emits {
    (e: 'update:modelValue', value: string | number): void
    (e: 'blur', event: FocusEvent): void
    (e: 'focus', event: FocusEvent): void
    (e: 'input', event: Event): void
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    disabled: false,
    readonly: false,
    required: false
})

const emit = defineEmits<Emits>()

const inputRef = ref<HTMLInputElement>()
const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const inputValue = computed({
    get: () => props.modelValue ?? '',
    set: (value) => emit('update:modelValue', value)
})

const hasError = computed(() => Boolean(props.errorMessage))

const handleBlur = (event: FocusEvent) => {
    emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
    emit('focus', event)
}

const handleInput = (event: Event) => {
    emit('input', event)
}

// Exponer métodos para uso externo
defineExpose({
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur(),
    select: () => inputRef.value?.select()
})
</script>

<style scoped>
.base-input {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.base-input__label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-primary);
    background-color: transparent !important;
    background: none !important;
}

.base-input__required {
    color: var(--color-alternative);
    margin-left: var(--spacing-xs);
}

.base-input__wrapper {
    position: relative;
}

.base-input__field {
    width: 100%;

    font-size: 1rem;
    color: var(--color-text-primary);

    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    background-color: var(--color-background);
    transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
}

.base-input__field:disabled {
    background-color: var(--color-secondary);
    cursor: not-allowed;
}

.base-input__field:read-only {
    background-color: var(--color-secondary);
}

.base-input__field:focus {
    outline: none;
    border-color: var(--color-primary);
    background-color: var(--color-background);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.base-input__field::placeholder {
    color: var(--color-text-muted);
}

.base-input--error .base-input__field {
    border-color: var(--color-alternative);
    background-color: var(--color-secondary);
}

.base-input--error .base-input__field:focus {
    border-color: var(--color-alternative);
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.base-input__icon {
    position: absolute;
    right: var(--spacing-sm);
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-secondary);
    width: 1.25rem;
    height: 1.25rem;
}

.base-input__field:focus+.base-input__icon {
    color: var(--color-primary);
}

.base-input__message {
    font-size: 0.875rem;
}

.base-input__help-text {
    color: var(--color-text-muted);
}

.base-input__error-text {
    color: var(--color-alternative);
}
</style>
