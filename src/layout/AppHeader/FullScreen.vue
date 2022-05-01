<template>
  <el-icon class="full-screen-icon" @click="toggleFullScreen">
    <i-ep-full-screen />
  </el-icon>
</template>

<script lang="ts" setup>
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>

<style lang="scss" scoped>
.full-screen-icon {
  cursor: pointer;
  padding: 5px;
  color: #898282;
}
</style>
