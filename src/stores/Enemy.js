import { observable } from 'mobx'//, computed, action

class Enemy {
    @observable id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
    @observable index = Math.floor(Math.random()*8)
    @observable x
    @observable y
    constructor(x, y) {
        this.x = x
        this.y = y
    }

}

export default Enemy