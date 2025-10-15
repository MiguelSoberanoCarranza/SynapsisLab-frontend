// Tipos para componentes de layout
export interface AppLayoutProps {
  modelValue?: boolean
  isMobile?: boolean
}

export interface AppLayoutEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'logout'): void
}

export interface AppSidebarProps {
  modelValue?: boolean
  isMobile?: boolean
}

export interface AppSidebarEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'logout'): void
}
