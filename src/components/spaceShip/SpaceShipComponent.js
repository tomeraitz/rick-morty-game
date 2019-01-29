import React, { Component } from 'react';
import './spaceShip.css';
import { observer, inject } from 'mobx-react'

@inject("SpaceShip")

@observer
class SpaceShipComponent extends Component {
    hadelKeyPress = (e) =>{
        e.which === 32 ? this.props.SpaceShip.shoot() :
        this.props.SpaceShip.move(e.which)
  }

  componentDidMount(){
    document.addEventListener("keydown", this.hadelKeyPress);
}

  render() {
    let  x = this.props.SpaceShip.x
    let  y = this.props.SpaceShip.y
    return (
      <div id="spaceShipBorder" >
            <div id="hero" style={{top : `${x}px`, left : `${y}px`}} >

            </div>
      </div>
    );
  }
}

export default SpaceShipComponent;
