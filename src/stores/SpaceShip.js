import { observable, action } from 'mobx'


class SpaceShip {
    @observable id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
    @observable x
    @observable y
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    @action move = (direction, width, height) => {
        if (direction === 40 && this.y - 35 > 0)
        {
            // down
            this.y -= 35
        }

        if (direction === 38 && this.y + 60 < height)
        {
            // up
            this.y += 35
        }

        if (direction === 37 && this.x - 25 > 0)
        {
            // left
            this.x -= 35
        }

        if (direction === 39 && this.x + 120 < width)
        {
            //right
            this.x += 35

        }
    }
}



export default SpaceShip