<template>
  <h1>登录</h1>
</template>

<script lang="ts" setup name="Login">
import { getLoginInfo } from '@/api/common'
// 在 script setup 中导出的数据都会被vue模板使用
// 但是 `ILoginInfo` 是一个ts类型，不想给vue模板使用
// 所以显式的声明这是一个ts的类型
import type { ILoginInfo } from '@/api/types/common'
import { onMounted, ref } from 'vue'

const list = ref<ILoginInfo['slide']>([])

onMounted(() => {
  getLoginInfo().then(res => {
    console.log(res.login_logo)
    list.value = res.slide
  })
})
</script>

<style lang="scss" scoped></style>
