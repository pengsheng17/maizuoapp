// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     overlay: {
//       warnings: false,
//       errors: false
//     },
//     proxy: {
//       '/kerwin': {
//         target: 'http://m.maoyan.com',
//         changeOrigin: true,
//         pathRewrite:{
//           "^/kerwin":""
//         }

//         /* /kerwin/ajax/comingList  ====> /ajax/comingList  */
//       },
//       '/ajax': {
//         target: 'http://m1.a.com',
//         changeOrigin: true
//       }
//     }

//   },
//   lintOnSave: false // 关了eslint 检查

// })
module.exports = {
  devServer: {
    // overlay: {
    //   warnings: false,
    //   errors: false
    // },
    proxy: {
      '/swiper': {
        target: 'https://m.maizuo.com',
        changeOrigin: true,
        pathRewrite: {
          '^/swiper': ''
        }

        /* /kerwin/ajax/comingList  ====> /ajax/comingList  */
      },
      '/ajax': {
        target: 'http://m1.a.com',
        changeOrigin: true
      }
    }

  },
  lintOnSave: false // 关了eslint 检查
}
