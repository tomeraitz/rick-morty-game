import React, { Component } from 'react';
import './spaceShip.css';
import { observer, inject } from 'mobx-react'

@inject("GameManager")

@observer
class SpaceShipComponent extends Component {
  hadelKeyPress = (e) => {
    e.which === 32 ? this.props.GameManager.createLaserShot(this.props.x, this.props.y) :
      this.props.move(e.which)
  }

  testWidth = () =>{

  }

  componentDidMount() {
    document.addEventListener("keydown", this.hadelKeyPress);
  }

  render() {
    let x = this.props.x
    let y = this.props.y

   var element = document.getElementById('spaceShipBorder');
   if(element){
        var positionInfo = element.getBoundingClientRect();
        var height = positionInfo.height;
        var width = positionInfo.width;
        console.log(height)
   }

    return (
        
      <div id="spaceShipBorder" onClick={this.testWidth}>

        <div id="hero" style={{ bottom: `${y}vh`, left: `${x}vw` }} >

        </div>
      </div>
    );
  }
}

export default SpaceShipComponent;
