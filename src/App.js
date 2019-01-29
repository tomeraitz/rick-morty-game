import React, { Component } from 'react';
import { observer } from 'mobx-react'
import './App.css';

import SpaceShipComponent from './components/spaceShip/SpaceShipComponent';

import Lasers from './components/Lasers';
import Enemy from './components/Enemy'


@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <SpaceShipComponent />
        <Enemy />
        <Lasers />

      </div>
    );
  }
}

export default App;
