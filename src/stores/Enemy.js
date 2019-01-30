import { observable, computed, action } from 'mobx'

class Enemy {
    @observable x
    @observable y
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    // @action move = () => {
    //     for (let i = 0; i <= 1000; i++)
    //     {
    //         setTimeout(() => {
    //             this.x = i
    //         }, i * 1)
    //     }
    // }
}

export default Enemy