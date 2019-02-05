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
    socket.emit('gameCreated', gameId, newGame.players.length - 1)
    console.log(Object.keys(Games))
  })


})



app.listen(port, function () {
  console.log("Server is running!")
})


