<template>
  <h1>登录</h1>
</template>

<script lang="ts" setup name="Login">
import { getLoginInfo } from '@/api/common'
import type { ILoginInfo } from '@/api/types/common' // 显式的声明这是一个ts的类型
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
