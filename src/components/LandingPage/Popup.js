import React, { Component } from 'react';

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
        } else {
            return this.props.searchingForPlayer()
        }
    }

    searchingForPlayer = () => this.props.searchingForPlayer()

    render() {
        return (
            <div className="popup">
                <div className="close-popup" onClick={this.closePopup}>X</div>
                <div></div>
                <div className="side-bar">
                    <button className="create-game" onClick={this.searchingForPlayer}>CREATE GAME</button>
                    <div className="join-game">
                        <div className="code-input">
                            <input name="codeText" className={this.state.codeError ? "code-error" : ""} value={this.state.codeText} onChange={this.inputHandle} placeholder="Enter passcode to join..." />
                            {this.state.codeError ? <p>Please enter valid code...</p> : null}
                        </div>
                        <button className="join-game-button" onClick={this.joinGame}>JOIN</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;
