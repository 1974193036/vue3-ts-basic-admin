import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin/home'
  },
  {
    path: '/admin/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes // 路由规则
})

export default router
