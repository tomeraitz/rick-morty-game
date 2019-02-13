import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
// import ReactHowler from 'react-howler'

// import LaserShot from '../../stores/LaserShot';
// import { heightToPixels, widthToPixels } from '../consts/toPixels'


const spaceShipImage = require('../../images/spaceShip.png')
const redSpaceShipImage = require('../../images/redSpaceShip.png')
const blueSpaceShipImage = require('../../images/blueSpaceShip.png')


@inject("ClientManager")

@observer
class SpaceShipComponent extends Component {
  hadelKeyPress = (e) => {
    const game = this.props.ClientManager

    if (e.which === 32)
    {
      game.shoot()

    }
    else if (game.checKeyPress.includes(e.which))
    {
      game.move(e.which)
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.hadelKeyPress);
  }

  render() {
    // let x = this.props.x
    // let y = this.props.y
    // let shipHeight = this.props.height
    // let shipWidth = this.props.width

    const { index, x, y, height, width } = this.props
    const imageSRC = index === null ? spaceShipImage : index === 0 ? redSpaceShipImage : blueSpaceShipImage
    return (
      <div id="space-ship" style={{ bottom: `${y}px`, left: `${x}px` }} >
        <img src={imageSRC} alt="space-ship" style={{ height: `${height}px`, width: `${width}px` }} />
      </div>
    );
  }
}

export default SpaceShipComponent;
