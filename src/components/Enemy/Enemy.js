import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject("Enemy")

@observer
class Enemy extends Component {

    render() {
        let x = this.props.Enemy.x
        let y = this.props.Enemy.y

        return (
            <div className="enemy" style={{ right: `${x}vw`, top: `${y}vh` }}></div>
        );
    }
}

export default Enemy;
