import { observable, computed, action } from 'mobx'

class LaserShot {
    @observable id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
    @observable shipID
    @observable x
    @observable y
    constructor(x, y, shipID) {
        this.x = x
        this.y = y
        this.shipID = shipID
    }

}


export default LaserShot