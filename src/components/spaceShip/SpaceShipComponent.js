import React, { Component } from 'react';
import './spaceShip.css';
import { observer, inject } from 'mobx-react'

@inject("GameManager")

@observer
class SpaceShipComponent extends Component {
  hadelKeyPress = (e) => {
    e.which === 32 ? this.props.GameManager.shoot(this.props.x, this.props.y) :
      this.props.move(e.which)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.hadelKeyPress);
  }

  render() {
    let x = this.props.x
    let y = this.props.y
    return (
      <div id="spaceShipBorder" >
        <div id="hero" style={{ bottom: `${y}px`, left: `${x}px` }} >

        </div>
      </div>
    );
  }
}

export default SpaceShipComponent;
