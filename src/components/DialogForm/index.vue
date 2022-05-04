<template>
  <!-- 从父组件传给自定义子组件的属性，如果没有 prop 接收
   会自动设置到子组件内部的最外层标签上
   如果是 class 和 style 的话，会合并最外层标签的 class 和 style  -->
  <el-dialog
    ref="dialog"
    model-value
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="30%"
    custom-class="my-dialog"
  >
    <slot />
    <template #title>
      <h1 class="title">{{ props.title }}</h1>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="default" @click="handleCancel">取消</el-button>
        <el-button size="default" type="primary" :loading="confirmLoading" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { IElDialog } from '@/types/element-plus'

// interface EmitsType {
//   (e: 'confirm'): void
// }

// const emit = defineEmits<EmitsType>()

const dialog = ref<IElDialog | null>(null)
const confirmLoading = ref(false)

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  confirm: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  }
})

const handleCancel = () => {
  if (dialog.value) {
    dialog.value.visible = false
  }
}

const handleConfirm = async() => {
  // emit('confirm')
  confirmLoading.value = true
  await props.confirm().finally(() => {
    confirmLoading.value = false
  })
}
</script>

<style lang="scss">
.my-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #eee;
    padding: 1px;
    padding-left: 18px;
  }
  .el-dialog__body {
    padding: 20px;
  }
}
</style>
