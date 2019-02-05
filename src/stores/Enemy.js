import { observable, action } from 'mobx'

class Enemy {
    @observable id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
    @observable index
    @observable src
    @observable x
    @observable y
    @observable width
    @observable height

    constructor(index, x, y, width, height, src) {
        this.index = index
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.src = src
    }

}

export default Enemy