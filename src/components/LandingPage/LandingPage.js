import React, { Component } from 'react';
import './landing-page.css';

class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page" >
                <img id="logo" src={rickAndMortyLogo} />
            </div>
        );
    }
}

export default LandingPage;
