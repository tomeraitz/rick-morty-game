import React, { Component } from 'react';
import {observer,inject} from 'mobx-react';
import { Link } from 'react-router-dom'

@inject('ClientManager')
@observer
class Popup extends Component {
    state = {
        codeError: false,
        codeText: ""
    }

    closePopup = () => this.props.closePopup()

    inputHandle = (e) => {
        this.setState({ codeText: e.target.value })
    }

    joinGame = () => {
        if (this.state.codeText === "") {
            this.setState({ codeError: true })
        } 
        else {
            // return this.props.searchingForPlayer()
            this.props.ClientManager.joinGame(this.state.codeText)
            
            
        }
    }

    searchingForPlayer = () => {
        this.props.ClientManager.newGame()
        this.props.searchingForPlayer()
    }


    render() {
        return (
            <div className="popup">
                <div className="close-popup" onClick={this.closePopup}>X</div>
                <div></div>
                <div className="side-bar">

                <Link to="/game" ><button className="create-game" onClick={this.searchingForPlayer}>CREATE GAME</button></Link>
                    <div className="join-game">
                        <div className="code-input">
                            <input name="codeText" className={this.state.codeError ? "code-error" : ""} value={this.state.codeText} onChange={this.inputHandle} placeholder="Enter passcode to join..." />
                            {this.state.codeError ? <p>Please enter valid code...</p> : null}
                        </div>
                        <Link to="/game" ><button className="join-game-button" onClick={this.joinGame}>JOIN</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;
