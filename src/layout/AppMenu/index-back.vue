<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#304156"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    router
  >
    <el-menu-item index="/">
      <el-icon><i-ep-menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><i-ep-menu /></el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/admin/product/product_list">商品列表</el-menu-item>
      <el-menu-item index="/admin/product/add_product">商品添加</el-menu-item>
      <el-menu-item index="/admin/product/product_attr">商品规格</el-menu-item>
      <el-menu-item index="/admin/product/product_reply">商品评论</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><i-ep-menu /></el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/admin/setting/system_role/index">角色</el-menu-item>
      <el-menu-item index="/admin/setting/system_admin/index">管理员</el-menu-item>
      <el-menu-item index="/admin/setting/system_menus/index">权限规则</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><i-ep-menu /></el-icon>
        <span>维护</span>
      </template>
      <el-menu-item index="/admin/system/file">附件管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
