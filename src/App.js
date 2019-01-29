import React, { Component } from 'react';
import { observer } from 'mobx-react'
import './App.css';

import LandingPage from './components/LandingPage/LandingPage'
import GameBoard from './components/GameBoard/GameBoard';


@observer
class App extends Component {
  render() {

    return (
      <div className="App">
        <LandingPage />
        {/* <GameBoard /> */}
      </div>
    );
  }
}

export default App;
