import React, { Component } from 'react';
import { observer } from 'mobx-react'
import './App.css';

import SpaceShipComponent from './components/spaceShip/SpaceShipComponent';

import Lasers from './components/LaserShots/Lasers';


@observer
class App extends Component {
  render() {
    return (
      <div className="App">

        <SpaceShipComponent />

        <Lasers />

      </div>
    );
  }
}

export default App;
