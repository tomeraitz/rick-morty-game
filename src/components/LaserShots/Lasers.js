import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';


@observer
class Lasers extends Component {
    // componentDidMount() {
    //     this.props.fire()
    // }

    render() {
        return (
            <div className="laser" style={{ left: `${this.props.x}px`, bottom: `${this.props.y}px` }}></div>
        );
    }
}

export default Lasers;
