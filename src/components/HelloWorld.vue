<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{ msg: string, abc: number }>()
const props = defineProps({
  msg: {
    type: String,
    required: true
  },
  abc: {
    type: Number,
    default: 9999
  }
})
// eslint-disable-next-line func-call-spacing
// const emit = defineEmits<{
//   (e: 'increment', id: number): void
//   (e: 'change', id: number): void
// }>()
const emit = defineEmits(['increment'])

const count = ref(0)
const increment = () => {
  // js 中获取 props 中的数据
  console.log(props.msg)
  count.value++

  // 往父组件传递事件
  emit('increment', count.value)
}

// 可以直接使用 await， script setup 自动包装了 async
// console.log(await 123)

// 使用 <script setup> 的组件是默认关闭的，也即通过模板 ref 或者 $parent 链获取到的组件的公开实例，不会暴露任何在 <script setup> 中声明的绑定
// 为了在 <script setup> 组件中明确要暴露出去的属性，使用 defineExpose 编译器宏
// 当父组件通过模板 ref 的方式获取到当前组件的实例，获取到的实例会像这样 { aaaa: number, bbbbb: number } (ref 会和在普通实例中一样被自动解包)
defineExpose({
  aaaa: 1111,
  bbbb: 2222
})
</script>

<!-- <script lang="ts">
import { defineComponent, ref, PropType, onMounted } from 'vue'

interface User {
  name: string
  age: number
}

// 要让 TypeScript 正确推断 Vue 组件选项中的类型，需要使用 defineComponent 全局方法定义组件
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    },
    abc: {
      type: Number,
      required: true
    },
    obj: {
      type: Object as PropType<User>,
      default: () => ({})
    }
  },
  setup(props) {
    console.log(props.msg)
    console.log(props.obj?.name)

    const count = ref(0)
    const foo = ref<{a: number, b: string} | null>(null)
    foo.value = {
      a: 1,
      b: 'hello'
    }

    onMounted(() => {
      console.log(titleDOM.value)
    })

    const titleDOM = ref<HTMLHeadElement | null>(null)

    return {
      count,
      titleDOM
    }
  }
})
</script> -->

<template>
  <h1 ref="titleDOM">{{ msg }} {{ abc }}</h1>
  <h2>{{ props.msg }}</h2>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="increment">
    count is: {{ count }}
  </button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
