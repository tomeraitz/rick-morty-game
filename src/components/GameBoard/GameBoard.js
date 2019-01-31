import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import SpaceShipComponent from '../spaceShip/SpaceShipComponent';
import Lasers from '../LaserShots/Lasers';
import Enemy from '../Enemy/Enemy';
import arrayImages from '../../consts/ArrayImages'
import ReactAudioPlayer from 'react-audio-player';
import ThemeSong from '../../sounds/01. Rick and Morty Theme.mp3'

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
            
            return <Enemy key={i} x={e.x} y={e.y} myImage={arrayImages[e.index]}/>
        });

        const spaceShips = this.props.GameManager.spaceShips.map((s, i) => {
            return <SpaceShipComponent key={i} move={s.move} x={s.x} y={s.y} id={s.id} />
        });

        const laserShot = this.props.GameManager.laserShots.map((l, i) => {
            return <Lasers key={i} x={l.x} y={l.y} />
        });
        return (
            <div id="game-board">
                {this.props.GameManager.spaceShips.map((s, i) => {
                    return <div key={i}>
                        <div className="score">Socre : {s.score}</div>
                        <div className="life">Life : {s.life}</div>
                        <div className="life">Level : {s.level}</div>
                    </div>
                })}
                <div id="game-border">
                    <div className="life">Enemy : {this.props.GameManager.enemies.length}</div>
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
                    {this.props.GameManager.finishLevel ? <h1>good jobs</h1> : null}
                    </div>
                </div>
            </div>
        )

    }
}


export default GameBoard