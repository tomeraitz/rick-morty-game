import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Popup from './Popup'
import { inject } from 'mobx-react';

import '../../style/landing-page.css';

@inject('ClientManager')

class LandingPage extends Component {
    state = {
        showPopup: false
    }

    togglePopup = () => {
        this.setState({ showPopup: !this.state.showPopup })
    }

    render() {
        let rickAndMortyLogo = "https://ya-webdesign.com/images/rick-and-morty-logo-png-1.png"
        return (
            <div id="landing-page" onClick={this.showPopup ? this.closePopup() : null}>
                <img id="logo" alt="" src={rickAndMortyLogo} />
                <div className="games-buttons">
                    <Link to="/game" ><div className="start-game" onClick={this.props.GameManager.startNewGame}>SINGLE PLAYER</div></Link>
                    <div className="start-multiplayer-game" onClick={this.togglePopup}>MULTIPLAYER</div>

                    {this.state.showPopup ? <Popup closePopup={this.togglePopup} /> : null}
                </div>
            </div>
        );
    }
}

export default LandingPage;
