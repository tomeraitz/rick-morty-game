import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import SpaceShipComponent from '../spaceShip/SpaceShipComponent';
import Lasers from '../LaserShots/Lasers';
import Enemy from '../Enemy/Enemy';
import NextLevel from './NextLevel'

import arrayImages from '../../consts/ArrayImages'
import ReactAudioPlayer from 'react-audio-player';
import ThemeSong from '../../sounds/Rick and Morty 8-Bit Intro Adult Swim.mp3'


@inject('GameManager')
@observer
class GameBoard extends Component {
    componentDidMount() {
        this.props.GameManager.start()
    }
    render() {

        let gameBorders = document.getElementById('game-border')
        if (gameBorders) {
            const positionInfo = gameBorders.getBoundingClientRect();
            const height = positionInfo.height;
            const width = positionInfo.width;
            this.props.GameManager.setBorders(height, width)
        }

        const enemies = this.props.GameManager.enemies.map((e, i) => {
            return <Enemy key={i} id={e.id} x={e.x} y={e.y} myImage={arrayImages[e.index]} />
        });

        const spaceShips = this.props.GameManager.spaceShips.map((s, i) => {
            return <SpaceShipComponent key={i} move={s.move} x={s.x} y={s.y} id={s.id} />
        });

        const laserShot = this.props.GameManager.laserShots.map((l, i) => {
            return <Lasers key={i} x={l.x} y={l.y} />
        });
        const playerInfo = this.props.GameManager.playerInfo

        return (
            <div id="game-border">
                {/* <NextLevel /> */}
                <div className="navbar-user">
                    <div className="user-status">Socre : {playerInfo.score}</div>
                    <div className="user-status">Life : {playerInfo.life}</div>
                    <div className="user-status">Level : {playerInfo.level}</div>
                    <div className="user-status">Enemies : {this.props.GameManager.enemyPerLevel}</div>
                    <i className="fas fa-pause"></i>
                </div>
                <ReactAudioPlayer
                    type="audio/mp3"
                    src={ThemeSong}
                    autoPlay
                    loop
                />
                <div id="space-background" >

                    {spaceShips}
                    {laserShot}
                    {enemies}

                    {this.props.GameManager.finishLevel ? <NextLevel level={playerInfo.level} /> : null}

                </div>


            </div>
        )

    }
}


export default GameBoard