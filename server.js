const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const randomWords = require('random-words')
const port = process.env.PORT || 3004
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Mongoose setup
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/Rick&MortyDB', { useNewUrlParser: true })

// const api = require('./server/routes/api')
// app.use('/', api)

if (process.env.PORT)//for production enviroment
{
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  })
}
else// for dev enviroment
{
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    res.header('Access-Control-Allow-Credentials', true);
    next()
  })
}

const server = app.listen(port, () => {
  console.log(`server running on ${port}`)
});//http.createServer(app);

const io = require('socket.io').listen(server)
module.exports = io

const Game = require('./server/gameManagerLogic/GameManager')
const Games = {}
let multy = []

// socket.io
io.on('connection', (socket) => {

  console.log('connection')


  socket.on('singleGame', () => {
    console.log('Someone created a new single game')

    const gameId = `${randomWords()}-${randomWords()}-${randomWords()}`
    const newGame = new Game(gameId)
    Games[gameId] = newGame
    Games[gameId].joinGame(socket.id)
    socket.join(`${gameId}`)
    const info = { gameId, playerId: Games[gameId].spaceShips.length - 1 }
    socket.emit('joinedGame', info)
  })

  socket.on('multyGame', () => {
    if (multy.length===0){
      console.log('Someone created a new game')
      const gameId = `${randomWords()}-${randomWords()}-${randomWords()}`
      multy.push(gameId)
      const newGame = new Game(gameId)
      Games[gameId] = newGame
      Games[gameId].joinGame(socket.id)
      socket.join(`${gameId}`)
      const info = { gameId, playerId: Games[gameId].spaceShips.length - 1 }
      socket.emit('joinedGame', info)
    }
    else{
        Games[multy[0]].joinGame(socket)
        socket.join(multy[0])
        socket.emit('joinedGame', { gameId :multy[0], playerId: Games[multy[0]].spaceShips.length - 1 })
        io.in(`${multy[0]}`).emit('getReady');
        multy = []
    }
  })


  socket.on('startGame', (gameId) => {
    Games[gameId].start()
  })

  socket.on('pauseGame', (gameId) => {
    Games[gameId].pauseGame()
  })

  socket.on('continueGame', (gameId) => {
    Games[gameId].continuePlaying()
  })

  socket.on('finishExplosion', (gameId) => {
    Games[gameId].finishExplosion()
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


