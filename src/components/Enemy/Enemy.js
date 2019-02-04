import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import myImage from '../../images/ReaperCardWars.png'

@inject("Enemy")

@observer
class Enemy extends Component {
    componentDidMount() {
        let height = document.getElementById(`${this.props.id}`).clientHeight
        let width = document.getElementById(`${this.props.id}`).clientWidth
        let border = { h: height, w: width }
        console.log(border)
    }

    render() {
        const { x, y } = this.props
        return (
            <div className="enemy" id={this.props.id}
                style={{
                    right: `${x}px`, bottom: `${y}px`
                }}
            >
                <img alt="enemy" src={this.props.myImage} />

            </div>
        );
    }
}

export default Enemy;
