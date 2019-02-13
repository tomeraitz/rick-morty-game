import React, { Component } from 'react';
import '../../style/searching-for-player.css'
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom'


@inject("ClientManager")

@observer
class SearchingForPlayer extends Component {
    cancelSearch = () => this.props.cancelSearch()

    render() {

        this.props.ClientManager.waitForPlayers()
        if (this.props.ClientManager.ready) {
            return <Redirect to="/game" />
        } else {
            return (
                <div className="searching-for-player">
                    {/* <h1>Code: {this.props.ClientManager.gameID}</h1> */}
                    <div className="cancel-search" onClick={this.cancelSearch}>X</div>
                    <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <h3 className="looking-for-player">Waiting for a player...</h3>
                </div>
            );
        }
    }
}

export default SearchingForPlayer
