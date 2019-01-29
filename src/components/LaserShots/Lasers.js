import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';


@observer
class Lasers extends Component {
    // componentDidMount() {
    //     this.props.fire()
    // }

    render() {
        return (
            <div className="laser" style={{ left: `${this.props.x}vw`, bottom: `${this.props.y + 2}vh` }}></div>
        );
    }
}

export default Lasers;
