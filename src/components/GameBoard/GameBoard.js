import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import SpaceShipComponent from '../spaceShip/SpaceShipComponent';
// import Lasers from './LaserShots/Lasers';

@inject('GameManager')
@observer
class GameBoard extends Component {
    componentDidMount() {
        this.props.GameManager.start()
    }
    render() {
        const spaceShips = this.props.GameManager.spaceShips.map(s => {

            return <SpaceShipComponent move={s.move} x={s.x} y={s.y} />

        });
        console.log(this.props.GameManager.spaceShips)
        return (
            <div>
                {spaceShips}
            </div>
        )

    }
}


export default GameBoard