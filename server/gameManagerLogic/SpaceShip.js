class SpaceShip {
    constructor(x, y, height, width) {
        this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
        this.x = x
        this.y = y
        this.height = height
        this.width = width
    }

    move = (direction, width, height) => {
        if (direction === 40 && this.y - 35 > 0) {
            // down
            this.y -= 35
        }

        if (direction === 38 && this.y + 60 < height) {
            // up
            this.y += 35
        }

        if (direction === 37 && this.x - 25 > 0) {
            // left
            this.x -= 35
        }

        if (direction === 39 && this.x + 120 < width) {
            //right
            this.x += 35

        }
    }

    // charBorders = () => {
    //     this.width = document.getElementById('space-ship').clientWidth
    //     this.height = document.getElementById('space-ship').clientHeight

    //     let charBorders = { height: this.height, width: this.width }
    //     return charBorders
    // }
}



export default SpaceShip