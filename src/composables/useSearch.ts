// Composable para funcionalidad de búsqueda
import { ref, computed } from 'vue'
import { menuSections } from '@/config/menuConfig'
import type { MenuItem } from '@/types/menu'

export function useSearch() {
  const searchQuery = ref('')

  const filteredMenuSections = computed(() => {
    if (!searchQuery.value.trim()) {
      return menuSections
    }

    const query = searchQuery.value.toLowerCase().trim()
    
    return menuSections.map(section => ({
      ...section,
      items: section.items.filter(item => 
        item.label.toLowerCase().includes(query) ||
        item.children?.some(child => 
          child.label.toLowerCase().includes(query)
        )
      )
    })).filter(section => section.items.length > 0)
  })

  const clearSearch = () => {
    searchQuery.value = ''
  }

  return {
    searchQuery,
    filteredMenuSections,
    clearSearch
  }
}
