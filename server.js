// Server Setup
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
// const cors = require('cors')
const port = 3004
//socket.io Setup
// const http = require('http');
const server = app.listen(port)//http.createServer(app);
const randomWords = require('random-words')
const io = require('socket.io').listen(server);
module.exports=io


// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Rick&MortyDB', { useNewUrlParser: true })

// app.use(express.static(path.join(__dirname, 'dist')))
// app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(cors())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.header('Access-Control-Allow-Credentials', true);

  next()
})


// app.use('/', api)


//space instances
const Game = require('./server/gameManagerLogic/GameManager')
// const Enemy = require('./server/gameManagerLogic/Enemy')
// const Shot = requie('./server/gameManagerLogic/LaserShot')
// const SpaceShip = require('./server/gameManagerLogic/SpaceShip')
const Games={}
// socket.io
io.on('connection', (socket) => {

  console.log('connection')
  socket.on('newGame', () => {
    console.log('Someone created a new game')
    const gameId = `${randomWords()}-${randomWords()}-${randomWords()}`
    const newGame = new Game(gameId)
    Games[gameId] = newGame
    Games[gameId].joinGame(socket.id)
    socket.join(`${gameId}`)
		console.log('TCL: gameId', gameId)
    const info={ gameId, playerId: Games[gameId].spaceShips.length - 1 }
    socket.emit('joinedGame',info )
    // socket.emit('gameCreated', gameId, newGame.players.length - 1)
    // console.log(Object.keys(Games))
  })

  socket.on('joinGame', (gameId) => {
    console.log('Someone is trying to join a game')
    Games[gameId].joinGame(socket)
    socket.join(gameId)
    socket.emit('joinedGame', { gameId, playerId: Games[gameId].spaceShips.length - 1 })
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
		console.log('TCL: playerIndex', playerIndex)
    Games[gameId].move(playerIndex, direction)
  })

  socket.on('shoot', (gameID, playerIndex) => {
    Games[gameID].shoot(playerIndex)
  })

})



// app.listen(port, function () {
//   console.log("Server is running!")
// })


