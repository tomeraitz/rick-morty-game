import React, { Component } from 'react';

import img1 from '../../images/ReaperCardWars.png'
import img2 from '../../images/NicePng_rick-and-morty-png_90726.png'
import img3 from '../../images/main-qimg-fb94ac008f735da6e136f6ec801c2132.png'
import img4 from '../../images/Martinrender.png'
import img5 from '../../images/NicePng_mr-meeseeks-png_1487609.png'
import img6 from '../../images/NicePng_pickle-rick-png_290141.png'
import img7 from '../../images/S4ricardio.png'
import img8 from '../../images/Squirrel.png'

class Enemy extends Component {
    render() {
        let arr = [
            { name: 'img1', src: img1 },
            { name: 'img2', src: img2 },
            { name: 'img3', src: img3 },
            { name: 'img4', src: img4 },
            { name: 'img5', src: img5 },
            { name: 'img6', src: img6 },
            { name: 'img7', src: img7 },
            { name: 'img8', src: img8 }
        ]
        
        const { x, y ,myImage} = this.props
        let corrntImg = arr.find(a=>a.name===myImage)

        return (
            <div className="enemy" id={this.props.id}
                style={{
                    right: `${x}px`, bottom: `${y}px`
                }}
            >
                <img alt="enemy" src={[corrntImg.src]} />
            </div>
        );
    }
}

export default Enemy;
