// Server Setup
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
//socket.io Setup
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const randomWords = require('random-words')


const port = 3000

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Rick&MortyDB', { useNewUrlParser: true })

const app = express()
// app.use(express.static(path.join(__dirname, 'dist')))
// app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use('/', api)


//space instances
const Game = require('./server/gameManagerLogic/GameManager')
// const Enemy = require('./server/gameManagerLogic/Enemy')
// const Shot = requie('./server/gameManagerLogic/LaserShot')
// const SpaceShip = require('./server/gameManagerLogic/SpaceShip')

// socket.io
io.on('connection', (socket) => {

  socket.on('newGame', () => {
    console.log('Someone created a new game')
    const gameId = `${randomWords()}-${randomWords()}-${randomWords()}`
    const newGame = new Game(gameId)
    Games[gameId] = newGame
    Games[gameId].joinGame(socket)
    socket.join(`${gameId}`)
    socket.emit('joinedGame', { gameId, playerId: Games[id].players.length - 1 })
    // socket.emit('gameCreated', gameId, newGame.players.length - 1)
    // console.log(Object.keys(Games))
  })

  socket.on('joinGame', (gameId) => {
    console.log('Someone is trying to join a game')
    Games[gameId].joinGame(socket)
    socket.join(gameId)
    socket.emit('joinedGame', { gameId, playerIndex: Games[id].players.length - 1 })
  })

  socket.on('startGame', (gameId) => {
    console.log('Someone is trying to join a game')
    Games[gameId].start()
  })

  socket.on('pauseGame', (gameId) => {
    Games[gameId].pauseGame()
  })

  socket.on('continueGame', (gameId) => {
    Games[gameId].continuePlaying()
  })

  socket.on('move', (gameId, playerIndex, direction) => {
    Games[gameId].move(playerIndex, direction)
  })

  socket.on('shoot', (gameID, playerIndex) => {
    Games[gameID].shoot(playerIndex)
  })

})



app.listen(port, function () {
  console.log("Server is running!")
})


