import React, { Component } from 'react';
import { inject } from 'mobx-react';

import { Link } from 'react-router-dom'

@inject('ClientManager')

class Losing extends Component {
    render() {
        return (
            <div className="losing-popup">
                <h1>YOU SUCK!</h1>
                <div className="player-choose-next">
                    {/* <button className="start-new-game" onClick={this.props.ClientManager.startNewGame}>START A NEW GAME!</button> */}
                    <Link to='/'><button className="exit-button">Exit</button></Link>
                </div>
            </div >
        );
    }
}

export default Losing;
