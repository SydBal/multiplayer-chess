/**
 * Compiles the frontend code and listens for request for it
 * Also sets up hot module reload for development purposes
 */
const Bundler = require('../bundler')
const Server = require('../server')

Bundler.isDev = true

Server.app.use(require('webpack-dev-middleware')(Bundler.compiler, {
  publicPath: Bundler.webpackConfig.output.publicPath
}))

Server.app.use(require('webpack-hot-middleware')(Bundler.compiler))

Server.start()
