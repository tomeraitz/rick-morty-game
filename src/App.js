import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReactHowler from 'react-howler'
import { observer } from 'mobx-react'

import './App.css';

import GameBoard from './components/GameBoard/GameBoard'
import Stars from './components/Stars/Stars'
import LandingPage from './components/LandingPage/LandingPage'


@observer
class App extends Component {
  state = {
    soundOn: true
  }

  toggleSound = () => {
    this.setState({ soundOn: !this.state.soundOn })
  }

  render() {
    let themeSong = require('./sounds/Rick and Morty 8-Bit Intro Adult Swim.mp3')

    return (
      <Router>
        <div className="App">

          {this.state.soundOn ? <ReactHowler src={themeSong} playing={true} loop={true} /> : <ReactHowler src={themeSong} playing={false} />}

          <Stars />
          <Route path="/" exact render={() => <LandingPage toggleSound={this.toggleSound} soundOn={this.state.soundOn} />} />
          <Route path="/game" exact render={() => <GameBoard />} />
        </div>
      </Router>
    );
  }
}

export default App;
