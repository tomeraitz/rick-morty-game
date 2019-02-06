import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
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
        this.setState({ codeText: e.target.value.toLowerCase() })
    }

    joinGame = () => {
        if (this.state.codeText === "") {
            this.setState({ codeError: true })
        } else {
            this.props.ClientManager.joinGame(this.state.codeText)
            this.props.ClientManager.startMultiPlay()

        }
    }

    searchingForPlayer = () => {
        this.props.searchingForPlayer()
        this.props.ClientManager.newGame()
    }


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
                        <Link to={this.state.codeText === "" ? "/" : "/game"} ><button className="join-game-button" onClick={this.joinGame}>JOIN</button></Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default Popup;
