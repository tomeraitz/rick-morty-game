import React, { Component } from 'react';

class Popup extends Component {
    closePopup = () => {
        return this.props.closePopup()
    }
    render() {
        return (
            <div className="popup">
                <div className="close-popup" onClick={this.closePopup}>X</div>
                <div></div>
                <div className="side-bar">
                    <button className="create-game">CREATE GAME</button>
                    <div className="join-game">
                        <input placeholder="Enter passcode to join..." />
                        <button className="join-game-button">JOIN</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;
