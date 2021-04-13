const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const gameLogic = require('./game-logic')

class Server {
  constructor ({
    port
  } = {}) {
    // Port config for Heroku Buildpack
    this.port = port || process.env.PORT || 1337
    this.app = express()
  }

  respondWithSPA (res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  }

  exposeStaticAssets () {
    if (this.initStaticAssets) {
      throw new Error('Assets Already Exposed')
    }

    this.app.use('/', express.static(path.join(__dirname, '../public'), { index: false }))
    this.app.use('/game/', express.static(path.join(__dirname, '../public')))

    this.app.get('/game/:gameId', (req, res) => {
      console.log('Game page requested')
      this.respondWithSPA(res)
    })

    this.app.get(['/:folder', '/:folder*/:file'], (req, res) => {
      console.log('Unknown route requested, redirect to root')
      res.redirect('/')
    })

    // Controlling the root route, thanks to { index: false } option in static files setup
    this.app.use('/', (req, res) => {
      console.log('Root site requested')
      this.respondWithSPA(res)
    })

    this.initStaticAssets = true
  }

  listen () {
    return new Promise((resolve, reject) => {
      if (this.initHttp) {
        reject(new Error('Assets Already Exposed'))
      }
      try {
        this.server = this.app.listen(this.port, () => {
          console.log(`listening on localhost:${this.port}`)
          this.initHttp = true
        })

        this.io = socketio(this.server)

        this.io.on('connection', client => {
          gameLogic.initializeGame(this.io, client)
        })
        resolve()
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
