module.exports = {
  configureWebpack: {
    devtool: "source-map",
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm-bundler.js",
      },
    },
  },
};
