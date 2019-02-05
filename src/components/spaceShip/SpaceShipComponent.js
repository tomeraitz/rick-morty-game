import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import LaserShot from '../../stores/LaserShot';

import '../../App.css'


@inject("ClientManager")

@observer
class SpaceShipComponent extends Component {
  hadelKeyPress = (e) => {
    const game = this.props.ClientManager.gameData
    if (e.which === 32) {
      game.shoot()
    }
    else if(game.checKeyPress.includes(e.which)) { 
      game.move(e.which) 
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.hadelKeyPress);
  }

  render() {

    let x = this.props.x
    let y = this.props.y
    return (

      <div id="space-ship" style={{ bottom: `${y}px`, left: `${x}px` }} ></div>
    );
  }
}

export default SpaceShipComponent;
