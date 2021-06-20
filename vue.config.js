module.exports = {
  // devServer: {
  //   port: 8081,
  // }
  // proxy all webpack dev-server requests starting with /api
  // to our Spring Boot backend (localhost:8088) using http-proxy-middleware
  // see https://cli.vuejs.org/config/#devserver-proxy
  devServer: {
    proxy: {
      '/engine-rest': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true
      },
    },
    port: 8081,
    // proxy: 'http://localhost:8080'

  },
  // Change build paths to make them Maven compatible
  // see https://cli.vuejs.org/config/
  outputDir: 'target/dist',
  assetsDir: 'static'
}