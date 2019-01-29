import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject("Enemy")

@observer
class Enemy extends Component {
    componentDidMount() {
        this.props.Enemy.move()
    }

    render() {
        let x = this.props.Enemy.x
        return (
            <div className="enemy" style={{ right: `${x}px`, top: `20vw` }}></div>
        );
    }
}

export default Enemy;
