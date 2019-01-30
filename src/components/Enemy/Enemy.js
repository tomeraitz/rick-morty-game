import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';


@inject("Enemy")

@observer
class Enemy extends Component {

    render() {
        let x = this.props.x
        let y = this.props.y

        return (
            <div className="enemy" style={{ right: `${x}px`, bottom: `${y}px` }}></div>
        );
    }
}

export default Enemy;
