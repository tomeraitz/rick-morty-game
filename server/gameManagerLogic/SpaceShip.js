class SpaceShip {
    constructor(id, x, y) {
        this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
        this.x = x
        this.y = y
        this.height = 6
        this.width = 5.5
    }
}

module.exports = SpaceShip