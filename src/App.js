import React, { Component } from 'react';
import { observer } from 'mobx-react'
import './App.css';

import GameBoard from './components/GameBoard/GameBoard';



@observer
class App extends Component {
  render() {

    return (
      <div className="App">
        <GameBoard />
      </div>
    );
  }
}

export default App;
