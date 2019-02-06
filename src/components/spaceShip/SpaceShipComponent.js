import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import ReactHowler from 'react-howler'

import LaserShot from '../../stores/LaserShot';
// import { heightToPixels, widthToPixels } from '../consts/toPixels'


let spaceShipImage = require('../../images/spaceShip.png')

@inject("ClientManager")

@observer
class SpaceShipComponent extends Component {
  hadelKeyPress = (e) => {
    const game = this.props.ClientManager

    if (e.which === 32) {
      game.shoot()

    }
    else if (game.checKeyPress.includes(e.which)) {
      game.move(e.which)
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.hadelKeyPress);
  }

  render() {
    let x = this.props.x
    let y = this.props.y
    // let height = heightToPixels(6)
    // let width = widthToPixels(6.5)

    return (
      <div id="space-ship" style={{ bottom: `${y}px`, left: `${x}px` }} >
        <img src={spaceShipImage} alt="space-ship" />
      </div>
    );
  }
}

export default SpaceShipComponent;
