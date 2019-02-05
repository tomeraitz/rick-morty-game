import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import LaserShot from '../../stores/LaserShot';

let spaceShipImage = require('../../images/spaceShip.png')

@inject("GameManager")

@observer
class SpaceShipComponent extends Component {
  hadelKeyPress = (e) => {
    if (e.which === 32) {
      this.props.GameManager.drawInstance(new LaserShot(this.props.x + 70, this.props.y, this.props.id))
    } else {
      this.props.move(e.which, this.props.GameManager.boardWidth, this.props.GameManager.boardHeight)
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.hadelKeyPress);
  }

  render() {
    let x = this.props.x
    let y = this.props.y
    return (

      <div id="space-ship" style={{ bottom: `${y}px`, left: `${x}px` }} >
        <img src={spaceShipImage} alt="space-ship" />
      </div>
    );
  }
}

export default SpaceShipComponent;
