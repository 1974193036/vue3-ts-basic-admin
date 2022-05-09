import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { IMenu, IUserInfo } from '@/api/types/common'

import { setItem, getItem } from '@/utils/storage'
import { USER } from '@/utils/constants'

// import createPersistedState from 'vuex-persistedstate' // 可以使用这个插件来存储storage

const state = {
  isCollapse: false,
  // user: null as ({ token: string } & IUserInfo) | null,
  user: getItem<{ token: string } & IUserInfo>(USER),
  // menus: [] as IMenu[]
  menus: getItem<IMenu[]>('MENUS')
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
  // plugins: [createPersistedState()],
  state() {
    return state
  },
  mutations: {
    setIsCollapse(state, payload) {
      state.isCollapse = payload
    },
    setMenus(state, payload) {
      state.menus = payload
      setItem('MENUS', state.menus)
    },
    setUser(state, payload) {
      state.user = payload
      setItem(USER, state.user)
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}
