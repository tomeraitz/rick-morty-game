class LaserShot {
    constructor(x, y, shipID) {
        this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
        this.x = x
        this.y = y
        this.width = 1.3
        this.height = 0.3
        this.shipID = shipID
    }
}


module.exports = LaserShot