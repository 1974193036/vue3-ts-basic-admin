<!-- <script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

</script> -->

<script lang="ts">
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
</script>

<template>
  <h1 ref="titleDOM">{{ msg }}</h1>

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

  <button type="button" @click="count++">
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
