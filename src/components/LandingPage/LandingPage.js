import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import '../../style/landing-page.css';

class LandingPage extends Component {
    render() {
        let rickAndMortyLogo = "https://ya-webdesign.com/images/rick-and-morty-logo-png-1.png"
        return (
            <div id="landing-page" >
                <img id="logo" src={rickAndMortyLogo} />
                {/* <div className="start-game-container"> */}
                <Link to="/game">
                    <div className="start-game">
                        START GAME
                        </div>
                </Link>
                {/* </div> */}
            </div>
        );
    }
}

export default LandingPage;
