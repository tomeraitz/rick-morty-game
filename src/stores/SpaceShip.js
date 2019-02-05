import { observable } from 'mobx'

class SpaceShip {
    @observable id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
    @observable x
    @observable y
    @observable height
    @observable width
    constructor(x, y) {
        this.x = x
        this.y = y
        
    }
}

export default SpaceShip