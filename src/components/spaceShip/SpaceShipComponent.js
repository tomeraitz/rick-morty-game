import React, { Component } from 'react';
import './spaceShip.css';
import { observer, inject } from 'mobx-react'
import LaserShot from '../../stores/LaserShot';

@inject("GameManager")

@observer
class SpaceShipComponent extends Component {
  hadelKeyPress = (e) => {
    e.which === 32 ? this.props.GameManager.drawInstance(new LaserShot(this.props.x, this.props.y)) :
      this.props.move(e.which , this.props.GameManager.boardWidth , this.props.GameManager.boardHeight)
  }

  testWidth = () =>{

  }

  componentDidMount() {
    document.addEventListener("keydown", this.hadelKeyPress);
  }

  render() {
    let x = this.props.x
    let y = this.props.y
    console.log(y)
    return (

      <div id="game-border">
        <div id="space-background" >

          <div id="hero" style={{ bottom: `${y}px`, left: `${x}px` }} >

          </div>
        </div>
      </div>
    );
  }
}

export default SpaceShipComponent;
