// Tipos para el sistema de menú
export interface MenuItem {
  id: string
  label: string
  path: string
  icon: string
  children?: MenuItem[]
}

export interface MenuSection {
  title: string
  items: MenuItem[]
}
