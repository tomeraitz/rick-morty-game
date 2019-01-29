import { observable, computed, action } from 'mobx'

class LaserShot {
    @observable x
    @observable y
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    // @action fire = () => {
    //     for (let i = 0; i <= 1000; i++)
    //     {
    //         setTimeout(() => {
    //             this.x = i
    //         }, i * 1)
    //     }
    // }
}

// let LaserShot = new LaserShotting()

export default LaserShot