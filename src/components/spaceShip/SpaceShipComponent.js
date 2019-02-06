import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
// import ReactHowler from 'react-howler'

// import LaserShot from '../../stores/LaserShot';
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
    document.addEventListener("keyup", this.hadelKeyPress);
  }

  render() {
    let x = this.props.x
    let y = this.props.y
    let shipHeight = this.props.height
    let shipWidth = this.props.width

    return (
      <div id="space-ship" style={{ bottom: `${y}px`, left: `${x}px` }} >
        <img src={spaceShipImage} alt="space-ship" style={{ height: `${shipHeight}px`, width: `${shipWidth}px` }} />
      </div>
    );
  }
}

export default SpaceShipComponent;
