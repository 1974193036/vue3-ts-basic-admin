import { defineComponent, ref } from 'vue'

// 使用 组合式API
export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const count = ref(1)
    return () => (
      <div>
        <p>{count.value}</p>
        <p>{props.msg}</p>
      </div>
    )
    // return () => {
    //   return (
    //     <div>
    //       <p>123</p>
    //       <p>{count.value}</p>
    //     </div>
    //   )
    // }
  }
})

// 使用 options API
// export default defineComponent({
//   props: {
//     msg: {
//       type: String,
//       required: true
//     }
//   },
//   data() {
//     return {
//       count: 0
//     }
//   },
//   render() {
//     return (
//       <div>
//         {this.msg} - {this.count}
//       </div>
//     )
//   }
// })
