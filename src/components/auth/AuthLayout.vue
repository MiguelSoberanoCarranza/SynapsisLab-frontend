<template>
    <div class="auth-layout">
        <!-- Desktop/Tablet Layout -->
        <div class="auth-layout__desktop">
            <!-- Left Section - Branding -->
            <div class="auth-layout__branding">
                <div class="auth-layout__branding-content">
                    <BaseLogo size="xl" variant="light" :show-text="true" class="auth-layout__logo" />
                    <p class="auth-layout__tagline">Software de Laboratorios</p>
                </div>

                <!-- Wave Background -->
                <div class="auth-layout__waves">
                    <div class="auth-layout__wave auth-layout__wave--1"></div>
                    <div class="auth-layout__wave auth-layout__wave--2"></div>
                    <div class="auth-layout__wave auth-layout__wave--3"></div>
                </div>
            </div>

            <!-- Right Section - Form -->
            <div class="auth-layout__form-section">
                <slot />
            </div>
        </div>

        <!-- Mobile Layout -->
        <div class="auth-layout__mobile">
            <!-- Welcome Screen (only for login) -->
            <div v-if="isWelcomeScreen" class="auth-layout__welcome">
                <!-- Logo en la parte superior -->
                <div class="auth-layout__welcome-header">
                    <BaseLogo size="md" variant="light" :show-text="true" />
                </div>

                <div class="auth-layout__welcome-content">
                    <h1 class="auth-layout__welcome-title">
                        Bienvenido a SynapsisLab
                    </h1>
                    <p class="auth-layout__welcome-subtitle">
                        Te facilitamos la gestión
                    </p>

                    <div class="auth-layout__welcome-icon">
                        <BaseLogo size="xl" variant="light" :show-text="false" />
                    </div>

                    <BaseButton variant="primary" size="lg" full-width class="auth-layout__welcome-button"
                        @click="$emit('show-login')">
                        INICIAR SESIÓN
                    </BaseButton>
                </div>

                <!-- Wave Background -->
                <div class="auth-layout__waves">
                    <div class="auth-layout__wave auth-layout__wave--1"></div>
                    <div class="auth-layout__wave auth-layout__wave--2"></div>
                    <div class="auth-layout__wave auth-layout__wave--3"></div>
                </div>
            </div>

            <!-- Form Screen -->
            <div v-else class="auth-layout__form-mobile">
                <!-- Header -->
                <div class="auth-layout__form-header">
                    <BaseLogo size="sm" variant="dark" :show-text="true" class="auth-layout__form-logo" />
                </div>

                <!-- Form -->
                <div class="auth-layout__form-content">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseLogo from '@/components/ui/BaseLogo.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
    isWelcomeScreen?: boolean
    isSignup?: boolean
}

interface Emits {
    (e: 'show-login'): void
    (e: 'show-signup'): void
}

const props = withDefaults(defineProps<Props>(), {
    isWelcomeScreen: false,
    isSignup: false
})

defineEmits<Emits>()
</script>

<style scoped>
.auth-layout {
    min-height: 100vh;
    overflow: hidden;
}

/* Desktop/Tablet Layout */
.auth-layout__desktop {
    min-height: 100vh;
    display: none;
    overflow: hidden;
}

@media (min-width: 768px) {
    .auth-layout__desktop {
        display: flex;
    }
}

.auth-layout__branding {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: slideInLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.auth-layout__branding-content {
    text-align: center;
    z-index: 10;
    position: relative;
    animation: fadeInScale 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s backwards;
}

.auth-layout__logo {
    margin-bottom: var(--spacing-xl);
    transform: scale(1.2);
}

.auth-layout__tagline {
    color: var(--color-secondary);
    font-size: 1.125rem;
    opacity: 0.95;
}

.auth-layout__form-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-secondary);
    padding: var(--spacing-xl);
    animation: slideInRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Mobile Layout */
.auth-layout__mobile {
    min-height: 100vh;
    display: block;
    overflow: hidden;
}

@media (min-width: 768px) {
    .auth-layout__mobile {
        display: none;
    }
}

.auth-layout__welcome {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary) 100%);
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.5s ease-in-out;
}

.auth-layout__welcome-header {
    padding: var(--spacing-lg);
    z-index: 10;
    position: relative;
    display: flex;
    justify-content: flex-start;
    animation: slideInDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.auth-layout__welcome-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--spacing-lg);
    z-index: 10;
    position: relative;
    padding: var(--spacing-lg);
}

.auth-layout__welcome-title {
    color: var(--color-secondary);
    font-size: 1.875rem;
    font-weight: 700;
    animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s backwards;
}

.auth-layout__welcome-subtitle {
    color: var(--color-secondary);
    font-size: 1.125rem;
    opacity: 0.95;
    animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s backwards;
}

.auth-layout__welcome-icon {
    margin: var(--spacing-xl) 0;
    animation: fadeInScale 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s backwards;
}

.auth-layout__welcome-button {
    width: 100%;
    max-width: 24rem;
    animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s backwards;
}

.auth-layout__form-mobile {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--color-secondary);
    animation: fadeIn 0.5s ease-in-out;
    overflow: hidden;
}

.auth-layout__form-header {
    background: transparent;
    padding: var(--spacing-lg);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    animation: slideInDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.auth-layout__form-logo {
    flex-shrink: 0;
}

.auth-layout__form-content {
    background-color: transparent;
    padding: var(--spacing-lg);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s backwards;
}

/* Wave Background */
.auth-layout__waves {
    position: absolute;
    inset: 0;
    overflow: hidden;
    opacity: 0.15;
    pointer-events: none;
}

.auth-layout__wave {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, var(--color-secondary) 0%, transparent 100%);
    opacity: 0.4;
}

.auth-layout__wave--1 {
    top: 0;
    left: 0;
    border-radius: 0 0 50% 0;
    transform: translateX(-50%);
    animation: wave1 8s ease-in-out infinite;
}

.auth-layout__wave--2 {
    top: 0;
    right: 0;
    border-radius: 0 0 0 50%;
    transform: translateX(50%);
    animation: wave2 10s ease-in-out infinite reverse;
}

.auth-layout__wave--3 {
    bottom: 0;
    left: 50%;
    border-radius: 50% 0 0 0;
    transform: translateX(-50%);
    animation: wave3 12s ease-in-out infinite;
}

@keyframes wave1 {

    0%,
    100% {
        transform: translateX(-50%) translateY(0) rotate(0deg);
    }

    50% {
        transform: translateX(-50%) translateY(-20px) rotate(5deg);
    }
}

@keyframes wave2 {

    0%,
    100% {
        transform: translateX(50%) translateY(0) rotate(0deg);
    }

    50% {
        transform: translateX(50%) translateY(20px) rotate(-5deg);
    }
}

@keyframes wave3 {

    0%,
    100% {
        transform: translateX(-50%) translateY(0) rotate(0deg);
    }

    50% {
        transform: translateX(-50%) translateY(10px) rotate(3deg);
    }
}

/* Keyframes para animaciones */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(15px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-15px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Responsive adjustments */
@media (max-width: 767px) {
    .auth-layout__brand-text {
        font-size: 1.5rem;
    }

    .auth-layout__tagline {
        font-size: 1rem;
    }

    .auth-layout__welcome-title {
        font-size: 1.5rem;
    }
}
</style>
