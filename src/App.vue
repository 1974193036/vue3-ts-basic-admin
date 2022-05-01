<template>
  <!-- <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <HelloWorld ref="helloDOM" msg="Hello Vue 3 + TypeScript + Vite" @increment="onIncrement" />
  <hr>
  <TestJsx /> -->
  <el-config-provider :size="size" :z-index="zIndex">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
const size: 'small' | 'medium' | 'large' = 'small'
const zIndex: number = 3000
</script>

<!-- <script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
// console.log('test101')
</script> -->

<!-- <script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import TestJsx from './components/TestJSX.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    TestJsx
  },
  setup() {
    // InstanceType：获取组件的实例类型
    const helloDOM = ref<InstanceType<typeof HelloWorld > | null>(null)
    onMounted(() => {
      console.log(helloDOM.value)
    })
    const onIncrement = (v: number) => {
      console.log('onIncrement', v)
    }
    return {
      helloDOM,
      onIncrement
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
