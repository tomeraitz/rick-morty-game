import { observable, action } from 'mobx'

class SpaceShip {
    @observable id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
    @observable x
    @observable y
    constructor(x, y) {
        this.x = x
        this.y = y

        this.nextX = x
        this.nextY = y
    }
    @action move = (direction) => {
        if (direction === 40)
        {
            // up
            this.nextY = this.y - 15
            // this.y -= 15
        }

        if (direction === 38)
        {
            // down
            this.nextY = this.y + 15
            // this.y += 15
        }

        if (direction === 37)
        {
            // left
            this.nextX = this.x - 15
            // this.x -= 15
        }

        if (direction === 39)
        {
            //right
            this.nextX = this.x + 15
            // this.x += 15
        }
    }
}



export default SpaceShip