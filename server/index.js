const path = require('path')
const express = require('express')

class Server {
  constructor ({
    port
  } = {}) {
    // Port config for Heroku Buildpack
    this.port = port || process.env.PORT || 1337
    this.app = express()
  }

  exposeStaticAssets () {
    if (this.initStaticAssets) {
      throw new Error('Assets Already Exposed')
    }
    this.app.use(express.static(path.join(__dirname, '../public')))
    this.app.use('/', (req, res) => {
      console.log('index.html requested!')
      res.sendFile(path.join(__dirname, '../public/index.html'))
    })
    this.initStaticAssets = true
  }

  listen () {
    return new Promise((resolve, reject) => {
      if (this.initHttp) {
        reject(new Error('Assets Already Exposed'))
      }
      try {
        this.app.listen(this.port, () => {
          console.log(`listening on localhost:${this.port}`)
          this.initHttp = true
          resolve()
        })
      } catch (e) {
        reject(new Error('Server: Http Listen Failed!'))
      }
    })
  }

  start () {
    console.log('Starting server...')
    this.exposeStaticAssets()
    return this.listen()
  }
}

module.exports = new Server()
