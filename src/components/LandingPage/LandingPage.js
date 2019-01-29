import React, { Component } from 'react';
import './landing-page.css';

class LandingPage extends Component {
    render() {
        let rickAndMortyLogo = "https://mpng.pngfly.com/20180526/wsk/kisspng-rick-sanchez-the-art-of-rick-and-morty-rick-and-mo-5b0a237dbeede3.3800036415273911017821.jpg"
        return (
            <div className="landing-page" >
                <img id="logo" src={rickAndMortyLogo} />
            </div>
        );
    }
}

export default LandingPage;
