import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import myImage from '../../images/ReaperCardWars.png'

@inject("Enemy")

@observer
class Enemy extends Component {
    //  componentDidMount(){
    //     document.documentElement.style.setProperty("--img", `url(${myImage})`);
    //  }

    render() {
        const { x, y } = this.props
        // let y = this.props.y

        return (
            <div className="enemy"
                // style={{
                //     right: `${x}px`, bottom: `${y}px`,
                //     backgroundImage: 'url(' + this.props.myImage + ') ',
                //     backgroundRepeat: "no-repeat",
                //     backgroundSize: 'contain',
                // }}
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
