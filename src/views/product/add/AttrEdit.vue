<template>
  <el-form
    label-position="left"
    label-width="50px"
    @submit.prevent
  >
    {{ data }}
    <app-draggable
      v-model="data"
      :options="{
        handle: '.el-icon-menu'
      }"
      :key="data"
    >
      <el-form-item
        v-for="(item, index) in data"
        :key="'ppp' + item.value"
        :label="item.value"
      >
        <template #label>
          <el-icon class="el-icon-menu"><i-ep-menu /></el-icon>
        </template>
        <div>
          <el-tag
            closable
            effect="dark"
            @close="data.splice(index, 1)"
          >
            {{ item.value }}
          </el-tag>
        &nbsp;
        </div>
        <div>
          <app-draggable
            style="display: inline-block"
            v-model="item.detail"
            :options="{
              animation: 300
            }"
          >
            <el-tag
              class="detail-item"
              v-for="(detail, detailIndex) in item.detail"
              :key="detail + item.value"
              closable
              effect="plain"
              @close="item.detail.splice(detailIndex, 1)"
            >
              {{ detail }}
            </el-tag>
          </app-draggable>
          <el-input
            v-if="item.inputVisible"
            v-model="item.inputValue"
            class="input-new-tag"
            ref="saveTagInput"
            size="small"
            @keyup.enter="handleInputConfirm(item)"
            @blur="handleInputConfirm(item)"
          />
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(item, index)"
          >
            + New Tag
          </el-button>
        </div>
      </el-form-item>
    </app-draggable>
    <el-form-item v-if="!isAdd">
      <el-button
        type="primary"
        @click="isAdd = true"
      >
        添加新规格
      </el-button>
      <el-button
        type="success"
        @click="handleGenerate"
      >
        立即生成
      </el-button>
    </el-form-item>
    <el-form-item v-else>
      <el-form
        :model="attrForm"
        :rules="formRules"
        ref="form"
        inline
      >
        <el-form-item
          label="规格名称"
          prop="value"
        >
          <el-input v-model="attrForm.value" />
        </el-form-item>
        <el-form-item
          label="规格值"
          prop="detail"
        >
          <el-input v-model="attrForm.detail[0]" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleAddAttr"
          >
            确认
          </el-button>
          <el-button @click="isAdd = false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { AttrRuleValue } from '@/api/types/product'
import type { IElForm } from '@/types/element-plus'
import { generateAttr } from '@/api/product'

const emit = defineEmits(['confirm', 'update:model-value'])

const props = defineProps({
  modelValue: {
    type: Array as PropType<AttrRuleValue[]>,
    default: () => []
  }
})

// 为了在组件内部修改props数据
const data = ref<AttrRuleValue[]>([])
watch(() => props.modelValue, async(newValue, oldValue) => {
  console.log(1, newValue, oldValue, newValue === oldValue)
  newValue.forEach(item => {
    item.inputVisible = item.inputVisible ? item.inputVisible : false
    item.inputValue = item.inputValue ? item.inputValue : ''
  })
  data.value = newValue
}, {
  deep: true,
  immediate: true
})
// 同步父组件数据
watch(data, (newValue, oldValue) => {
  console.log(2, newValue, oldValue, newValue === oldValue)
  emit('update:model-value', newValue)
}, {
  deep: true
})

const saveTagInput = ref<HTMLInputElement[] | null>(null)

const attrForm = ref({
  value: '',
  detail: ['']
})

const isAdd = ref(false)

const formRules = {
  value: [
    { required: true, message: '请输入规则名称', trigger: 'change' }
  ],
  detail: [
    { required: true, message: '请输入规则值', trigger: 'change' }
  ]
}

const form = ref<IElForm | null>(null)

const handleGenerate = async() => {
  const data = await generateAttr(0, 1, {
    attrs: props.modelValue
  })
  emit('confirm', data.info)
}

const handleInputConfirm = (item: AttrRuleValue) => {
  if (item.inputValue?.length) {
    item.detail.push(item.inputValue)
  }
  item.inputVisible = false
  item.inputValue = ''
}

const showInput = async(item: AttrRuleValue, index: number) => {
  // console.log(item)
  item.inputVisible = true
  await nextTick()
  // console.log(saveTagInput.value, index)
  saveTagInput.value?.[0]?.focus()
  // saveTagInput.value.focus()
}

const handleAddAttr = async() => {
  const valid = await form.value?.validate()
  if (!valid) return
  data.value.push({
    value: attrForm.value.value,
    detail: attrForm.value.detail,
    inputVisible: false,
    inputValue: ''
  })
  isAdd.value = false
  form.value?.resetFields()
}
</script>

<style lang="scss" scoped>

.el-icon-menu {
  font-size: 20px;
  cursor: move;
}
.detail-item {
  margin-right: 10px;
}

.el-form-item {
  align-items: center;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
