<template>
  <page-container>
    <app-card>
      <template #header>
        <el-button
          @click="$router.back()"
        >
          <el-icon><i-ep-back /></el-icon>&nbsp;返回
        </el-button>
      </template>
      <el-form
        ref="form"
        :model="product"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item
          label="商品名称"
          prop="store_name"
        >
          <el-input v-model="product.store_name" />
        </el-form-item>
        <el-form-item
          label="商品分类"
          prop="cate_id"
        >
          <el-select
            v-model="product.cate_id"
            multiple
            style="width: 50%;"
          >
            <el-option
              v-for="item in productCates"
              :key="item.id"
              :label="`${item.html}${item.cate_name}`"
              :value="item.id"
              :disabled="item.pid === 0"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品封面图(最多1张)"
          prop="image"
        >
          xxx
        </el-form-item>
        <el-form-item
          label="商品推荐图(最多1张)"
          prop="recommend_image"
        >
          xxx
        </el-form-item>
        <el-form-item
          label="商品轮播图(最多10张)"
          prop="slider_image"
        >
          xxx
        </el-form-item>
        <el-form-item
          label="商品规格"
          prop="spec_type"
          class="auto-scroll"
        >
          <el-radio-group v-model="product.spec_type">
            <el-radio :label="0">
              单规格
            </el-radio>
            <el-radio :label="1">
              多规格
            </el-radio>
          </el-radio-group>
          <!-- 单规格 -->
          <!-- <AttrTable
            v-if="product.spec_type === 0"
            v-model="singleAttrData"
          /> -->
        </el-form-item>
        <!-- <el-form-item
          v-if="product.spec_type === 1"
          class="multi-attr-form_item"
          label="规格模板"
        >
          <el-space
            direction="vertical"
            fill
            style="width: 100%;"
            alignment="flex-start"
          >
            <AttrTemplate @confirm="attrTpl = $event" />
            <AttrEdit
              v-if="attrTpl.length"
              v-model="attrTpl"
              @confirm="handleAttrEditConfirm"
            />
            <template v-if="multiAttrData.length">
              <div>
                批量设置：
                <AttrTable
                  v-model="batchData"
                >
                  <template #append>
                    <el-table-column
                      label="操作"
                      fixed="right"
                      min-width="120"
                    >
                      <template #default>
                        <el-button
                          type="text"
                          @click="handleBatchSet"
                        >
                          批量设置
                        </el-button>
                        <el-button
                          type="text"
                          @click="handleClearBatch"
                        >
                          清除
                        </el-button>
                      </template>
                    </el-table-column>
                  </template>
                </AttrTable>
              </div>
              <div>商品属性</div>
              <AttrTable
                v-model="multiAttrData"
              >
                <template #prepend>
                  <el-table-column
                    v-for="item in tableHeader"
                    :key="item.key"
                    :prop="item.key"
                    :label="item.title"
                  />
                </template>
                <template #append>
                  <el-table-column
                    label="操作"
                    fixed="right"
                  >
                    <template #default="{ $index }">
                      <el-button
                        type="text"
                        @click="handleDeleteAttr($index)"
                      >
                        删除
                      </el-button>
                    </template>
                  </el-table-column>
                </template>
              </AttrTable>
            </template>
          </el-space>
        </el-form-item> -->
        <el-form-item
          label="商品详情"
          prop="description"
        >
          <app-text-editor v-model="product.description" />
        </el-form-item>
        <el-form-item
          label="虚拟销量"
          prop="ficti"
        >
          <el-input-number
            v-model="product.ficti"
            :min="0"
            label="请输入虚拟销量"
          />
        </el-form-item>
        <el-form-item
          label="商品状态"
          prop="is_show"
        >
          <el-radio-group v-model="product.is_show">
            <el-radio :label="1">
              上架
            </el-radio>
            <el-radio :label="0">
              下架
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="热卖单品"
          prop="is_hot"
        >
          <el-radio-group v-model="product.is_hot">
            <el-radio :label="1">
              开启
            </el-radio>
            <el-radio :label="0">
              关闭
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="活动优先级"
          prop="activity"
        >
          <!-- <el-tag
              v-for="item in activities"
              :key="item.name"
              :type="item.type"
              effect="dark"
            >
              {{ item.name }}
            </el-tag> -->
          <!--
              拖拽元素列表和 v-model 的数据必须一致
             -->
          <app-draggable
            v-model="activities"
            :options="{
              animation: 300
            }"
          >
            <el-tag
              v-for="item in activities"
              :key="item.name"
              :type="item.type"
              effect="dark"
            >
              {{ item.name }}
            </el-tag>
          </app-draggable>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSubmit"
          >
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </app-card>
  </page-container>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { getCategoryTree, saveProduct } from '@/api/product'
import type { ProductAttr, ProductCategory, AttrRuleValue, AttrTableHeader } from '@/api/types/product'
import type { IElForm, IFormRule, ITagType } from '@/types/element-plus'
// import AttrTable from './AttrTable.vue'
// import AttrTemplate from './AttrTemplate.vue'
// import AttrEdit from './AttrEdit.vue'

// const attrTpl = ref<AttrRuleValue[]>([])

const activities = ref<({type: ITagType, name: string})[]>([
  { type: 'danger', name: '秒杀' },
  { type: 'info', name: '默认' },
  { type: 'warning', name: '砍价' },
  { type: 'success', name: '拼团' }
])

const productCates = ref<ProductCategory[]>([]) // 商品分类
const product = ref({
  store_name: '',
  cate_id: [] as number[],
  image: 'https://shop.fed.lagou.com/uploads/attach/2021/07/20210727/82b80d1996848be8294c6aaa609c4f0b.jpg',
  recommend_image: 'https://shop.fed.lagou.com/uploads/attach/2021/07/20210727/82b80d1996848be8294c6aaa609c4f0b.jpg',
  slider_image: [
    'https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png',
    'https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png',
    'https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png',
    'https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png',
    'https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png'
  ],
  // attrs: [] as ProductAttr[], // 商品规格
  spec_type: 0 as 0 | 1, // 0 单规格、1 多规格
  description: '',
  ficti: 0,
  is_show: 1,
  is_hot: 0,
  activity: computed(() => activities.value.map(item => item.name))
})

setTimeout(() => {
  product.value.description = '<h1>hello world</h1>'
}, 1000)

// const singleAttrData = ref([{
//   pic: '',
//   vip_price: 0,
//   price: 0,
//   cost: 0,
//   ot_price: 0,
//   stock: 0,
//   bar_code: '',
//   weight: 0,
//   volume: 0,
//   brokerage: 0,
//   brokerage_two: 0
// }])

// const multiAttrData = ref<ProductAttr[]>([])

// watch([singleAttrData, multiAttrData, () => product.value.spec_type], () => {
//   product.value.attrs = product.value.spec_type === 0
//     ? singleAttrData.value
//     : multiAttrData.value
// }, {
//   immediate: true, // 立即执行
//   deep: true // 深度监视
// })

// const defaultAttrData = [{
//   pic: '',
//   vip_price: 0,
//   price: 0,
//   cost: 0,
//   ot_price: 0,
//   stock: 0,
//   bar_code: '',
//   weight: 0,
//   volume: 0,
//   brokerage: 0,
//   brokerage_two: 0
// }]

// const batchData = ref(JSON.parse(JSON.stringify(defaultAttrData)))

const formRules = ref<IFormRule>({
  store_name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' }
  ],
  cate_id: [
    { required: true, message: '请选择商品分类', trigger: 'change', type: 'array', min: 1 }
  ],
  image: [
    { required: true, message: '请上传商品图', trigger: 'change' }
  ],
  recommend_image: [
    { required: true, message: '请上传商品推荐图', trigger: 'change' }
  ],
  slider_image: [
    { required: true, message: '请上传商品轮播图', type: 'array', trigger: 'change' }
  ],
  spec_type: [
    { required: true, message: '请选择商品规格', trigger: 'change' }
  ],
  description: [
    { required: true, message: '请填写商品详情', trigger: 'blur' }
  ]
  // selectRule: [
  //   { required: true, message: '请选择商品规格属性', trigger: 'change' }
  // ],
  // temp_id: [
  //   { required: true, message: '请选择运费模板', trigger: 'change', type: 'number' }
  // ],
  // give_integral: [
  //   { type: 'integer', message: '请输入整数' }
  // ]
})
const form = ref<IElForm | null>(null)

onMounted(() => {
  loadCates()
})

const handleSubmit = async() => {
  const valid = await form.value?.validate()
  if (!valid) return false
  await saveProduct(0, product.value)
  ElMessage.success('保存成功')
}

const loadCates = async() => {
  const data = await getCategoryTree(1)
  productCates.value = data
}

// const handleAttrEditConfirm = (data: {
//   attr: AttrRuleValue[]
//   header: AttrTableHeader[]
//   value: ProductAttr[]
// }) => {
//   multiAttrData.value = data.value
//   product.value.header = data.header
//   product.value.items = data.attr
// }

// const tableHeader = computed(() => {
//   return product.value.header.filter(item => item.key && item.key.startsWith('value'))
// })

// const handleDeleteAttr = (index: number) => {
//   multiAttrData.value.splice(index, 1)
// }

// const handleBatchSet = () => {
//   // 过滤无效数据
//   const data = batchData.value[0]
//   const validData: Record<string, any> = {}
//   let key: keyof typeof data
//   for (key in data) {
//     if (data[key]) {
//       validData[key] = data[key]
//     }
//   }

//   // 批量设置 multiAttrData
//   multiAttrData.value.forEach(item => {
//     Object.assign(item, validData)
//   })
// }

// const handleClearBatch = () => {
//   batchData.value = JSON.parse(JSON.stringify(defaultAttrData))
// }
</script>

<!-- <script lang="ts">
export default {
  name: 'ProductNew'
}
</script> -->

<style lang="scss" scoped>
// :deep(.el-form-item__content) {
//   overflow: hidden;
// }

// :deep(.el-space) {
//   max-width: 100%;
//   .el-space__item {
//     max-width: 100%;
//   }
// }
</style>
