import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import io from 'socket.io-client';
import { heightToPixels, widthToPixels } from '../../consts/toPixels'

import SpaceShipComponent from '../spaceShip/SpaceShipComponent'
import Lasers from '../LaserShots/Lasers'
import Enemy from '../Enemy/Enemy'
import NextLevel from './NextLevel'
import Losing from './Losing'

import arrayImages from '../../consts/ArrayImages'
import explosion from '../../consts/explosion'

const socket = io.connect('http://localhost:3004/')
@inject('ClientManager')
@observer
class GameBoard extends Component {

    componentDidMount() {

        // socket.emit('newGame')
        // socket.on('joinedGame', (gameIDAndPlayer) => {
        //     this.props.ClientManager.getGameIdAndPlayerID(gameIDAndPlayer)
        //     socket.emit('startGame', gameIDAndPlayer.gameId)
        // })

        this.props.ClientManager.newState()
    }
    // finishExplosion() {
    //     setTimeout(() =>
    //         game.finishExplosion()
    //         , 500)
    // }

    render() {

        if (this.props.ClientManager.gameData) {

            const game = this.props.ClientManager.gameData
            const playerInfo = game.playerInfo
            const enemies = game.enemies.map((e, i) => {
                return <Enemy key={i} id={arrayImages[e.index].name} x={widthToPixels(e.x)} y={heightToPixels(e.y)} myImage={e.src} arrayImages={arrayImages[e.index]} />
            });

            const spaceShips = game.spaceShips.map((s, i) => {
                return <SpaceShipComponent key={i} move={s.move} x={widthToPixels(s.x)} y={heightToPixels(s.y)} id={s.id} height={heightToPixels(s.height)} width={widthToPixels(s.width)} />
            });

            const laserShots = game.laserShots.map((l, i) => {
                return <Lasers key={i} x={widthToPixels(l.x)} y={heightToPixels(l.y)} />
            });


            return (
                <div id="game-border">
                    <div className="navbar-user">
                        <div className="user-status">Socre : {playerInfo.score}</div>
                        <div className="user-status">Life : {playerInfo.life}</div>
                        <div className="user-status">Level : {playerInfo.level}</div>
                        <div className="user-status">Enemies : {game.enemyPerLevel}</div>
                        {game.isGameOnPause ?
                            <i className="fas fa-play" onClick={game.continuePlaying}></i>
                            : <i className="fas fa-pause" onClick={game.pauseGame}></i>}
                    </div>

                    <div id="space-background" >
                        {spaceShips}
                        {laserShots}
                        {enemies}

                        {game.finishLevel ? <NextLevel level={playerInfo.level} /> : null}
                        {/* {game.explosion.map((e, i) =>
                        <div key={i} className="explosion"
                            style={{
                                right: `${e.x}px`,
                                bottom: `${e.y}px`
                            }}>
                            <img alt="explosion" src={explosion} />
                        </div>
                    )} */}

                        {game.gameOver && game.losing ? <Losing /> : null}
                    </div>
                </div>
            )
        } else { return <h1>ERROR</h1> }
    }

}

export default GameBoard