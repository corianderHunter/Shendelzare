module.exports = {
  env: {
    NODE_ENV: '"production"',
    WX_CLOUD: '"iron-ass-3o370"',
    MAP_KEY:'"JAHBZ-E4BWX-2KX4U-7CJE7-4PL6E-UBBPP"',
  },
  defineConstants: {},
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
