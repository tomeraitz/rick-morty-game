import myImage1 from '../images/ReaperCardWars.png'
import myImage2 from '../images/NicePng_rick-and-morty-png_90726.png'
import myImage3 from '../images/main-qimg-fb94ac008f735da6e136f6ec801c2132.png'
import myImage4 from '../images/Martinrender.png'
import myImage5 from '../images/NicePng_mr-meeseeks-png_1487609.png'
import myImage6 from '../images/NicePng_pickle-rick-png_290141.png'
import myImage7 from '../images/S4ricardio.png'
import myImage8 from '../images/Squirrel.png'

import { heightToPixels, widthToPixels } from './toPixels'

let arr = [
    { name: 'reaper', src: myImage1, height: heightToPixels(9), width: widthToPixels(4) },
    { name: 'ass-morty', src: myImage2, height: heightToPixels(10), width: widthToPixels(2) },
    { name: 'poopy', src: myImage3, height: heightToPixels(10), width: widthToPixels(2) },
    { name: 'martin', src: myImage4, height: heightToPixels(10), width: widthToPixels(5) },
    { name: 'rick-and-morty', src: myImage5, height: heightToPixels(10), width: widthToPixels(3) },
    { name: 'pickle', src: myImage6, height: heightToPixels(10), width: widthToPixels(2) },
    { name: 'robot', src: myImage7, height: heightToPixels(10), width: widthToPixels(4) },
    { name: 'squirrel', src: myImage8, height: heightToPixels(10), width: widthToPixels(7) }
]

export default arr