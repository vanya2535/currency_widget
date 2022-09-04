const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) => {
    config.module.rules.delete('svg')
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader'
        }
      ]
    }
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/variables.scss";
        `
      }
    }
  }
})
