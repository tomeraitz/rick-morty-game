export const heightToPixels = heigth => {
    let screenHeight = window.innerHeight
    return Math.floor(screenHeight * heigth / 100)
}

export const widthToPixels = width => {
    let screenWidth = window.innerWidth
    return Math.floor(screenWidth * width / 100)
}