import React, { Component } from 'react';
import { observer } from 'mobx-react';//inject



@observer
class Lasers extends Component {

    render() {
        return (

            <div className="laser" style={{ left: `${this.props.x}px`, bottom: `${this.props.y + 2}px` }}></div>
        );
    }
}

export default Lasers;
