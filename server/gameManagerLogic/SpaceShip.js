class SpaceShip {
    constructor(x, y) {
        this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
        this.x = x
        this.y = y
        // this.height = height
        // this.width = width
    }


    // charBorders = () => {
    //     this.width = document.getElementById('space-ship').clientWidth
    //     this.height = document.getElementById('space-ship').clientHeight

    //     let charBorders = { height: this.height, width: this.width }
    //     return charBorders
    // }
}



module.exports=SpaceShip