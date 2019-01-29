import React, { Component } from 'react';
import { observer } from 'mobx-react'
import './App.css';
import Lasers from './components/Lasers';

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <Lasers />
      </div>
    );
  }
}

export default App;
