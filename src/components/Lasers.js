import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject("LaserShot")

@observer
class Lasers extends Component {
    componentDidMount() {
        this.props.LaserShot.fire()
    }

    render() {
        let x = this.props.LaserShot.x
        return (
            <div className="laser" style={{ left: `${x}px`, top: `10vw` }}></div>
        );
    }
}

export default Lasers;
