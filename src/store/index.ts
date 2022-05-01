import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { IMenu } from '@/api/types/common'

const state = {
  isCollapse: false,
  // user: null as ({ token: string } & IUserInfo) | null,
  // user: getItem<{ token: string } & IUserInfo>(USER),
  menus: [] as IMenu[]
}

// 为 store state 声明类型
// export interface State {
//   count: number
//   foo: string
// }
export type State = typeof state

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建一个新的 store 实例
export const store = createStore<State>({
  state() {
    return state
  },
  mutations: {
    setIsCollapse(state, payload) {
      state.isCollapse = payload
    },
    setMenus(state, payload) {
      state.menus = payload
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}
