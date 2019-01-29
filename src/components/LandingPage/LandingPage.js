import React, { Component } from 'react';
import './landing-page.css';
import Menu from './Menu'

class LandingPage extends Component {
    render() {
        let rickAndMortyLogo = "https://ya-webdesign.com/images/rick-and-morty-logo-png-1.png"
        return (
            <div id="landing-page" >
                <img id="logo" src={rickAndMortyLogo} />
                <Menu />
            </div>
        );
    }
}

export default LandingPage;
