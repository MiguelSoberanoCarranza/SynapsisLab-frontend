<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="base-icon"
    v-html="iconSvg">
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BaseIconProps } from '@/types/components'

const props = withDefaults(defineProps<BaseIconProps>(), {
  size: 20
})

// Iconos como strings SVG
const icons = {
  dashboard: '<rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>',
  reception: '<path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  capture: '<path d="M12 20H21V18L13 10L9 14L3 8V6L9 12L13 8L19 14V20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 8L21 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  print: '<path d="M6 9V2H18V9M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18M6 14H18V22H6V14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  config: '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  admin: '<path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  samples: '<path d="M19.5 3H16.5C15.5 3 15 3.5 15 4.5V5.5C15 6.5 15.5 7 16.5 7H19.5C20.5 7 21 6.5 21 5.5V4.5C21 3.5 20.5 3 19.5 3Z" stroke="currentColor" stroke-width="2"/><path d="M7.5 3H4.5C3.5 3 3 3.5 3 4.5V5.5C3 6.5 3.5 7 4.5 7H7.5C8.5 7 9 6.5 9 5.5V4.5C9 3.5 8.5 3 7.5 3Z" stroke="currentColor" stroke-width="2"/>',
  analysis: '<path d="M3 3V21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 14L11 10L15 14L21 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  results: '<path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  inbox: '<path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2"/>',
  pending: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  export: '<path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
}

const iconSvg = computed(() => icons[props.name as keyof typeof icons] || icons.dashboard)
</script>

<style scoped>
.base-icon {
  flex-shrink: 0;
  color: currentColor;
}
</style>
