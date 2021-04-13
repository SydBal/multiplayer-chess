
/**
 * Here is where we should register event listeners and emitters.
 */
let io
let gameSocket

// gamesInSession stores an array of all active socket connections
const gamesInSession = []

const initializeGame = (sio, socket) => {
  /**
   * initializeGame sets up all the socket event listeners.
   */

  // initialize global variables.
  io = sio
  gameSocket = socket

  // pushes this socket to an array which stores all the active sockets.
  gamesInSession.push(gameSocket)

  gameSocket.on('request username', function requestUserName (gameId) {
    console.log('requestUserName', { gameId })
    io.to(gameId).emit('give userName', this.id)
  })

  gameSocket.on('recieved userName', function recievedUserName (data) {
    console.log('recievedUserName', { data })
    data.socketId = this.id
    io.to(data.gameId).emit('get Opponent UserName', data)
  })

  // User creates new game room after clicking 'submit' on the frontend
  gameSocket.on('createNewGame', function createNewGame (gameId) {
    console.log('createNewGame', { gameId })
    // Join the Room and wait for the other player
    this.join(gameId)

    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    console.log('thislol', { gameId: gameId, mySocketId: this.id })
    this.emit('createdNewGame', { gameId: gameId, mySocketId: this.id })
  })

  // User joins gameRoom after going to a URL with '/game/:gameId'
  gameSocket.on('playerJoinGame', function playerJoinsGame (idData) {
    /**
     * Joins the given socket to a session with it's gameId
     */

    // A reference to the player's Socket.IO socket object
    const sock = this

    // Look up the room ID in the Socket.IO manager object.
    const room = io.sockets.adapter.rooms.get(idData.gameId)

    // If the room exists...
    if (room === undefined) {
      this.emit('status', 'This game session does not exist.')
      return
    }
    if (room.size < 2) {
      // attach the socket id to the data object.
      idData.mySocketId = sock.id

      // Join the room
      sock.join(idData.gameId)

      if (room.size === 2) {
        io.sockets.in(idData.gameId).emit('start game', idData.userName)
      }

      // Emit an event notifying the clients that the player has joined the room.
      io.sockets.in(idData.gameId).emit('playerJoinedRoom', idData)
    } else {
      // Otherwise, send an error message back to the player.
      this.emit('status', 'There are already 2 people playing in this room.')
    }
  })

  // Sends new move to the other socket session in the same room.
  gameSocket.on('new move', function newMove (move) {
    /**
       * First, we need to get the room ID in which to send this message.
       * Next, we actually send this message to everyone except the sender
       * in this room.
       */

    const gameId = move.gameId

    io.to(gameId).emit('opponent move', move)
  })

  // register event listeners for video chat app:
  ;(function videoChatBackend () {
    gameSocket.on('callUser', (data) => {
      io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from })
    })

    gameSocket.on('acceptCall', (data) => {
      io.to(data.to).emit('callAccepted', data.signal)
    })
  })()

  // Run code when the client disconnects from their socket session.
  gameSocket.on('disconnect', function onDisconnect () {
    const i = gamesInSession.indexOf(gameSocket)
    gamesInSession.splice(i, 1)
  })
}

exports.initializeGame = initializeGame
