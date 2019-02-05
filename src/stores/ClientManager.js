import { observable, action } from 'mobx'
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3004/')

class ClientManager {
    @observable gameID
    @observable playerID
    @observable gameData
    @observable checKeyPress = [40, 38 , 37 , 39 ]
    
    @action getGameIdAndPlayerID(gameIDAndPlayer){
        this.gameID = gameIDAndPlayer.gameId
        this.playerID = gameIDAndPlayer.playerId
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

    @action getgameData = (gameData) => {
        
        this.gameData = gameData
    }

    @action move =(direction) =>{
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