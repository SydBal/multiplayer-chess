import io from 'socket.io-client'

const socket = io()

let mySocketId

socket.on('createNewGame', statusUpdate => {
  console.log(`A new game has been created! Username: ${statusUpdate.userName}, Game id: ${statusUpdate.gameId}, Socket id: ${statusUpdate.mySocketId}`)
  mySocketId = statusUpdate.mySocketId
})

export {
  socket,
  mySocketId
}
