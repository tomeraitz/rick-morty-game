// Server Setup
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const port = 3004
const server = app.listen(port)//http.createServer(app);
const randomWords = require('random-words')
const io = require('socket.io').listen(server);

module.exports = io


// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Rick&MortyDB', { useNewUrlParser: true })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.header('Access-Control-Allow-Credentials', true);

  next()
})


// app.use('/', api)


const Game = require('./server/gameManagerLogic/GameManager')

const Games = {}
// socket.io
io.on('connection', (socket) => {

  console.log('connection')
  socket.on('newGame', () => {
    console.log('Someone created a new game')
    const gameId = `${randomWords()}-${randomWords()}-${randomWords()}`
    const newGame = new Game(gameId)
    console.log(newGame)
    Games[gameId] = newGame
    Games[gameId].joinGame(socket.id)
    socket.join(`${gameId}`)
    console.log('TCL: gameId', gameId)
    const info = { gameId, playerId: Games[gameId].spaceShips.length - 1 }
    socket.emit('joinedGame', info)
  })

  socket.on('joinGame', (gameId) => {
    console.log('Someone is trying to join a game')
    Games[gameId].joinGame(socket)
    socket.join(gameId)
    socket.emit('joinedGame', { gameId, playerId: Games[gameId].spaceShips.length - 1 })
    io.in(`${gameId}`).emit('getReady');
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
    Games[gameId] ? Games[gameId].move(playerIndex, direction) : null
  })

  socket.on('shoot', (gameID, playerIndex) => {
    Games[gameID].shoot(playerIndex)
  })

  socket.on('deleteGame', (gameID) => {
    delete Games[gameID]
    socket.emit('deleteThisGame', null)
  })

})


