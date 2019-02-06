import React, { Component } from 'react';
import '../../style/searching-for-player.css'

class SearchingForPlayer extends Component {
    cancelSearch = () => this.props.cancelSearch()

    render() {
        return (
            <div className="searching-for-player">
                <div className="cancel-search" onClick={this.cancelSearch}>X</div>
                <div class="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <h1 className="looking-for-player">Waiting for a player...</h1>
            </div>
        );
    }
}

export default SearchingForPlayer
