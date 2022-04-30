import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint' // https://github.com/gxmari007/vite-plugin-eslint
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import path from 'path' // ts 里加载 path 会找不到类型，需要 npm i @types/node -D, tsconfig.js 中加入 "esModuleInterop": true

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // eslintPlugin：运行项目/构建项目的时候，如果eslint不规范，让命令行会报错，页面也会报错
    eslintPlugin(),
    // 给 script setup 标签添加 `name` 属性
    VueSetupExtend()
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  }
})
