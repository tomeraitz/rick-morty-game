import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import myImage from '../../images/ReaperCardWars.png'

@inject("Enemy")

@observer
class Enemy extends Component {

    render() {
        const { x, y } = this.props
        return (
            <div className="enemy"
                style={{ right: `${x}px`, bottom: `${y}px` }}>
                <img alt="enemy" src={this.props.myImage} />

            </div>
        );
    }
}

export default Enemy;
