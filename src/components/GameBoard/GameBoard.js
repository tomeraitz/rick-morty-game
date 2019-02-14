import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { heightToPixels, widthToPixels } from '../../consts/toPixels'

import SpaceShipComponent from '../spaceShip/SpaceShipComponent'
import Lasers from '../LaserShots/Lasers'
import Enemy from '../Enemy/Enemy'
import NextLevel from './NextLevel'
import Losing from './Losing'

import arrayImages from '../../consts/ArrayImages'
import explosion from '../../consts/explosion'


@inject('ClientManager')
@observer
class GameBoard extends Component {

    componentDidMount() {
        this.props.ClientManager.newState()
    }
    pauseGame =() =>{
        this.props.ClientManager.pauseGame()
    }

    continueGame =() =>{
        this.props.ClientManager.continueGame()
    }

    finishExplosion() {
        this.props.ClientManager.finishExplosion()
    }

    renderEnemies= () =>{
       return this.props.ClientManager.gameData.enemies.map((e, i) => {
            return <Enemy key={i} id={arrayImages[e.index].name} x={widthToPixels(e.x)} y={heightToPixels(e.y)} myImage={e.src} arrayImages={arrayImages[e.index]} />
        });
    }
    renderSpaceShips= () =>{
        return this.props.ClientManager.gameData.spaceShips.map((s, i) => {
            return <SpaceShipComponent key={i} index={i} move={s.move} x={widthToPixels(s.x)} y={heightToPixels(s.y)} id={s.id} height={heightToPixels(s.height)} width={widthToPixels(s.width)} />
        });
     }
     renderLaserShots= () =>{
        return this.props.ClientManager.gameData.laserShots.map((l, i) => {
            return <Lasers key={i} x={widthToPixels(l.x)} y={heightToPixels(l.y)} />
        });
     }
     renderExplosionGif= () =>{
        return this.props.ClientManager.gameData.explosion.map((e, i) => {
            return <div key={i} className="explosion" style={{ left: `${widthToPixels(e.x)}px`, bottom: `${heightToPixels(e.y)}px` }}> <img alt="explosion" src={explosion} /> </div>
        });
     }
    render() {

        if (this.props.ClientManager.gameData && this.props.ClientManager.gameData.spaceShips.length > 0)
        {
            const game = {...this.props.ClientManager.gameData}
            this.finishExplosion()
            const playerInfo = game.playerInfo


            return (
                <div id="game-border">
                    <div className="navbar-user">
                        <div className="user-status">Socre : {playerInfo.score}</div>
                        <div className="user-status">Life : {playerInfo.life}</div>
                        <div className="user-status">Level : {playerInfo.level}</div>
                        <div className="user-status">Enemies : {game.enemyPerLevel}</div>
                        {this.props.ClientManager.isGameOnPause ?
                            <i className="fas fa-play" onClick={this.continueGame}></i>
                            : <i className="fas fa-pause" onClick={this.pauseGame}></i>}
                    </div>

                    <div id="space-background" >
                        {this.renderSpaceShips()}
                        {this.renderLaserShots()}
                        {this.renderEnemies()}
                        {this.renderExplosionGif()}
                        {game.finishLevel ? <NextLevel level={playerInfo.level} /> : null}
                        {game.isGameOver ? <Losing /> : null}
                    </div>
                </div>
            )
        } else { return <h1>ERROR</h1> }
    }

}

export default GameBoard