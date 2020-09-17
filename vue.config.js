const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}

module.exports = {
  assetsDir: "assets", // 静态文件目录
  publicPath: "./", // 编译后的地址，可以根据环境进行设置
  lintOnSave: true,
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: "127.0.0.1",
    port: 8080,
    proxy: {
      "/platform": {
        target: "http://39.104.113.97",
        ws: true,
        /* 允许跨域 */
        changeOrigin: true,
        pathRewrite: {
          "^platform": "/platform"
        }
      }
    }
  },
  css: {
    extract: true
  },
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
    config.optimization.minimize(true);
    config.optimization.splitChunks({
      chunks: "all"
    });
    // 用cdn方式引入
    config.externals({
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      "element-ui": "ELEMENT", // 需用MINT
      axios: "axios"
    });
  }
};
