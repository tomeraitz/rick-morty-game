const io = require('../../server')//require('socket.io')

const Enemy = require('./Enemy')
const LaserShot = require('./LaserShot')
const SpaceShip = require('./SpaceShip')
const arrayImages = require('../enemiesImags/enemiesImgs')

class GameManager {
    constructor(id) { //(randomWords) {
        this.id = id
        this.spaceShips = []
        this.playerInfo = {
            life: 3,
            score: 0,
            level: 1
        }
        this.enemies = []
        this.laserShots = []
        this.gameInterval
        this.explosion = []
        this.enemyPerLevel = 4
        this.finishLevel = false
        this.isGameOver = false
        this.isGameOnPause = false
        this.game = this.game.bind(this)
    }

    joinGame(playerID) {
        const y = (this.spaceShips.length + 1) * 10
        const x = 10
        this.spaceShips.push(new SpaceShip(playerID, x, y))
        io.to(`${this.id}`).emit('playerJoined');
    }

    createEnemies(num) {
        for (let i = 1; i < (num + 1); i++) {
            let y = Math.floor(Math.random() * 80)
            let x = i * 5
            let index = Math.floor(Math.random() * arrayImages.length)
            let width = arrayImages[index].width
            let height = arrayImages[index].height
            let src = arrayImages[index].src
            this.drawInstance(new Enemy(index, -x, y, width, height, src))
        }
    }

    start() {
        setTimeout(() => this.finishLevel = false, 2000);
        this.createEnemies(this.enemyPerLevel)

        this.gameInterval = setInterval((this.game), 30)
    }

    finishExplosion() {
        this.explosion.shift()
    }

    setNewLevel() {
        this.finishLevel = true
        this.playerInfo.level++
        this.enemyPerLevel = this.playerInfo.level * 4
        clearInterval(this.gameInterval);
        this.start()
    }

    gameOver() {
        clearInterval(this.gameInterval);

        this.playerInfo = {
            life: 3,
            score: 0,
            level: 1
        }
        this.enemies = []
        this.laserShots = []
        this.gameInterval = 0
        this.explosion = []
        this.enemyPerLevel = 4

        this.isGameOver = true
        io.in(`${this.id}`).emit('gameOver');
    }


    pauseGame() {
        if (!this.isGameOnPause) clearInterval(this.gameInterval);
        this.isGameOnPause = true

    }

    continuePlaying() {
        if (this.isGameOnPause) this.gameInterval = setInterval(this.game, 30)
        this.isGameOnPause = false
    }

    game() {
        this.enemies.forEach(e => {
            if (e.x + 2 <= 100) {
                e.x += 0.5
            }
            else this.kill(e)
        })
        this.laserShots.forEach(l => {
            if (l.x + 4 <= 100) {
                l.x += 5
                this.checkEnemies(l)
            } else this.kill(l)
        })
        this.spaceShips.forEach(s => {
            this.checkEnemies(s)
        })

        const gameState = {
            spaceShips: this.spaceShips,
            enemies: this.enemies,
            laserShots: this.laserShots,
            finishLevel: this.finishLevel,
            isGameOver: this.isGameOver,
            isGameOnPause: this.isGameOnPause,
            explosion: this.explosion,
            playerInfo: this.playerInfo,
            enemyPerLevel: this.enemyPerLevel

        }

        io.in(`${this.id}`).emit('newState', gameState);
    }

    drawInstance(instance) {
        if (instance instanceof LaserShot) {
            this.laserShots.push(instance)
        } else if (instance instanceof Enemy) {
            this.enemies.push(instance)
        } else if (instance instanceof SpaceShip) {
            this.spaceShips.push(instance)
        }
    }

    kill(instance) {
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

    checkEnemies(instance) {
        this.enemies.forEach(e => {
            if (Math.abs(e.y - instance.y) <= e.height) {
                if (e.x + instance.x + (instance.width) == 100 || e.x + instance.x + (e.width) == 100) {
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

    move(playerIndex, direction) {
        let spaceShip = this.spaceShips[playerIndex]
        if (direction === 40 && spaceShip.y - 4 > 0) {
            // down
            spaceShip.y -= 4
        }

        if (direction === 38 && spaceShip.y + 6 < 100) {
            // up
            spaceShip.y += 4
        }

        if (direction === 37 && spaceShip.x - 2 > 0) {
            // left
            spaceShip.x -= 2
        }

        if (direction === 39 && spaceShip.x + 7 < 100) {
            //right
            spaceShip.x += 2
        }

    }

    shoot(playerIndex) {
        const { x, y } = this.spaceShips[playerIndex]
        this.drawInstance(new LaserShot(x, y, playerIndex))
    }
}

module.exports = GameManager