import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import SpaceShipComponent from './spaceShip/SpaceShipComponent';
import Lasers from './LaserShots/Lasers';


@inject('GameManager')

@observer

class GameBoard extends Component {
    render() {
        this.props.GameManger.start()
        const spaceShips = this.props.GameManger.spaceShips.map(s => {
            return <SpaceShipComponent />
        });

        return (
            <div>
                {spaceShips}
            </div>
        )

    }
}