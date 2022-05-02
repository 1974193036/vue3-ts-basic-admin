<template>
  <svg :class="svgClass" :style="styles" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  },
  size: {
    type: [Number, String],
    default: 14
  },
  className: {
    type: String,
    default: ''
  }
})

const iconName = computed(() => `#icon-${props.name}`)

const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})

const styles = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
    fill: props.color
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  overflow: hidden;
}
</style>
