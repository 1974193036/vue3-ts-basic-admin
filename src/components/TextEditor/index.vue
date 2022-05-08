<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      v-model="valueHtml"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
      @on-blur="handleBlur"
    />
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IDomEditor, IEditorConfig } from '@wangeditor/editor'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
interface EmitsType {
  (e: 'update:model-value', value: string): void
}
const emit = defineEmits<EmitsType>()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

const unWatchModelValue = watch(() => props.modelValue, () => {
  // console.log('watch')
  // 操作 DOM 的方式修改内容
  // 初始化编辑框的值
  valueHtml.value = props.modelValue
  unWatchModelValue() // 取消监视
})

const toolbarConfig = {}
const editorConfig: Partial<IEditorConfig> = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const handleBlur = (editor: IDomEditor) => {
  // editor changed
  // console.log('content', editor.getHtml(), editor.isEmpty())
  // 同步父组件数据
  emit('update:model-value', editor.isEmpty() ? '' : editor.getHtml())
}

const mode = 'default' // 或 'simple'

</script>
