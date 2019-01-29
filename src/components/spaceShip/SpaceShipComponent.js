import React, { Component } from 'react';
import './spaceShip.css';
import { observer, inject } from 'mobx-react'
import LaserShot from '../../stores/LaserShot';

@inject("GameManager")

@observer
class SpaceShipComponent extends Component {
  hadelKeyPress = (e) => {
    console.log('TCL: SpaceShipComponent -> hadelKeyPress -> this.props.x', this.props.x)
    console.log('TCL: SpaceShipComponent -> hadelKeyPress -> this.props.y', this.props.y)

    e.which === 32 ? this.props.GameManager.drawInstance(new LaserShot(this.props.x, this.props.y)) :
      this.props.move(e.which)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.hadelKeyPress);
  }

  render() {
    let x = this.props.x
    let y = this.props.y
    return (
      <div id="game-border">
        <div id="space-background" >

          <div id="hero" style={{ bottom: `${y}vh`, left: `${x}vw` }} >

          </div>
        </div>
      </div>
    );
  }
}

export default SpaceShipComponent;
