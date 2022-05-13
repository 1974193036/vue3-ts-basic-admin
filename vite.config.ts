import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint' // https://github.com/gxmari007/vite-plugin-eslint
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import path from 'path' // ts 里加载 path 会找不到类型，需要 npm i @types/node -D, tsconfig.js 中加入 "esModuleInterop": true
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import legacy from '@vitejs/plugin-legacy'

const pathSrc = path.join(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    // eslintPlugin：运行项目/构建项目的时候，如果eslint不规范，让命令行会报错，页面也会报错
    eslintPlugin(),
    // 给 script setup 标签添加 `name` 属性
    VueSetupExtend(),
    // 按需自动导入Element-plush
    AutoImport({
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver({
          importStyle: 'sass'
        }),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'i'
        })
      ],
      dts: path.join(pathSrc, 'types', 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          importStyle: 'sass'
        }),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        })
      ],
      dts: path.join(pathSrc, 'types', 'components.d.ts')
    }),
    Icons({
      autoInstall: true
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': pathSrc
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '$injectedColor: orange;'
        // additionalData: '@import "@/styles/variables.scss";',
        additionalData: '@use "@/styles/variables.scss" as *;',
        javascriptEnabled: true,
        charset: false
      }
    }
  }
  // server: {
  //   proxy: {
  //     '/api2': {
  //       target: 'http://localhost:9999/api/',
  //       changeOrigin: false,
  //       rewrite: (path) => path.replace(/^\/api2/, '')
  //     }
  //   }
  // }
})
