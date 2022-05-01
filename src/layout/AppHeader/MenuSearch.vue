<template>
  <el-autocomplete
    v-model="state1"
    class="inline-input"
    placeholder="请输入内容"
    value-key="menu_name"
    :fetch-suggestions="querySearch"
  >
    <template #prefix>
      <el-icon class="el-input__icon"><i-ep-search /></el-icon>
    </template>
    <template #default="{ item }">
      <router-link
        :to="item.menu_path"
        custom
        v-slot="{ href }"
      >
        <el-link
          class="menu-link"
          :href="href"
          :disabled="item.type === 1"
          :underline="false"
        >
          <span
            class="link-text"
            @click="handleLinkClick(item, $event)"
          >{{ item.menu_name }}</span>
        </el-link>
      </router-link>
    </template>
  </el-autocomplete>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getMenus } from '@/api/home'
import type { Menu } from '@/api/types/home'

const menus = ref<Menu[]>([])
const state1 = ref('')

onMounted(() => {
  loadMenus()
})

const loadMenus = async() => {
  const data = await getMenus()
  menus.value = data
}

const querySearch = (queryString: string, cb: (val: any) => void) => {
  console.log('querySearch', queryString)
  const results = queryString
    ? menus.value.filter(item => item.menu_name.includes(queryString))
    : menus.value
  // 调用 callback 返回建议列表的数据
  cb(results)
}

const handleLinkClick = (item: Menu, e: Event) => {
  if (item.type === 1) {
    e.preventDefault()
    e.stopPropagation()
  }
}
</script>

<style lang="scss" scoped>
.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.menu-link, .link-text {
  display: block;
}
</style>
