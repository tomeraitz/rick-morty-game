import { observable, action } from 'mobx'
import io from 'socket.io-client';
import Features from './Features'

const socket = io.connect()//('http://localhost:3004/')


class ClientManager {
    @observable gameID
    @observable playerID
    @observable gameData
    @observable checKeyPress = [40, 38, 37, 39]
    @observable singlePlayer = false
    @observable gameOver = false
    @observable isGameMultiplayerOn = false
    @observable ready = false
    @observable isGameOnPause = false
    @observable soundOn = true


    @action getGameIdAndPlayerID(gameIDAndPlayer) {
        this.gameID = gameIDAndPlayer.gameId
        this.playerID = gameIDAndPlayer.playerId
    }

    @action newState = () => {
        socket.on('newState', (gameData) => {
            this.getgameData(gameData)
        })
    }

    @action startSinglePlay = () => {
        socket.emit('singleGame')
        socket.on('joinedGame', (gameIDAndPlayer) => {
            this.getGameIdAndPlayerID(gameIDAndPlayer)
            socket.emit('startGame', gameIDAndPlayer.gameId)
        })
        Features.playDubdub()
        Features.playThemeSong()
    }

    @action startMultiPlay = () => {
        socket.emit('multyGame')
        socket.on('joinedGame', (gameIDAndPlayer) => {
            console.log(gameIDAndPlayer.gameId)
            this.getGameIdAndPlayerID(gameIDAndPlayer)
            if(this.playerID == 1){
                socket.emit('startGame', gameIDAndPlayer.gameId)
            }
        })
    }

    @action newGame = () => {
        this.gameOver = false
        socket.emit('newGame')
        socket.on('joinedGame', gameIDAndPlayer => {
            this.getGameIdAndPlayerID(gameIDAndPlayer)

        })
    }


    @action joinGame = (gameJoinID) => {
        socket.emit('joinGame', gameJoinID)
        socket.on('joinedGame', (gameIDAndPlayer) => {
            this.getGameIdAndPlayerID(gameIDAndPlayer)
        })
    }

    @action getgameData = (gameData) => {
        this.gameData = { ...gameData }
    }

    @action move = (direction) => {
        socket.emit('move', this.gameID, this.playerID, direction)
    }

    @action shoot = () => {
        socket.emit('shoot', this.gameID, this.playerID)
        Features.shootSound()
    }

    @action pauseGame = () => {
        socket.emit('pauseGame', this.gameID)
        this.isGameOnPause = true
    }

    @action continueGame = () => {
        socket.emit('continueGame', this.gameID)
        this.isGameOnPause = false
    }


    @action finishExplosion = () => {
        socket.emit('finishExplosion', this.gameID)
    }

    @action setGameOver = () => {
        this.gameOver = true
    }

    @action waitForPlayers = () => {
        socket.on("getReady", () => {
            this.ready = true
        })
    }

    @action deleteGame = () => {
        socket.emit('deleteGame', this.gameID)
        window.location.reload()

    }

}

const clientManager = new ClientManager()
if (clientManager.gameData) {
    clientManager.newState()
}

socket.on('gameOver', () => {
    clientManager.setGameOver()
})

export default clientManager