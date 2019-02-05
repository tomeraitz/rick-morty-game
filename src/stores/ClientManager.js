import { observable, action } from 'mobx'
const socket = io()

class ClientManager {
    @observable gameID
    @observable playerID
    @observable gameData
    @observable checKeyPress = [40, 38 , 37 , 39 ]

    getGameIdAndPlayerID(){
        socket.on('joinedGame' , gameIDAndPlayer)
        this.gameID = gameIDAndPlayer.gameID
        this.playerID = gameIDAndPlayer.playerIndex
    }

    @action startGame = () =>{
        socket.emit('startGame' , this.gameID)
    }

    @action newGame = () =>{
        socket.emit('newGame')
        this.getGameIdAndPlayerID()
    }

    @action joinGame = () =>{
        socket.emit('joinGame')
        this.getGameIdAndPlayerID()
    }

    @action getgameData = () => {
        socket.on('newState', gameData )
        this.gameData = gameData
    }

    @action move =() =>{
        socket.emit('move', this.gameID, this.playerID, direction)
    }

    @action shoot = () =>{
        socket.emit('shoot',this.gameID, this.playerID )
    }

    @action pauseGame = () =>{
        socket.emit('pauseGame' , this.gameID)
    }

    @action continueGame = () =>{
        socket.emit('continueGame', this.gameID)
    }
}

const clientManager = new ClientManager()
export default clientManager