import Enemy from './Enemy'
import LaserShot from './LaserShot'
import SpaceShip from './SpaceShip' 
import arrayImages from '../../src/consts/ArrayImages'

class GameManager {
    constructor(boardWidth, boardHeight) {
        this.spaceShips = []
        this.playerInfo = {
            life: 3,
            score: 0,
            level: 1
        }
        this.enemies = []
        this.laserShots = []
        this.interval_id
        this.boardWidth = boardWidth
        this.boardHeight = boardHeight
        this.enemyPerLevel = 4
        this.finishLevel = false
        this.isGameOver = false
        this.isGameOnPause = false
        this.explosion = []
    }

    createEnemies = (num) => {
        for (let i = 1; i < (num + 1); i++) {
            let y = Math.floor(Math.random() * 400)
            let x = i * 50
            let index = Math.floor(Math.random() * arrayImages.length)
            let width = arrayImages[index].width
            let height = arrayImages[index].height
            let src = arrayImages[index].src
            this.drawInstance(new Enemy(index, -x, y, width, height, src))
        }
    }
    start = () => {
        // this.sound()
        setTimeout(() => this.finishLevel = false, 2000);

        if (this.spaceShips.length === 0) this.drawInstance(new SpaceShip(0, 50, 3, 0, 1))
        this.createEnemies(this.enemyPerLevel)

        this.interval = setInterval((this.game), 20)
    }

    finishExplosion = () => {
        this.explosion.shift()
    }

    setNewLevel = () => {
        this.finishLevel = true
        this.playerInfo.level++
        this.enemyPerLevel = this.playerInfo.level * 4
        clearInterval(this.interval);
        setTimeout(() => this.finishLevel = false, 2000);
        this.start()
    }

    gameOver = () => {
        clearInterval(this.interval);

        this.enemies = []
        this.spaceShips = []
        this.laserShots = []
        this.playerInfo = {
            life: 3,
            score: 0,
            level: 1
        }
        this.isGameOver = true
        this.finishLevel = false
        alert("start new game loser!")
        this.start()
    }

    pauseGame = () => {
        if (!this.isGameOnPause) clearInterval(this.interval);
        this.isGameOnPause = true
    }

    continuePlaying = () => {
        if (this.isGameOnPause) this.interval = setInterval((this.game), 20)
        this.isGameOnPause = false
    }

    game = () => {
        this.enemies.forEach(e => {
            if (e.x + 50 <= this.boardWidth) e.x += this.playerInfo.level
            else this.kill(e)
        })
        this.laserShots.forEach(l => {
            if (l.x + 50 <= this.boardWidth) {
                l.x += 15
                this.checkEnemies(l)
            } else this.kill(l)
        })
        this.spaceShips.forEach(s => {
            this.checkEnemies(s)
        })
    }

    setBorders = (height, width) => {
        this.boardWidth = width
        this.boardHeight = height
    }

    drawInstance = (instance) => {
        if (instance instanceof LaserShot) {
            if (this.laserShots.length === 0) this.laserShots.push(instance)
        } 
        else if (instance instanceof Enemy) {
            this.enemies.push(instance)
        } 
        else if (instance instanceof SpaceShip) {
            this.spaceShips.push(instance)
        }
    }

    kill = (instance) => {
        if (instance instanceof LaserShot) {
            this.laserShots = this.laserShots.filter(laserShot => laserShot.id !== instance.id)
        } else if (instance instanceof Enemy) {
            this.enemies = this.enemies.filter(enemy => enemy.id !== instance.id)
            this.explosion.push({
                x: instance.x,
                y: instance.y
            })
            if (this.enemies.length === 0) {
                if (this.enemyPerLevel > 0) {
                    this.createEnemies(this.enemyPerLevel)
                } else {
                    this.setNewLevel()
                }
            }
        } else if (instance instanceof SpaceShip) {
            if (this.playerInfo.life === 1) {
                this.gameOver()
            } else {
                this.playerInfo.life--
                this.enemyPerLevel--
            }
        }
    }

    checkEnemies = (instance) => {
        // let spaceShip = this.charBorders()
        this.enemies.forEach(e => {
            if (Math.abs(e.y - instance.y) <= e.height) {
                if (e.x + instance.x + (e.width) >= this.boardWidth || e.x + instance.x + (spaceShip.width) >= this.boardWidth) {
                    if (instance instanceof LaserShot) {
                        this.enemyPerLevel--
                        this.playerInfo.score += 10
                    }
                    this.kill(instance)
                    this.kill(e)
                }
            }
        })
    }
    // sound = () => {
    //     Howler.volume(1);
    //     const sounds = [
    //             [Riggity],
    //             [Balls],
    //             [rickBlech],
    //             [rickportal],
    //             [ticky],
    //             [dubdub]
    //         ]
    //         .map(s => new Howl({
    //             src: [s]
    //         }));
    //     const soundIndex = Math.floor(Math.random() * sounds.length)
    //     // const sound = new Howl({ src: sounds[soundIndex] });
    //     sounds[soundIndex].play();
    //     // sound.play();
    // }

    // charBorders = () => {
    //     let spaceShip = new SpaceShip()
    //     let border = spaceShip.charBorders()
    //     return border
    // }
}

// const game = new GameManager()
export default GameManager