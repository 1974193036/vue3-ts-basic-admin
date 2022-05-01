<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <AppMenu />
      </el-aside>
      <el-container>
        <el-header>
          <AppHeader />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import AppMenu from './AppMenu/index.vue'
import AppHeader from './AppHeader/index.vue'
import { useStore } from '@/store'

const store = useStore()
const data = [
  {
    path: '/admin/home',
    title: '首页',
    icon: 'dashboard'
  },
  {
    path: '/product',
    title: '商品',
    icon: 'list',
    children: [
      {
        path: '/admin/product/product_list',
        title: '商品列表'
      },
      {
        path: '/admin/product/add_product',
        title: '商品添加'
      },
      {
        path: '/admin/product/product_attr',
        title: '商品规格'
      },
      {
        path: '/admin/product/product_reply',
        title: '商品评论'
      }
    ]
  },
  {
    path: '/setting',
    title: '权限',
    icon: 'password',
    children: [
      {
        path: '/admin/setting/system_role/index',
        title: '角色'
      },
      {
        path: '/admin/setting/system_admin/index',
        title: '管理员'
      },
      {
        path: '/admin/setting/system_menus/index',
        title: '权限规则'
      }
    ]
  },
  {
    path: '/system',
    title: '维护',
    icon: 'example',
    children: [
      {
        path: '/admin/system/file',
        title: '附件管理'
      }
    ]
  }
]
store.commit('setMenus', data)
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-header {
  background-color: #fff;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
}

.el-aside {
  width: auto;
  background-color: #304156;
  color: #333;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
}

</style>
