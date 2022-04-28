// 关于 eslint 配置：
// 通过 npx eslint --init 引导生成相关eslint配置，自动下载相关包

// 如何按照项目中的eslint规则进行格式化代码
// 方式一：
// 可以配置.prettier + eslint-plugin-prettier eslint-config-prettier
// 将 Prettier 的规则设置到 ESLint 的规则中，关闭 ESLint 中与 Prettier 中会发生冲突的规则

// 方式二：
// 既然此项目的eslint使用了`standard`规范，不使用prettier，按照eslint规范直接格式化代码
// 1. 卸载/禁用 vetur 插件
// 2. 安装 eslint 插件：只要安装并启用这个插件，它就会自动查找项目中的 eslint 配置规范，并且给出验证提示
// 3. 安装 Vue Language Features（volar） 插件
// 4. 配置或自动生成 .vscode/settings.json
// 5. 设置 Format Document With，对于.js .ts .vue的文件默认设置EsLint的格式化方式

module.exports = {
  env: {
    browser: true,
    es2021: true,

    // 诸如defineProps和defineemit等编译器宏会生成no-undef警告
    // 你需要在ESLint配置文件中启用编译器宏环境。如果不想全局地公开这些变量，可以使用/* global defineProps，或defineemit */。
    'vue/setup-compiler-macros': true
  },
  extends: [
    // extends 中可以直接引入可共享配置包，其中也可以直接省略包名前缀 eslint-config- ,  eslint-plugin-
    // 其中还可以直接引入基本配置文件的绝对路径或相对路径
    // 'plugin:vue/vue3-essential', // 最基本的
    'plugin:vue/vue3-strongly-recommended', // 强烈推荐的
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  // 引入的相关插件名，可以直接省略 eslint-plugin- 前缀
  plugins: ['vue', '@typescript-eslint'],
  // 自定义eslint规则
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 5
        },
        multiline: {
          max: 1
        }
      }
    ]
  }
}
