/**
 * Compiles the frontend code once and listens for request for it
 */
const Bundler = require('../bundler')
const Server = require('../server')

Bundler.compile()
  .then(() => Server.start())
