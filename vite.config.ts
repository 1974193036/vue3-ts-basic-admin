import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint' // https://github.com/gxmari007/vite-plugin-eslint

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // eslintPlugin：运行项目/构建项目的时候，如果eslint不规范，让命令行会报错，页面也会报错
    eslintPlugin()
  ]
})
