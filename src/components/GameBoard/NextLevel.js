import React, { Component } from 'react';

class NextLevel extends Component {
    render() {
        console.log("next level")
        return (
            <div id="next-level">
                <h1>Congratulation!</h1>
                <h3>You've reached level {this.props.level} !</h3>
            </div>
        );
    }
}

export default NextLevel;
