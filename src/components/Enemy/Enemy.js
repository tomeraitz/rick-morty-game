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
        let x = this.props.x
        let y = this.props.y

        return (
            <div className="enemy" 
                    style={{ right: `${x}px`, bottom: `${y}px`, 
                    backgroundImage: 'url('+ this.props.myImage + ') ',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 'contain',}}></div>
        );
    }
}

export default Enemy;
