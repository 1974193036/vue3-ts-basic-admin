<template>
  <h1>首页123</h1>
  <img src="@/assets/logo.png">
  <p>{{ $store.state.count }}</p>
  <p>{{ store.state.count }}</p>
</template>

<script lang="ts" setup name="Home">
import { useStore } from '@/store'

const store = useStore()
console.log(store.state.count)
</script>

<style lang="scss" scoped>
h1 {
  color: $primary-color;
}
</style>
