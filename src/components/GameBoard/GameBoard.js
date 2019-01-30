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

        const enemies = this.props.GameManager.enemies.map((e, i) => {
            return <Enemy key={i} x={e.x} y={e.y} />
        });

        const spaceShips = this.props.GameManager.spaceShips.map((s, i) => {
            return <SpaceShipComponent key={i} move={s.move} x={s.x} y={s.y} />
        });

        const laserShot = this.props.GameManager.laserShots.map((l, i) => {
            return <Lasers key={i} x={l.x} y={l.y} />
        });
        return (
            <div id="game-board">
                {spaceShips}
                {laserShot}
                {enemies}
            </div>
        )

    }
}


export default GameBoard