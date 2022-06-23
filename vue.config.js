const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'nav-bar-background-color': '#0e85ff',
            // 'nav-bar-title-text-color': '#fff',

            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // __dirname 它是node环境下全局内置变量，D:\.....,(D盘开始的路径就是绝对路径)
            // __dirname 拿到的路径是 F:\Code\Vue\Vue2-Project\03.极客园APP\heima_toutiao-app，拿到项目的文件夹
            hack: `true; @import "${path.join(
              __dirname,
              '/src/styles/theme.less'
            )}";`
            // 如果报错，请检查路径问题
          }
        }
      }
    }
  }
})
