import { observable, computed, action } from 'mobx'

class LaserShot {
    @observable id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
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