import React, { Component } from 'react';

class NextLevel extends Component {

    render() {
        return (
            <div id="next-level">
                <h1>Congratulation!</h1>
                <h3>You've reached level {this.props.level} !</h3>
            </div>
        );
    }
}

export default NextLevel;
