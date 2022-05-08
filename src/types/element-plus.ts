import { ElForm, ElDialog, ElTree } from 'element-plus'
// import { FormItemRule } from 'element-plus/es/tokens/form'
import type { FormRules, TagProps } from 'element-plus'

// InstanceType：获取组件的实例类型
export type IElForm = InstanceType<typeof ElForm>
export type IElDialog = InstanceType<typeof ElDialog>
export type IElTree = InstanceType<typeof ElTree>

// export type IFormRule = Record<string, FormItemRule[]>
export type IFormRule = FormRules

// export type ITagType = 'success' | 'warning' | 'info' | 'danger'
export type ITagType = TagProps['type']
