module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
  },
  css: {
    extract: false
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/af44/'
    : '/'
};
