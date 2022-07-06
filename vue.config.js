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
  },
  publicPath: './'
})
/*
问题：打开的index.htm1网页空自，控制台全是404错误
原因：打包时，webpack在index.html中引入其他的打包文件路径全是/服务器根路径请求
    运行时是在5500端口下运行，服务器根目录没有css和js文件夹，而是在index.html文件的隔壁(相对路径)
解决：让webpack打包时，引入其他文件要以./开头，而不能以/开头，
    在vue.config.js配置项目中，加入pubIicPath：'./'重新打包
    打包后观察index.htm1中 其实./被省略了
*/
