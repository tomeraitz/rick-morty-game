import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom'

import Popup from './Popup'
import JoinedPopup from './JoinedPopup'

import '../../style/landing-page.css';
import SearchingForPlayer from './SearchingForPlayer';


@inject('ClientManager')

class LandingPage extends Component {
    state = {
        showPopup: false,
        searchingForPlayer: false,
        gameFound: false
    }

    togglePopup = () => {
        this.setState({ showPopup: !this.state.showPopup })
    }

    startSingleGame = () => {
        this.props.ClientManager.startSinglePlay()
        this.props.ClientManager.singlePlayer = true
    }

    searchingForPlayerToggle = () => {
        this.setState({ searchingForPlayer: !this.state.searchingForPlayer, showPopup: false })
    }

    foundGameToggle = () => {
        this.setState({ gameFound: !this.state.gameFound, showPopup: false })
    }

    toggleSound = () => this.props.toggleSound()

    render() {

        let rickAndMortyLogo = "https://ya-webdesign.com/images/rick-and-morty-logo-png-1.png"
        return (
            <div id="landing-page" onClick={this.showPopup ? this.closePopup() : null}>
                {this.props.soundOn ? <i className="fas fa-volume-up" onClick={this.toggleSound}></i> : <i className="fas fa-volume-off" onClick={this.toggleSound}></i>}
                <img id="logo" alt="" src={rickAndMortyLogo} />
                <div className="games-buttons">

                    <Link to="/game" ><div className="start-game" onClick={this.startSingleGame}>SINGLE PLAYER</div></Link>

                    <div className="start-multiplayer-game" onClick={this.togglePopup}>MULTIPLAYER</div>

                    {this.state.showPopup ? <Popup closePopup={this.togglePopup} searchingForPlayer={this.searchingForPlayerToggle} foundGameToggle={this.foundGameToggle} /> : null}

                    {this.state.searchingForPlayer ? <SearchingForPlayer cancelSearch={this.searchingForPlayerToggle} /> : null}
                    {this.state.gameFound ? <JoinedPopup /> : null}
                </div>
            </div>
        );
    }
}

export default LandingPage;
