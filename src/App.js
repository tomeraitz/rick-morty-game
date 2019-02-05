import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { observer } from 'mobx-react'

import './App.css';

import GameBoard from './components/GameBoard/GameBoard'
import Stars from './components/Stars/Stars'
import LandingPage from './components/LandingPage/LandingPage'


@observer
class App extends Component {
  render() {

    return (
      <Router>

        <div className="App">
          <Stars />
          <Route path="/" exact render={() => <LandingPage />} />
          <Route path="/game" exact render={() => <GameBoard />} />
        </div>
      </Router>
    );
  }
}

export default App;
