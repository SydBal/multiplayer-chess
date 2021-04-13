// Webpack config for development environment
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=__webpack_hmr'

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: ['./spa/index.js', hotMiddlewareScript]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  target: 'web'
})
