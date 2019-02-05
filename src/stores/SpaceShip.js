import { observable, action } from 'mobx'
import { heightToPixels, widthToPixels } from '../consts/toPixels'

class SpaceShip {
    @observable id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
    @observable x
    @observable y
    @observable height
    @observable width
    constructor(x, y) {
        this.x = x
        this.y = y
        this.height = heightToPixels(6)
        this.width = widthToPixels(6.5)
    }
    @action move = (direction, width, height) => {
        if (direction === 40 && this.y - 35 > 0) {
            this.y -= 35
        }

        if (direction === 38 && this.y + 60 < height) {
            this.y += 35
        }

        if (direction === 37 && this.x - 25 > 0) {
            this.x -= 35
        }

        if (direction === 39 && this.x + 120 < width) {
            this.x += 35
        }
    }
}

export default SpaceShip