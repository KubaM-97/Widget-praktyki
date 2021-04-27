module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
  },
  css: {
    extract: false
  }
};
