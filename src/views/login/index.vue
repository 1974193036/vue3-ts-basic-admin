<template>
  <h1>登录</h1>
  <el-button>Default</el-button>
  <el-button type="primary" size="large">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
  <el-button>中文</el-button>
  <!-- <el-date-picker v-model="value1" type="date" placeholder="Pick a day" /> -->
</template>

<script lang="ts" setup name="Login">
import { getLoginInfo } from '@/api/common'
// 在 script setup 中导出的数据都会被vue模板使用
// 但是 `ILoginInfo` 是一个ts类型，不想给vue模板使用
// 所以显式的声明这是一个ts的类型
import type { ILoginInfo } from '@/api/types/common'
import { onMounted, ref } from 'vue'

const list = ref<ILoginInfo['slide']>([])

// const value1 = ref('')

onMounted(() => {
  getLoginInfo().then(res => {
    console.log(res.login_logo)
    list.value = res.slide
  })
})
</script>

<style lang="scss" scoped>
h1 {
  color: $colorRed;
}
</style>
