import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { BrowserRouter as Redirect } from 'react-router-dom'


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
        if (gameBorders)
        {
            const positionInfo = gameBorders.getBoundingClientRect();
            const height = positionInfo.height;
            const width = positionInfo.width;
            this.props.GameManager.setBorders(height, width)
        }


        const enemies = this.props.GameManager.enemies.map((e, i) => {

            return <Enemy key={i} x={e.x} y={e.y} myImage={arrayImages[e.index]} />
        });

        const spaceShips = this.props.GameManager.spaceShips.map((s, i) => {
            return <SpaceShipComponent key={i} move={s.move} x={s.x} y={s.y} id={s.id} />
        });

        const laserShot = this.props.GameManager.laserShots.map((l, i) => {
            return <Lasers key={i} x={l.x} y={l.y} />
        });

        return (
            <div id="game-border">
                {/* <NextLevel /> */}
                {this.props.GameManager.spaceShips.map((s, i) => {
                    return <div key={i} className="navbar-user">
                        <div className="user-status">Socre : {s.score}</div>
                        <div className="user-status">Life : {s.life}</div>
                        <div className="user-status">Level : {s.level}</div>
                        <div className="user-status">Enemies : {this.props.GameManager.enemies.length}</div>
                        <i className="fas fa-pause"></i>

                    </div>
                })}
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

                </div>


            </div>
        )

    }
}


export default GameBoard