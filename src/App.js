import React, { Component } from 'react';
import { observer } from 'mobx-react'
import './App.css';
import Lasers from './components/Lasers';
import Enemy from './components/Enemy'

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <Enemy />
        <Lasers />
      </div>
    );
  }
}

export default App;
