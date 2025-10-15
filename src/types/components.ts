// Tipos para componentes base
export interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}

export interface BaseInputProps {
  type?: string
  label?: string
  placeholder?: string
  errorMessage?: string
  required?: boolean
  disabled?: boolean
}

export interface BaseCardProps {
  title?: string
  variant?: 'default' | 'elevated'
  padding?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

export interface BaseIconProps {
  name: string
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export interface BaseLogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'primary' | 'dark'
  showText?: boolean
}
