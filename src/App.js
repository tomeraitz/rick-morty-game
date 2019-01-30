import React, { Component } from 'react';
import { observer } from 'mobx-react'

import './App.css';

import GameBoard from './components/GameBoard/GameBoard';



@observer
class App extends Component {
  render() {

    return (
      <div className="App">
        {/* <div id="game-border">
          <div id="space-background" > */}
        <GameBoard />
      </div>
      //   </div>

      // </div>
    );
  }
}

export default App;
