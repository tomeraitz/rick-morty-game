import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';


@observer
class Lasers extends Component {

    render() {
        return (

            <div className="laser" style={{ left: `${this.props.x}px`, bottom: `${this.props.y + 2}px` }}></div>
        );
    }
}

export default Lasers;
