import React, { Component } from 'react';
import { observer } from 'mobx-react'
import './App.css';
import SpaceShipComponent from './components/spaceShip/SpaceShipComponent';

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <SpaceShipComponent />
      </div>
    );
  }
}

export default App;
