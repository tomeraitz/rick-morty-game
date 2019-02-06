import React, { Component } from 'react';

import '../../style/joined-popup.css'

class JoinedPopup extends Component {
    closePopup = () => {
        return this.props.closePopup()
    }
    render() {
        return (
            <div className="joined-popup">
                <div className="check_mark">
                    <div className="sa-icon sa-success animate">
                        <span className="sa-line sa-tip animateSuccessTip"></span>
                        <span className="sa-line sa-long animateSuccessLong"></span>
                        <div className="sa-placeholder"></div>
                    </div>
                </div>
                <div>
                    <h1>Wubbalubbadubdub</h1>
                    <h2>We Found a Game!</h2>
                </div>
            </div>
        );
    }
}

export default JoinedPopup;
