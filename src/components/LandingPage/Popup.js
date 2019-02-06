import React, { Component } from 'react';
import {observer,inject} from 'mobx-react';

@inject('ClientManager')
@observer
class Popup extends Component {
    closePopup = () => {
        return this.props.closePopup()
    }

    createGame = () =>{
        this.props.ClientManager.newGame()
    }
    render() {
        return (
            <div className="popup">
                <div className="close-popup" onClick={this.closePopup}>X</div>
                <div></div>
                <div className="side-bar">
                    <button className="create-game" onClick={this.createGame}>CREATE GAME</button>
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
