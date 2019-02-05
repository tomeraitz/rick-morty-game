class Enemy {
    constructor(index, x, y, width, height, src) {
    this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
    this.index = index
    this.src = src
    this.x = x
    this.y= y
    this.width= width
    this.height= height
    }

}

export default Enemy