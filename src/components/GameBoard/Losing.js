import React, { Component } from 'react';
import { inject } from 'mobx-react';

import { Redirect, Link } from 'react-router-dom'

@inject('ClientManager')

class Losing extends Component {
    startNewGame = () => this.props.ClientManager.startSinglePlay()

    backToLandingPage = () => {
        this.props.ClientManager.deleteGame()
        return <Redirect to="/" />
    }

    render() {
        return (

            < div className="losing-popup" >
                <h1>YOU SUCK!</h1>
                <div className="player-choose-next">
                    {/* <button className="start-new-game" onClick={this.startNewGame}>START A NEW GAME!</button> */}
                    <Link to='/'><button className="exit-button" onClick={this.backToLandingPage}>Exit</button></Link>
                </div>
            </div >
        );
    }
}

export default Losing;
