import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import SpaceShipComponent from '../spaceShip/SpaceShipComponent';
import Lasers from '../LaserShots/Lasers';
import Enemy from '../Enemy/Enemy';

@inject('GameManager')
@observer
class GameBoard extends Component {
    componentDidMount() {
        this.props.GameManager.start()
    }
    render() {
        let gameBorders = document.getElementById('game-border')
        if(gameBorders){
            const positionInfo = gameBorders.getBoundingClientRect();
            const height = positionInfo.height;
            const width = positionInfo.width;
            this.props.GameManager.setBorders(height , width)
        }


        const enemies = this.props.GameManager.enemies.map((e, i) => {
            return <Enemy key={i} move={e.move} x={e.x} y={e.y} />
        });

        const spaceShips = this.props.GameManager.spaceShips.map((s, i) => {
            return <SpaceShipComponent key={i} move={s.move} x={s.x} y={s.y} />
        });

        const laserShot = this.props.GameManager.laserShots.map((l, i) => {
            return <Lasers key={i} fire={l.fire} x={l.x} y={l.y} />
        });
        return (
            <div>
                {spaceShips}
                {laserShot}
                {enemies}
            </div>
        )

    }
}


export default GameBoard